'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './ProjectsSection.module.css';

interface ProjectLink {
  github?: string;
  demo?: string;
}

interface Project {
  title: string;
  description: string;
  image: string;
  links: ProjectLink;
  date?: string;
  order?: number;
}

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [sortType, setSortType] = useState('order');
  const [viewType, setViewType] = useState('thumb');

  useEffect(() => {
    async function loadProjects() {
      const files = [
        'gifcursors.json',
        'threejs.json',
        'ziswell.json',
        'subshootica.json',
        'retroapps.json',
        'mario-platformer.json',
        'webdarts.json'
      ];
      
      const projectData = await Promise.all(
        files.map(async (file) => {
          try {
            const res = await fetch(`/json/projects/${file}`);
            if (!res.ok) return null;
            return await res.json();
          } catch {
            return null;
          }
        })
      );
      
      setProjects(projectData.filter(Boolean));
    }
    
    loadProjects();
  }, []);

  const sortedProjects = [...projects].sort((a, b) => {
    if (sortType === 'alpha') {
      return a.title.localeCompare(b.title);
    } else if (sortType === 'date') {
      return new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime();
    } else {
      return (a.order || 0) - (b.order || 0);
    }
  });

  return (
    <section id="projects" className={`section projects full-width ${styles.projects}`}>
      <h2>Projects</h2>
      <div className={styles.projectsControls}>
        <label htmlFor="sort-select" style={{color:'var(--text)', fontWeight:'bold', marginRight:'0.5em'}}>Sort:</label>
        <select 
          id="sort-select" 
          value={sortType} 
          onChange={(e) => setSortType(e.target.value)}
          className={styles.sortSelect}
        >
          <option value="order">Default</option>
          <option value="alpha">Alphabetical</option>
          <option value="date">By Date</option>
        </select>
        <button 
          id="view-list" 
          aria-label="List View" 
          title="List View"
          onClick={() => setViewType('list')}
          className={styles.viewButton}
        >
          <Image src="/images/icons/listview.png" alt="List view icon" width={24} height={24} />
        </button>
        <button 
          id="view-thumb" 
          aria-label="Thumbnail View" 
          title="Thumbnail View"
          onClick={() => setViewType('thumb')}
          className={styles.viewButton}
        >
          <Image src="/images/icons/thumbnail.png" alt="Thumbnail view icon" width={24} height={24} />
        </button>
      </div>
      <div id="projects-carousel" className={`${styles.carousel} ${styles[`view${viewType.charAt(0).toUpperCase() + viewType.slice(1)}`]}`}>
        {sortedProjects.map((project) => (
          <div key={project.title} className={styles.projectItem} data-title={project.title}>
            <Image 
              src={project.image} 
              alt={`${project.title} thumbnail`} 
              width={280}
              height={200}
              className={styles.projectImage}
            />
            <div className={styles.projectInfo}>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className={styles.projectLinks}>
                {project.links.github && (
                  <a href={project.links.github} target="_blank" rel="noopener noreferrer">GitHub</a>
                )}
                {project.links.demo && (
                  <a href={project.links.demo} target="_blank" rel="noopener noreferrer">Demo</a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
