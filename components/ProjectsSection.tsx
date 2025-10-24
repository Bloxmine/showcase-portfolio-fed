'use client'

import { useState, useEffect } from 'react'

interface Project {
  id: string
  title: string
  date?: string
  description: string
  image: string
  links: {
    github?: string
    demo?: string
  }
  order?: number
}

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([])
  const [sortType, setSortType] = useState('order')
  const [viewType, setViewType] = useState<'thumb' | 'list'>('thumb')

  useEffect(() => {
    // Fetch all project JSON files
    const fetchProjects = async () => {
      const files = [
        'gifcursors.json',
        'threejs.json',
        'ziswell.json',
        'subshootica.json',
        'retroapps.json',
        'mario-platformer.json',
        'webdarts.json'
      ]
      
      const projectsData = await Promise.all(
        files.map(async (file) => {
          try {
            const res = await fetch(`/json/projects/${file}`)
            if (!res.ok) return null
            return await res.json()
          } catch {
            return null
          }
        })
      )
      
      setProjects(projectsData.filter(Boolean))
    }

    fetchProjects()
  }, [])

  const sortedProjects = [...projects].sort((a, b) => {
    if (sortType === 'alpha') {
      return a.title.localeCompare(b.title)
    } else if (sortType === 'date') {
      return new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime()
    } else {
      return (a.order || 0) - (b.order || 0)
    }
  })

  return (
    <section id="projects" className="h-screen py-20 flex flex-col items-center justify-center snap-start bg-primary-bg box-border">
      <div className="torn-clip bg-section-bg shadow-lg p-12 w-full max-w-[900px] mx-auto flex flex-col items-center">
        <h2 className="text-4xl mb-6 text-text-light">Projects</h2>
        
        <div className="mb-6 flex gap-3 items-center flex-wrap">
          <label htmlFor="sort-select" className="text-text-light font-bold mr-2">Sort:</label>
          <select
            id="sort-select"
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            className="bg-secondary-bg text-text-light border-none px-5 py-2 rounded cursor-pointer"
          >
            <option value="order">Default</option>
            <option value="alpha">Alphabetical</option>
            <option value="date">By Date</option>
          </select>
          <button
            onClick={() => setViewType('list')}
            className="bg-secondary-bg text-text-light border-none px-5 py-2 rounded cursor-pointer hover:bg-accent hover:text-white transition-colors"
          >
            List View
          </button>
          <button
            onClick={() => setViewType('thumb')}
            className="bg-secondary-bg text-text-light border-none px-5 py-2 rounded cursor-pointer hover:bg-accent hover:text-white transition-colors"
          >
            Thumbnail View
          </button>
        </div>

        <div
          className={`
            ${viewType === 'thumb' 
              ? 'flex gap-8 overflow-x-auto overflow-y-hidden justify-start flex-nowrap min-h-[260px] w-full' 
              : 'flex flex-col items-center gap-6 overflow-x-hidden overflow-y-auto max-h-[60vh] w-full'
            }
            py-4 scroll-smooth
          `}
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#00bcd4 #181818'
          }}
        >
          {sortedProjects.map((project) => (
            <div
              key={project.id}
              className={`
                bg-secondary-bg rounded-xl shadow-md p-5 transition-transform cursor-grab
                ${viewType === 'thumb' 
                  ? 'min-w-[220px] max-w-[260px] flex-[0_0_220px] flex flex-col items-center' 
                  : 'flex-row max-w-[600px] min-w-[300px] w-full flex items-center'
                }
              `}
            >
              <img
                src={project.image}
                alt={`${project.title} thumbnail`}
                className={`
                  w-full max-w-[150px]
                  ${viewType === 'thumb' ? 'mb-4' : 'mb-0 mr-8'}
                `}
              />
              <div className="text-left">
                <h3 className="text-xl mb-2 text-text-light">{project.title}</h3>
                <p className="text-muted text-base mb-3">{project.description}</p>
                <div className="flex gap-3">
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:text-white transition-colors"
                    >
                      GitHub
                    </a>
                  )}
                  {project.links.demo && (
                    <a
                      href={project.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:text-white transition-colors"
                    >
                      Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
