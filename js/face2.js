document.addEventListener('DOMContentLoaded', () => {
    const projects = {
        'portfolio-cube': {
            title: 'Portfolio Cube',
            description: 'A 3D rotating cube portfolio showcasing my skills and projects.',
            link: 'https://github.com/yourusername/portfolio-cube',
        },
        'weather-app': {
            title: 'Weather App',
            description: 'A web app that provides real-time weather updates using OpenWeather API.',
            link: 'https://github.com/yourusername/weather-app',
        },
        'task-manager': {
            title: 'Task Manager',
            description: 'A full-stack task management app built with React and Node.js.',
            link: 'https://github.com/yourusername/task-manager',
        },
    };

    const projectObjects = document.querySelectorAll('.project-object');
    const projectDetails = document.getElementById('project-details');
    const projectTitle = document.getElementById('project-title');
    const projectDescription = document.getElementById('project-description');
    const projectLink = document.getElementById('project-link');

    projectObjects.forEach((object) => {
        object.addEventListener('click', () => {
            const projectKey = object.getAttribute('data-project');
            const project = projects[projectKey];

            if (project) {
                projectTitle.textContent = project.title;
                projectDescription.textContent = project.description;
                projectLink.href = project.link;

                projectDetails.style.display = 'block';
            }
        });
    });

    // Hide details when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.project-object') && !e.target.closest('#project-details')) {
            projectDetails.style.display = 'none';
        }
    });
});