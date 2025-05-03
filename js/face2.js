document.addEventListener('DOMContentLoaded', function () {
    setTimeout(initProjects, 100);
});

function initProjects() {
    // Project data
    const projects = [
        {
            title: "Portfolio Cube",
            description: "A responsive 3D cube portfolio showcasing my web development projects and skills.",
            tech: "Languages/Platforms: HTML, CSS, JavaScript",
            image: "images/portfolio.jpg", 
            link: "https://github.com/yourusername/portfolio-cube"
        },
        {
            title: "Weather Dashboard",
            description: "An interactive weather application that displays current conditions and forecasts for any location.",
            tech: "Languages/Platforms: React, OpenWeather API, Tailwind CSS",
            image: "images/weather.jpg",
            link: "https://github.com/yourusername/weather-dashboard"
        },
        {
            title: "Task Tracker",
            description: "A productivity tool that helps users manage their tasks with features like categories, deadlines, and priority levels.",
            tech: "Languages/Platforms: Vue.js, Firebase, Vuetify",
            image: "images/task.jpg",
            link: "https://github.com/yourusername/task-tracker"
        }
    ];

    // Get DOM elements
    const projectsContainer = document.querySelector('.projects-container');

    // Check if the container exists
    if (!projectsContainer) {
        console.error('Projects container not found');
        return;
    }

    const modal = document.getElementById('projectModal');

    if (!modal) {
        console.error('Project modal not found');
        return;
    }

    const modalTitle = modal.querySelector('.modal-title');
    const modalDescription = modal.querySelector('.modal-description');
    const modalTech = modal.querySelector('.modal-tech');
    const modalLink = modal.querySelector('.modal-link');
    const modalImage = modal.querySelector('.modal-right img');
    const modalClose = modal.querySelector('.modal-close');

    // Create project objects
    projects.forEach((project, index) => {
        const projectObject = document.createElement('div');
        projectObject.className = 'project-object';
        projectObject.style.animationDelay = `${index * 0.5}s`;

        const projectShape = document.createElement('div');
        projectShape.className = 'project-shape';

        const projectIcon = document.createElement('img');
        projectIcon.src = project.image;
        projectIcon.alt = project.title;

        projectShape.appendChild(projectIcon);
        projectObject.appendChild(projectShape);
        projectsContainer.appendChild(projectObject);

        // Add click event to show modal
        projectObject.addEventListener('click', function () {
            modalTitle.textContent = project.title;
            modalDescription.textContent = project.description;
            modalTech.textContent = project.tech;
            modalLink.href = project.link;
            modalImage.src = project.image;
            modalImage.alt = project.title;

            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Prevent scrolling

            // Animate modal opening
            modal.style.opacity = '0';
            setTimeout(() => {
                modal.style.opacity = '1';
                modal.style.transition = 'opacity 0.3s ease';
            }, 10);
        });
    });

    // Close modal when clicking on X
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    // Close modal when clicking outside of it
    modal.addEventListener('click', function (event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Close modal with ESC key
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && modal.style.display === 'flex') {
            closeModal();
        }
    });

    function closeModal() {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        }, 300);
    }
}