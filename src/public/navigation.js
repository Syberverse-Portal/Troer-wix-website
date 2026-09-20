// BULLETPROOF DROPDOWN SYSTEM - No dependencies on CSS or timing
(function() {
    'use strict';

    console.log('=== DROPDOWN SYSTEM INITIALIZING ===');

    function initDropdowns() {
        const navToggle = document.querySelector('.nav-toggle');
        const navLinks = document.querySelector('.nav-links');

        if (!navToggle || !navLinks) {
            console.warn('DROPDOWN: Navigation elements not found');
            return false;
        }

        console.log('DROPDOWN: Navigation elements found');

        // Hamburger toggle
        navToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('DROPDOWN: Hamburger clicked');

            const isActive = navLinks.classList.contains('active');
            if (isActive) {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
            } else {
                navLinks.classList.add('active');
                navToggle.classList.add('active');
            }
        });

        // DROPDOWN CLICK HANDLER
        const dropdownButtons = navLinks.querySelectorAll('.nav-dropdown-btn');
        console.log('DROPDOWN: Found ' + dropdownButtons.length + ' dropdown buttons');

        dropdownButtons.forEach((button, idx) => {
            button.addEventListener('click', function(e) {
                console.log('DROPDOWN: Button ' + idx + ' clicked: ' + this.textContent.trim());

                // ALWAYS prevent default for links
                if (this.tagName === 'A') {
                    e.preventDefault();
                }
                e.stopPropagation();

                const dropdown = this.closest('.nav-dropdown');
                if (!dropdown) {
                    console.error('DROPDOWN: Could not find parent .nav-dropdown');
                    return;
                }

                const menu = dropdown.querySelector('.dropdown-menu');
                if (!menu) {
                    console.error('DROPDOWN: Could not find .dropdown-menu');
                    return;
                }

                // Close other dropdowns
                navLinks.querySelectorAll('.nav-dropdown').forEach(dd => {
                    if (dd !== dropdown && dd.classList.contains('expanded')) {
                        dd.classList.remove('expanded');
                        const otherMenu = dd.querySelector('.dropdown-menu');
                        if (otherMenu) {
                            // Force hide
                            otherMenu.style.maxHeight = '0px';
                            otherMenu.style.overflow = 'hidden';
                            otherMenu.style.visibility = 'hidden';
                        }
                    }
                });

                // Toggle current
                const isExpanded = dropdown.classList.contains('expanded');

                if (isExpanded) {
                    console.log('DROPDOWN: Collapsing dropdown');
                    dropdown.classList.remove('expanded');
                    menu.style.maxHeight = '0px';
                    menu.style.overflow = 'hidden';
                    menu.style.visibility = 'hidden';
                } else {
                    console.log('DROPDOWN: EXPANDING dropdown - forcing visibility');
                    dropdown.classList.add('expanded');

                    // FORCE inline styles to override CSS
                    menu.style.maxHeight = '2000px !important';
                    menu.style.overflow = 'visible';
                    menu.style.overflowY = 'auto';
                    menu.style.visibility = 'visible';
                    menu.style.opacity = '1';
                    menu.style.display = 'block';
                    menu.style.height = 'auto';

                    // Also force children to be visible
                    const items = menu.querySelectorAll('a, li, div');
                    items.forEach(item => {
                        item.style.visibility = 'visible';
                        item.style.opacity = '1';
                        item.style.display = 'block';
                        item.style.height = 'auto';
                        item.style.maxHeight = 'none';
                    });

                    console.log('DROPDOWN: Menu forced visible, height: ' + menu.offsetHeight + 'px');
                }
            });
        });

        // Close on link click
        const regularLinks = navLinks.querySelectorAll('a:not(.nav-dropdown-btn)');
        regularLinks.forEach(link => {
            link.addEventListener('click', function() {
                console.log('DROPDOWN: Regular link clicked, closing menu');
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');

                navLinks.querySelectorAll('.nav-dropdown').forEach(dd => {
                    dd.classList.remove('expanded');
                    const menu = dd.querySelector('.dropdown-menu');
                    if (menu) {
                        menu.style.maxHeight = '0px';
                    }
                });
            });
        });

        // Close on outside click
        document.addEventListener('click', function(event) {
            if (!navToggle.contains(event.target) && !navLinks.contains(event.target)) {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');

                navLinks.querySelectorAll('.nav-dropdown').forEach(dd => {
                    dd.classList.remove('expanded');
                    const menu = dd.querySelector('.dropdown-menu');
                    if (menu) {
                        menu.style.maxHeight = '0px';
                    }
                });
            }
        });

        console.log('=== DROPDOWN SYSTEM READY ===');
        return true;
    }

    // Try immediate init
    if (document.readyState !== 'loading') {
        console.log('DROPDOWN: DOM already loaded');
        initDropdowns();
    } else {
        document.addEventListener('DOMContentLoaded', function() {
            console.log('DROPDOWN: DOMContentLoaded fired');
            initDropdowns();
        });
    }

    // Fallback retry
    setTimeout(function() {
        if (!document.querySelector('.nav-links')) {
            console.warn('DROPDOWN: Elements still not found after 1s');
            return;
        }
        console.log('DROPDOWN: Fallback initialization');
        initDropdowns();
    }, 1000);
})();
