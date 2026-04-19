/**
 * Auto Care & Diagnostics - Main JavaScript
 * Handles mobile navigation and dynamic form pre-filling.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Functionality
    const menuOpen = document.getElementById('menu-open');
    const menuClose = document.getElementById('menu-close');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuOverlay = document.getElementById('menu-overlay');

    if (menuOpen && mobileMenu) {
        function toggleMenu() {
            mobileMenu.classList.toggle('active');
            menuOverlay.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        }

        menuOpen.addEventListener('click', toggleMenu);
        menuClose.addEventListener('click', toggleMenu);
        menuOverlay.addEventListener('click', toggleMenu);

        // Close menu on link click
        const mobileLinks = mobileMenu.querySelectorAll('.nav-link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', toggleMenu);
        });
    }

    // 2. Dynamic Form Pre-filling
    const urlParams = new URLSearchParams(window.location.search);
    const service = urlParams.get('service');
    const messageArea = document.getElementById('message');

    if (service && messageArea) {
        const serviceMessages = {
            'diagnostic': 'I would like to book a precision diagnostic scan for my vehicle.',
            'repair': 'I need to schedule a mechanical repair service for my vehicle.',
            'maintenance': 'I am interested in booking a preventative maintenance assessment.',
            'default': 'I would like to book a service appointment.'
        };

        const prefillMessage = serviceMessages[service] || serviceMessages['default'];
        messageArea.value = prefillMessage;
        
        // Optional: Focus the message area to show the user it was filled
        messageArea.focus();
    }
});
document.onclick
