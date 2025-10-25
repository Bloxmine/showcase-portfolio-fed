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
            // Rotate main section-inner
            gsap.to(sectionInner, {
                rotation: rotation,
                duration: 0.2,
                ease: 'power2.out'
            });
            
            // Get chromatic layers (now siblings in the parent wrapper)
            const wrapper = sectionInner.parentElement;
            const cyanLayer = wrapper.querySelector('.chromatic-layer.cyan');
            const magentaLayer = wrapper.querySelector('.chromatic-layer.magenta');
            
            if (cyanLayer) {
                gsap.to(cyanLayer, {
                    rotation: -rotation * 1.5,
                    x: -x * 8,
                    y: -y * 4,
                    duration: 0.2,
                    ease: 'power2.out'
                });
            }
            
            if (magentaLayer) {
                gsap.to(magentaLayer, {
                    rotation: rotation * 2.5,
                    x: x * 8,
                    y: y * 4,
                    duration: 0.2,
                    ease: 'power2.out'
                });
            }
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
            // Reset main section
            gsap.to(sectionInner, {
                rotation: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
            
            // Reset chromatic layers (now siblings in the parent wrapper)
            const wrapper = sectionInner.parentElement;
            const cyanLayer = wrapper.querySelector('.chromatic-layer.cyan');
            const magentaLayer = wrapper.querySelector('.chromatic-layer.magenta');
            
            if (cyanLayer) {
                gsap.to(cyanLayer, {
                    rotation: 0,
                    x: 0,
                    y: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
            
            if (magentaLayer) {
                gsap.to(magentaLayer, {
                    rotation: 0,
                    x: 0,
                    y: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
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

    // Create chromatic aberration layers for all section-inner elements
    const allSectionInners = document.querySelectorAll('.section-inner');
    allSectionInners.forEach(sectionInner => {
        // Create a wrapper to hold the layers and the section-inner
        const wrapper = document.createElement('div');
        wrapper.style.position = 'relative';
        wrapper.style.width = '100%';
        wrapper.style.maxWidth = '900px';
        wrapper.style.margin = '0 auto';
        
        // Create cyan layer (furthest back)
        const cyanLayer = document.createElement('div');
        cyanLayer.className = 'chromatic-layer cyan';
        cyanLayer.setAttribute('data-layer', 'cyan');
        
        // Create magenta layer (middle)
        const magentaLayer = document.createElement('div');
        magentaLayer.className = 'chromatic-layer magenta';
        magentaLayer.setAttribute('data-layer', 'magenta');
        
        // Wrap the section-inner
        sectionInner.parentNode.insertBefore(wrapper, sectionInner);
        wrapper.appendChild(cyanLayer);
        wrapper.appendChild(magentaLayer);
        wrapper.appendChild(sectionInner);
    });

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

    // Configure ScrollTrigger for better touch device support
    ScrollTrigger.config({
        autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
        ignoreMobileResize: true
    });

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

    // Get all sections except the landing and full-width sections for animation
    const sections = gsap.utils.toArray('.section:not(.landing):not(.full-width)');

    // Better touch device detection that works for iPads in desktop mode
    const isTouchDevice = (() => {
        // Check for touch capability
        const hasTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
        
        // Check if device has coarse pointer (touch) or lacks hover capability
        const hasCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
        const lacksHover = window.matchMedia('(hover: none)').matches;
        
        // iPad in desktop mode: has touch AND lacks precise hover
        const isProbablyIPad = hasTouch && (hasCoarsePointer || lacksHover || navigator.maxTouchPoints > 0);
        
        return isProbablyIPad || hasCoarsePointer || lacksHover;
    })();
    
    console.log('Touch device detected:', isTouchDevice);

    // Use IntersectionObserver for reliable scroll reveals
    sections.forEach((section) => {
        const sectionInner = section.querySelector('.section-inner');
        
        if (!sectionInner) return;
        
        if (isTouchDevice) {
            // Simple animation for touch devices
            gsap.set(sectionInner, {
                opacity: 0,
                y: 30,
                transformOrigin: 'center center'
            });
        } else {
            // Fancy stamp animation for desktop
            gsap.set(sectionInner, {
                y: -100,
                scale: 0.85,
                rotation: -3,
                opacity: 0,
                transformOrigin: 'center center'
            });
        }
    });

    // Create IntersectionObserver for section reveals
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const section = entry.target;
                const sectionInner = section.querySelector('.section-inner');
                
                if (!sectionInner) return;
                
                if (isTouchDevice) {
                    // Simple fade in for touch devices
                    gsap.to(sectionInner, {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        ease: 'power2.out'
                    });
                } else {
                    // Fancy stamp animation for desktop
                    gsap.to(sectionInner, {
                        y: 0,
                        scale: 1,
                        rotation: 0,
                        opacity: 1,
                        ease: 'back.out(1.7)',
                        duration: 0.8
                    });
                    
                    // Add shake effect on desktop
                    gsap.delayedCall(0.5, () => {
                        gsap.to(sectionInner, {
                            keyframes: [
                                { rotation: 1, duration: 0.05 },
                                { rotation: -1, duration: 0.05 },
                                { rotation: 0.5, duration: 0.05 },
                                { rotation: 0, duration: 0.05 }
                            ],
                            ease: 'power2.out'
                        });
                    });
                }
                
                // Unobserve after animating (animate only once)
                sectionObserver.unobserve(section);
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '-10% 0px -10% 0px'
    });

    // Observe all sections
    sections.forEach(section => sectionObserver.observe(section));

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
                x: isFromRight ? '-120vw' : '120vw',
                opacity: 1,
                ease: 'none',
                delay: delay,
                scrollTrigger: {
                    trigger: animatedSection,
                    start: 'top 100%',
                    end: 'bottom 0%',
                    scrub: speed,
                    refreshPriority: -1,
                    invalidateOnRefresh: true,
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

    // Disable scroll snap temporarily when in the animated section (desktop only)
    if (animatedSection && !isTouchDevice) {
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

    // Refresh ScrollTrigger after everything loads to ensure accuracy
    window.addEventListener('load', () => {
        ScrollTrigger.refresh();
    });

    // Also refresh after a short delay to account for any late-loading content
    setTimeout(() => {
        ScrollTrigger.refresh();
    }, 500);
});
