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