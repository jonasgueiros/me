console.log("face2.js is loaded and running.");

// Function to detect if the user is on a mobile device
function detectMobileDevice() {
    return (window.innerWidth <= 768) || 
           (navigator.maxTouchPoints > 0 && 
            navigator.userAgent.match(/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i));
}

// Function to rearrange project layout for mobile
function adjustProjectLayoutForMobile() {
    const isMobile = detectMobileDevice();
    
    if (isMobile) {
        // Get project container elements
        const projectContent = document.querySelector('.project-content');
        const projectLeft = document.querySelector('.project-left');
        const projectRight = document.querySelector('.project-right');
        
        if (projectContent && projectLeft && projectRight) {
            // Apply mobile-specific styles
            projectContent.style.flexDirection = 'column';
            projectContent.style.padding = '6px';
            
            // Image on top
            projectLeft.style.width = '100%';
            projectLeft.style.maxHeight = '150px';
            projectLeft.style.order = '1';
            projectLeft.style.marginBottom = '10px';
            
            // Text content below
            projectRight.style.width = '100%';
            projectRight.style.padding = '6px';
            projectRight.style.order = '2';
            
            // Center the project title
            const projectTitle = document.getElementById('project-title');
            if (projectTitle) {
                projectTitle.style.textAlign = 'center';
                projectTitle.style.fontSize = '1.1rem';
                projectTitle.style.marginBottom = '6px';
            }
            
            // Style project description
            const projectDescription = document.getElementById('project-description');
            if (projectDescription) {
                projectDescription.style.fontSize = '0.65rem';
                projectDescription.style.lineHeight = '1.15';
                projectDescription.style.marginBottom = '6px';
            }
            
            // Style tech container
            const techContainer = document.querySelector('.tech-container');
            if (techContainer) {
                const techTitle = techContainer.querySelector('h3');
                const techList = techContainer.querySelector('p');
                
                if (techTitle) {
                    techTitle.style.fontSize = '0.75rem';
                }
                
                if (techList) {
                    techList.style.fontSize = '0.6rem';
                }
            }
            
            // Center the button
            const viewButton = document.getElementById('project-link');
            if (viewButton) {
                viewButton.style.padding = '5px 10px';
                viewButton.style.fontSize = '0.7rem';
                viewButton.style.margin = '0 auto';
                viewButton.style.display = 'block';
            }
        }
    }
}

const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
            // Check for the project elements
            const projectImage = document.getElementById('project-image');
            const projectTitle = document.getElementById('project-title');
            const projectDescription = document.getElementById('project-description');
            const projectTech = document.getElementById('project-tech');
            const projectLink = document.getElementById('project-link');
            
            // If all needed elements are found, initialize the projects
            if (projectImage && projectTitle && projectDescription && projectTech && projectLink) {
                observer.disconnect(); // Stop observing once elements are found
                initializeProjects(projectImage, projectTitle, projectDescription, projectTech, projectLink);
                
                // Adjust layout for mobile
                adjustProjectLayoutForMobile();
            }
        }
    });
});

observer.observe(document.body, { childList: true, subtree: true });

function initializeProjects(projectImage, projectTitle, projectDescription, projectTech, projectLink) {
    const projects = [
        {
            title: "Expense Manager",
            description: "A comprehensive expense tracking solution featuring detailed entry management, SQLite-based database with custom table creation, and robust data visualization with statistical analysis and graphical expense summaries.",
            tech: "Python, Flet, SQLite, Matplotlib",
            image: "../img/project1.png",
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
            image: "../img/project3-1.jpg",
            link: "https://github.com/jonasgueiros/task-api"
        }
    ];

    let currentProjectIndex = 0;
    const isMobile = detectMobileDevice();

    // Shortened descriptions for mobile
    const mobileDescriptions = {
        "Expense Manager": "Expense tracking app with SQLite database and data visualization.",
        "Medical Access Portal": "Healthcare platform with dual role-based authentication system.",
        "Task Management API": "RESTful API with JWT auth and task management features."
    };

    // Function to update project display
    function updateProjectDisplay() {
        const project = projects[currentProjectIndex];
        
        // Update text elements
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
    
    // Change project every 30 seconds (or 20 on mobile)
    setInterval(() => {
        currentProjectIndex = (currentProjectIndex + 1) % projects.length;
        updateProjectDisplay();
    }, interval);

    // Initialize first project display
    updateProjectDisplay();
}

// Add resize listener to adjust layout when orientation changes
window.addEventListener('resize', adjustProjectLayoutForMobile);

