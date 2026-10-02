/**
 * Saikiran - Developer Portfolio
 * Vanilla JavaScript interactions & animations
 */

document.addEventListener('DOMContentLoaded', () => {
    // --------------------------------------------------------------------------
    // 1. DOM Elements
    // --------------------------------------------------------------------------
    const navbar = document.getElementById('navbar');
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const backToTopBtn = document.getElementById('back-to-top');
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const revealElements = document.querySelectorAll('.reveal');
    const sections = document.querySelectorAll('section[id]');

    // --------------------------------------------------------------------------
    // 2. Mobile Menu Toggle
    // --------------------------------------------------------------------------
    if (hamburgerBtn && navMenu) {
        const toggleMenu = () => {
            const isOpen = navMenu.classList.toggle('open');
            hamburgerBtn.classList.toggle('active', isOpen);
            hamburgerBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            
            // Prevent background scrolling when mobile menu is active
            document.body.style.overflow = isOpen ? 'hidden' : '';
        };

        const closeMenu = () => {
            if (navMenu.classList.contains('open')) {
                navMenu.classList.remove('open');
                hamburgerBtn.classList.remove('active');
                hamburgerBtn.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        };

        hamburgerBtn.addEventListener('click', toggleMenu);

        // Close menu on link click
        navLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // Close menu on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeMenu();
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('open') && 
                !navMenu.contains(e.target) && 
                !hamburgerBtn.contains(e.target)) {
                closeMenu();
            }
        });
    }

    // --------------------------------------------------------------------------
    // 3. Navbar Elevation on Scroll & Back to Top Visibility
    // --------------------------------------------------------------------------
    const handleScroll = () => {
        const scrollY = window.scrollY;

        // Sticky Navbar background
        if (navbar) {
            if (scrollY > 30) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        // Back to top button
        if (backToTopBtn) {
            if (scrollY > 400) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check on load

    // Back to top click
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // --------------------------------------------------------------------------
    // 4. Active Navigation Highlighting on Scroll (IntersectionObserver)
    // --------------------------------------------------------------------------
    if ('IntersectionObserver' in window && sections.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -60% 0px',
            threshold: 0
        };

        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const currentId = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        const href = link.getAttribute('href');
                        if (href === `#${currentId}`) {
                            link.classList.add('active');
                        } else {
                            link.classList.remove('active');
                        }
                    });
                }
            });
        }, observerOptions);

        sections.forEach(section => sectionObserver.observe(section));
    }

    // --------------------------------------------------------------------------
    // 5. Scroll Reveal Animations (IntersectionObserver)
    // --------------------------------------------------------------------------
    if ('IntersectionObserver' in window && revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback for browsers without IntersectionObserver
        revealElements.forEach(el => el.classList.add('revealed'));
    }

    // --------------------------------------------------------------------------
    // 6. Contact Form Validation & Friendly Feedback
    // --------------------------------------------------------------------------
    if (contactForm) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');

        const validateField = (input, errorId, validatorFn) => {
            const parent = input.closest('.form-group');
            const isValid = validatorFn(input.value.trim());

            if (!isValid) {
                parent.classList.add('has-error');
            } else {
                parent.classList.remove('has-error');
            }
            return isValid;
        };

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Real-time input error clearing
        [nameInput, emailInput, messageInput].forEach(input => {
            if (input) {
                input.addEventListener('input', () => {
                    const parent = input.closest('.form-group');
                    if (parent.classList.contains('has-error')) {
                        parent.classList.remove('has-error');
                    }
                    if (formStatus) {
                        formStatus.style.display = 'none';
                    }
                });
            }
        });

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const isNameValid = validateField(nameInput, 'name-error', val => val.length > 0);
            const isEmailValid = validateField(emailInput, 'email-error', val => emailRegex.test(val));
            const isMessageValid = validateField(messageInput, 'message-error', val => val.length > 0);

            if (!isNameValid || !isEmailValid || !isMessageValid) {
                return;
            }

            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const message = messageInput.value.trim();

            // Display polite success toast
            if (formStatus) {
                formStatus.className = 'form-status success';
                formStatus.innerHTML = `<i class="fa-solid fa-circle-check"></i> Thank you, <strong>${name}</strong>! Opening your email client to complete message delivery...`;
                formStatus.style.display = 'block';
            }

            // Open mail client with prefilled details
            const recipientEmail = 'kamshettysaikiran@gmail.com';
            const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
            const body = encodeURIComponent(`Hello Saikiran,\n\n${message}\n\nFrom: ${name}\nEmail: ${email}`);

            setTimeout(() => {
                window.location.href = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
            }, 600);

            // Reset inputs
            contactForm.reset();
        });
    }
});
