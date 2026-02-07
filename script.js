// ==================== GLOBAL UTILITIES ====================
// Auto update copyright year
document.addEventListener('DOMContentLoaded', function() {
    const yearEl = document.getElementById('currentYear');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
});

// ==================== NAVIGATION & SCROLLING ====================
// Improved Smooth Scrolling
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
});

// Navbar scroll effect
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

if (navbar) {
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
        
        // Add shadow on scroll
        if (scrollTop > 50) {
            navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.boxShadow = 'none';
            navbar.style.background = 'white';
            navbar.style.backdropFilter = 'none';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Active nav link based on scroll position
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

window.addEventListener('scroll', function() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 70;
        
        if (window.scrollY >= (sectionTop - navbarHeight - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ==================== MARQUEE SECTION ====================
// Marquee drag to scroll functionality
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.marquee-container');
    if (slider) {
        let isDown = false;
        let startX;
        let scrollLeft;

        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.classList.add('active');
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });

        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.classList.remove('active');
        });

        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.classList.remove('active');
        });

        slider.addEventListener('mousemove', (e) => {
            if(!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2;
            slider.scrollLeft = scrollLeft - walk;
        });

        // Also add touch support for mobile
        slider.addEventListener('touchstart', (e) => {
            isDown = true;
            slider.classList.add('active');
            startX = e.touches[0].pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });

        slider.addEventListener('touchend', () => {
            isDown = false;
            slider.classList.remove('active');
        });

        slider.addEventListener('touchmove', (e) => {
            if(!isDown) return;
            e.preventDefault();
            const x = e.touches[0].pageX - slider.offsetLeft;
            const walk = (x - startX) * 2;
            slider.scrollLeft = scrollLeft - walk;
        });
    }

    // Marquee auto-scroll control
    const marqueeContent = document.querySelector('.marquee-content');
    if (marqueeContent) {
        // Pause animation on hover
        marqueeContent.addEventListener('mouseenter', () => {
            marqueeContent.style.animationPlayState = 'paused';
        });

        marqueeContent.addEventListener('mouseleave', () => {
            marqueeContent.style.animationPlayState = 'running';
        });

        // Also handle touch events for mobile
        marqueeContent.addEventListener('touchstart', () => {
            marqueeContent.style.animationPlayState = 'paused';
        });

        marqueeContent.addEventListener('touchend', () => {
            marqueeContent.style.animationPlayState = 'running';
        });
    }
});

// ==================== PORTFOLIO & GALLERY ====================
// Portfolio gallery hover effect
document.addEventListener('DOMContentLoaded', function() {
    const imageCards = document.querySelectorAll('.image-card');
    imageCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
    });

    // Image modal functionality
    const projectImages = document.querySelectorAll('.project-img');
    if (projectImages.length > 0) {
        const modalImage = document.getElementById('modalImage');
        const imageModal = new bootstrap.Modal(document.getElementById('imageModal'));

        projectImages.forEach(img => {
            img.addEventListener('click', function() {
                modalImage.src = this.src;
                modalImage.alt = this.alt;
                imageModal.show();
            });
        });
    }
});

// ==================== CONTACT FORM ====================
// Contact form handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: this.querySelector('input[type="text"]').value,
                email: this.querySelector('input[type="email"]').value,
                phone: this.querySelector('input[type="tel"]').value,
                service: this.querySelector('select').value,
                message: this.querySelector('textarea').value
            };
            
            // Simple validation
            if (!formData.name || !formData.email || !formData.message) {
                alert('Mohon lengkapi semua field yang wajib diisi!');
                return;
            }
            
            // Here you would normally send the data to a server
            console.log('Form data:', formData);
            
            // Show success message
            alert('Terima kasih! Pesan Anda telah berhasil dikirim. Kami akan menghubungi Anda segera.');
            
            // Reset form
            this.reset();
        });
    }
});

// ==================== TOGGLE BUTTONS ====================
// Toggle project buttons
document.addEventListener('DOMContentLoaded', function() {
    const toggleProjectBtn = document.getElementById('toggleProjectBtn');
    const toggleSelesaiBtn = document.getElementById('toggleSelesaiBtn');

    if (toggleProjectBtn) {
        toggleProjectBtn.addEventListener('click', function() {
            const icon = this.querySelector('.toggle-icon');
            const btnText = this.querySelector('#btnText');
            
            if (this.getAttribute('aria-expanded') === 'true') {
                btnText.textContent = 'Lihat Proyek Lainnya';
            } else {
                btnText.textContent = 'Tutup';
            }
        });
    }

    if (toggleSelesaiBtn) {
        toggleSelesaiBtn.addEventListener('click', function() {
            const toggleText = this.querySelector('.toggle-text');
            
            if (this.getAttribute('aria-expanded') === 'true') {
                toggleText.textContent = 'Lainnya';
            } else {
                toggleText.textContent = 'Tutup';
            }
        });
    }

    // Partner toggle button
    const partnerToggleButton = document.getElementById('partnerToggleButton');
    if (partnerToggleButton) {
        partnerToggleButton.addEventListener('click', function() {
            const icon = this.querySelector('i');
            if (this.getAttribute('aria-expanded') === 'true') {
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            } else {
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            }
        });
    }
});

