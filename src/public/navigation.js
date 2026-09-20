// Robust dropdown navigation system with fallbacks
(function() {
    'use strict';

    function initNavigation() {
        const navToggle = document.querySelector('.nav-toggle');
        const navLinks = document.querySelector('.nav-links');

        if (!navToggle || !navLinks) {
            console.warn('Navigation elements not found');
            return false;
        }

        // Toggle main hamburger menu
        navToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            const isActive = !navLinks.classList.contains('active');

            if (isActive) {
                navLinks.classList.add('active');
                navToggle.classList.add('active');
                navToggle.setAttribute('aria-expanded', 'true');
            } else {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                closeAllDropdowns();
            }
        });

        // Handle dropdown buttons
        const dropdownButtons = navLinks.querySelectorAll('.nav-dropdown-btn');

        dropdownButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                // Only prevent default for anchor tags
                if (this.tagName === 'A') {
                    e.preventDefault();
                }
                e.stopPropagation();

                const dropdown = this.closest('.nav-dropdown');
                if (!dropdown) return;

                const isExpanded = dropdown.classList.contains('expanded');

                // Close other dropdowns
                navLinks.querySelectorAll('.nav-dropdown.expanded').forEach(dd => {
                    if (dd !== dropdown) {
                        dd.classList.remove('expanded');
                    }
                });

                // Toggle current dropdown
                if (isExpanded) {
                    dropdown.classList.remove('expanded');
                } else {
                    dropdown.classList.add('expanded');
                }
            });
        });

        // Close menu when clicking links
        const regularLinks = navLinks.querySelectorAll('a:not(.nav-dropdown-btn)');
        regularLinks.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                closeAllDropdowns();
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navToggle.contains(event.target) && !navLinks.contains(event.target)) {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                closeAllDropdowns();
            }
        });

        return true;
    }

    function closeAllDropdowns() {
        document.querySelectorAll('.nav-dropdown.expanded').forEach(dd => {
            dd.classList.remove('expanded');
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNavigation);
    } else {
        initNavigation();
    }

    // Fallback: Try again after a delay if needed
    setTimeout(function() {
        if (!document.querySelector('.nav-links')) {
            return; // Elements not in DOM yet
        }
        // Just ensure scripts are properly attached
        initNavigation();
    }, 500);
})();
