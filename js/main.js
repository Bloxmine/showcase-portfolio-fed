// main.js for portfolio interactivity

document.addEventListener('DOMContentLoaded', function () {
    // Snap scrolling for sections
    document.body.style.scrollBehavior = 'smooth';
    document.documentElement.style.scrollBehavior = 'smooth';

    // Project view toggle
    const carousel = document.getElementById('projects-carousel');
    const btnList = document.getElementById('view-list');
    const btnThumb = document.getElementById('view-thumb');
    btnList.addEventListener('click', () => {
        carousel.classList.remove('view-thumb');
        carousel.classList.add('view-list');
    });
    btnThumb.addEventListener('click', () => {
        carousel.classList.remove('view-list');
        carousel.classList.add('view-thumb');
    });

    // Project sorting (by title)
    const sortBtn = document.getElementById('sort-btn');
    sortBtn.addEventListener('click', () => {
        const items = Array.from(carousel.querySelectorAll('.project-item'));
        const sorted = items.sort((a, b) => {
            return a.dataset.title.localeCompare(b.dataset.title);
        });
        sorted.forEach(item => carousel.appendChild(item));
    });
});

    // courtesy of: https://codepen.io/fand/pen/EgGwjg
    const redOffset = document.getElementById('redOffset');
    const blueOffset = document.getElementById('blueOffset');
    const maxOffset = 5;

    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth) * 2 - 1;
        const y = (e.clientY / window.innerHeight) * 2 - 1;
        const redDx = x * maxOffset;
        const redDy = y * maxOffset;
        const blueDx = -x * maxOffset;
        const blueDy = -y * maxOffset;

        redOffset.setAttribute('dx', redDx);
        redOffset.setAttribute('dy', redDy);
        blueOffset.setAttribute('dx', blueDx);
        blueOffset.setAttribute('dy', blueDy);
    });

    document.addEventListener('mouseleave', () => {
        redOffset.setAttribute('dx', 2);
        redOffset.setAttribute('dy', 0);
        blueOffset.setAttribute('dx', -3);
        blueOffset.setAttribute('dy', 0);
    });

    // apply the filter to the titles
    const titles = document.querySelectorAll('h1, h2');
    titles.forEach(title => {
        title.style.filter = 'url(#kill)';
    });