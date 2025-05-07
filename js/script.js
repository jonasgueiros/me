document.addEventListener('DOMContentLoaded', function() {
    const cube = document.getElementById('cube');
    const navDots = document.querySelectorAll('.nav-dot');
    const totalSections = 4;
    const sectionHeight = document.body.scrollHeight / totalSections;
    let currentSection = 0;
    
    // Check if user is on mobile device
    const isMobile = detectMobileDevice();
    if (isMobile) {
        document.body.classList.add('mobile-view');
        applyMobileAdjustments();
    }
    
    // Update cube rotation based on scroll position
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const documentHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercentage = scrollPosition / documentHeight;
        
        // Calculate rotation angle (90 degrees per section)
        const rotationAngle = scrollPercentage * 360;
        
        // Apply rotation while keeping faces centered
        cube.style.transform = `rotateX(${rotationAngle}deg)`;
        
        // Calculate current section more precisely
        currentSection = Math.min(
            Math.floor(scrollPercentage * totalSections),
            totalSections - 1
        );
        
        // Update nav indicators
        updateNavIndicators();
    });
    
    // Click handler for nav dots
    navDots.forEach(dot => {
        dot.addEventListener('click', function() {
            const targetIndex = parseInt(this.getAttribute('data-index'));
            const targetScroll = (document.body.scrollHeight - window.innerHeight) * 
                                (targetIndex / (totalSections - 1));
            
            window.scrollTo({
                top: targetScroll,
                behavior: 'smooth'
            });
        });
    });
    
    function updateNavIndicators() {
        navDots.forEach((dot, index) => {
            if (index === currentSection) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // Add swipe support for mobile
    if (isMobile) {
        addSwipeSupport();
    }
    
    // Initial update
    updateNavIndicators();
});

// Function to detect mobile devices
function detectMobileDevice() {
    return (window.innerWidth <= 768) || 
           (navigator.maxTouchPoints > 0 && 
            navigator.userAgent.match(/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i));
}

// Apply mobile adjustments
function applyMobileAdjustments() {
    const mobileStyles = `
        /* Global font size adjustments for mobile - applies to all faces */
        .mobile-view {
            font-size: 65%; /* Further reduced global font size from 75% to 65% */
        }
        
        /* Global text adjustments for all faces */
        .mobile-view .face {
            padding: 8px !important; /* Reduced from 10px */
        }
        
        .mobile-view h1 {
            font-size: 1.4rem !important; /* Reduced from 1.6rem */
            margin-bottom: 6px !important; /* Reduced from 8px */
        }
        
        .mobile-view h2 {
            font-size: 1.2rem !important; /* Reduced from 1.3rem */
            margin-bottom: 6px !important; /* Reduced from 8px */
        }
        
        .mobile-view h3 {
            font-size: 0.95rem !important; /* Reduced from 1.1rem */
            margin-bottom: 5px !important; /* Reduced from 6px */
        }
        
        .mobile-view p, .mobile-view li {
            font-size: 0.7rem !important; /* Reduced from 0.8rem */
            line-height: 1.2 !important; /* Reduced from 1.3 */
            margin-bottom: 6px !important; /* Reduced from 8px */
        }
        
        .mobile-view a, .mobile-view button {
            font-size: 0.75rem !important; /* Reduced from 0.85rem */
        }
        
        /* Cube and navigation adjustments */
        .mobile-view .cube-container {
            perspective: 800px;
        }
        
        .mobile-view .cube {
            transform-style: preserve-3d;
        }
        
        .mobile-view .nav-indicator {
            bottom: 12px; /* Reduced from 15px */
        }
        
        .mobile-view .nav-dot {
            width: 14px; /* Reduced from 16px */
            height: 14px; /* Reduced from 16px */
            margin: 0 6px; /* Reduced from 8px */
        }
        
        /* Face1 mobile styles - Smaller avatar */
        .mobile-view .profile-content {
            flex-direction: column !important;
            padding: 10px !important; /* Reduced from 12px */
            max-width: 98% !important; /* Increased from 95% to use more screen space */
        }
        
        .mobile-view .profile-left {
            margin-bottom: 12px; /* Reduced from 15px */
            width: 80px !important; /* Significantly reduced size */
            height: 80px !important; /* Significantly reduced size */
            max-width: 80px !important; /* Enforce max width */
            margin: 0 auto 10px auto !important; /* Center horizontally with bottom margin */
        }
        
        .mobile-view .profile-left img {
            width: 100% !important;
            height: 100% !important;
            object-fit: cover !important;
            border-radius: 50% !important; /* Make it round */
            border: 2px solid #00ff77 !important; /* Add a border with your theme color */
        }
        
        .mobile-view .profile-right {
            text-align: center;
        }
        
        .mobile-view .name {
            font-size: 1.4rem !important; /* Reduced from 1.6rem */
            margin-bottom: 6px !important; /* Reduced from 8px */
        }
        
        .mobile-view .job-title {
            font-size: 0.85rem !important; /* Reduced from 0.95rem */
        }
        
        .mobile-view .tagline {
            font-size: 0.65rem !important; /* Reduced from 0.75rem */
            margin-top: 12px !important; /* Reduced from 15px */
        }
        
        /* Face2 mobile styles - Image on top layout */
        .mobile-view .project-content {
            flex-direction: column !important;
            padding: 6px !important;
        }
        
        .mobile-view .project-left {
            width: 100% !important;
            max-height: 150px !important; /* Slightly increased height for better image visibility */
            order: 1 !important; /* This puts the image on top */
            margin-bottom: 10px !important; /* Space between image and text */
        }
        
        .mobile-view .project-right {
            width: 100% !important;
            padding: 6px !important;
            order: 2 !important; /* This puts the text below */
        }
        
        .mobile-view .project-right h2 {
            font-size: 1.1rem !important;
            margin-bottom: 6px !important;
            text-align: center !important; /* Center the title for better mobile layout */
        }
        
        .mobile-view .project-right p {
            font-size: 0.65rem !important;
            line-height: 1.15 !important;
            margin-bottom: 6px !important;
        }
        
        .mobile-view .project-right .tech-container h3 {
            font-size: 0.75rem !important;
        }
        
        .mobile-view .project-right .tech-container p {
            font-size: 0.6rem !important;
        }
        
        .mobile-view .view-button {
            padding: 5px 10px !important;
            font-size: 0.7rem !important;
            margin: 0 auto !important; /* Center the button */
            display: block !important;
        }
        
        /* Face3 mobile styles - Technologies/Skills */
        .mobile-view .skills-section h2 {
            font-size: 1rem !important; /* Reduced from 1.2rem */
        }
        
        .mobile-view .skills-section .skill-category {
            padding: 4px !important; /* Reduced from 8px */
            margin-bottom: 4px !important; /* Reduced from 8px */
        }
        
        .mobile-view .skill-category h3 {
            font-size: 0.6rem !important; /* Reduced from 0.9rem */
            margin-bottom: 2px !important; /* Reduced from 5px */
        }
        
        .mobile-view .skill-list li {
            font-size: 0.55rem !important; /* Reduced from 0.75rem */
            padding: 1px 3px !important; /* Reduced from 3px 6px */
            margin: 1px !important; /* Reduced from 2px */
        }
        
        /* Face4 mobile styles - Contact/About */
        .mobile-view .contact-section h2 {
            font-size: 1.1rem !important; /* Reduced from 1.2rem */
        }
        
        .mobile-view .contact-form label {
            font-size: 0.65rem !important; /* Reduced from 0.75rem */
        }
        
        .mobile-view .contact-form input,
        .mobile-view .contact-form textarea {
            padding: 5px 6px !important; /* Reduced from 6px 8px */
            font-size: 0.65rem !important; /* Reduced from 0.75rem */
            margin-bottom: 6px !important; /* Reduced from 8px */
        }
        
        .mobile-view .contact-form button {
            padding: 5px 10px !important; /* Reduced from 6px 12px */
            font-size: 0.7rem !important; /* Reduced from 0.8rem */
        }
        
        /* Better touch targets for mobile - keeping minimum size for usability */
        .mobile-view a, 
        .mobile-view button,
        .mobile-view input[type="submit"] {
            min-height: 30px; /* Reduced from 32px but still usable */
            min-width: 30px; /* Reduced from 32px but still usable */
            display: inline-flex;
            align-items: center;
            justify-content: center;
        }
    `;
    
    // Add styles to document
    const styleEl = document.createElement('style');
    styleEl.textContent = mobileStyles;
    document.head.appendChild(styleEl);
}

// Add swipe gesture support for mobile devices
function addSwipeSupport() {
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    document.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe left - go to next face
            goToNextFace();
        }
        
        if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right - go to previous face
            goToPreviousFace();
        }
    }
    
    function getCurrentFaceIndex() {
        // Get current active dot
        const activeDot = document.querySelector('.nav-dot.active');
        return activeDot ? parseInt(activeDot.getAttribute('data-index')) : 0;
    }
    
    function goToNextFace() {
        const currentIndex = getCurrentFaceIndex();
        const nextIndex = (currentIndex + 1) % 4;
        const nextDot = document.querySelector(`.nav-dot[data-index="${nextIndex}"]`);
        if (nextDot) nextDot.click();
    }
    
    function goToPreviousFace() {
        const currentIndex = getCurrentFaceIndex();
        const prevIndex = (currentIndex + 3) % 4; // +3 is same as -1 in modulo 4
        const prevDot = document.querySelector(`.nav-dot[data-index="${prevIndex}"]`);
        if (prevDot) prevDot.click();
    }
}

