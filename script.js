// Typewriter effect for taglines
const taglines = [
    "Aspiring AI Engineer",
    "Full Stack Developer",
    "Machine Learning Enthusiast",
    "Generative AI Builder"
];

let taglineIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typewriter = document.getElementById('typewriter');

function typeEffect() {
    if (!typewriter) return;
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
            isDeleting = true;
        }, 2200);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        taglineIndex = (taglineIndex + 1) % taglines.length;
        setTimeout(() => {}, 400);
    }
    
    setTimeout(typeEffect, isDeleting ? 40 : 90);
}

typeEffect();

// Animate Stat Numbers on Load
function animateHeroStats() {
    const statCards = document.querySelectorAll('.hero-stat-card .stat-number');
    statCards.forEach(stat => {
        const fullText = stat.textContent.trim();
        const numMatch = fullText.match(/\d+/);
        if (numMatch) {
            const targetVal = parseInt(numMatch[0], 10);
            let current = 0;
            const duration = 1200;
            const stepTime = Math.abs(Math.floor(duration / targetVal));
            const timer = setInterval(() => {
                current += 1;
                stat.innerHTML = `${current}<span>+</span>`;
                if (current >= targetVal) {
                    clearInterval(timer);
                }
            }, Math.max(stepTime, 60));
        }
    });
}

window.addEventListener('DOMContentLoaded', () => {
    setTimeout(animateHeroStats, 300);
});

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

// Smooth active link highlight – throttled, cached offsets
const sections = document.querySelectorAll('section');
let sectionCache = [];

function cacheSections() {
    sectionCache = Array.from(sections).map(s => ({
        id: s.getAttribute('id'),
        top: s.offsetTop,
        bottom: s.offsetTop + s.offsetHeight
    }));
}
cacheSections();
window.addEventListener('resize', cacheSections);

