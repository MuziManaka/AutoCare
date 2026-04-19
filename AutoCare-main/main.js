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

    // 3. EmailJS Integration
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const formStatus = document.getElementById('form-status');

    if (contactForm && (typeof emailjs !== 'undefined')) {
        // Initialize EmailJS with your Public Key
        emailjs.init("HGQ8zidQLfZLvuZ_w");

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Change button state
            const originalBtnContent = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = `
                Sending Inquiry...
                <span class="material-symbols-outlined" style="font-size: 1.25rem; animation: spin 1s linear infinite;">sync</span>
            `;

            // Reset status
            formStatus.style.display = 'none';
            formStatus.style.backgroundColor = 'transparent';
            formStatus.textContent = '';

            // Send form using EmailJS
            // service_id: service_k798ncu, template_id: template_8t8o6t6
            emailjs.sendForm('service_k798ncu', 'template_8t8o6t6', contactForm)
                .then(() => {
                    // Success
                    formStatus.style.display = 'block';
                    formStatus.style.backgroundColor = 'rgba(76, 175, 80, 0.2)';
                    formStatus.style.color = '#81c784';
                    formStatus.textContent = 'Success! Your inquiry has been sent. We will contact you shortly.';
                    
                    contactForm.reset();
                })
                .catch((error) => {
                    // Error
                    console.error('EmailJS Error:', error);
                    formStatus.style.display = 'block';
                    formStatus.style.backgroundColor = 'rgba(244, 67, 54, 0.2)';
                    formStatus.style.color = '#e57373';
                    formStatus.textContent = 'Oops! Something went wrong. Please try again or call us directly.';
                })
                .finally(() => {
                    // Restore button state
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnContent;
                });
        });
    }
});

// Add spin animation for the loading icon
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);
