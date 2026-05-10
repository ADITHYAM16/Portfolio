// Typewriter effect for taglines
const taglines = [
    "Full Stack Developer",
    "AI Engineer",
    "Web Developer",
    "UI/UX Designer"
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
    link.addEventListener('click', (e) => {
        e.preventDefault();
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        
        // Remove active class from all links and add to clicked link
        navLinksItems.forEach(navLink => navLink.classList.remove('active'));
        link.classList.add('active');
        
        // Get target section and add show-3d class immediately
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.add('show-3d');
            
            // Scroll to section with offset for navbar
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetSection.offsetTop - navbarHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Smooth active link highlight
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = pageYOffset + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = sectionId;
        }
    });
    
    // Handle last section (contact)
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
        current = 'contact';
    }
    
    navLinksItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// 3D Scroll Transition Effect
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show-3d');
        } else {
            entry.target.classList.remove('show-3d');
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});