// Handle project initialization for mobile specifically
window.initializeProjects = function() {
    const projectImage = document.getElementById('project-image');
    const projectTitle = document.getElementById('project-title');
    const projectDescription = document.getElementById('project-description');
    const projectTech = document.getElementById('project-tech');
    const projectLink = document.getElementById('project-link');
    
    if (!projectImage || !projectTitle || !projectDescription || !projectTech || !projectLink) {
        console.error("Missing project elements in the DOM");
        return;
    }
    
    const isMobile = document.body.classList.contains('mobile-view');
    
    // Shortened descriptions for mobile
    const mobileDescriptions = {
        "Expense Manager": "Expense tracking app with SQLite database and data visualization.",
        "Medical Access Portal": "Healthcare platform with dual role-based authentication system.",
        "Task Management API": "RESTful API with JWT auth and task management features."
    };
    
    const projects = [
        {
            title: "Expense Manager",
            description: "A comprehensive expense tracking solution featuring detailed entry management (description, amount, price, paid status, date, and category), SQLite-based database with custom table creation, and robust data visualization with statistical analysis and graphical expense summaries.",
            tech: "Python, SQLite, Matplotlib, Pandas",
            image: "img/project1.png",
            link: "https://github.com/jonasgueiros/expenses"
        },
        {
            title: "Medical Access Portal",
            description: "Secure healthcare platform with dual authentication system for patients and doctors, separate access points with role-specific redirects, and robust security features including PHP's password_verify function for credential validation.",
            tech: "PHP, MySQL, JavaScript, HTML/CSS",
            image: "img/project2-1.jpg",
            link: "https://github.com/jonasgueiros/clinica"
        },
        {
            title: "Task Management API",
            description: "RESTful API for task management with user authentication, task assignment, filtering, and sorting capabilities. Implements JWT authentication and comprehensive documentation.",
            tech: "Node.js, Express.js, MongoDB",
            image: "img/project3-1.jpg",
            link: "https://github.com/jonasgueiros/task-api"
        }
    ];

    let currentProjectIndex = 0;

    function updateProjectDisplay() {
        const project = projects[currentProjectIndex];
        projectTitle.textContent = project.title;
        
        // Use shorter description on mobile
        if (isMobile && mobileDescriptions[project.title]) {
            projectDescription.textContent = mobileDescriptions[project.title];
        } else {
            projectDescription.textContent = project.description;
        }
        
        projectTech.textContent = project.tech;
        projectImage.src = project.image;
        projectLink.href = project.link;
    }

    // On mobile, change projects more frequently
    const interval = isMobile ? 20000 : 30000;
    
    setInterval(() => {
        currentProjectIndex = (currentProjectIndex + 1) % projects.length;
        updateProjectDisplay();
    }, interval);

    updateProjectDisplay();
};
