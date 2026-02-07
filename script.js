// 1. INITIAL SETUP & LOADER
const loader = document.getElementById('loader');
const loaderText = document.querySelector('.terminal-loader');

window.addEventListener('load', () => {
    // Fake boot sequence timing
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
            initAnimations(); // Start animations after load
        }, 500);
    }, 2500);
});

// 2. SMOOTH SCROLL (LENIS)
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// 3. CUSTOM CURSOR
const cursor = document.getElementById('cursor');
const cursorBlur = document.getElementById('cursor-blur');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    // Slight delay for the blur to create "drag" feel
    cursorBlur.animate({
        left: e.clientX + "px",
        top: e.clientY + "px"
    }, { duration: 500, fill: "forwards" });
});

// 4. MATRIX RAIN EFFECT
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

const cols = Math.floor(width / 20);
const ypos = Array(cols).fill(0);

window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
});

function matrix() {
    // Draw semi-transparent black to create trail effect
    ctx.fillStyle = '#0001'; 
    ctx.fillRect(0, 0, width, height);
    
    ctx.fillStyle = '#0f0';
    ctx.font = '15px monospace';
    
    ypos.forEach((y, ind) => {
        // Generate random character
        const text = String.fromCharCode(Math.random() * 128);
        const x = ind * 20;
        ctx.fillText(text, x, y);
        
        // Randomly reset column to top
        if (y > 100 + Math.random() * 10000) ypos[ind] = 0;
        else ypos[ind] = y + 20;
    });
}
setInterval(matrix, 50);

// 5. GSAP ANIMATIONS
function initAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // Hero Text Reveal
    gsap.from(".hero-title", {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out"
    });

    // Bento Grid Stagger
    gsap.from(".tile", {
        scrollTrigger: {
            trigger: ".bento-grid",
            start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out"
    });
}