// ==================== CAROUSELS ====================
// Enhanced carousel auto-play with pause on hover
document.addEventListener('DOMContentLoaded', function() {
    const carousels = document.querySelectorAll('.carousel');
    carousels.forEach(carousel => {
        // Skip dokumentasi carousel as it has special handling
        if (carousel.id === 'dokumentasiCarousel') return;
        
        const carouselInstance = new bootstrap.Carousel(carousel, {
            interval: 5000,
            wrap: true
        });
        
        // Pause on hover
        carousel.addEventListener('mouseenter', () => {
            carouselInstance.pause();
        });
        
        carousel.addEventListener('mouseleave', () => {
            carouselInstance.cycle();
        });

        // Pause on focus (for accessibility)
        carousel.addEventListener('focusin', () => {
            carouselInstance.pause();
        });

        carousel.addEventListener('focusout', () => {
            carouselInstance.cycle();
        });
    });
});

// ==================== ANIMATIONS & EFFECTS ====================
// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero-section');
    
    if (heroSection) {
        const heroContent = heroSection.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
    }
});

// Lazy loading for images
document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    if (lazyImages.length > 0) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    // If image has data-src attribute, use it
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                    }
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.1
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // Service cards animation on scroll
    const serviceCards = document.querySelectorAll('.service-card');
    if (serviceCards.length > 0) {
        const cardObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('fade-in');
                    }, index * 100);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        serviceCards.forEach(card => cardObserver.observe(card));
    }
});

// Video play on hover
document.addEventListener('DOMContentLoaded', function() {
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        video.addEventListener('mouseenter', function() {
            this.play().catch(e => console.log('Autoplay prevented:', e));
        });
        
        video.addEventListener('mouseleave', function() {
            this.pause();
            this.currentTime = 0;
        });

        // Also pause when video ends
        video.addEventListener('ended', function() {
            this.currentTime = 0;
        });
    });
});

// Counter animation for statistics (if needed)
function animateCounter(element, target, duration) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + '+';
        }
    }, 16);
}

// Initialize counters if they exist
document.addEventListener('DOMContentLoaded', function() {
    const counters = document.querySelectorAll('.counter');
    if (counters.length > 0) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.dataset.target);
                    animateCounter(entry.target, target, 2000);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => counterObserver.observe(counter));
    }
});

// ==================== BACK TO TOP BUTTON ====================
// Back to top button
document.addEventListener('DOMContentLoaded', function() {
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTop.className = 'btn btn-primary back-to-top';
    backToTop.style.position = 'fixed';
    backToTop.style.bottom = '30px';
    backToTop.style.right = '30px';
    backToTop.style.zIndex = '1000';
    backToTop.style.display = 'none';
    backToTop.style.width = '50px';
    backToTop.style.height = '50px';
    backToTop.style.borderRadius = '50%';
    backToTop.style.fontSize = '1.2rem';
    backToTop.style.boxShadow = '0 5px 15px rgba(40, 167, 69, 0.3)';
    backToTop.style.backgroundColor = 'var(--hijau-cio)';
    backToTop.style.borderColor = 'var(--hijau-cio)';
    backToTop.style.transition = 'all 0.3s ease';

    document.body.appendChild(backToTop);

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    backToTop.addEventListener('mouseenter', () => {
        backToTop.style.transform = 'translateY(-3px)';
        backToTop.style.boxShadow = '0 8px 20px rgba(40, 167, 69, 0.4)';
    });

    backToTop.addEventListener('mouseleave', () => {
        backToTop.style.transform = 'translateY(0)';
        backToTop.style.boxShadow = '0 5px 15px rgba(40, 167, 69, 0.3)';
    });

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.style.display = 'flex';
            backToTop.style.alignItems = 'center';
            backToTop.style.justifyContent = 'center';
        } else {
            backToTop.style.display = 'none';
        }
    });
});

// ==================== PRELOADER ====================
// Preloader (optional)
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
    
    // Add loaded class to body for transition effects
    document.body.classList.add('loaded');
});

// Add preloader HTML if needed
document.addEventListener('DOMContentLoaded', function() {
    const preloaderHTML = `
    <div class="preloader" style="
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: white;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    ">
        <div class="spinner-border" style="width: 3rem; height: 3rem; color: var(--hijau-cio);" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
    `;

    // Only add preloader if it doesn't exist
    if (!document.querySelector('.preloader')) {
        document.body.insertAdjacentHTML('afterbegin', preloaderHTML);
    }
});

