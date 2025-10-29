// Dynamically load all project JSON files from /json/projects and render them

document.addEventListener('DOMContentLoaded', async function () {
    const carousel = document.getElementById('projects-carousel');
    const sortSelect = document.getElementById('sort-select');
    if (!carousel) return;
    async function fetchProjectFiles() {
        const files = [
            'gifcursors.json',
            'threejs.json',
            'ziswell.json',
            'subshootica.json',
            'retroapps.json',
            'mario-platformer.json',
            'webdarts.json'
        ];
        const base = '/json/projects/';
        const projects = await Promise.all(
            files.map(async file => {
                try {
                    const res = await fetch(base + file);
                    if (!res.ok) return null;
                    return await res.json();
                } catch {
                    return null;
                }
            })
        );
        return projects.filter(Boolean);
    }
    function renderProjects(projects, sortType = 'order') {
        let sorted = [...projects];
        if (sortType === 'alpha') {
            sorted.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortType === 'date') {
            sorted.sort((a, b) => {
                return new Date(b.date || 0) - new Date(a.date || 0);
            });
        } else {
            sorted.sort((a, b) => (a.order || 0) - (b.order || 0));
        }
        carousel.innerHTML = '';
        sorted.forEach(project => {
            // Create wrapper for chromatic effect
            const wrapper = document.createElement('div');
            wrapper.className = 'project-item-wrapper';
            
            // Create cyan layer
            const cyanLayer = document.createElement('div');
            cyanLayer.className = 'project-item-cyan';
            
            // Create magenta layer
            const magentaLayer = document.createElement('div');
            magentaLayer.className = 'project-item-magenta';
            
            // Create main project item
            const item = document.createElement('div');
            item.className = 'project-item';
            item.dataset.title = project.title;
            item.innerHTML = `
                <img src="${project.image}" alt="${project.title} thumbnail">
                <div class="project-info">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="project-links">
                        ${project.links.demo ? `<a href="${project.links.demo}" target="_blank" rel="noopener">DEMO</a>` : ''}
                        ${project.links.github ? `<a href="${project.links.github}" target="_blank" rel="noopener">REPO</a>` : ''}
                    </div>
                </div>
            `;
            
            // Append layers to wrapper
            wrapper.appendChild(cyanLayer);
            wrapper.appendChild(magentaLayer);
            wrapper.appendChild(item);
            
            carousel.appendChild(wrapper);
        });
    }

    const projects = await fetchProjectFiles();
    let currentSort = sortSelect ? sortSelect.value : 'order';
    renderProjects(projects, currentSort);

    if (sortSelect) {
        sortSelect.addEventListener('change', function () {
            currentSort = sortSelect.value;
            renderProjects(projects, currentSort);
        });
    }

    // Optional: enable mouse drag to scroll horizontally in carousel view
    let isDown = false;
    let startX, scrollLeft;
    carousel.addEventListener('mousedown', (e) => {
        if (!carousel.classList.contains('view-thumb')) return;
        isDown = true;
        carousel.classList.add('dragging');
        startX = e.pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
    });
    carousel.addEventListener('mouseleave', () => {
        isDown = false;
        carousel.classList.remove('dragging');
    });
    carousel.addEventListener('mouseup', () => {
        isDown = false;
        carousel.classList.remove('dragging');
    });
    carousel.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - carousel.offsetLeft;
        const walk = (x - startX) * 1.5; //scroll-fast
        carousel.scrollLeft = scrollLeft - walk;
    });
});
