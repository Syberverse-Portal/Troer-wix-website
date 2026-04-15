document.addEventListener('DOMContentLoaded', () => {
    const dropdowns = document.querySelectorAll('.nav-dropdown');

    dropdowns.forEach((dropdown) => {
        const menu = dropdown.querySelector('.dropdown-menu');
        if (!menu) return;

        // Ensure smooth transition styles are applied via JS to override potential defaults
        menu.style.setProperty('transition', 'opacity 0.2s ease, transform 0.2s ease, visibility 0.2s', 'important');

        // Initial state for safety
        menu.style.setProperty('opacity', '0', 'important');
        menu.style.setProperty('visibility', 'hidden', 'important');
        menu.style.setProperty('transform', 'translateX(-50%) translateY(-8px)', 'important');

        let timeout;

        const setMenuState = (isVisible) => {
            clearTimeout(timeout);
            if (isVisible) {
                menu.style.opacity = '1';
                menu.style.visibility = 'visible';
                menu.style.transform = 'translateX(-50%) translateY(0)';
                dropdown.setAttribute('aria-expanded', 'true');
            } else {
                timeout = setTimeout(() => {
                    menu.style.opacity = '0';
                    menu.style.visibility = 'hidden';
                    menu.style.transform = 'translateX(-50%) translateY(-8px)';
                    dropdown.setAttribute('aria-expanded', 'false');
                }, 150); 
            }
        };

        dropdown.addEventListener('mouseenter', () => setMenuState(true));
        dropdown.addEventListener('mouseleave', () => setMenuState(false));

        // Fix for keyboard accessibility
        dropdown.addEventListener('focusin', () => setMenuState(true));
        dropdown.addEventListener('focusout', () => setMenuState(false));
    });
});
