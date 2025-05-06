console.log("face2.js is loaded and running.");

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
            title: "Portfolio Website",
            description: "Modern 3D interactive portfolio built with vanilla JavaScript and CSS, featuring a rotating cube interface with custom animations and responsive design for all device types.",
            tech: "HTML5, CSS3, JavaScript",
            image: "../img/project2-1.jpg",
            link: "https://github.com/jonasgueiros/me"
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

    // Function to update project display
    function updateProjectDisplay() {
        const project = projects[currentProjectIndex];
        
        // Update project elements
        projectImage.src = project.image;
        projectImage.alt = project.title;
        projectTitle.textContent = project.title;
        projectDescription.textContent = project.description;
        projectTech.textContent = project.tech;
        projectLink.href = project.link;
    }

    // Change project every 30 seconds
    setInterval(() => {
        currentProjectIndex = (currentProjectIndex + 1) % projects.length;
        updateProjectDisplay();
    }, 30000); // 30 seconds in milliseconds

    // Initialize first project display
    updateProjectDisplay();
}