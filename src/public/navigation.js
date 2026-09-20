document.addEventListener('DOMContentLoaded', function() {
    console.log('Navigation.js loaded');

    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (!navToggle || !navLinks) {
        console.error('Navigation elements not found');
        return;
    }

    console.log('Navigation elements found');

    // Toggle main menu
    navToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Hamburger clicked');

        const isOpen = navLinks.classList.toggle('active');
        navToggle.setAttribute('aria-expanded', isOpen);
        navToggle.classList.toggle('active');
        console.log('Menu is now:', isOpen ? 'OPEN' : 'CLOSED');
    });

    // Handle dropdown buttons
    const dropdownButtons = navLinks.querySelectorAll('.nav-dropdown-btn');
    console.log('Found ' + dropdownButtons.length + ' dropdown buttons');

    dropdownButtons.forEach((button, index) => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Dropdown button ' + index + ' clicked:', button.textContent.trim());

            const dropdown = this.closest('.nav-dropdown');
            if (!dropdown) {
                console.error('Could not find parent .nav-dropdown');
                return;
            }

            // Close other dropdowns
            document.querySelectorAll('.nav-dropdown.expanded').forEach(dd => {
                if (dd !== dropdown) {
                    dd.classList.remove('expanded');
                    // Also set inline styles
                    const menu = dd.querySelector('.dropdown-menu');
                    if (menu) {
                        menu.style.maxHeight = '0';
                        menu.style.overflow = 'hidden';
                    }
                    console.log('Closed other dropdown');
                }
            });

            // Toggle this dropdown
            const isExpanded = dropdown.classList.toggle('expanded');
            console.log('Dropdown is now:', isExpanded ? 'EXPANDED' : 'COLLAPSED');

            // Apply inline styles to ensure visibility
            const dropdownMenu = dropdown.querySelector('.dropdown-menu');
            if (dropdownMenu) {
                if (isExpanded) {
                    // Show menu
                    dropdownMenu.style.maxHeight = '1200px';
                    dropdownMenu.style.overflow = 'visible';
                    dropdownMenu.style.overflowY = 'auto';
                    console.log('Menu styles applied - should be visible');
                } else {
                    // Hide menu
                    dropdownMenu.style.maxHeight = '0';
                    dropdownMenu.style.overflow = 'hidden';
                    console.log('Menu collapsed');
                }
            } else {
                console.error('Could not find .dropdown-menu');
            }
        });
    });

    // Close menu when clicking a regular link
    const regularLinks = navLinks.querySelectorAll('a:not(.nav-dropdown-btn)');
    console.log('Found ' + regularLinks.length + ' regular links');

    regularLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            console.log('Regular link clicked:', this.textContent.trim());
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');

            // Close all dropdowns
            document.querySelectorAll('.nav-dropdown.expanded').forEach(dd => {
                dd.classList.remove('expanded');
                const menu = dd.querySelector('.dropdown-menu');
                if (menu) {
                    menu.style.maxHeight = '0';
                    menu.style.overflow = 'hidden';
                }
            });
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!navToggle.contains(event.target) && !navLinks.contains(event.target)) {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');

            // Close all dropdowns
            document.querySelectorAll('.nav-dropdown.expanded').forEach(dd => {
                dd.classList.remove('expanded');
                const menu = dd.querySelector('.dropdown-menu');
                if (menu) {
                    menu.style.maxHeight = '0';
                    menu.style.overflow = 'hidden';
                }
            });
        }
    });

    console.log('Navigation.js initialization complete');
});
