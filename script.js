/**
 * PT CIO Website - Main JavaScript File
 * All functionality combined and optimized
 */

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

// ==================== DOKUMENTASI CAROUSEL ====================
// Simple and clean dokumentasi carousel
document.addEventListener('DOMContentLoaded', function() {
    const carouselElement = document.getElementById('dokumentasiCarousel');
    
    if (!carouselElement) {
        console.warn('Elemen dokumentasiCarousel tidak ditemukan');
        return;
    }

    // Destroy existing carousel instance if any
    const existingInstance = bootstrap.Carousel.getInstance(carouselElement);
    if (existingInstance) {
        existingInstance.dispose();
    }

    // Inisialisasi carousel dengan konfigurasi optimal
    const carousel = new bootstrap.Carousel(carouselElement, {
        interval: 3000,        // Ganti slide setiap 3 detik
        wrap: true,             // Loop terus menerus
        touch: true,            // Support touch gesture
        pause: 'hover',         // Pause saat hover
        keyboard: true          // Support keyboard navigation
    });

    // Fullscreen modal functionality
    const carouselImages = carouselElement.querySelectorAll('.carousel-img');
    carouselImages.forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function() {
            openFullscreenModal(this.src, this.alt);
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Cek apakah carousel dalam viewport
        const rect = carouselElement.getBoundingClientRect();
        const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (!isInViewport) return;

        switch(e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                carousel.prev();
                break;
            case 'ArrowRight':
                e.preventDefault();
                carousel.next();
                break;
        }
    });

    // Auto play dengan kontrol hover
    let isPaused = false;

    // Pause saat mouse masuk
    carouselElement.addEventListener('mouseenter', function() {
        carousel.pause();
        isPaused = true;
    });

    // Lanjutkan saat mouse keluar
    carouselElement.addEventListener('mouseleave', function() {
        carousel.cycle();
        isPaused = false;
    });

    // Touch events untuk mobile
    carouselElement.addEventListener('touchstart', function() {
        carousel.pause();
        isPaused = true;
    });

    carouselElement.addEventListener('touchend', function() {
        setTimeout(() => {
            carousel.cycle();
            isPaused = false;
        }, 3000);
    });

    // Visibility change (tab switch)
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            carousel.pause();
        } else {
            if (!isPaused) {
                carousel.cycle();
            }
        }
    });

    // Swipe functionality untuk mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    carouselElement.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    carouselElement.addEventListener('touchend', e => {
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

    console.log('✅ Dokumentasi Carousel berjalan otomatis');
});

// ==================== FULLSCREEN MODAL FUNCTION ====================
// Fullscreen Modal Function
function openFullscreenModal(imageSrc, imageAlt) {
    // Cek apakah modal sudah ada
    let modal = document.getElementById('imageModalFullscreen');
    
    if (!modal) {
        // Buat modal baru
        modal = document.createElement('div');
        modal.id = 'imageModalFullscreen';
        modal.className = 'modal fade';
        modal.tabIndex = '-1';
        modal.setAttribute('aria-hidden', 'true');
        modal.innerHTML = `
            <div class="modal-dialog modal-fullscreen">
                <div class="modal-content bg-dark">
                    <div class="modal-header border-0 position-absolute top-0 end-0 z-3">
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body d-flex align-items-center justify-content-center p-0">
                        <img src="${imageSrc}" alt="${imageAlt}" class="img-fluid" style="max-height: 90vh; max-width: 100%; object-fit: contain;">
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    } else {
        // Update modal yang sudah ada
        const modalImg = modal.querySelector('img');
        if (modalImg) {
            modalImg.src = imageSrc;
            modalImg.alt = imageAlt;
        }
    }

    // Inisialisasi dan tampilkan modal
    const modalInstance = new bootstrap.Modal(modal);
    modalInstance.show();

    // Hapus modal dari DOM setelah ditutup
    modal.addEventListener('hidden.bs.modal', function() {
        modal.remove();
    }, { once: true });
}

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
    
    // Preload carousel images
    const carouselElement = document.getElementById('dokumentasiCarousel');
    if (carouselElement) {
        preloadImages(carouselElement);
    }
});

// Fungsi untuk preload images
function preloadImages(carouselElement) {
    const images = carouselElement.querySelectorAll('.carousel-img');
    const imageUrls = Array.from(images).map(img => img.src);
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Add preloader HTML if needed
document.addEventListener('DOMContentLoaded', function() {
    // Cek apakah preloader sudah ada
    if (!document.querySelector('.preloader')) {
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
        document.body.insertAdjacentHTML('afterbegin', preloaderHTML);
    }
});

// ==================== BOOTSTRAP COMPONENTS ====================
// Initialize Bootstrap tooltips
document.addEventListener('DOMContentLoaded', function() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Initialize Bootstrap popovers
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });
});

// ==================== INITIALIZATION ====================
// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ PT CIO Website - Semua JavaScript siap');
});

// ==================== WINDOW LOAD EVENT ====================
// Final initialization on window load
window.addEventListener('load', function() {
    // Cek apakah dokumentasi carousel berhasil diinisialisasi
    if (document.getElementById('dokumentasiCarousel')) {
        console.log('✅ Dokumentasi Carousel berjalan otomatis');
    }
});

// ==================== ERROR HANDLING ====================
// Global error handling
window.addEventListener('error', function(e) {
    console.error('❌ JavaScript Error:', e.message);
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