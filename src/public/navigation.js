document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    // Toggle main menu
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function(e) {
            e.preventDefault();
            const isOpen = navLinks.classList.toggle('active');
            navToggle.setAttribute('aria-expanded', isOpen);
            navToggle.classList.toggle('active');
        });

        // Handle dropdown buttons - both <a> and <button> tags
        const dropdownButtons = navLinks.querySelectorAll('.nav-dropdown-btn');
        dropdownButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                const dropdown = this.closest('.nav-dropdown');
                if (dropdown) {
                    e.preventDefault();
                    e.stopPropagation();
                    // Close other dropdowns
                    document.querySelectorAll('.nav-dropdown.expanded').forEach(dd => {
                        if (dd !== dropdown) {
                            dd.classList.remove('expanded');
                        }
                    });
                    // Toggle this dropdown
                    dropdown.classList.toggle('expanded');
                }
            });
        });

        // Close menu when clicking a regular link
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
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
});
