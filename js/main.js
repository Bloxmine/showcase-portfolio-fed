// main.js for portfolio interactivity

// courtesy of: https://codepen.io/fand/pen/EgGwjg
const redOffset = document.getElementById('redOffset');
const blueOffset = document.getElementById('blueOffset');
const maxOffset = 5;

document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = (e.clientY / window.innerHeight) * 2 - 1;
    
    // Chromatic aberration effect
    const redDx = x * maxOffset;
    const redDy = y * maxOffset;
    const blueDx = -x * maxOffset;
    const blueDy = -y * maxOffset;

    redOffset.setAttribute('dx', redDx);
    redOffset.setAttribute('dy', redDy);
    blueOffset.setAttribute('dx', blueDx);
    blueOffset.setAttribute('dy', blueDy);
    
    // Rotation effect for section-inner elements using GSAP
    const maxRotation = 2; // Maximum rotation in degrees
    const rotation = x * maxRotation;
    
    const sectionInners = document.querySelectorAll('.section-inner');
    sectionInners.forEach(sectionInner => {
        if (typeof gsap !== 'undefined') {
            gsap.to(sectionInner, {
                rotation: rotation,
                duration: 0.2,
                ease: 'power2.out'
            });
        } else {
            sectionInner.style.transform = `rotate(${rotation}deg)`;
        }
    });
});

