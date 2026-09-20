document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    // Toggle main menu
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function() {
            const isOpen = navLinks.classList.toggle('active');
            navToggle.setAttribute('aria-expanded', isOpen);
            navToggle.classList.toggle('active');
        });

        // Handle dropdown buttons
        const dropdownButtons = navLinks.querySelectorAll('.nav-dropdown-btn');
        dropdownButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                const dropdown = this.closest('.nav-dropdown');
                if (dropdown) {
                    dropdown.classList.toggle('expanded');
                    e.preventDefault();
                    e.stopPropagation();
                }
            });
        });

        // Close menu when a regular link is clicked
        const regularLinks = navLinks.querySelectorAll('a:not(.nav-dropdown-btn)');
        regularLinks.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                document.querySelectorAll('.nav-dropdown.expanded').forEach(dd => {
                    dd.classList.remove('expanded');
                });
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navToggle.contains(event.target) && !navLinks.contains(event.target)) {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }
});