let scrollTicking = false;
window.addEventListener('scroll', () => {
    if (scrollTicking) return;
    scrollTicking = true;
    requestAnimationFrame(() => {
        const scrollPosition = pageYOffset + 100;
        let current = '';
        for (const s of sectionCache) {
            if (scrollPosition >= s.top && scrollPosition < s.bottom) { current = s.id; break; }
        }
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) current = 'contact';
        navLinksItems.forEach(link => {
            const isActive = link.getAttribute('href') === '#' + current;
            if (isActive) link.classList.add('active');
            else link.classList.remove('active');
        });
        scrollTicking = false;
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

// Chatbot functionality
const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbotWindow = document.getElementById('chatbot-window');
const chatbotClose = document.getElementById('chatbot-close');
const chatbotInput = document.getElementById('chatbot-input');
const chatbotSend = document.getElementById('chatbot-send');
const chatbotMessages = document.getElementById('chatbot-messages');

// Portfolio knowledge base
const portfolioData = {
    name: "Adithya M",
    role: ["AI Engineer", "Full Stack Developer", "Web Developer", "UI/UX Designer"],
    education: "B.Tech in Artificial Intelligence & Data Science",
    skills: ["Python", "Java", "React JS", "Database", "AI Tools & Technologies", "Web Development (HTML/CSS/JS)", "Prompt Engineering", "UI/UX Designer", "Leadership"],
    projects: [
        {name: "EduNexus", description: "AI-based student progress and staff attendance monitoring system"},
        {name: "Smart AI Refrigerator Toolkit", description: "AI-powered toolkit for smart food and inventory management"},
        {name: "Auditorium Booking Application", description: "Web application for easy auditorium booking and scheduling"},
        {name: "Certificate Portal", description: "Platform to distribute e-certificates to students for completed events"},
        {name: "Mood AI Music Generator", description: "AI tool that recommends music based on user mood"},
        {name: "E-Commerce Website", description: "Online shopping platform with cart and checkout features"}
    ],
    internships: [
        {role: "Data Analytics Intern", company: "ALBN Securities Private Limited", duration: "Dec 2025", description: "Excel and Power BI for data preparation, visualization, and business insights"},
        {role: "Artificial Intelligence Intern", company: "Litz Tech", duration: "Jun 2025 - Jul 2025", description: "AI concepts, AI Tools, real-world applications, and problem-solving"},
        {role: "Full Stack Developer Trainee", company: "CSC Computer Software College", duration: "Aug 2023 - Aug 2024", description: "Honours Diploma with experience in frontend, backend, databases, and Python projects"}
    ]
};

chatbotToggle.addEventListener('click', () => {
    chatbotWindow.classList.toggle('active');
});

chatbotClose.addEventListener('click', () => {
    chatbotWindow.classList.remove('active');
});

function addMessage(message, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = isUser ? 'user-message' : 'bot-message';
    messageDiv.textContent = message;
    chatbotMessages.appendChild(messageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function getBotResponse(userMessage) {
    const msg = userMessage.toLowerCase().trim();
    
    // Check if question is about portfolio topics first
    const portfolioKeywords = ['adithya', 'name', 'project', 'skill', 'experience', 'internship', 'work', 'education', 'college', 'study', 'role', 'developer', 'engineer', 'ai', 'technology', 'tool', 'certificate', 'edunexus', 'refrigerator', 'auditorium', 'mood', 'ecommerce', 'albn', 'litz', 'csc', 'python', 'java', 'react', 'database', 'about', 'tell', 'who', 'what', 'portfolio', 'background', 'qualification', 'his', 'him', 'he', 'where', 'when', 'how'];
    
    const hasPortfolioKeyword = portfolioKeywords.some(keyword => msg.includes(keyword));
    
    if (!hasPortfolioKeyword) {
        return "I can only answer questions about Adithya's portfolio. Please ask about his projects, skills, work experience, or education.";
    }
    
    // SPECIFIC PROJECT QUERIES - Must be first
    if (msg.includes('edunexus')) {
        return "EduNexus is an AI-based student progress and staff attendance monitoring system.";
    }
    if (msg.includes('refrigerator') || msg.includes('fridge')) {
        return "Smart AI Refrigerator Toolkit is an AI-powered toolkit for smart food and inventory management.";
    }
    if (msg.includes('auditorium') || msg.includes('arangam')) {
        return "Auditorium Booking Application is a web application for easy auditorium booking and scheduling.";
    }
    if (msg.includes('certificate') && msg.includes('portal')) {
        return "Certificate Portal is a platform to distribute e-certificates to students for completed events.";
    }
    if (msg.includes('mood') && (msg.includes('music') || msg.includes('generator'))) {
        return "Mood AI Music Generator is an AI tool that recommends music based on user mood.";
    }
    if ((msg.includes('ecommerce') || msg.includes('e-commerce')) && !msg.includes('project')) {
        return "E-Commerce Website is an online shopping platform with cart and checkout features.";
    }
    
    // SPECIFIC INTERNSHIP QUERIES
    if (msg.includes('albn') && !msg.includes('all')) {
        return "Data Analytics Intern at ALBN Securities Private Limited (Dec 2025) - Worked with Excel and Power BI for data preparation, visualization, and business insights.";
    }
    if (msg.includes('litz') && !msg.includes('all')) {
        return "Artificial Intelligence Intern at Litz Tech (Jun 2025 - Jul 2025) - Worked with AI concepts, AI Tools, and real-world applications.";
    }
    if (msg.includes('csc') && !msg.includes('all')) {
        return "Full Stack Developer Trainee at CSC Computer Software College (Aug 2023 - Aug 2024) - Honours Diploma with experience in frontend, backend, databases, and Python.";
    }
    
    // ABOUT ADITHYA - General overview
    if ((msg.includes('about') || msg.includes('tell me about') || msg.includes('who is')) && msg.includes('adithya')) {
        return "Adithya M is an AI Engineer and Full Stack Developer pursuing B.Tech in Artificial Intelligence & Data Science. He has experience in AI/ML solutions and web development with projects like EduNexus and Smart AI Refrigerator Toolkit.";
    }
    
    // NAME ONLY
    if ((msg.includes('what') || msg.includes('his')) && msg.includes('name') && !msg.includes('project')) {
        return "His name is Adithya M.";
    }
    
    // SKILLS ONLY
    if (msg.includes('skill') && !msg.includes('project') && !msg.includes('experience')) {
        return `His skills are: Python, Java, React JS, Database, AI Tools & Technologies, Web Development (HTML/CSS/JS), Prompt Engineering, UI/UX Design, and Leadership.`;
    }
    
    // SPECIFIC SKILL CHECK
    if ((msg.includes('know') || msg.includes('can he')) && (msg.includes('python') || msg.includes('java') || msg.includes('react'))) {
        const skill = msg.includes('python') ? 'Python' : msg.includes('java') ? 'Java' : 'React JS';
        return `Yes, Adithya is proficient in ${skill}.`;
    }
    
    // ALL PROJECTS LIST
    if (msg.includes('project') && (msg.includes('all') || msg.includes('list') || msg.includes('what') || msg.includes('tell'))) {
        return "His projects are: EduNexus, Smart AI Refrigerator Toolkit, Auditorium Booking Application, Certificate Portal, Mood AI Music Generator, and E-Commerce Website.";
    }
    
    // PROJECT COUNT
    if (msg.includes('how many') && msg.includes('project')) {
        return "He has completed 6 projects.";
    }
    
    // ALL EXPERIENCE/INTERNSHIPS
    if ((msg.includes('experience') || msg.includes('internship') || msg.includes('work')) && !msg.includes('albn') && !msg.includes('litz') && !msg.includes('csc')) {
        return "He has 3 internships: Data Analytics Intern at ALBN Securities (Dec 2025), AI Intern at Litz Tech (Jun-Jul 2025), and Full Stack Developer Trainee at CSC (Aug 2023 - Aug 2024).";
    }
    
    // EDUCATION ONLY
    if (msg.includes('education') || msg.includes('study') || msg.includes('degree') || msg.includes('college') || msg.includes('qualification')) {
        return "He is pursuing B.Tech in Artificial Intelligence & Data Science.";
    }
    
    // WHERE DOES HE STUDY
    if (msg.includes('where') && (msg.includes('study') || msg.includes('college'))) {
        return "He is pursuing B.Tech in Artificial Intelligence & Data Science.";
    }
    
    // ROLE/WHAT DOES HE DO
    if ((msg.includes('what') && (msg.includes('do') || msg.includes('does'))) || msg.includes('role') || msg.includes('profession')) {
        return "He is an AI Engineer and Full Stack Developer.";
    }
    
    // CONTACT
    if (msg.includes('contact') || msg.includes('email') || msg.includes('reach')) {
        return "You can contact him through the contact form on this website.";
    }
    
    // TECHNOLOGIES
    if (msg.includes('technolog') || msg.includes('tech stack')) {
        return "He works with Python, Java, React JS, Database, AI Tools, HTML/CSS/JS, and various web technologies.";
    }
    
    // Default
    return "Please ask specific questions like: 'What are his skills?', 'Tell me about his projects', 'What's his education?', or 'What is his experience?'";
}

function sendMessage() {
    const userMessage = chatbotInput.value.trim();
    if (userMessage === '') return;
    
    addMessage(userMessage, true);
    chatbotInput.value = '';
    
    setTimeout(() => {
        const botResponse = getBotResponse(userMessage);
        addMessage(botResponse);
    }, 500);
}

chatbotSend.addEventListener('click', sendMessage);

chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

/* ============================================================
   NEURAL NETWORK CANVAS ANIMATION
   Draws animated nodes + synapse lines behind the profile photo
   ============================================================ */
(function initNeuralCanvas() {
    const canvas  = document.getElementById('neural-canvas');
    if (!canvas) return;

    const ctx     = canvas.getContext('2d');
    let W, H, nodes, raf;

    const NODE_COUNT  = 22;
    const MAX_DIST    = 130;
    const SPEED       = 0.45;

    function resize() {
        const rect = canvas.getBoundingClientRect();
        W = canvas.width  = rect.width  || 420;
        H = canvas.height = rect.height || 420;
        buildNodes();
    }

    function buildNodes() {
        nodes = [];
        for (let i = 0; i < NODE_COUNT; i++) {
            nodes.push({
                x:  Math.random() * W,
                y:  Math.random() * H,
                vx: (Math.random() - 0.5) * SPEED,
                vy: (Math.random() - 0.5) * SPEED,
                r:  Math.random() * 2.5 + 1.5,
                pulse: Math.random() * Math.PI * 2
            });
        }
    }

    function getThemeColor() {
        const isDark = document.body.getAttribute('data-theme') === 'dark';
        return isDark
            ? { node: 'rgba(192,132,252,', edge: 'rgba(192,132,252,' }
            : { node: 'rgba(233,30,99,',  edge: 'rgba(233,30,99,' };
    }

    let col = getThemeColor();
    const themeObserver = new MutationObserver(() => { col = getThemeColor(); });
    themeObserver.observe(document.body, { attributes: true, attributeFilter: ['data-theme'] });

    function draw(ts) {
        ctx.clearRect(0, 0, W, H);

        // Draw edges
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx   = nodes[i].x - nodes[j].x;
                const dy   = nodes[i].y - nodes[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < MAX_DIST) {
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.strokeStyle = col.edge + ((1 - dist / MAX_DIST) * 0.5) + ')';
                    ctx.lineWidth   = 0.8;
                    ctx.stroke();
                }
            }
        }

        // Draw nodes
        nodes.forEach(n => {
            n.pulse += 0.04;
            const glowAlpha = 0.35 + 0.25 * Math.sin(n.pulse);
            ctx.beginPath();
            ctx.arc(n.x, n.y, n.r + 2, 0, Math.PI * 2);
            ctx.fillStyle = col.node + (glowAlpha * 0.4) + ')';
            ctx.fill();

            ctx.beginPath();
            ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
            ctx.fillStyle = col.node + glowAlpha + ')';
            ctx.fill();

            // Move
            n.x += n.vx;
            n.y += n.vy;

            // Bounce
            if (n.x < 0 || n.x > W) n.vx *= -1;
            if (n.y < 0 || n.y > H) n.vy *= -1;
        });

        raf = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener('resize', resize);
    raf = requestAnimationFrame(draw);
})();

/* ============================================================
   CINEMATIC INTRO 3D NEURAL CORE & TIMELINE (5–6s Opening)
   ============================================================ */
(function initCinematicIntro() {
    const introContainer = document.getElementById('cinematic-intro');
    const canvas = document.getElementById('intro-canvas');
    const skipBtn = document.getElementById('skip-intro-btn');
    if (!introContainer || !canvas) return;

    const ctx = canvas.getContext('2d');
    let W, H, cx, cy;
    let animFrameId = null;
    let isRunning = true;
    let startTime = null;

    // Elements
    const hudWrapper = document.querySelector('.intro-hud-wrapper');
    const coreGlow = document.querySelector('.intro-core-glow');
    const nameFlyin = document.getElementById('intro-name-flyin');
    const portfolioWord = document.getElementById('intro-portfolio-word');
    const subtitleWrapper = document.querySelector('.intro-subtitle-wrapper');

    function resize() {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        W = window.innerWidth;
        H = window.innerHeight;
        canvas.width = W * dpr;
        canvas.height = H * dpr;
        ctx.scale(dpr, dpr);
        cx = W / 2;
        cy = H / 2;
    }
    resize();
    window.addEventListener('resize', resize);

    // 3D Neural Point Cloud (Optimized for 60 FPS performance)
    const NODE_COUNT = 65;
    const SPHERE_RADIUS = Math.min(W, H) * 0.27;
    const nodes3D = [];

    for (let i = 0; i < NODE_COUNT; i++) {
        const phi = Math.acos(1 - 2 * (i + 0.5) / NODE_COUNT);
        const theta = Math.PI * (1 + Math.sqrt(5)) * i;
        const radius = SPHERE_RADIUS * (0.85 + Math.random() * 0.3);

        nodes3D.push({
            x: radius * Math.sin(phi) * Math.cos(theta),
            y: radius * Math.sin(phi) * Math.sin(theta),
            z: radius * Math.cos(phi),
            origRadius: radius,
            phi: phi,
            theta: theta,
            size: 1.6 + Math.random() * 2.0,
            color: Math.random() > 0.35 ? '#e91e63' : '#c084fc'
        });
    }

    // Synaptic Data Pulses traveling between connected nodes
    const pulses = [];
    for (let i = 0; i < 10; i++) {
        pulses.push({
            from: Math.floor(Math.random() * NODE_COUNT),
            to: Math.floor(Math.random() * NODE_COUNT),
            progress: Math.random(),
            speed: 0.007 + Math.random() * 0.01,
            color: Math.random() > 0.4 ? '#ff4081' : '#e0aaff'
        });
    }

    // ====================================================
    // VISUAL ML & GEN AI GRAPHICAL ELEMENTS
    // ====================================================
    
    // 1. Gen AI Spark / Latent Token Particles
    const genAISparks = [];
    for (let i = 0; i < 22; i++) {
        genAISparks.push({
            x: (Math.random() - 0.5) * W * 0.9,
            y: (Math.random() - 0.5) * H * 0.9,
            size: 2.5 + Math.random() * 4.0,
            speed: 0.18 + Math.random() * 0.4,
            color: Math.random() > 0.45 ? '#e91e63' : '#c084fc',
            pulse: Math.random() * Math.PI * 2
        });
    }

    // 2. Mini 3D Tensor Wireframe Cubes
    const tensorCubes = [
        { x: -W * 0.36, y: -H * 0.22, size: 26, rotX: 0.3, rotY: 0.5, speedX: 0.01, speedY: 0.012, color: '#e91e63' },
        { x: W * 0.36, y: H * 0.24, size: 30, rotX: 0.5, rotY: 0.2, speedX: -0.008, speedY: 0.01, color: '#c084fc' },
        { x: -W * 0.34, y: H * 0.26, size: 22, rotX: 0.2, rotY: 0.7, speedX: 0.011, speedY: -0.009, color: '#ff4081' }
    ];

    // Helper: Fast Draw 4-point Gen AI diamond spark without laggy shadowBlur
    function drawGenAISpark(x, y, size, color, alpha) {
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(x, y - size);
        ctx.quadraticCurveTo(x, y, x + size, y);
        ctx.quadraticCurveTo(x, y, x, y + size);
        ctx.quadraticCurveTo(x, y, x - size, y);
        ctx.quadraticCurveTo(x, y, x, y - size);
        ctx.fill();
        ctx.restore();
    }

    // Helper: Draw 3D Tensor wireframe cube
    function drawTensorCube(cube, centerX, centerY, scaleFactor) {
        cube.rotX += cube.speedX;
        cube.rotY += cube.speedY;

        const s = cube.size * scaleFactor;
        const cosX = Math.cos(cube.rotX), sinX = Math.sin(cube.rotX);
        const cosY = Math.cos(cube.rotY), sinY = Math.sin(cube.rotY);

        const vertices = [
            [-1,-1,-1], [1,-1,-1], [1,1,-1], [-1,1,-1],
            [-1,-1,1],  [1,-1,1],  [1,1,1],  [-1,1,1]
        ];

        const proj = vertices.map(v => {
            let x0 = v[0] * s * 0.5;
            let y0 = v[1] * s * 0.5;
            let z0 = v[2] * s * 0.5;

            // Rotate Y
            let x1 = x0 * cosY - z0 * sinY;
            let z1 = z0 * cosY + x0 * sinY;
            // Rotate X
            let y2 = y0 * cosX - z1 * sinX;
            let z2 = z1 * cosX + y0 * sinX;

            return [centerX + cube.x + x1, centerY + cube.y + y2];
        });

        const edges = [
            [0,1],[1,2],[2,3],[3,0],
            [4,5],[5,6],[6,7],[7,4],
            [0,4],[1,5],[2,6],[3,7]
        ];

        ctx.save();
        ctx.strokeStyle = cube.color;
        ctx.lineWidth = 1;
        ctx.globalAlpha = 0.45 * scaleFactor;
        edges.forEach(e => {
            ctx.beginPath();
            ctx.moveTo(proj[e[0]][0], proj[e[0]][1]);
            ctx.lineTo(proj[e[1]][0], proj[e[1]][1]);
            ctx.stroke();
        });

        ctx.fillStyle = '#ffffff';
        proj.forEach(p => {
            ctx.beginPath();
            ctx.arc(p[0], p[1], 1.2, 0, Math.PI * 2);
            ctx.fill();
        });
        ctx.restore();
    }

    // Helper: Draw Mini Neural Network Layer Graph
    function drawNeuralNetworkGraph(gx, gy, scaleFactor, alpha) {
        ctx.save();
        ctx.globalAlpha = alpha * scaleFactor;

        const layers = [
            [{ y: -22 }, { y: 22 }],
            [{ y: -30 }, { y: 0 }, { y: 30 }],
            [{ y: -22 }, { y: 22 }]
        ];
        const layerSpacing = 34 * scaleFactor;

        for (let l = 0; l < layers.length - 1; l++) {
            const l1 = layers[l];
            const l2 = layers[l + 1];
            const x1 = gx + (l - 1) * layerSpacing;
            const x2 = gx + l * layerSpacing;

            l1.forEach((n1, i) => {
                l2.forEach((n2, j) => {
                    ctx.beginPath();
                    ctx.moveTo(x1, gy + n1.y * scaleFactor);
                    ctx.lineTo(x2, gy + n2.y * scaleFactor);
                    ctx.strokeStyle = (i + j) % 2 === 0 ? 'rgba(233, 30, 99, 0.35)' : 'rgba(192, 132, 252, 0.35)';
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                });
            });
        }

        layers.forEach((layer, l) => {
            const x = gx + (l - 1) * layerSpacing;
            layer.forEach(n => {
                ctx.beginPath();
                ctx.arc(x, gy + n.y * scaleFactor, 2.8 * scaleFactor, 0, Math.PI * 2);
                ctx.fillStyle = l === 1 ? '#c084fc' : '#e91e63';
                ctx.fill();
            });
        });

        ctx.restore();
    }

    // Concentric shockwaves for singularity phase
    const shockwaves = [
        { r: 0, maxR: 260, speed: 3.2 },
        { r: 0, maxR: 360, speed: 2.6, delay: 350 },
        { r: 0, maxR: 440, speed: 2.0, delay: 700 }
    ];

    let rotX = 0;
    let rotY = 0;
    const FOV = 420;

    function render(timestamp) {
        if (!isRunning) return;
        if (!startTime) startTime = timestamp;
        const elapsed = (timestamp - startTime) / 1000; // seconds

        ctx.clearRect(0, 0, W, H);

        // ====================================================
        // PHASE 1: SINGULARITY & IGNITION (0.0s – 1.4s)
        // ====================================================
        if (elapsed < 1.6) {
            const singProgress = Math.min(elapsed / 1.3, 1);
            const pulseScale = 1 + 0.3 * Math.sin(elapsed * 16);
            const coreRadius = (4 + singProgress * 5) * pulseScale;

            // Shockwaves
            shockwaves.forEach(sw => {
                const swElapsed = (timestamp - startTime);
                if (sw.delay && swElapsed < sw.delay) return;
                sw.r += sw.speed;
                const waveAlpha = Math.max(0, (1 - sw.r / sw.maxR) * 0.65);
                if (waveAlpha > 0) {
                    ctx.beginPath();
                    ctx.arc(cx, cy, sw.r, 0, Math.PI * 2);
                    ctx.strokeStyle = `rgba(233, 30, 99, ${waveAlpha})`;
                    ctx.lineWidth = 1.5;
                    ctx.stroke();
                }
            });

            // Central Singularity Glow
            const singGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreRadius * 7);
            singGlow.addColorStop(0, 'rgba(255, 255, 255, 1)');
            singGlow.addColorStop(0.3, 'rgba(233, 30, 99, 0.85)');
            singGlow.addColorStop(0.7, 'rgba(192, 132, 252, 0.3)');
            singGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
            ctx.fillStyle = singGlow;
            ctx.beginPath();
            ctx.arc(cx, cy, coreRadius * 7, 0, Math.PI * 2);
            ctx.fill();

            // Core center dot
            ctx.beginPath();
            ctx.arc(cx, cy, coreRadius, 0, Math.PI * 2);
            ctx.fillStyle = '#ffffff';
            ctx.fill();
        }

        // ====================================================
        // PHASE 2 & 3: 3D NEURAL CORE & ML/GEN AI ELEMENTS (1.2s – 6.5s)
        // ====================================================
        if (elapsed >= 1.2) {
            const sphereScale = Math.min((elapsed - 1.2) / 1.0, 1);
            const warpEffect = elapsed > 6.0 ? (elapsed - 6.0) * 3.5 : 0;

            rotY += 0.007;
            rotX += 0.003;

            const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
            const cosX = Math.cos(rotX), sinX = Math.sin(rotX);

            const projectedNodes = [];

            // Project 3D nodes to 2D
            for (let i = 0; i < nodes3D.length; i++) {
                const n = nodes3D[i];
                const curRadius = (n.origRadius + (warpEffect * 260)) * sphereScale;

                let x0 = curRadius * Math.sin(n.phi) * Math.cos(n.theta);
                let y0 = curRadius * Math.sin(n.phi) * Math.sin(n.theta);
                let z0 = curRadius * Math.cos(n.phi);

                // Rotate Y
                let x1 = x0 * cosY - z0 * sinY;
                let z1 = z0 * cosY + x0 * sinY;
                // Rotate X
                let y2 = y0 * cosX - z1 * sinX;
                let z2 = z1 * cosX + y0 * sinX + 500;

                const scale = FOV / z2;
                const px = cx + x1 * scale;
                const py = cy + y2 * scale;
                const alpha = Math.max(0.12, Math.min(1, (z2 - 200) / 400)) * (1 - Math.min(warpEffect * 0.4, 1));

                projectedNodes.push({ px, py, scale, alpha, color: n.color, size: n.size });
            }

            // Draw Synaptic Connection Lines (Fast loop)
            const maxLineDist = 88 * sphereScale;
            for (let i = 0; i < projectedNodes.length; i++) {
                const p1 = projectedNodes[i];
                for (let j = i + 1; j < projectedNodes.length; j++) {
                    const p2 = projectedNodes[j];
                    const dx = p1.px - p2.px;
                    const dy = p1.py - p2.py;
                    const dist2D = Math.sqrt(dx * dx + dy * dy);

                    if (dist2D < maxLineDist) {
                        const lineAlpha = (1 - dist2D / maxLineDist) * 0.32 * Math.min(p1.alpha, p2.alpha);
                        ctx.beginPath();
                        ctx.moveTo(p1.px, p1.py);
                        ctx.lineTo(p2.px, p2.py);
                        ctx.strokeStyle = `rgba(233, 30, 99, ${lineAlpha})`;
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                    }
                }
            }

            // Draw Synaptic Data Pulses
            pulses.forEach(pulse => {
                pulse.progress += pulse.speed;
                if (pulse.progress > 1) {
                    pulse.progress = 0;
                    pulse.from = Math.floor(Math.random() * NODE_COUNT);
                    pulse.to = Math.floor(Math.random() * NODE_COUNT);
                }
                const n1 = projectedNodes[pulse.from];
                const n2 = projectedNodes[pulse.to];
                if (n1 && n2) {
                    const pulseX = n1.px + (n2.px - n1.px) * pulse.progress;
                    const pulseY = n1.py + (n2.py - n1.py) * pulse.progress;
                    ctx.beginPath();
                    ctx.arc(pulseX, pulseY, 2.2, 0, Math.PI * 2);
                    ctx.fillStyle = pulse.color;
                    ctx.fill();
                }
            });

            // Draw Neural Core Nodes
            projectedNodes.forEach(pn => {
                ctx.beginPath();
                ctx.arc(pn.px, pn.py, Math.max(1.2, pn.size * pn.scale * 0.9), 0, Math.PI * 2);
                ctx.fillStyle = pn.color;
                ctx.globalAlpha = pn.alpha;
                ctx.fill();
                ctx.globalAlpha = 1.0;
            });

            // Draw Ambient ML & Gen AI Graphical Elements
            const elemAlpha = sphereScale * (1 - Math.min(warpEffect * 0.6, 1));

            // 1. Draw 3D Tensor Wireframe Cubes
            tensorCubes.forEach(cube => {
                drawTensorCube(cube, cx, cy, elemAlpha);
            });

            // 2. Draw Mini Neural Layer Graph Diagrams
            drawNeuralNetworkGraph(cx - W * 0.38, cy - H * 0.02, 0.85, elemAlpha * 0.55);
            drawNeuralNetworkGraph(cx + W * 0.38, cy - H * 0.02, 0.85, elemAlpha * 0.55);

            // 3. Draw Gen AI Shimmering Diamond Sparks
            genAISparks.forEach(spark => {
                spark.y -= spark.speed;
                spark.pulse += 0.035;
                if (spark.y < -H * 0.5) spark.y = H * 0.5;

                const curAlpha = (0.2 + 0.25 * Math.sin(spark.pulse)) * elemAlpha;
                drawGenAISpark(cx + spark.x, cy + spark.y, spark.size, spark.color, curAlpha);
            });
        }

        // ====================================================
        // TIMELINE TRIGGER EVENTS (Cinematic Slow Motion)
        // ====================================================
        // 2.2s: Activate HUD Holographic Rings & Core Glow
        if (elapsed >= 2.2 && hudWrapper && !hudWrapper.classList.contains('hud-active')) {
            hudWrapper.classList.add('hud-active');
            if (coreGlow) coreGlow.classList.add('glow-active');
        }

        // 2.5s: "ADITHYA'S" Letters Fly In (Slow Motion Assembly)
        if (elapsed >= 2.5 && nameFlyin && !nameFlyin.classList.contains('name-assembled')) {
            nameFlyin.classList.add('name-assembled');
        }

        // 4.3s: Sleek Impact Effect when Letters Lock In
        if (elapsed >= 4.3 && nameFlyin && !nameFlyin.classList.contains('name-impact')) {
            nameFlyin.classList.add('name-impact');
        }

        // 4.6s: "PORTFOLIO" Slowly Fades In Beneath with Glowing Aura
        if (elapsed >= 4.6 && portfolioWord && !portfolioWord.classList.contains('portfolio-active')) {
            portfolioWord.classList.add('portfolio-active');
        }

        // 5.3s: Reveal Subtitle Badge
        if (elapsed >= 5.3 && subtitleWrapper && !subtitleWrapper.classList.contains('subtitle-active')) {
            subtitleWrapper.classList.add('subtitle-active');
        }

        // 6.7s: Begin Smooth Cinematic Warp & Fade Out Transition
        if (elapsed >= 6.7 && !introContainer.classList.contains('intro-fadeout')) {
            introContainer.classList.add('intro-fadeout');
        }

        // 7.7s: Finish Sequence & Terminate Canvas Loop
        if (elapsed >= 7.7) {
            finishIntro();
            return;
        }

        animFrameId = requestAnimationFrame(render);
    }

    function finishIntro() {
        if (!isRunning) return;
        isRunning = false;
        if (animFrameId) cancelAnimationFrame(animFrameId);
        window.removeEventListener('resize', resize);

        introContainer.classList.add('intro-fadeout');
        setTimeout(() => {
            introContainer.classList.add('intro-hidden');
            // Trigger hero entry animations cleanly
            const homeSection = document.getElementById('home');
            if (homeSection) homeSection.classList.add('show-3d');
        }, 800);
    }

    // Skip functionality
    if (skipBtn) {
        skipBtn.addEventListener('click', finishIntro);
    }
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isRunning) {
            finishIntro();
        }
    });

    // Start Intro Render Loop
    animFrameId = requestAnimationFrame(render);
})();
