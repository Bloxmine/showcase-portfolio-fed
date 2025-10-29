// ===================================
// Author: Hein Dijstelbloem
// Date: 2025-10-26
// Description: Interactive script for portfolio website with chromatic aberration and GSAP animations
// Dependencies: GSAP, ScrollTrigger
// Kudos to: https://codepen.io/fand/pen/EgGwjg for chromatic aberration.
// ===================================

// ===================================
// GLOBAL CONFIGURATION
// ===================================
const CONFIG = {
	chromaticAberration: {
		maxOffset: 5,
		redDefault: { dx: 2, dy: 0 },
		blueDefault: { dx: -3, dy: 0 }
	},
	rotation: {
		max: 2,
		cyanMultiplier: -1.5,
		magentaMultiplier: 2.5,
		cyanOffset: 8,
		magentaOffset: 8
	},
	animation: {
		duration: 0.2,
		resetDuration: 0.3,
		ease: 'power2.out'
	},
	scrollTrigger: {
		threshold: 0.1,
		rootMargin: '-10% 0px -10% 0px'
	}
};

// ===================================
// DOM ELEMENTS
// ===================================
const elements = {
	redOffset: document.getElementById('redOffset'),
	blueOffset: document.getElementById('blueOffset')
};

// ===================================
// UTILITY FUNCTIONS
// ===================================

/**
 * Detect if device is touch-enabled (including iPad in desktop mode)
 */
function isTouchDevice() {
	const hasTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
	const hasCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
	const lacksHover = window.matchMedia('(hover: none)').matches;
	const isProbablyIPad = hasTouch && (hasCoarsePointer || lacksHover || navigator.maxTouchPoints > 0);
	
	return isProbablyIPad || hasCoarsePointer || lacksHover;
}

/**
 * Apply GSAP animation to element
 */
function animateElement(element, props) {
	if (typeof gsap !== 'undefined') {
		gsap.to(element, props);
	} else {
		// Fallback for rotation if GSAP not loaded
		if (props.rotation !== undefined) {
			element.style.transform = `rotate(${props.rotation}deg)`;
		}
	}
}

/**
 * Get chromatic layers from wrapper
 */
function getChromaticLayers(sectionInner) {
	const wrapper = sectionInner.parentElement;
	return {
		cyan: wrapper.querySelector('.chromatic-layer.cyan'),
		magenta: wrapper.querySelector('.chromatic-layer.magenta')
	};
}

// ===================================
// CHROMATIC ABERRATION & ROTATION EFFECTS
// ===================================

// Cache DOM elements and animation setters
let cachedSectionInners = [];
let cachedChromaticLayers = [];
let redOffsetSetter = null;
let blueOffsetSetter = null;
let animationFrameId = null;
let mouseX = 0;
let mouseY = 0;

/**
 * Initialize cached DOM references and GSAP quickSetters
 */
function initializePerformanceCache() {
	const redOffset = document.getElementById('redOffset');
	const blueOffset = document.getElementById('blueOffset');
	
	// Cache SVG offset elements for direct attribute manipulation
	if (redOffset && blueOffset) {
		redOffsetSetter = {
			element: redOffset,
			dx: (val) => redOffset.setAttribute('dx', val),
			dy: (val) => redOffset.setAttribute('dy', val)
		};
		blueOffsetSetter = {
			element: blueOffset,
			dx: (val) => blueOffset.setAttribute('dx', val),
			dy: (val) => blueOffset.setAttribute('dy', val)
		};
	}
	
	// Cache section elements and their chromatic layers
	cachedSectionInners = Array.from(document.querySelectorAll('.section-inner'));
	cachedChromaticLayers = cachedSectionInners.map(sectionInner => {
		const wrapper = sectionInner.closest('.chromatic-wrapper') || sectionInner.parentElement;
		return {
			element: sectionInner,
			cyan: wrapper?.querySelector('.chromatic-layer.cyan'),
			magenta: wrapper?.querySelector('.chromatic-layer.magenta')
		};
	});
}

/**
 * Update chromatic aberration effect based on mouse position
 * @param {number} x - Normalized X position (-1 to 1)
 * @param {number} y - Normalized Y position (-1 to 1)
 */
function updateChromaticAberration(x, y) {
	if (redOffsetSetter && blueOffsetSetter) {
		const offsetX = x * CONFIG.chromaticAberration.maxOffset;
		const offsetY = y * CONFIG.chromaticAberration.maxOffset;
		
		redOffsetSetter.dx(offsetX);
		redOffsetSetter.dy(offsetY);
		blueOffsetSetter.dx(-offsetX);
		blueOffsetSetter.dy(-offsetY);
	}
}

