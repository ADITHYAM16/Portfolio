// Typewriter effect for taglines
const taglines = [
    "Fullstack Developer",
    "AI Enthusiast", 
    "Web Designer"
];

let taglineIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typewriter = document.getElementById('typewriter');

function typeEffect() {
    const currentTagline = taglines[taglineIndex];
    
    if (isDeleting) {
        typewriter.textContent = currentTagline.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriter.textContent = currentTagline.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentTagline.length) {
        setTimeout(() => {
            typewriter.style.opacity = '0';
            setTimeout(() => {
                isDeleting = true;
                typewriter.style.opacity = '1';
            }, 300);
        }, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        taglineIndex = (taglineIndex + 1) % taglines.length;
        setTimeout(() => {
            typewriter.style.opacity = '0';
            setTimeout(() => {
                typewriter.style.opacity = '1';
            }, 300);
        }, 500);
    }
    
    setTimeout(typeEffect, isDeleting ? 50 : 100);
}

typeEffect();

// Mobile hamburger menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links a');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Smooth active link highlight
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 70;
        if (pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    navLinksItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});