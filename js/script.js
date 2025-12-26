document.addEventListener('DOMContentLoaded', function() {
    const cube = document.getElementById('cube');
    const navDots = document.querySelectorAll('.nav-dot');
    const totalSections = 3;
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
        
        // Calculate rotation angle (120 degrees per section for 3 faces)
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
            font-size: 65%;
        }
        
        /* Global text adjustments for all faces */
        .mobile-view .face {
            padding: 8px !important;
        }
        
        /* Cube specific adjustments for mobile */
        .mobile-view .viewport {
            height: 100vh;
            width: 100vw;
            overflow: hidden;
            position: fixed;
            top: 0;
            left: 0;
        }
        
        .mobile-view .cube-container {
            perspective: 1000px;
            height: 100vh;
            width: 100vw;
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            padding: 15px; /* Add padding around the container */
        }
        
        .mobile-view .cube {
            transform-style: preserve-3d;
            position: absolute;
            transform: rotateX(0deg);
            transform-origin: center center;
        }
        
        .mobile-view .face {
            position: absolute;
            height: 100%;
            width: 100%;
            backface-visibility: hidden;
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
        }
        
        /* No hardcoded face positions here - they'll be set by updateFacePositions */
        
        /* Adjust nav indicator position for the smaller cube */
        .mobile-view .nav-indicator {
            position: fixed;
            bottom: 15px;
            z-index: 1000;
        }
        
        /* Rest of your existing mobile styles... */
    `;
    
    // Add styles to document
    const styleEl = document.createElement('style');
    styleEl.textContent = mobileStyles + originalMobileStyles;
    document.head.appendChild(styleEl);
    
    // Modify the adjustCubeForOrientation function for the smaller cube
    window.addEventListener('resize', function() {
        adjustCubeForOrientation();
    });
    
    // Initial adjustment
    adjustCubeForOrientation();
}

// Function to adjust cube for different orientations with EVEN MORE space from top
function adjustCubeForOrientation() {
    const isPortrait = window.innerHeight > window.innerWidth;
    const cube = document.getElementById('cube');
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    
    if (!cube) return;
    
    if (isPortrait) {
        // Portrait mode - use smaller dimensions
        const baseHeight = 650;
        const baseWidth = 300;
        
        if (screenHeight < baseHeight || screenWidth < baseWidth) {
            // Determine scaling factor (use the more constraining dimension)
            const heightRatio = (screenHeight - 140) / baseHeight; // Increased from 100px to 140px
            const widthRatio = (screenWidth - 60) / baseWidth;
            const scaleFactor = Math.min(heightRatio, widthRatio) * 0.95;
            
            const scaledHeight = Math.floor(baseHeight * scaleFactor);
            const scaledWidth = Math.floor(baseWidth * scaleFactor);
            
            cube.style.height = scaledHeight + 'px';
            cube.style.width = scaledWidth + 'px';
            
            // Adjust positioning with SUBSTANTIALLY MORE SPACE FROM TOP
            const leftMargin = Math.max(30, (screenWidth - scaledWidth) / 2);
            const topMargin = Math.max(90, (screenHeight - scaledHeight) / 3); // Increased from 60px to 90px minimum
            
            cube.style.left = leftMargin + 'px';
            cube.style.top = topMargin + 'px';
            
            // Update face positioning based on scaled height
            const halfHeight = scaledHeight / 2;
            updateFacePositions(halfHeight);
        } else {
            // Use smaller base dimensions with margins
            cube.style.height = baseHeight + 'px';
            cube.style.width = baseWidth + 'px';
            
            // Adjust positioning with SUBSTANTIALLY MORE SPACE FROM TOP
            const leftMargin = Math.max(30, (screenWidth - baseWidth) / 2);
            const topMargin = Math.max(90, (screenHeight - baseHeight) / 3); // Increased from 60px to 90px minimum
            
            cube.style.left = leftMargin + 'px';
            cube.style.top = topMargin + 'px';
            
            updateFacePositions(baseHeight / 2);
        }
    } else {
        // Landscape mode - invert dimensions and use smaller size
        const baseHeight = 300;
        const baseWidth = 650;
        
        if (screenWidth < baseWidth || screenHeight < baseHeight) {
            // Scale proportionally
            const heightRatio = (screenHeight - 100) / baseHeight; // Increased from 80px to 100px
            const widthRatio = (screenWidth - 60) / baseWidth;
            const scaleFactor = Math.min(heightRatio, widthRatio) * 0.95;
            
            const scaledHeight = Math.floor(baseHeight * scaleFactor);
            const scaledWidth = Math.floor(baseWidth * scaleFactor);
            
            cube.style.height = scaledHeight + 'px';
            cube.style.width = scaledWidth + 'px';
            
            // Adjust positioning with MORE SPACE FROM TOP
            const leftMargin = Math.max(30, (screenWidth - scaledWidth) / 2);
            const topMargin = Math.max(70, (screenHeight - scaledHeight) / 2.5); // Increased from 50px to 70px
            
            cube.style.left = leftMargin + 'px';
            cube.style.top = topMargin + 'px';
            
            const halfHeight = scaledHeight / 2;
            updateFacePositions(halfHeight);
        } else {
            // Exact inverted dimensions with smaller size
            cube.style.height = baseHeight + 'px';
            cube.style.width = baseWidth + 'px';
            
            // Center with margins and MORE SPACE FROM TOP
            const leftMargin = Math.max(30, (screenWidth - baseWidth) / 2);
            const topMargin = Math.max(70, (screenHeight - baseHeight) / 2.5); // Increased from 50px to 70px
            
            cube.style.left = leftMargin + 'px';
            cube.style.top = topMargin + 'px';
            
            updateFacePositions(baseHeight / 2);
        }
    }
}

// Helper function to update face positions based on cube height
function updateFacePositions(halfHeight) {
    // For 3 faces (face-1, face-2, face-4): 120 degrees apart
    
    // For face-1 (front face at 0 degrees)
    document.querySelectorAll('.face-1').forEach(face => {
        face.style.transform = `rotateX(0deg) translateZ(${halfHeight}px)`;
    });
    
    // For face-2 (top face at 120 degrees)
    document.querySelectorAll('.face-2').forEach(face => {
        face.style.transform = `rotateX(120deg) translateZ(${halfHeight}px)`;
    });
    
    // For face-4 (back face at 240 degrees - replaces face-3's 180 degree position)
    document.querySelectorAll('.face-4').forEach(face => {
        face.style.transform = `rotateX(240deg) translateZ(${halfHeight}px)`;
    });
}

// Store original mobile styles for face-specific styling
const originalMobileStyles = `
    /* Face1 mobile styles - Smaller avatar */
    .mobile-view .profile-content {
        flex-direction: column !important;
        padding: 10px !important;
        max-width: 98% !important;
    }
    
    .mobile-view .profile-left {
        margin-bottom: 12px;
        width: 80px !important;
        height: 80px !important;
        max-width: 80px !important;
        margin: 0 auto 10px auto !important;
    }
    
    .mobile-view .profile-left img {
        width: 100% !important;
        height: 100% !important;
        object-fit: cover !important;
        border-radius: 50% !important;
        border: 2px solid #00ff77 !important;
    }
    
    .mobile-view .profile-right {
        text-align: center;
    }
    
    .mobile-view .name {
        font-size: 1.4rem !important;
        margin-bottom: 6px !important;
    }
    
    .mobile-view .job-title {
        font-size: 0.85rem !important;
    }
    
    .mobile-view .tagline {
        font-size: 0.65rem !important;
        margin-top: 12px !important;
    }
    
    /* Face2 mobile styles - Image on top layout */
    .mobile-view .project-content {
        flex-direction: column !important;
        padding: 6px !important;
    }
    
    .mobile-view .project-left {
        width: 100% !important;
        max-height: 150px !important;
        order: 1 !important;
        margin-bottom: 10px !important;
    }
    
    .mobile-view .project-right {
        width: 100% !important;
        padding: 6px !important;
        order: 2 !important;
    }
    
    .mobile-view .project-right h2 {
        font-size: 1.1rem !important;
        margin-bottom: 6px !important;
        text-align: center !important;
    }
    
    .mobile-view .project-right p {
        font-size: 0.65rem !important;
        line-height: 1.15 !important;
        margin-bottom: 6px !important;
    }
    
    .mobile-view .project-right .tech-container p {
        font-size: 0.6rem !important;
    }
    
    .mobile-view .view-button {
        padding: 5px 10px !important;
        font-size: 0.7rem !important;
        margin: 0 auto !important;
        display: block !important;
    }
    
    /* Face3 mobile styles - Technologies/Skills */
    .mobile-view .skills-section h2 {
        font-size: 1rem !important;
    }
    
    .mobile-view .skills-section .skill-category {
        padding: 4px !important;
        margin-bottom: 4px !important;
    }
    
    .mobile-view .skill-list li {
        font-size: 0.55rem !important;
        padding: 1px 3px !important;
        margin: 1px !important;
    }
    
    /* Face4 mobile styles - Contact/About */
    .mobile-view .contact-section h2 {
        font-size: 1.1rem !important;
    }
    
    .mobile-view .contact-form label {
        font-size: 0.65rem !important;
    }
    
    .mobile-view .contact-form input,
    .mobile-view .contact-form textarea {
        padding: 5px 6px !important;
        font-size: 0.65rem !important;
        margin-bottom: 6px !important;
    }
    
    .mobile-view .contact-form button {
        padding: 5px 10px !important;
        font-size: 0.7rem !important;
    }
    
    /* Better touch targets for mobile */
    .mobile-view a, 
    .mobile-view button,
    .mobile-view input[type="submit"] {
        min-height: 30px;
        min-width: 30px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
    }
    
    /* Face3 mobile styles - Technologies/Skills - EVEN SMALLER TEXT */
    .mobile-view .skills-section h2 {
        font-size: 0.85rem !important; /* Reduced from 1rem */
        margin-bottom: 5px !important;
    }
    
    .mobile-view .skills-section .skill-category {
        padding: 3px !important; /* Reduced from 4px */
        margin-bottom: 3px !important; /* Reduced from 4px */
    }
    
    .mobile-view .skill-list li {
        font-size: 0.45rem !important; /* Reduced from 0.55rem */
        padding: 1px 2px !important; /* Reduced horizontal padding */
        margin: 1px !important;
        border-radius: 2px !important; /* Smaller border radius */
    }
    
    /* Add more condensed spacing for skill categories */
    .mobile-view .skills-container {
        gap: 3px !important;
    }
    
    /* Face4 mobile styles - Contact/About - EVEN SMALLER TEXT */
    .mobile-view .contact-section h2 {
        font-size: 0.9rem !important; /* Reduced from 1.1rem */
        margin-bottom: 5px !important;
    }
    
    .mobile-view .contact-form label {
        font-size: 0.55rem !important; /* Reduced from 0.65rem */
        margin-bottom: 2px !important;
    }
    
    .mobile-view .contact-form input,
    .mobile-view .contact-form textarea {
        padding: 4px 5px !important; /* Reduced from 5px 6px */
        font-size: 0.55rem !important; /* Reduced from 0.65rem */
        margin-bottom: 5px !important; /* Reduced from 6px */
        min-height: 22px !important; /* Shorter input fields */
    }
    
    .mobile-view .contact-form textarea {
        min-height: 40px !important; /* Shorter textarea */
    }
    
    .mobile-view .contact-form button {
        padding: 4px 8px !important; /* Reduced from 5px 10px */
        font-size: 0.6rem !important; /* Reduced from 0.7rem */
        min-height: 26px !important;
    }
    
    .mobile-view .contact-info p, 
    .mobile-view .contact-info a {
        font-size: 0.55rem !important; /* Reduced from normal size */
        margin-bottom: 3px !important;
    }
    
    .mobile-view .social-links a {
        padding: 4px !important;
        margin: 0 3px !important;
    }
    
    .mobile-view .social-links svg {
        width: 16px !important;
        height: 16px !important;
    }
    
    /* Better touch targets for mobile but smaller than before */
    .mobile-view a, 
    .mobile-view button,
    .mobile-view input[type="submit"] {
        min-height: 26px; /* Reduced from 30px */
        min-width: 26px; /* Reduced from 30px */
        display: inline-flex;
        align-items: center;
        justify-content: center;
    }
`;

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
        projectDescription.textContent = project.description; // Always use full description
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