/**
 * Get chromatic aberration layers for a section
 * @param {HTMLElement} element - The section element
 * @returns {Object} Object containing cyan and magenta layers
 */
function getChromaticLayers(element) {
	const wrapper = element.closest('.chromatic-wrapper') || element.parentElement;
	return {
		cyan: wrapper?.querySelector('.chromatic-layer.cyan'),
		magenta: wrapper?.querySelector('.chromatic-layer.magenta')
	};
}

/**
 * Throttled animation update using requestAnimationFrame
 */
function updateAnimations() {
	updateChromaticAberration(mouseX, mouseY);
	applyRotationEffects(mouseX, mouseY);
	animationFrameId = null;
}

// Mouse movement tracking with requestAnimationFrame throttling
document.addEventListener('mousemove', (e) => {
	mouseX = (e.clientX / window.innerWidth) * 2 - 1;
	mouseY = (e.clientY / window.innerHeight) * 2 - 1;
	
	// Only request new frame if one isn't already pending
	if (!animationFrameId) {
		animationFrameId = requestAnimationFrame(updateAnimations);
	}
});

/**
 * Reset chromatic aberration to default
 */
function resetChromaticAberration() {
	const { redDefault, blueDefault } = CONFIG.chromaticAberration;
	
	elements.redOffset.setAttribute('dx', redDefault.dx);
	elements.redOffset.setAttribute('dy', redDefault.dy);
	elements.blueOffset.setAttribute('dx', blueDefault.dx);
	elements.blueOffset.setAttribute('dy', blueDefault.dy);
}

// ===================================
// ROTATION EFFECTS
// ===================================

/**
 * Apply rotation effects to section and chromatic layers
 * Uses cached DOM references for better performance
 */
function applyRotationEffects(x, y) {
	const { max, cyanMultiplier, magentaMultiplier, cyanOffset, magentaOffset } = CONFIG.rotation;
	const { duration, ease } = CONFIG.animation;
	const rotation = x * max;
	
	cachedChromaticLayers.forEach(({ element, cyan, magenta }) => {
		// Rotate main section
		animateElement(element, { rotation, duration, ease });
		
		// Rotate chromatic layers
		if (cyan) {
			animateElement(cyan, {
				rotation: rotation * cyanMultiplier,
				x: -x * cyanOffset,
				y: -y * (cyanOffset / 2),
				duration,
				ease
			});
		}
		
		if (magenta) {
			animateElement(magenta, {
				rotation: rotation * magentaMultiplier,
				x: x * magentaOffset,
				y: y * (magentaOffset / 2),
				duration,
				ease
			});
		}
	});
}

/**
 * Reset all rotation effects
 * Uses cached DOM references for better performance
 */
function resetRotationEffects() {
	const { resetDuration, ease } = CONFIG.animation;
	
	cachedChromaticLayers.forEach(({ element, cyan, magenta }) => {
		// Reset main section
		animateElement(element, { rotation: 0, duration: resetDuration, ease });
		
		// Reset chromatic layers
		if (cyan) {
			animateElement(cyan, { rotation: 0, x: 0, y: 0, duration: resetDuration, ease });
		}
		
		if (magenta) {
			animateElement(magenta, { rotation: 0, x: 0, y: 0, duration: resetDuration, ease });
		}
	});
}

// ===================================
// MOUSE EVENT HANDLERS
// ===================================

document.addEventListener('mouseleave', () => {
	resetChromaticAberration();
	resetRotationEffects();
});

// ===================================
// DIAGONAL FLYING BG TEXT ANIMATION
// ===================================

function setupDiagonalText() {
	const textLines = document.querySelectorAll('.diagonal-text-line');
	textLines.forEach((line, index) => {
		line.style.setProperty('--delay', `${index * 0.2}s`);
	});
}

// ===================================
// INITIALIZATION
// ===================================

/**
 * Apply SVG filter to titles
 */
function applyFilterToTitles() {
	const titles = document.querySelectorAll('h1, h2');
	titles.forEach(title => {
		title.style.filter = 'url(#kill)';
	});
}

/**
 * Create chromatic aberration layers for section elements
 */
function createChromaticLayers() {
	const allSectionInners = document.querySelectorAll('.section-inner');
	
	allSectionInners.forEach(sectionInner => {
		// Create wrapper
		const wrapper = document.createElement('div');
		wrapper.style.position = 'relative';
		wrapper.style.width = '100%';
		wrapper.style.maxWidth = '900px';
		wrapper.style.margin = '0 auto';
		
		// Create cyan layer
		const cyanLayer = document.createElement('div');
		cyanLayer.className = 'chromatic-layer cyan';
		cyanLayer.setAttribute('data-layer', 'cyan');
		
		// Create magenta layer
		const magentaLayer = document.createElement('div');
		magentaLayer.className = 'chromatic-layer magenta';
		magentaLayer.setAttribute('data-layer', 'magenta');
		
		// Wrap elements
		sectionInner.parentNode.insertBefore(wrapper, sectionInner);
		wrapper.appendChild(cyanLayer);
		wrapper.appendChild(magentaLayer);
		wrapper.appendChild(sectionInner);
	});
}

