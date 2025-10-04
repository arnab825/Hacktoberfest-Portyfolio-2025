document.addEventListener('DOMContentLoaded', function() {
    // Scroll to top functionality
    const scrollToTopBtn = document.querySelector('#scrollToTop');
    
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default anchor behavior
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Read More / Read Less functionality for service boxes
    const serviceBoxes = document.querySelectorAll('.service-box');
    
    serviceBoxes.forEach(box => {
        const btn = box.querySelector('.read-more-btn');
        const text = box.querySelector('.service-text');
        
        if (btn && text) {
            btn.addEventListener('click', function() {
                text.classList.toggle('expanded');
                this.textContent = text.classList.contains('expanded') ? 'Read Less' : 'Read More';
            });
        }
    });

    const readMoreBtn = document.querySelector('.read-more-btn');
    const aboutText = document.querySelector('.about-text');

    if (readMoreBtn && aboutText) {
        readMoreBtn.addEventListener('click', function() {
            aboutText.classList.toggle('expanded');
            this.textContent = aboutText.classList.contains('expanded') ? 'Read Less' : 'Read More';
        });
    }

    // Toggle icon navbar
    let menuIcon = document.querySelector('#menu-icon');
    let navbar = document.querySelector('.navbar');

    if (menuIcon && navbar) {
        menuIcon.onclick = () => {
            menuIcon.classList.toggle('bx-x');
            navbar.classList.toggle('active');
        };
    }

    // Scroll section active link
    let sections = document.querySelectorAll('section');
    let navLinks = document.querySelectorAll('header nav a');

    function updateActiveLink() {
        let scrollPosition = window.scrollY + 100; // Offset to account for fixed navbar

        sections.forEach(sec => {
            let top = sec.offsetTop;
            let height = sec.offsetHeight;
            let id = sec.getAttribute('id');

            if (scrollPosition >= top && scrollPosition < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                let activeLink = document.querySelector(`header nav a[href="#${id}"]`);
                if (activeLink) activeLink.classList.add('active');
            }
        });

        // Sticky navbar
        let header = document.querySelector('header');
        if (header) header.classList.toggle('sticky', window.scrollY > 100);

        // Remove toggle icon and navbar when clicking navbar link (for mobile)
        if (menuIcon && navbar) {
            menuIcon.classList.remove('bx-x');
            navbar.classList.remove('active');
        }
    }

    window.addEventListener('scroll', updateActiveLink);
    window.addEventListener('load', updateActiveLink);

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            let targetId = this.getAttribute('href').substring(1); // Remove the '#' character
            let target = document.getElementById(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add animation delay to social media icons
    document.querySelectorAll('.social-media a').forEach((icon, index) => {
        icon.style.setProperty('--i', index + 1);
    });
});
