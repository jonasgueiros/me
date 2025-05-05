console.log("face2.js is loaded and running.");

const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
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
            title: "Project 1",
            description: "This is project 1 description.",
            tech: "HTML, CSS, JavaScript",
            image: "../img/project1.png",
            link: "#project1"
        },
        {
            title: "Project 2",
            description: "This is project 2 description.",
            tech: "React, Node.js",
            image: "../img/project2.jpg",
            link: "#project2"
        },
        {
            title: "Project 3",
            description: "This is project 3 description.",
            tech: "Python, Flask",
            image: "../img/project3.png",
            link: "#project3"
        }
    ];

    let currentProjectIndex = 0;

    function updateProjectDisplay() {
        const project = projects[currentProjectIndex];
        projectTitle.textContent = project.title;
        projectDescription.textContent = project.description;
        projectTech.textContent = project.tech;
        projectImage.src = project.image;
        projectLink.href = project.link;
    }

    setInterval(() => {
        currentProjectIndex = (currentProjectIndex + 1) % projects.length;
        updateProjectDisplay();
    }, 30000); // 30 seconds in milliseconds

    
    updateProjectDisplay();
}