/**
 * Setup project controls (view toggle and sorting)
 */
function setupProjectControls() {
	const carousel = document.getElementById('projects-carousel');
	const btnList = document.getElementById('view-list');
	const btnThumb = document.getElementById('view-thumb');
	const sortBtn = document.getElementById('sort-btn');
	
	// View toggle
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
	
	// Project sorting
	if (sortBtn && carousel) {
		sortBtn.addEventListener('click', () => {
			const items = Array.from(carousel.querySelectorAll('.project-item'));
			const sorted = items.sort((a, b) => a.dataset.title.localeCompare(b.dataset.title));
			sorted.forEach(item => carousel.appendChild(item));
		});
	}
}

// ===================================
// GSAP ANIMATIONS
// ===================================

/**
 * Setup URL hash updates on scroll
 */
function setupHashUpdates() {
	const allSections = gsap.utils.toArray('.section');
	
	allSections.forEach((section) => {
		ScrollTrigger.create({
			trigger: section,
			start: 'top center',
			end: 'bottom center',
			onEnter: () => updateHash(section.id),
			onEnterBack: () => updateHash(section.id)
		});
	});
}

function updateHash(id) {
	if (id) {
		history.replaceState(null, null, '#' + id);
	}
}

/**
 * section reveal
 */
function setupSectionAnimations() {
	const sections = gsap.utils.toArray('.section:not(.landing):not(.full-width)');
	const touchDevice = isTouchDevice();
	
	console.log('Touch device detected:', touchDevice);
	
	// Set initial states
	sections.forEach((section) => {
		const sectionInner = section.querySelector('.section-inner');
		if (!sectionInner) return;
		
		if (touchDevice) {
			gsap.set(sectionInner, { opacity: 0, y: 30, transformOrigin: 'center center' });
		} else {
			gsap.set(sectionInner, { y: -100, scale: 0.85, rotation: -3, opacity: 0, transformOrigin: 'center center' });
		}
	});
	
	// sectionobserver, does it
	const sectionObserver = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				animateSectionReveal(entry.target, touchDevice);
				sectionObserver.unobserve(entry.target);
			}
		});
	}, { 
		threshold: CONFIG.scrollTrigger.threshold,
		rootMargin: CONFIG.scrollTrigger.rootMargin
	});
	
	sections.forEach(section => sectionObserver.observe(section));
}

/**
 * animate section reveal based on device type
 */
function animateSectionReveal(section, touchDevice) {
	const sectionInner = section.querySelector('.section-inner');
	if (!sectionInner) return;
	
	if (touchDevice) {
		// simple fade for touch devices
		gsap.to(sectionInner, {
			opacity: 1,
			y: 0,
			duration: 0.6,
			ease: 'power2.out'
		});
	} else {
		// stamp animation for desktop
		gsap.to(sectionInner, {
			y: 0,
			scale: 1,
			rotation: 0,
			opacity: 1,
			ease: 'back.out(1.7)',
			duration: 0.8
		});
		
		// add shake effect
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
}

/**
 * initialize GSAP-based features
 */
function initializeGSAP() {
	if (typeof gsap === 'undefined') {
		console.error('GSAP is not loaded!');
		return;
	}
	
	// Register plugin
	gsap.registerPlugin(ScrollTrigger);
	
	// Configure ScrollTrigger
	ScrollTrigger.config({
		autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
		ignoreMobileResize: true
	});
	
	// Setup all GSAP features
	setupHashUpdates();
	setupSectionAnimations();
	setupFlyingTextAnimations();
	setupScrollSnapBehavior();
	
	// Refresh ScrollTrigger
	window.addEventListener('load', () => ScrollTrigger.refresh());
	setTimeout(() => ScrollTrigger.refresh(), 500);
}

// ===================================
// MAIN INITIALIZATION
// ===================================

document.addEventListener('DOMContentLoaded', function () {
	// Enable smooth scrolling
	document.body.style.scrollBehavior = 'smooth';
	document.documentElement.style.scrollBehavior = 'smooth';
	
	// Initialize features
	applyFilterToTitles();
	createChromaticLayers();
	initializePerformanceCache(); // Cache DOM elements after chromatic layers are created
	setupProjectControls();
	setupDiagonalCanvas(); // Setup canvas-based diagonal background text
	initializeGSAP();
});
