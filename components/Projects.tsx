'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

interface ProjectLink {
  github?: string
  demo?: string
}

interface Project {
  title: string
  description: string
  image: string
  links: ProjectLink
  order?: number
  date?: string
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [sortType, setSortType] = useState<'order' | 'alpha' | 'date'>('order')
  const [viewMode, setViewMode] = useState<'thumb' | 'list'>('thumb')
  const carouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    async function fetchProjects() {
      const files = [
        'gifcursors.json',
        'threejs.json',
        'ziswell.json',
        'subshootica.json',
        'retroapps.json',
        'mario-platformer.json',
        'webdarts.json',
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

      setProjects(projectsData.filter(Boolean) as Project[])
    }

    fetchProjects()
  }, [])

  useEffect(() => {
    const carousel = carouselRef.current
    if (!carousel) return

    let isDown = false
    let startX = 0
    let scrollLeft = 0

    const handleMouseDown = (e: MouseEvent) => {
      if (viewMode !== 'thumb') return
      isDown = true
      carousel.classList.add('cursor-grabbing')
      startX = e.pageX - carousel.offsetLeft
      scrollLeft = carousel.scrollLeft
    }

    const handleMouseLeave = () => {
      isDown = false
      carousel.classList.remove('cursor-grabbing')
    }

    const handleMouseUp = () => {
      isDown = false
      carousel.classList.remove('cursor-grabbing')
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDown) return
      e.preventDefault()
      const x = e.pageX - carousel.offsetLeft
      const walk = (x - startX) * 2
      carousel.scrollLeft = scrollLeft - walk
    }

    carousel.addEventListener('mousedown', handleMouseDown)
    carousel.addEventListener('mouseleave', handleMouseLeave)
    carousel.addEventListener('mouseup', handleMouseUp)
    carousel.addEventListener('mousemove', handleMouseMove)

    return () => {
      carousel.removeEventListener('mousedown', handleMouseDown)
      carousel.removeEventListener('mouseleave', handleMouseLeave)
      carousel.removeEventListener('mouseup', handleMouseUp)
      carousel.removeEventListener('mousemove', handleMouseMove)
    }
  }, [viewMode])

  const sortedProjects = [...projects].sort((a, b) => {
    if (sortType === 'alpha') {
      return a.title.localeCompare(b.title)
    } else if (sortType === 'date') {
      return new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime()
    }
    return (a.order || 0) - (b.order || 0)
  })

  return (
    <>
      <h2 className="text-4xl text-text mb-6">Projects</h2>
      <div className="projects-controls mb-6">
        <label htmlFor="sort-select" className="text-text font-bold mr-2">
          Sort:
        </label>
        <select
          id="sort-select"
          value={sortType}
          onChange={(e) => setSortType(e.target.value as 'order' | 'alpha' | 'date')}
          className="bg-white border-none mr-2 px-2 py-1"
        >
          <option value="order">Default</option>
          <option value="alpha">Alphabetical</option>
          <option value="date">By Date</option>
        </select>
        <button
          onClick={() => setViewMode('list')}
          className="projects-controls-btn"
        >
          List View
        </button>
        <button
          onClick={() => setViewMode('thumb')}
          className="projects-controls-btn"
        >
          Thumbnail View
        </button>
      </div>

      <div
        ref={carouselRef}
        className={`carousel ${viewMode === 'thumb' ? 'view-thumb' : 'view-list'} flex gap-8 overflow-x-auto overflow-y-hidden p-4 transition-all scrollbar-thin scrollbar-thumb-accent scrollbar-track-section-bg max-w-full min-h-[260px] scroll-smooth ${
          viewMode === 'thumb' ? 'flex-row items-stretch' : 'flex-col items-center max-h-[60vh] overflow-y-auto overflow-x-hidden'
        }`}
      >
        {sortedProjects.map((project) => (
          <div
            key={project.title}
            className={`project-item bg-secondary-bg shadow-lg ${
              viewMode === 'thumb'
                ? 'min-w-[220px] max-w-[260px] flex-[0_0_220px] flex-col'
                : 'flex-row max-w-[600px] min-w-[300px] w-full'
            } flex items-center transition-all duration-300 pb-5 cursor-grab ${
              viewMode === 'list' ? 'px-8 py-4' : 'p-0'
            }`}
          >
            <img
              src={project.image}
              alt={`${project.title} thumbnail`}
              className={`w-full shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                viewMode === 'thumb' ? 'mb-4' : 'mr-8 max-w-[150px] mb-0'
              }`}
            />
            <div className={`project-info text-left w-full flex flex-col flex-grow ${viewMode === 'thumb' ? 'px-4' : ''}`}>
              <h3 className="text-text text-xl mb-2">{project.title}</h3>
              <p className="text-muted text-base mb-4 flex-grow">{project.description}</p>
              <div className="project-links flex gap-3 mt-auto flex-wrap">
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener"
                    className="project-link"
                  >
                    GitHub
                  </a>
                )}
                {project.links.demo && (
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener"
                    className="project-link"
                  >
                    Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .projects-controls-btn {
          font-family: 'Inter', sans-serif;
          font-weight: 900;
          font-size: 1rem;
          padding: 0.7em 1.25em;
          margin: 0 0.3em;
          border-radius: 0;
          border: none;
          box-shadow: 0 0 0 0.5em #e3aa00;
          cursor: pointer;
          position: relative;
          background: white;
          color: #000;
          transition: all 175ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        .projects-controls-btn:hover {
          background-color: #ebf8ff;
          transform: rotate(-2deg);
        }

        .projects-controls-btn::before {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          box-shadow: 0 0 0 0.5em #09fdfd;
          mix-blend-mode: multiply;
          transform: rotate(1deg);
          transition: all 0.15s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        .projects-controls-btn::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          box-shadow: 0 0 0 0.5em #fc0101;
          mix-blend-mode: multiply;
          transform: rotate(-1deg);
          transition: all 0.1s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        .projects-controls-btn:hover::before {
          transform: rotate(-2deg) translateX(-0.2em);
        }

        .projects-controls-btn:hover::after {
          transform: rotate(4deg) translateY(0.2em);
        }

        .project-link {
          font-family: 'Inter', sans-serif;
          display: inline-block;
          padding: 0.6em 1.4em;
          background: white;
          color: #000;
          text-decoration: none;
          font-weight: 900;
          font-size: 0.95rem;
          border: none;
          box-shadow: 0 0 0 0.5em #e3aa00;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          cursor: pointer;
          position: relative;
          transition: all 175ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        .project-link:hover {
          background-color: #ebf8ff;
          transform: rotate(-2deg);
        }

        .project-link::before {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          box-shadow: 0 0 0 0.5em #09fdfd;
          mix-blend-mode: multiply;
          transform: rotate(1deg);
          transition: all 0.15s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        .project-link::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          box-shadow: 0 0 0 0.5em #fc0101;
          mix-blend-mode: multiply;
          transform: rotate(-1deg);
          transition: all 0.1s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        .project-link:hover::before {
          transform: rotate(-2deg) translateX(-0.2em);
        }

        .project-link:hover::after {
          transform: rotate(4deg) translateY(0.2em);
        }

        .cursor-grabbing {
          cursor: grabbing !important;
        }
      `}</style>
    </>
  )
}
