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
                const techList = techContainer.querySelector('p');
                
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
                initializeProjects();
                
                // Adjust layout for mobile
                adjustProjectLayoutForMobile();
            }
        }
    });
});

observer.observe(document.body, { childList: true, subtree: true });

function initializeProjects() {
    // Get the project elements
    const projectImage = document.getElementById('project-image');
    const projectTitle = document.getElementById('project-title');
    const projectDescription = document.getElementById('project-description');
    const projectTech = document.getElementById('project-tech');
    const projectLink = document.getElementById('project-link');

    const projects = [
        {
            title: "1/4 Expense Manager",
            description: "A comprehensive expense tracking solution featuring detailed entry management, SQLite-based database with custom table creation, and robust data visualization with statistical analysis and graphical expense summaries.",
            tech: [
                { name: "Python", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg" },
                { name: "Flet", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/flutter/flutter-original.svg" },
                { name: "SQLite", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/sqlite/sqlite-original.svg" }            ],
            image: "img/project1.png",
            link: "https://github.com/jonasgueiros/expenses"
        },
        {
            title: "2/4 End-to-End Audio Router",
            description: "Audio routing and processing application with DSP effects and low-latency support. Manages physical and virtual audio devices with a graphical UI for configuration.",
            tech: [
                { name: "Rust", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/rust/rust-original.svg" },
                { name: "Python", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg" },
            ],
            image: "img/sound.png",
            link: "https://github.com/jonasgueiros/sound"
        },
        {
            title: "3/4 Menu Catalog",
            description: "Restaurant menu catalog webpage with category browsing, featured items display, shopping cart system, checkout with multiple payment methods, and customer feedback functionality.",
            tech: [
                { name: "HTML5", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg" },
                { name: "CSS3", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg" },
                { name: "JavaScript", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-plain.svg" }
            ],
            image: "img/menu.png",
            link: "https://github.com/jonasgueiros/menu"
        },
        {
            title: "4/4 Medical Access Portal",
            description: "Secure healthcare platform with dual authentication system for patients and doctors, separate access points with role-specific redirects, and robust security features including PHP's password_verify function for credential validation.",
            tech: [
                { name: "PHP", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/php/php-original.svg" },
                { name: "MySQL", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original.svg" },
                { name: "JavaScript", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-plain.svg" },
                { name: "HTML5", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg" }
            ],
            image: "img/project2-1.jpg",
            link: "https://github.com/jonasgueiros/clinica"
        }
    ];

    let currentProjectIndex = 0;
    const isMobile = detectMobileDevice();

    // Shortened descriptions for mobile
    const mobileDescriptions = {
        "Expense Manager": "Expense tracking app with SQLite database and data visualization.",
        "Medical Access Portal": "Healthcare platform with dual role-based authentication system.",
        "End-to-End Audio Router": "Audio routing and processing application with Rust and Web Audio API."
    };

    // Function to update project display
    function updateProjectDisplay() {
        const project = projects[currentProjectIndex];
        
        // Update project link
        projectLink.href = project.link;
        projectLink.textContent = project.title;
        projectTitle.innerHTML = '';
        projectTitle.appendChild(projectLink);
        
        // Use shorter description on mobile
        if (isMobile && mobileDescriptions[project.title]) {
            projectDescription.textContent = mobileDescriptions[project.title];
        } else {
            projectDescription.textContent = project.description;
        }
        
        // Generate skill icons for technologies
        const techList = projectTech;
        techList.innerHTML = '';
        project.tech.forEach(techItem => {
            const li = document.createElement('li');
            li.innerHTML = `
                <div class="skill-item">
                    <div class="skill-icon">
                        <img src="${techItem.icon}" alt="${techItem.name} Logo">
                    </div>
                    <div class="skill-text"><span>${techItem.name}</span></div>
                </div>
            `;
            techList.appendChild(li);
        });
        
        projectImage.src = project.image;
        projectLink.href = project.link;
    }

    // On mobile, change projects more frequently
    const interval = isMobile ? 20000 : 15000;
    
    setInterval(() => {
        currentProjectIndex = (currentProjectIndex + 1) % projects.length;
        updateProjectDisplay();
    }, interval);

    // Initialize first project display
    updateProjectDisplay();
}

// Add resize listener to adjust layout when orientation changes
window.addEventListener('resize', adjustProjectLayoutForMobile);