document.addEventListener('mouseleave', () => {
    // Reset chromatic aberration
    redOffset.setAttribute('dx', 2);
    redOffset.setAttribute('dy', 0);
    blueOffset.setAttribute('dx', -3);
    blueOffset.setAttribute('dy', 0);
    
    // Reset rotation effect using GSAP
    const sectionInners = document.querySelectorAll('.section-inner');
    sectionInners.forEach(sectionInner => {
        if (typeof gsap !== 'undefined') {
            gsap.to(sectionInner, {
                rotation: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        } else {
            sectionInner.style.transform = 'rotate(0deg)';
        }
    });
});

// apply the filter to the titles
const titles = document.querySelectorAll('h1, h2');
titles.forEach(title => {
    title.style.filter = 'url(#kill)';
});

document.addEventListener('DOMContentLoaded', function () {
    // Snap scrolling for sections
    document.body.style.scrollBehavior = 'smooth';
    document.documentElement.style.scrollBehavior = 'smooth';

    // Project view toggle
    const carousel = document.getElementById('projects-carousel');
    const btnList = document.getElementById('view-list');
    const btnThumb = document.getElementById('view-thumb');
    
    if (btnList && btnThumb && carousel) {
        btnList.addEventListener('click', () => {
            carousel.classList.remove('view-thumb');
            carousel.classList.add('view-list');
        });
        btnThumb.addEventListener('click', () => {
            carousel.classList.remove('view-list');
            carousel.classList.add('view-thumb');
        });
    }

    // Project sorting (by title)
    const sortBtn = document.getElementById('sort-btn');
    if (sortBtn) {
        sortBtn.addEventListener('click', () => {
            const items = Array.from(carousel.querySelectorAll('.project-item'));
            const sorted = items.sort((a, b) => {
                return a.dataset.title.localeCompare(b.dataset.title);
            });
            sorted.forEach(item => carousel.appendChild(item));
        });
    }

    // Check if GSAP is loaded
    if (typeof gsap === 'undefined') {
        console.error('GSAP is not loaded!');
        return;
    }

    // GSAP ScrollTrigger stamp animation for sections
    gsap.registerPlugin(ScrollTrigger);

    // Get all sections (including landing for URL updates)
    const allSections = gsap.utils.toArray('.section');

    // Update URL hash when scrolling to sections
    allSections.forEach((section) => {
        ScrollTrigger.create({
            trigger: section,
            start: 'top center',
            end: 'bottom center',
            onEnter: () => {
                const id = section.id;
                if (id) {
                    history.replaceState(null, null, '#' + id);
                }
            },
            onEnterBack: () => {
                const id = section.id;
                if (id) {
                    history.replaceState(null, null, '#' + id);
                }
            }
        });
    });

    // Get all sections except the landing for animation
    const sections = gsap.utils.toArray('.section:not(.landing)');

    sections.forEach((section) => {
        const sectionInner = section.querySelector('.section-inner');
        
        if (!sectionInner) return;
        
        // Set initial hidden state immediately
        gsap.set(sectionInner, {
            y: -100,
            scale: 0.85,
            rotation: -3,
            opacity: 0,
            transformOrigin: 'center center'
        });
        
        // Create the stamp animation
        gsap.to(sectionInner, {
            y: 0,
            scale: 1,
            rotation: 0,
            opacity: 1,
            ease: 'back.out(2)',
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'top 20%',
                toggleActions: 'play reverse play reverse',
                scrub: 0.5
            }
        });
    });

    // Add a subtle shake/impact effect when the section "stamps"
    sections.forEach((section) => {
        const sectionInner = section.querySelector('.section-inner');
        
        if (!sectionInner) return;
        
        ScrollTrigger.create({
            trigger: section,
            start: 'top 50%',
            onEnter: () => {
                gsap.to(sectionInner, {
                    keyframes: [
                        { rotation: 1, duration: 0.05 },
                        { rotation: -1, duration: 0.05 },
                        { rotation: 0.5, duration: 0.05 },
                        { rotation: 0, duration: 0.05 }
                    ],
                    ease: 'power2.out'
                });
            },
            onLeaveBack: () => {
                gsap.to(sectionInner, {
                    keyframes: [
                        { rotation: -0.5, duration: 0.05 },
                        { rotation: 0.5, duration: 0.05 },
                        { rotation: 0, duration: 0.05 }
                    ],
                    ease: 'power2.out'
                });
            }
        });
    });

    // Flying text animation for the animated section
    const flyingTexts = gsap.utils.toArray('.flying-text');
    const animatedSection = document.querySelector('#animated');
    
    if (flyingTexts.length > 0 && animatedSection) {
        flyingTexts.forEach((text, index) => {
            const speed = parseFloat(text.dataset.speed) || 1;
            const isFromRight = text.style.transform.includes('translateX(100%)');
            const delay = index * 0.05; // Reduced stagger for smoother experience
            
            // Set initial state
            gsap.set(text, {
                opacity: 0,
                x: isFromRight ? '120vw' : '-120vw'
            });
            
            // Create the flying animation
            gsap.to(text, {
                x: isFromRight ? '-120vw' : '60vw',
                opacity: 1,
                ease: 'none',
                delay: delay,
                scrollTrigger: {
                    trigger: animatedSection,
                    start: 'top 100%', /* Start earlier */
                    end: 'bottom 0%', /* End later */
                    scrub: speed,
                    refreshPriority: -1, /* Lower priority to avoid conflicts */
                    onUpdate: (self) => {
                        // Fade in when entering, fade out when leaving
                        const progress = self.progress;
                        let opacity = 1;
                        
                        if (progress < 0.2) {
                            opacity = progress / 0.2;
                        } else if (progress > 0.8) {
                            opacity = (1 - progress) / 0.2;
                        }
                        
                        gsap.set(text, { opacity: opacity });
                    }
                }
            });
        });
    }

    // Disable scroll snap temporarily when in the animated section
    if (animatedSection) {
        ScrollTrigger.create({
            trigger: animatedSection,
            start: 'top 80%',
            end: 'bottom 20%',
            onEnter: () => {
                document.body.style.scrollSnapType = 'none';
            },
            onLeave: () => {
                document.body.style.scrollSnapType = 'y proximity';
            },
            onEnterBack: () => {
                document.body.style.scrollSnapType = 'none';
            },
            onLeaveBack: () => {
                document.body.style.scrollSnapType = 'y proximity';
            }
        });
    }
});