// ==================== BOOTSTRAP COMPONENTS ====================
// Initialize Bootstrap tooltips
document.addEventListener('DOMContentLoaded', function() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Initialize Bootstrap popovers
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    const popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });
});

// ==================== DOKUMENTASI CAROUSEL ENHANCEMENT ====================
// Main dokumentasi carousel function
document.addEventListener('DOMContentLoaded', function() {
    const dokumentasiCarousel = document.getElementById('dokumentasiCarousel');
    
    if (dokumentasiCarousel) {
        // Inisialisasi Bootstrap Carousel
        const carousel = new bootstrap.Carousel(dokumentasiCarousel, {
            interval: 5000,
            wrap: true,
            touch: true,
            pause: 'hover'
        });
        
        // Tambah image counter
        const carouselItems = dokumentasiCarousel.querySelectorAll('.carousel-item');
        const totalImages = carouselItems.length;
        
        if (totalImages > 0) {
            // Buat image counter
            const imageCounter = document.createElement('div');
            imageCounter.className = 'image-counter';
            imageCounter.innerHTML = `<span id="currentImage">1</span> / ${totalImages}`;
            dokumentasiCarousel.querySelector('.carousel-inner').appendChild(imageCounter);
            
            // Update counter saat slide
            dokumentasiCarousel.addEventListener('slide.bs.carousel', function(event) {
                const currentIndex = event.to + 1;
                const currentImageElement = document.getElementById('currentImage');
                if (currentImageElement) {
                    currentImageElement.textContent = currentIndex;
                }
                
                // Tambah animasi fade
                const activeItem = carouselItems[event.to];
                if (activeItem) {
                    activeItem.classList.add('sliding');
                    setTimeout(() => {
                        activeItem.classList.remove('sliding');
                    }, 800);
                }
            });
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            const documentationSection = document.getElementById('documentation');
            if (documentationSection && documentationSection.contains(document.activeElement)) {
                switch(e.key) {
                    case 'ArrowLeft':
                        carousel.prev();
                        e.preventDefault();
                        break;
                    case 'ArrowRight':
                        carousel.next();
                        e.preventDefault();
                        break;
                    case 'Home':
                        carousel.to(0);
                        e.preventDefault();
                        break;
                    case 'End':
                        carousel.to(totalImages - 1);
                        e.preventDefault();
                        break;
                }
            }
        });
        
        // Fullscreen modal functionality
        const carouselImages = dokumentasiCarousel.querySelectorAll('.carousel-img-fixed-height');
        carouselImages.forEach(img => {
            img.style.cursor = 'zoom-in';
            
            img.addEventListener('click', function() {
                openFullscreenModal(this.src, this.alt);
            });
        });
        
        // Lazy loading untuk carousel images
        const lazyImages = dokumentasiCarousel.querySelectorAll('img[loading="lazy"]');
        if (lazyImages.length > 0) {
            const lazyImageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const lazyImage = entry.target;
                        
                        // Tambah loading class
                        lazyImage.classList.add('loading');
                        
                        // Simulasi loading
                        setTimeout(() => {
                            lazyImage.classList.remove('loading');
                            lazyImage.classList.add('loaded');
                            observer.unobserve(lazyImage);
                        }, 300);
                    }
                });
            }, {
                rootMargin: '100px 0px',
                threshold: 0.1
            });
            
            lazyImages.forEach(lazyImage => {
                lazyImageObserver.observe(lazyImage);
            });
        }
        
        // Auto-advance dengan manual control
        let autoAdvanceInterval;
        
        function startAutoAdvance() {
            autoAdvanceInterval = setInterval(() => {
                carousel.next();
            }, 5000);
        }
        
        function stopAutoAdvance() {
            clearInterval(autoAdvanceInterval);
        }
        
        // Start auto-advance
        startAutoAdvance();
        
        // Pause saat hover
        dokumentasiCarousel.addEventListener('mouseenter', stopAutoAdvance);
        dokumentasiCarousel.addEventListener('mouseleave', startAutoAdvance);
        
        // Pause saat touch untuk mobile
        dokumentasiCarousel.addEventListener('touchstart', stopAutoAdvance);
        dokumentasiCarousel.addEventListener('touchend', () => {
            setTimeout(startAutoAdvance, 3000);
        });
        
        // Swipe functionality untuk mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        dokumentasiCarousel.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        dokumentasiCarousel.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            
            if (touchStartX - touchEndX > swipeThreshold) {
                // Swipe left - next
                carousel.next();
            } else if (touchEndX - touchStartX > swipeThreshold) {
                // Swipe right - prev
                carousel.prev();
            }
        }
        
        // Tambah caption overlay ke images
        carouselItems.forEach((item, index) => {
            const img = item.querySelector('img');
            if (img) {
                // Buat caption overlay
                const captionOverlay = document.createElement('div');
                captionOverlay.className = 'caption-overlay';
                captionOverlay.innerHTML = `
                    <div class="caption-content">
                        <h6>Dokumentasi Pembangunan</h6>
                        <p>Gambar ${index + 1} dari ${totalImages}</p>
                    </div>
                `;
                item.appendChild(captionOverlay);
            }
        });
        
        // Tambah CSS untuk caption overlay
        if (!document.querySelector('#caption-overlay-style')) {
            const captionStyle = document.createElement('style');
            captionStyle.id = 'caption-overlay-style';
            captionStyle.textContent = `
                .caption-overlay {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    background: linear-gradient(transparent, rgba(0,0,0,0.7));
                    color: white;
                    padding: 20px;
                    transform: translateY(100%);
                    transition: transform 0.3s ease;
                    z-index: 5;
                }
                
                .carousel-item:hover .caption-overlay {
                    transform: translateY(0);
                }
                
                .caption-content h6 {
                    font-size: 0.9rem;
                    margin: 0;
                    color: var(--hijau-cio);
                    font-weight: 600;
                }
                
                .caption-content p {
                    font-size: 0.8rem;
                    margin: 5px 0 0 0;
                    opacity: 0.8;
                }
                
                .carousel-item.sliding {
                    animation: slideFade 0.8s ease;
                }
                
                @keyframes slideFade {
                    0% { opacity: 0.7; }
                    50% { opacity: 0.9; }
                    100% { opacity: 1; }
                }
            `;
            document.head.appendChild(captionStyle);
        }
        
        // Export carousel controls untuk penggunaan eksternal
        window.dokumentasiCarouselControls = {
            next: function() {
                carousel.next();
            },
            prev: function() {
                carousel.prev();
            },
            goTo: function(index) {
                carousel.to(index);
            },
            pause: function() {
                carousel.pause();
            },
            cycle: function() {
                carousel.cycle();
            }
        };
    }
});

