document.addEventListener('DOMContentLoaded', function () {
    // Function to check if an element is in viewport with reduced threshold
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
            rect.bottom >= 0
        );
    }

    // Add a scroll down indicator to the hero section
    function addScrollIndicator() {
        const hero = document.querySelector('.hero');
        if (!hero) return;
        
        // Create scroll indicator container
        const scrollIndicator = document.createElement('div');
        scrollIndicator.className = 'scroll-indicator';
        scrollIndicator.style.position = 'absolute';
        scrollIndicator.style.bottom = '30px';
        scrollIndicator.style.left = '50%';
        scrollIndicator.style.transform = 'translateX(-50%)';
        scrollIndicator.style.display = 'flex';
        scrollIndicator.style.flexDirection = 'column';
        scrollIndicator.style.alignItems = 'center';
        scrollIndicator.style.cursor = 'pointer';
        scrollIndicator.style.zIndex = '10';
        
        // Create text element
        const textElement = document.createElement('div');
        textElement.textContent = 'Scroll Down';
        textElement.style.color = '#ffffff';
        textElement.style.fontSize = '14px';
        textElement.style.marginBottom = '8px';
        textElement.style.textShadow = '0 2px 5px rgba(0, 0, 0, 0.5)';
        textElement.style.opacity = '0.8';
        
        // Create arrow container
        const arrowContainer = document.createElement('div');
        arrowContainer.style.width = '30px';
        arrowContainer.style.height = '50px';
        arrowContainer.style.display = 'flex';
        arrowContainer.style.flexDirection = 'column';
        arrowContainer.style.alignItems = 'center';
        arrowContainer.style.justifyContent = 'center';
        arrowContainer.style.overflow = 'hidden';
        
        // Create animated arrows
        for (let i = 0; i < 3; i++) {
            const arrow = document.createElement('div');
            arrow.style.width = '15px';
            arrow.style.height = '15px';
            arrow.style.border = '2px solid #ffcc00';
            arrow.style.borderTop = 'none';
            arrow.style.borderLeft = 'none';
            arrow.style.transform = 'rotate(45deg)';
            arrow.style.margin = '-5px'; // Overlap arrows
            arrow.style.animation = `scrollArrow ${0.5 + i * 0.1}s ease-in-out infinite alternate`;
            
            arrowContainer.appendChild(arrow);
        }
        
        // Add elements to container
        scrollIndicator.appendChild(textElement);
        scrollIndicator.appendChild(arrowContainer);
        
        // Add scroll indicator to hero section
        hero.style.position = 'relative';
        hero.appendChild(scrollIndicator);
        
        // Add click event to scroll to about section
        scrollIndicator.addEventListener('click', () => {
            const aboutSection = document.querySelector('#About');
            if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
                
                // Trigger animation for the about section
                setTimeout(() => {
                    const aboutContainer = document.querySelector('.about .container');
                    if (aboutContainer) {
                        slideFromLeft(aboutContainer, 800);
                    }
                    const aboutHeading = document.querySelector('.about .text-box h2');
                    if (aboutHeading) {
                        animateHeading(aboutHeading);
                    }
                }, 800);
            }
        });
        
        // Add animated scroll arrow styles
        const styleElement = document.createElement('style');
        styleElement.textContent = `
            @keyframes scrollArrow {
                0% {
                    opacity: 0.2;
                    transform: rotate(45deg) translate(0, 0);
                }
                100% {
                    opacity: 1;
                    transform: rotate(45deg) translate(5px, 5px);
                }
            }
            
            .scroll-indicator:hover .scrollArrow {
                animation-duration: 0.3s;
            }
            
            .scroll-indicator:hover {
                transform: translateX(-50%) scale(1.1);
            }
        `;
        document.head.appendChild(styleElement);
    }
    
    // Call add scroll indicator
    addScrollIndicator();

    // Optimized animation utility functions
    function fadeIn(element, duration, delay = 0) {
        if (!element) return;
        
        // Use transform3d for hardware acceleration
        element.style.transform = 'translate3d(0, 30px, 0)';
        element.style.opacity = '0';
        element.style.transition = 'none';
        
        // Force reflow
        void element.offsetWidth;
        
        // Use transform3d for better performance
        element.style.transition = `opacity ${duration}ms ease-out ${delay}ms, transform ${duration}ms ease-out ${delay}ms`;
        
        requestAnimationFrame(() => {
            element.style.opacity = '1';
            element.style.transform = 'translate3d(0, 0, 0)';
        });
    }
    

    
    // Add reveal animation with mask effect
    function revealAnimation(element, duration, delay = 0, direction = 'left') {
        if (!element) return;
        
        // Create a wrapper for the mask effect if not already wrapped
        if (!element.classList.contains('reveal-wrapped')) {
            // Get parent node
            const parent = element.parentNode;
            
            // Create wrapper
            const wrapper = document.createElement('div');
            wrapper.className = 'reveal-wrapper';
            wrapper.style.position = 'relative';
            wrapper.style.display = 'inline-block';
            wrapper.style.overflow = 'hidden';
            wrapper.style.width = '100%';
            
            // Insert wrapper before element
            parent.insertBefore(wrapper, element);
            
            // Move element into wrapper
            wrapper.appendChild(element);
            
            // Create mask overlay
            const mask = document.createElement('div');
            mask.className = 'reveal-mask';
            mask.style.position = 'absolute';
            mask.style.top = '0';
            mask.style.width = '100%';
            mask.style.height = '100%';
            mask.style.backgroundColor = '#ffcc00';
            
            if (direction === 'left') {
                mask.style.left = '-100%';
            } else {
                mask.style.right = '-100%';
            }
            
            wrapper.appendChild(mask);
            
            // Mark as wrapped
            element.classList.add('reveal-wrapped');
            
            // Start animation
            setTimeout(() => {
                mask.style.transition = `transform ${duration}ms cubic-bezier(0.7, 0, 0.3, 1) ${delay}ms`;
                
                if (direction === 'left') {
                    mask.style.transform = 'translateX(200%)';
                } else {
                    mask.style.transform = 'translateX(-200%)';
                }
                
                // Remove mask after animation
                setTimeout(() => {
                    if (wrapper.contains(mask)) {
                        wrapper.removeChild(mask);
                    }
                }, duration + delay + 100);
            }, 10);
        }
    }

    // Animate header on load
    const header = document.querySelector('header');
    if (header) {
        header.style.opacity = '0';
        header.style.transform = 'translateY(-20px)';
        header.style.transition = 'opacity 800ms ease-out, transform 800ms ease-out';
        
        setTimeout(() => {
            header.style.opacity = '1';
            header.style.transform = 'translateY(0)';
        }, 100);
    }

    // Animate hero section on load
    function animateHero() {
        const heroTitle = document.querySelector('.hero-title');
        const heroText1 = document.querySelector('.hero .text-content p:nth-child(2)');
        const heroText2 = document.querySelector('.hero .text-content p:nth-child(3)');
        const exploreButton = document.querySelector('.CV');
        const socialTags = document.querySelector('.tags');
        const heroImage = document.querySelector('.hero .image-content img');
        
        fadeIn(heroTitle, 1000, 0);
        fadeIn(heroText1, 1000, 200);
        fadeIn(heroText2, 1000, 400);
        fadeIn(exploreButton, 1000, 600);
        fadeIn(socialTags, 1000, 800);
        fadeIn(heroImage, 1000, 500);
    }
    
    // Call hero animation on page load
    animateHero();

    // Function to animate section headings with underline effect
    function animateHeading(heading) {
        if (!heading) return;
        
        // Remove any existing underline
        const existingUnderline = heading.querySelector('.heading-underline');
        if (existingUnderline) {
            heading.removeChild(existingUnderline);
        }
        
        // Create underline element
        const underline = document.createElement('div');
        underline.className = 'heading-underline';
        underline.style.position = 'absolute';
        underline.style.bottom = '0';
        underline.style.left = '0';
        underline.style.height = '3px';
        underline.style.width = '0';
        underline.style.backgroundColor = '#ffcc00';
        underline.style.transition = 'width 800ms cubic-bezier(0.25, 0.1, 0.25, 1) 300ms';
        
        // Set heading style for underline positioning
        heading.style.position = 'relative';
        heading.style.display = 'inline-block';
        heading.style.paddingBottom = '10px';
        
        // Append underline to heading
        heading.appendChild(underline);
        
        // Animate the underline
        setTimeout(() => {
            underline.style.width = '100%';
        }, 100);
    }

    // Function to animate list items with staggered effect
    function animateListItems(list, duration = 500, baseDelay = 100) {
        if (!list) return;
        
        const items = list.querySelectorAll('li');
        items.forEach((item, index) => {
            // Reset first
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'none';
            
            // Force reflow
            void item.offsetWidth;
            
            // Set the transition with nice easing
            item.style.transition = `opacity ${duration}ms cubic-bezier(0.25, 0.1, 0.25, 1) ${baseDelay + (index * 100)}ms, transform ${duration}ms cubic-bezier(0.25, 0.1, 0.25, 1.2) ${baseDelay + (index * 100)}ms`;
            
            // Start animation
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 10);
        });
    }

    // Optimized slide animations
    function slideFromLeft(element, duration) {
        if (!element) return;
        
        // Use transform3d for hardware acceleration
        element.style.transform = 'translate3d(-100px, 0, 0)';
        element.style.opacity = '0';
        element.style.transition = 'none';
        
        // Force reflow
        void element.offsetWidth;
        
        // Use transform3d for better performance
        element.style.transition = `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`;
        
        requestAnimationFrame(() => {
            element.style.opacity = '1';
            element.style.transform = 'translate3d(0, 0, 0)';
        });
    }

    function slideFromRight(element, duration) {
        if (!element) return;
        
        // Use transform3d for hardware acceleration
        element.style.transform = 'translate3d(100px, 0, 0)';
        element.style.opacity = '0';
        element.style.transition = 'none';
        
        // Force reflow
        void element.offsetWidth;
        
        // Use transform3d for better performance
        element.style.transition = `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`;
        
        requestAnimationFrame(() => {
            element.style.opacity = '1';
            element.style.transform = 'translate3d(0, 0, 0)';
        });
    }

    // Optimized scroll animation handler
    function handleScrollAnimation() {
        const sections = [
            {
                element: document.querySelector('.about'),
                container: document.querySelector('.about .container'),
                heading: document.querySelector('.about .text-box h2'),
                list: document.querySelector('.about .text-box ul'),
                image: document.querySelector('.about .image-content img')
            },
            {
                element: document.querySelector('.Skills'),
                container: document.querySelector('.Skills .container'),
                heading: document.querySelector('.Skills .text-box h2'),
                list: document.querySelector('.Skills .text-box ul'),
                image: document.querySelector('.Skills .image-content img')
            },
            {
                element: document.querySelector('.projects'),
                container: document.querySelector('.projects .container'),
                heading: document.querySelector('.projects .text-box h2'),
                list: document.querySelector('.projects .text-box ul'),
                image: document.querySelector('.projects .image-content img')
            },
            {
                element: document.querySelector('.portfolio-container'),
                cards: document.querySelectorAll('.project-card')
            }
        ];

        sections.forEach(section => {
            if (section.element && isInViewport(section.element) && !section.element.classList.contains('js-animated')) {
                // Mark section as animated
                section.element.classList.add('js-animated');
                
                // Animate container with appropriate direction
                if (section.container) {
                    if (section.element.classList.contains('about')) {
                        slideFromLeft(section.container, 600);
                        // Optimize image animation
                        if (section.image) {
                            section.image.style.transform = 'translate3d(0, 0, 0) scale(1)';
                            section.image.style.transition = 'transform 0.5s ease-out';
                            requestAnimationFrame(() => {
                                section.image.style.transform = 'translate3d(0, 0, 0) scale(1.05)';
                            });
                        }
                    } else if (section.element.classList.contains('Skills')) {
                        slideFromRight(section.container, 600);
                        // Optimize image animation
                        if (section.image) {
                            section.image.style.transform = 'translate3d(0, 0, 0)';
                            section.image.style.transition = 'transform 0.5s ease-out';
                            requestAnimationFrame(() => {
                                section.image.style.transform = 'translate3d(-20px, 0, 0)';
                            });
                        }
                    } else if (section.element.classList.contains('projects')) {
                        slideFromLeft(section.container, 600);
                        // Optimize image animation
                        if (section.image) {
                            section.image.style.transform = 'translate3d(0, 0, 0) rotate(0deg)';
                            section.image.style.transition = 'transform 0.5s ease-out';
                            requestAnimationFrame(() => {
                                section.image.style.transform = 'translate3d(0, 0, 0) rotate(5deg)';
                            });
                        }
                    }
                }
                
                // Animate heading with underline
                if (section.heading) {
                    animateHeading(section.heading);
                }
                
                // Optimize list items animation
                if (section.list) {
                    animateListItems(section.list, 300, 30);
                }
                
                // Optimize project cards animation
                if (section.cards) {
                    section.cards.forEach((card, index) => {
                        card.style.transform = 'translate3d(0, 0, 0)';
                        card.style.transition = 'transform 0.3s ease-out';
                        
                        setTimeout(() => {
                            requestAnimationFrame(() => {
                                card.style.transform = 'translate3d(0, 0, 50px) rotateY(10deg)';
                                setTimeout(() => {
                                    card.style.transform = 'translate3d(0, 0, 0) rotateY(0deg)';
                                }, 300);
                            });
                        }, index * 100);
                    });
                }
            }
        });
    }

    // Add button animation for "Explore More" button
    const exploreBtn = document.querySelector('.CV');
    if (exploreBtn) {
        // Define pulse animation function with more visible effect
        function pulseAnimation() {
            exploreBtn.style.transform = 'scale(1)';
            exploreBtn.style.boxShadow = '0 0 0 0 rgba(255, 204, 0, 0.7)';
            exploreBtn.style.transition = 'transform 1.5s cubic-bezier(0.25, 0.1, 0.25, 1), box-shadow 1.5s cubic-bezier(0.25, 0.1, 0.25, 1)';
            
            setTimeout(() => {
                exploreBtn.style.transform = 'scale(1.05)';
                exploreBtn.style.boxShadow = '0 0 20px 10px rgba(255, 204, 0, 0.5)';
                
                setTimeout(() => {
                    exploreBtn.style.transform = 'scale(1)';
                    exploreBtn.style.boxShadow = '0 0 0 0 rgba(255, 204, 0, 0)';
                }, 750);
            }, 50);
        }
        
        // Start pulse animation loop
        let pulseInterval = setInterval(pulseAnimation, 3000);
        
        // Add hover animation
        let floatAnimation;
        
        exploreBtn.addEventListener('mouseenter', function() {
            // Clear any ongoing pulse
            clearInterval(pulseInterval);
            
            // Set initial state
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 10px 20px rgba(255, 204, 0, 0.3)';
            this.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1), box-shadow 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)';
            
            // Define floating animation
            let goingUp = true;
            floatAnimation = setInterval(() => {
                if (goingUp) {
                    this.style.transform = 'translateY(-8px)';
                } else {
                    this.style.transform = 'translateY(0)';
                }
                goingUp = !goingUp;
            }, 500);
        });
        
        exploreBtn.addEventListener('mouseleave', function() {
            // Clear floating animation
            clearInterval(floatAnimation);
            
            // Reset styles
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '0 0 0 0 rgba(255, 204, 0, 0)';
            
            // Restart pulse animation
            pulseInterval = setInterval(pulseAnimation, 3000);
        });
    }

    // Add smooth scrolling for navigation links
    document.querySelectorAll('nav a, .hero a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Smooth scroll to target with faster duration
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Force animation when scrolled to section with reduced timeout
                setTimeout(() => {
                    handleScrollAnimation();
                }, 500);
            }
        });
    });

    // Initial animation for sections in viewport on load
    handleScrollAnimation();

    // Optimize scroll event listener
    let lastScrollTop = 0;
    let scrollThreshold = 50;
    let ticking = false;
    let scrollDebounceTimer;

    window.addEventListener('scroll', function() {
        const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Clear any existing debounce timer
        clearTimeout(scrollDebounceTimer);
        
        if (!ticking) {
            window.requestAnimationFrame(function() {
                // Check if we've scrolled enough to trigger animations
                if (Math.abs(currentScrollTop - lastScrollTop) > scrollThreshold) {
                    handleScrollAnimation();
                    lastScrollTop = currentScrollTop;
                }
                ticking = false;
            });
            
            ticking = true;
        }
        
        // Set a debounce timer to ensure animations run when scrolling stops
        scrollDebounceTimer = setTimeout(() => {
            handleScrollAnimation();
        }, 150);
    }, { passive: true });

    // Optimize hover animations
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            requestAnimationFrame(() => {
                card.style.transform = 'translate3d(0, 0, 50px) rotateY(10deg)';
                card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';
            });
        });
        
        card.addEventListener('mouseleave', () => {
            requestAnimationFrame(() => {
                card.style.transform = 'translate3d(0, 0, 0) rotateY(0deg)';
                card.style.boxShadow = '0px 4px 10px rgba(0, 0, 0, 0.3)';
            });
        });
    });

    // Optimize image hover animations
    document.querySelectorAll('.container .image-content img').forEach(img => {
        img.addEventListener('mouseenter', () => {
            requestAnimationFrame(() => {
                img.style.transform = 'translate3d(0, 0, 0) scale(1.05)';
                img.style.transition = 'transform 0.3s ease-out';
            });
        });
        
        img.addEventListener('mouseleave', () => {
            requestAnimationFrame(() => {
                img.style.transform = 'translate3d(0, 0, 0) scale(1)';
            });
        });
    });

    // Mobile Menu Toggle
    const menuIcon = document.querySelector('.menu-icon');
    const nav = document.querySelector('nav');
    const body = document.body;

    menuIcon.addEventListener('click', () => {
        menuIcon.classList.toggle('active');
        nav.classList.toggle('active');
        body.classList.toggle('menu-open');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menuIcon.contains(e.target) && !nav.contains(e.target)) {
            menuIcon.classList.remove('active');
            nav.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });

    // Close menu when clicking on a navigation link
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuIcon.classList.remove('active');
            nav.classList.remove('active');
            body.classList.remove('menu-open');
        });
    });
});
