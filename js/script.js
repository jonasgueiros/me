document.addEventListener('DOMContentLoaded', function() {
    const cube = document.getElementById('cube');
    const navDots = document.querySelectorAll('.nav-dot');
    const totalSections = 4;
    const sectionHeight = document.body.scrollHeight / totalSections;
    let currentSection = 0;
    
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
    
    // Initial update
    updateNavIndicators();
});