// ==================== FULLSCREEN MODAL FUNCTION ====================
// Fullscreen Modal Function
function openFullscreenModal(imageSrc, imageAlt) {
    // Cek apakah modal sudah ada
    let modal = document.getElementById('imageModalFullscreen');
    
    if (!modal) {
        // Buat modal
        modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.id = 'imageModalFullscreen';
        modal.tabIndex = '-1';
        modal.innerHTML = `
            <div class="modal-dialog modal-dialog-centered modal-fullscreen">
                <div class="modal-content">
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    <div class="modal-body">
                        <img src="${imageSrc}" alt="${imageAlt}" class="img-fluid" id="fullscreenImage">
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        
        // Inisialisasi modal
        const modalInstance = new bootstrap.Modal(modal);
        
        // Close dengan ESC
        modal.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                modalInstance.hide();
            }
        });
        
        // Hapus dari DOM saat hidden
        modal.addEventListener('hidden.bs.modal', function() {
            modal.remove();
        });
        
        modalInstance.show();
        
        // Update image saat modal ditampilkan
        modal.addEventListener('shown.bs.modal', function() {
            const fullscreenImage = document.getElementById('fullscreenImage');
            if (fullscreenImage) {
                fullscreenImage.src = imageSrc;
                fullscreenImage.alt = imageAlt;
            }
        });
    } else {
        // Update modal yang sudah ada
        const fullscreenImage = document.getElementById('fullscreenImage');
        if (fullscreenImage) {
            fullscreenImage.src = imageSrc;
            fullscreenImage.alt = imageAlt;
        }
        
        const modalInstance = bootstrap.Modal.getInstance(modal);
        if (modalInstance) {
            modalInstance.show();
        } else {
            new bootstrap.Modal(modal).show();
        }
    }
}

// ==================== INITIALIZATION ====================
// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('PT CIO Website - Semua JavaScript telah diinisialisasi');
});

// ==================== WINDOW LOAD EVENT ====================
// Final initialization on window load
window.addEventListener('load', function() {
    // Cek apakah dokumentasi carousel berhasil diinisialisasi
    if (document.getElementById('dokumentasiCarousel')) {
        console.log('Dokumentasi Carousel berhasil diinisialisasi');
    }
});

// ==================== ERROR HANDLING ====================
// Global error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.message);
});

// ==================== RESPONSIVE HELPERS ====================
// Check mobile device
function isMobileDevice() {
    return (window.innerWidth <= 768) || 
           ('ontouchstart' in window) || 
           (navigator.maxTouchPoints > 0);
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ==================== UTILITY FUNCTIONS ====================
// Format number with commas
function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Capitalize first letter
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Generate random ID
function generateId(prefix = 'id') {
    return prefix + '-' + Math.random().toString(36).substr(2, 9);
}