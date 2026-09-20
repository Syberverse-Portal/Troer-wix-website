// Simple and reliable dropdown system
(function() {
    'use strict';

    function init() {
        const navToggle = document.querySelector('.nav-toggle');
        const navLinks = document.querySelector('.nav-links');

        if (!navToggle || !navLinks) return;

        // Hamburger menu
        navToggle.addEventListener('click', function(e) {
            e.preventDefault();
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Dropdown buttons
        const buttons = navLinks.querySelectorAll('.nav-dropdown-btn');
        buttons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                if (this.tagName === 'A') e.preventDefault();
                e.stopPropagation();

                const dropdown = this.closest('.nav-dropdown');
                if (!dropdown) return;

                // Close others
                navLinks.querySelectorAll('.nav-dropdown.expanded').forEach(dd => {
                    if (dd !== dropdown) dd.classList.remove('expanded');
                });

                // Toggle this one
                dropdown.classList.toggle('expanded');
            });
        });

        // Close on link click
        navLinks.querySelectorAll('a:not(.nav-dropdown-btn)').forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
                navLinks.querySelectorAll('.nav-dropdown').forEach(dd => {
                    dd.classList.remove('expanded');
                });
            });
        });

        // Close on outside click
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
                navLinks.querySelectorAll('.nav-dropdown').forEach(dd => {
                    dd.classList.remove('expanded');
                });
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    setTimeout(init, 500);
})();
