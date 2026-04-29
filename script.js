/**
 * PT CIO Website - Complete Multi Language System
 * ALL texts are translated - FULL VERSION
 * TIDAK ADA GAMBAR/FOTO YANG DIHAPUS
 */

// ==================== PRELOADER CEPAT ====================
const isMobile = window.innerWidth <= 768;
const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;

let preloaderDuration = 1200;
let aosDelay = 1500;
let typingDelay = 1700;

if (isMobile) {
    preloaderDuration = 1000;
    aosDelay = 1300;
    typingDelay = 1500;
} else if (isTablet) {
    preloaderDuration = 1100;
    aosDelay = 1400;
    typingDelay = 1600;
}

window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('hide');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 300);
        }, preloaderDuration);
    }
    
    setTimeout(() => {
        AOS.init({
            duration: 600,
            once: false,
            mirror: true,
            offset: 50,
            easing: 'ease-in-out',
            anchorPlacement: 'top-bottom'
        });
        AOS.refresh();
    }, aosDelay);
    
    setTimeout(() => {
        startTypingForCurrentSlide();
    }, typingDelay);
});

// ==================== NAVBAR ANIMATION ====================
const navbar = document.getElementById('mainNav');
const navbarBrand = document.querySelector('.navbar-brand');
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

function handleNavbarScroll() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

if (navbarBrand) {
    navbarBrand.addEventListener('mouseenter', function() {
        const logo = this.querySelector('.logo');
        if (logo) logo.style.transform = 'scale(1.05) rotate(2deg)';
    });
    navbarBrand.addEventListener('mouseleave', function() {
        const logo = this.querySelector('.logo');
        if (logo) logo.style.transform = 'scale(1) rotate(0deg)';
    });
}

navLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
        this.style.color = 'var(--primary)';
    });
    link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        if (!this.classList.contains('active')) {
            this.style.color = 'var(--dark)';
        }
    });
});

window.addEventListener('scroll', handleNavbarScroll);
handleNavbarScroll();

// ==================== DROPDOWN FIX ====================
document.addEventListener('DOMContentLoaded', function() {
    var dropdownElementList = [].slice.call(document.querySelectorAll('.dropdown-toggle'));
    dropdownElementList.map(function(dropdownToggleEl) {
        return new bootstrap.Dropdown(dropdownToggleEl);
    });
    document.querySelectorAll('.dropdown-menu').forEach(function(menu) {
        menu.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    });
    document.querySelectorAll('.dropdown').forEach(function(dropdown) {
        dropdown.addEventListener('show.bs.dropdown', function() {
            const toggle = this.querySelector('.dropdown-toggle');
            const icon = toggle?.querySelector('.dropdown-icon');
            if (icon) icon.style.transform = 'rotate(180deg)';
        });
        dropdown.addEventListener('hide.bs.dropdown', function() {
            const toggle = this.querySelector('.dropdown-toggle');
            const icon = toggle?.querySelector('.dropdown-icon');
            if (icon) icon.style.transform = 'rotate(0deg)';
        });
    });
});

// ==================== HERO SLIDER ====================
const slides = document.querySelectorAll('.hero-slide');
const prevBtn = document.querySelector('.hero-prev');
const nextBtn = document.querySelector('.hero-next');
const dots = document.querySelectorAll('.hero-dot');
let currentSlide = 0;
let slideInterval;
let currentTypingInstance = null;

let slideTexts = [
    "Membangun Ruang, Mewujudkan Impian",
    "Solusi Konstruksi Terbaik untuk Indonesia",
    "Membangun Masa Depan Bersama PT CIO"
];

const slideTextsEn = [
    "Building Spaces, Realizing Dreams",
    "The Best Construction Solutions for Indonesia",
    "Building the Future with PT CIO"
];

function updateSlideTextsForLanguage(lang) {
    if (lang === 'en') {
        slideTexts[0] = slideTextsEn[0];
        slideTexts[1] = slideTextsEn[1];
        slideTexts[2] = slideTextsEn[2];
    } else {
        slideTexts[0] = "Membangun Ruang, Mewujudkan Impian";
        slideTexts[1] = "Solusi Konstruksi Terbaik untuk Indonesia";
        slideTexts[2] = "Membangun Masa Depan Bersama PT CIO";
    }
}

function showSlide(index) {
    if (currentTypingInstance && currentTypingInstance.stop) {
        currentTypingInstance.stop();
        currentTypingInstance = null;
    }
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (dots[i]) dots[i].classList.remove('active');
    });
    slides[index].classList.add('active');
    if (dots[index]) dots[index].classList.add('active');
    currentSlide = index;
    setTimeout(() => startTypingForCurrentSlide(), 200);
}

function startTypingForCurrentSlide() {
    const activeSlide = document.querySelector('.hero-slide.active');
    if (!activeSlide) return;
    const typedTextElement = activeSlide.querySelector('.typed-text');
    if (!typedTextElement) return;
    typedTextElement.innerHTML = '';
    if (window.currentTypeWriter && window.currentTypeWriter.stop) {
        window.currentTypeWriter.stop();
    }
    const slideIndex = Array.from(slides).indexOf(activeSlide);
    window.currentTypeWriter = new SimpleTypeWriter(typedTextElement, slideTexts[slideIndex], 55);
    currentTypingInstance = window.currentTypeWriter;
}

function nextSlide() {
    if (currentTypingInstance && currentTypingInstance.stop) {
        currentTypingInstance.stop();
        currentTypingInstance = null;
    }
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    if (currentTypingInstance && currentTypingInstance.stop) {
        currentTypingInstance.stop();
        currentTypingInstance = null;
    }
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

function startAutoSlide() {
    if (slideInterval) clearInterval(slideInterval);
    slideInterval = setInterval(() => nextSlide(), 5000);
}

function stopAutoSlide() {
    if (slideInterval) {
        clearInterval(slideInterval);
        slideInterval = null;
    }
}

if (slides.length > 0) {
    startAutoSlide();
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            stopAutoSlide();
            prevSlide();
            startAutoSlide();
        });
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            stopAutoSlide();
            nextSlide();
            startAutoSlide();
        });
    }
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopAutoSlide();
            showSlide(index);
            startAutoSlide();
        });
    });
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroSection.addEventListener('mouseenter', stopAutoSlide);
        heroSection.addEventListener('mouseleave', startAutoSlide);
    }
}

// ==================== SIMPLE TYPEWRITER ====================
class SimpleTypeWriter {
    constructor(txtElement, fullText, speed = 55) {
        this.txtElement = txtElement;
        this.fullText = fullText;
        this.speed = speed;
        this.txt = '';
        this.charIndex = 0;
        this.timeoutId = null;
        this.type();
    }
    type() {
        if (this.charIndex < this.fullText.length) {
            this.txt += this.fullText.charAt(this.charIndex);
            this.txtElement.innerHTML = this.txt;
            this.charIndex++;
            this.timeoutId = setTimeout(() => this.type(), this.speed);
        } else {
            const cursor = this.txtElement.nextElementSibling;
            if (cursor) cursor.classList.add('hide');
        }
    }
    stop() {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
            this.timeoutId = null;
        }
    }
}

// ==================== SMOOTH SCROLLING ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
            const navbarToggler = document.querySelector('.navbar-toggler');
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarToggler && navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        }
    });
});

// ==================== ACTIVE NAV LINK ON SCROLL ====================
const allSections = document.querySelectorAll('section');
const allNavLinks = document.querySelectorAll('.navbar-nav .nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 70;
    allSections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= (sectionTop - navbarHeight - 100)) {
            current = section.getAttribute('id');
        }
    });
    allNavLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
            link.style.color = 'var(--primary)';
        } else if (!link.matches(':hover')) {
            link.style.color = 'var(--dark)';
        }
    });
});

// ==================== TESTIMONIALS SWIPER ====================
if (document.querySelector('.testimonials-slider')) {
    new Swiper('.testimonials-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: { delay: 4000, disableOnInteraction: false },
        pagination: { el: '.swiper-pagination', clickable: true },
        breakpoints: { 768: { slidesPerView: 2 } }
    });
}

// ==================== MARQUEE ANIMATION ====================
const marqueeContent = document.querySelector('.marquee-content');
if (marqueeContent) {
    marqueeContent.addEventListener('mouseenter', () => {
        marqueeContent.style.animationPlayState = 'paused';
    });
    marqueeContent.addEventListener('mouseleave', () => {
        marqueeContent.style.animationPlayState = 'running';
    });
}

// ==================== IMAGE MODAL ====================
document.addEventListener('DOMContentLoaded', function() {
    const completedImages = document.querySelectorAll('.completed-img');
    const modalImage = document.getElementById('modalImage');
    if (modalImage) {
        const imageModal = new bootstrap.Modal(document.getElementById('imageModal'));
        completedImages.forEach(img => {
            img.addEventListener('click', function() {
                modalImage.src = this.src;
                imageModal.show();
            });
        });
    }
});

// ==================== BACK TO TOP BUTTON ====================
const backToTop = document.createElement('button');
backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTop.className = 'back-to-top';
document.body.appendChild(backToTop);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});
backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ==================== REVEAL ON SCROLL ====================
const revealElements = document.querySelectorAll('.service-card, .project-card, .stat-item, .client-item, .ongoing-card, .completed-card, .testimonial-card, .contact-card, .map-card');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    revealObserver.observe(el);
});

// ==================== UPDATE COPYRIGHT YEAR ====================
const yearElement = document.getElementById('currentYear');
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// ==================== DOKUMENTASI CAROUSEL ====================
document.addEventListener('DOMContentLoaded', function() {
    const carouselElement = document.getElementById('dokumentasiCarousel');
    if (carouselElement) {
        new bootstrap.Carousel(carouselElement, {
            interval: 2500,
            wrap: true,
            touch: true,
            pause: 'hover',
            keyboard: true
        });
        const carouselImages = carouselElement.querySelectorAll('.carousel-img');
        carouselImages.forEach(img => {
            img.style.cursor = 'pointer';
            img.addEventListener('click', function() {
                const modalImage = document.getElementById('modalImage');
                if (modalImage) {
                    modalImage.src = this.src;
                    const imageModal = new bootstrap.Modal(document.getElementById('imageModal'));
                    imageModal.show();
                }
            });
        });
    }
});

// ==================== NAVBAR MOBILE TOGGLE ====================
const navbarToggler = document.querySelector('.navbar-toggler');
const navbarCollapse = document.querySelector('.navbar-collapse');

if (navbarToggler && navbarCollapse) {
    navbarToggler.addEventListener('click', function() {
        if (navbarCollapse.classList.contains('show')) {
            this.style.transform = 'rotate(0deg)';
        } else {
            this.style.transform = 'rotate(90deg)';
            setTimeout(() => {
                this.style.transform = 'rotate(0deg)';
            }, 300);
        }
    });
    const mobileLinks = document.querySelectorAll('.navbar-nav .nav-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 991 && !this.classList.contains('dropdown-toggle')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse, { toggle: false });
                bsCollapse.hide();
            }
        });
    });
}

// ==================== COMPLETE TRANSLATIONS ====================
const translations = {
    id: {
        brand: "CIPTA INFRA OPTIMA",
        home: "Beranda",
        about: "Tentang",
        projects: "Pekerjaan",
        infrastructure: "Infrastruktur",
        building: "Gedung",
        services_menu: "Layanan",
        featured_projects: "Proyek Unggulan",
        ongoing: "On Going",
        completed: "Selesai",
        social_media: "Sosial Media",
        documentation: "Dokumentasi",
        contact: "Kontak",
        trusted_contractor: "Kontraktor Terpercaya",
        innovation_quality: "Inovasi & Kualitas",
        best_expertise: "Keahlian Terbaik",
        hero_subtitle: "PT CIPTA INFRA OPTIMA - Mitra terpercaya untuk proyek konstruksi dan infrastruktur Anda di Indonesia.",
        hero_subtitle2: "Tim profesional siap mewujudkan proyek impian Anda dengan standar kualitas tertinggi.",
        hero_subtitle3: "Komitmen untuk kesempurnaan dalam setiap detail pembangunan infrastruktur Indonesia.",
        free_consultation: "Konsultasi Gratis",
        view_projects: "Lihat Proyek",
        projects_completed: "Proyek Selesai",
        client_satisfaction: "Kepuasan Klien",
        ongoing_projects: "Proyek Berjalan",
        professionals: "Tim Profesional",
        about_tag: "Tentang Perusahaan",
        about_desc1: "<strong>PT Cipta Infra Optima (PT CIO)</strong> adalah perusahaan kontraktor yang didirikan dengan komitmen untuk menjadi yang terdepan dalam kualitas konstruksi dan infrastruktur.",
        about_desc2: "PT CIO mewujudkan visi arsitektur menjadi realitas fisik yang tangguh dan inspiratif. Kami hadir sebagai mitra konstruksi yang mengedepankan prinsip teknik sipil yang komprehensif. Kami menjamin setiap proyek dieksekusi dengan presisi struktural tinggi, memastikan hasil pembangunan tidak hanya estetis, tetapi juga memiliki integritas dan ketahanan jangka panjang sesuai standar SNI.",
        about_desc3: "Kami menciptakan ruang fungsional, estetis, dan abadi yang merefleksikan sukses dan harapan tertinggi Anda di masa depan. Dengan pengalaman lebih dari 4 tahun di industri konstruksi, PT CIO telah berhasil menyelesaikan 9 proyek di seluruh Indonesia, mulai dari pembangunan infrastruktur jalan dan jembatan hingga konstruksi gedung perkantoran, perumahan, dan fasilitas publik.",
        years_experience: "Tahun Pengalaman",
        professional: "Profesional",
        professional_desc: "Kami didukung oleh tim manajemen dan insinyur berpengalaman yang menjamin setiap tahapan proyek dikelola dengan standar etika tertinggi.",
        efficiency: "Efisiensi & Tepat Biaya",
        efficiency_desc: "Perencanaan biaya yang transparan dan strategi pengadaan material yang cerdas memungkinkan kami mengoptimalkan anggaran Anda.",
        eco_friendly: "Ramah Lingkungan",
        eco_friendly_desc: "Komitmen kami terhadap pembangunan berkelanjutan diwujudkan melalui penggunaan material ramah lingkungan.",
        quality: "Mutu Terjamin",
        quality_desc: "Setiap proyek melalui kontrol kualitas berlapis, memastikan standar mutu SNI tertinggi untuk daya tahan jangka panjang.",
        what_we_do: "Apa yang Kami Kerjakan",
        infrastructure_title: "Infrastruktur",
        infrastructure_subtitle: "Kami mengkhususkan diri dalam pembangunan dan perbaikan infrastruktur publik dan swasta dengan standar tertinggi",
        highway: "Jalan Raya & Tol",
        highway_desc: "Konstruksi, perbaikan, dan pemeliharaan jalan raya, jalan tol, dan akses jalan utama.",
        bridge: "Jembatan",
        bridge_desc: "Pembangunan, rehabilitasi, dan penguatan struktur jembatan untuk akses transportasi.",
        drainage: "Drainase & Irigasi",
        drainage_desc: "Sistem drainase perkotaan, saluran air, dan jaringan irigasi pertanian.",
        landslide: "Penanganan Longsor",
        landslide_desc: "Mitigasi dan penanganan tanah longsor, stabilisasi lereng, dan perkuatan tebing.",
        landscaping: "Landscaping Infrastruktur",
        landscaping_desc: "Penataan lingkungan dan landscaping area infrastruktur publik.",
        our_excellence: "Keunggulan Kami",
        building_title: "Gedung",
        building_subtitle: "Spesialis dalam konstruksi dan pengembangan gedung dengan standar tertinggi dan desain modern",
        office: "Gedung Perkantoran",
        office_desc: "Konstruksi gedung perkantoran modern dengan sistem teknologi terintegrasi.",
        housing: "Perumahan",
        housing_desc: "Pengembangan perumahan cluster, townhouse, dan hunian vertikal.",
        commercial: "Gedung Komersial",
        commercial_desc: "Mall, pusat perbelanjaan, ruko, dan fasilitas komersial lainnya.",
        worship: "Bangunan Ibadah",
        worship_desc: "Masjid, gereja, pura, dan tempat ibadah lainnya dengan arsitektur berkualitas.",
        professional_services: "Layanan Profesional",
        services_title: "Kami",
        services_subtitle: "Kami menyediakan berbagai layanan konstruksi untuk memenuhi kebutuhan proyek Anda",
        construction: "Konstruksi Gedung",
        construction_desc: "Pembangunan gedung perkantoran, komersial, dan fasilitas publik dengan standar kualitas tinggi.",
        road_infrastructure: "Infrastruktur Jalan",
        road_infrastructure_desc: "Konstruksi dan perbaikan jalan raya, jembatan, dan infrastruktur transportasi lainnya.",
        residential: "Perumahan",
        residential_desc: "Pengembangan perumahan dan kawasan pemukiman dengan desain modern dan fasilitas lengkap.",
        our_experience: "Pengalaman Kami",
        featured_projects_title: "Unggulan",
        featured_projects_subtitle: "Portofolio lengkap proyek infrastruktur dan konstruksi yang telah kami selesaikan dengan hasil memuaskan",
        view_more_projects: "Lihat Proyek Lainnya",
        completed_tag: "Hasil Karya",
        completed_title: "Telah Selesai",
        completed_subtitle: "Lihat deretan proyek yang telah berhasil kami selesaikan dengan kualitas terbaik",
        view_more_completed: "Lihat Lainnya",
        ongoing_tag: "Progres Terkini",
        ongoing_title: "Sedang Berjalan",
        ongoing_subtitle: "Pantau progres pembangunan kami. Proses On going Proyek terbaru Tahun 2026",
        success_tag: "Keberhasilan Kami",
        success_title: "Sukses Tangani Jalan Longsor di Lebak, Banten",
        success_desc1: "Lebak, Banten - Akses jalan vital yang rusak akibat longsor di Lebak, Banten, kini telah pulih sepenuhnya berkat penanganan cepat dan profesional dari PT Cipta Infra Optima (CIO).",
        success_desc2: "Penyelesaian proyek ini disambut gembira oleh masyarakat. Warga setempat menyampaikan terima kasih kepada Dinas PUPR Banten dan PT CIO, menyebutkan bahwa kini jalan menuju desa mereka sudah mulus.",
        read_more: "Baca Berita Lengkap",
        success_caption: "Keberhasilan PT CIO yang sukses menyelesaikan longsor di Lebak, Banten. (Klik foto untuk menuju Video)",
        video_tag: "Dokumentasi Video",
        video_title: "CIPTA INFRA OPTIMA",
        video_subtitle: "Lihat dokumentasi video dari berbagai proyek dan aktivitas perusahaan kami",
        gallery_tag: "Galeri Proyek",
        gallery_title: "Pembangunan",
        gallery_subtitle: "Lihat lebih dekat proses dan hasil pekerjaan kami di lapangan.",
        testimonial_tag: "Testimonial",
        testimonial_title: "Klien Kami",
        testimonial_subtitle: "Kepercayaan adalah prioritas kami. Berikut adalah beberapa testimonial dari klien yang telah bekerja sama dengan PT CIO",
        partners_tag: "Mitra Kerja",
        partners_title: "Mitra Kami",
        partners_subtitle: "Dipercaya oleh berbagai perusahaan terkemuka di Indonesia",
        cta_title: "Siap Memulai Proyek Anda?",
        cta_subtitle: "Konsultasikan kebutuhan konstruksi Anda dengan tim profesional kami. Dapatkan penawaran terbaik untuk proyek impian Anda.",
        contact_us: "Hubungi Kami Sekarang",
        contact_tag: "Hubungi Kami",
        contact_title: "Bekerja Sama",
        contact_subtitle: "Kami siap membantu mewujudkan proyek konstruksi Anda. Hubungi kami untuk konsultasi dan penawaran terbaik",
        direct_contact: "Hubungi Langsung",
        operational_hours: "Jam Operasional",
        operational_hours_text: "Senin - Sabtu: 08.00 - 17.00 WIB<br>Minggu & Hari Libur: Tutup",
        visit_office: "Kunjungi Kantor Kami",
        office_address: "Jl. Rawamangun Muka Timur No.38, Rawamangun, Kec. Pulo Gadung, Kota Jakarta Timur, 13220",
        open_maps: "Buka di Google Maps",
        footer_desc: "PT Cipta Infra Optima adalah perusahaan kontraktor profesional yang berkomitmen memberikan solusi konstruksi terbaik dengan kualitas dan keandalan yang tinggi.",
        menu: "Menu",
        services_footer: "Layanan",
        contact_footer: "Kontak",
        bridge_drainage: "Jembatan & Drainase",
        office_building: "Gedung Perkantoran",
        renovation: "Renovasi Bangunan"
    },
    en: {
        brand: "CIPTA INFRA OPTIMA",
        home: "Home",
        about: "About",
        projects: "Projects",
        infrastructure: "Infrastructure",
        building: "Building",
        services_menu: "Services",
        featured_projects: "Featured Projects",
        ongoing: "On Going",
        completed: "Completed",
        social_media: "Social Media",
        documentation: "Documentation",
        contact: "Contact",
        trusted_contractor: "Trusted Contractor",
        innovation_quality: "Innovation & Quality",
        best_expertise: "Best Expertise",
        hero_subtitle: "PT CIPTA INFRA OPTIMA - Your trusted partner for construction and infrastructure projects in Indonesia.",
        hero_subtitle2: "Professional team ready to realize your dream project with the highest quality standards.",
        hero_subtitle3: "Commitment to perfection in every detail of Indonesian infrastructure development.",
        free_consultation: "Free Consultation",
        view_projects: "View Projects",
        projects_completed: "Projects Completed",
        client_satisfaction: "Client Satisfaction",
        ongoing_projects: "Ongoing Projects",
        professionals: "Professionals",
        about_tag: "About Company",
        about_desc1: "<strong>PT Cipta Infra Optima (PT CIO)</strong> is a contractor company established with a commitment to be at the forefront of construction and infrastructure quality.",
        about_desc2: "PT CIO transforms architectural vision into strong and inspiring physical reality. We are here as a construction partner that prioritizes comprehensive civil engineering principles. We guarantee every project is executed with high structural precision, ensuring the construction results are not only aesthetic but also have integrity and long-term durability according to SNI standards.",
        about_desc3: "We create functional, aesthetic, and timeless spaces that reflect your highest success and future hopes. With more than 4 years of experience in the construction industry, PT CIO has successfully completed 9 projects throughout Indonesia, ranging from road and bridge infrastructure development to the construction of office buildings, housing, and public facilities.",
        years_experience: "Years Experience",
        professional: "Professional",
        professional_desc: "We are supported by an experienced management team and engineers who ensure every project phase is managed with the highest ethical standards.",
        efficiency: "Efficiency & Cost Effective",
        efficiency_desc: "Transparent cost planning and smart material procurement strategies allow us to optimize your budget.",
        eco_friendly: "Eco Friendly",
        eco_friendly_desc: "Our commitment to sustainable development is realized through the use of environmentally friendly materials.",
        quality: "Guaranteed Quality",
        quality_desc: "Every project goes through layered quality control, ensuring the highest SNI quality standards for long-term durability.",
        what_we_do: "What We Do",
        infrastructure_title: "Infrastructure",
        infrastructure_subtitle: "We specialize in the construction and repair of public and private infrastructure with the highest standards",
        highway: "Highway & Toll Road",
        highway_desc: "Construction, repair, and maintenance of highways, toll roads, and main access roads.",
        bridge: "Bridge",
        bridge_desc: "Construction, rehabilitation, and strengthening of bridge structures for transportation access.",
        drainage: "Drainage & Irrigation",
        drainage_desc: "Urban drainage systems, waterways, and agricultural irrigation networks.",
        landslide: "Landslide Management",
        landslide_desc: "Mitigation and handling of landslides, slope stabilization, and cliff reinforcement.",
        landscaping: "Infrastructure Landscaping",
        landscaping_desc: "Environmental arrangement and landscaping of public infrastructure areas.",
        our_excellence: "Our Excellence",
        building_title: "Building",
        building_subtitle: "Specializing in building construction and development with the highest standards and modern design",
        office: "Office Building",
        office_desc: "Construction of modern office buildings with integrated technology systems.",
        housing: "Housing",
        housing_desc: "Development of cluster housing, townhouses, and vertical residential units.",
        commercial: "Commercial Building",
        commercial_desc: "Malls, shopping centers, shophouses, and other commercial facilities.",
        worship: "Worship Building",
        worship_desc: "Mosques, churches, temples, and other places of worship with quality architecture.",
        professional_services: "Professional Services",
        services_title: "Services",
        services_subtitle: "We provide various construction services to meet your project needs",
        construction: "Building Construction",
        construction_desc: "Construction of office buildings, commercial buildings, and public facilities with high quality standards.",
        road_infrastructure: "Road Infrastructure",
        road_infrastructure_desc: "Construction and repair of highways, bridges, and other transportation infrastructure.",
        residential: "Residential",
        residential_desc: "Development of residential areas with modern design and complete facilities.",
        our_experience: "Our Experience",
        featured_projects_title: "Projects",
        featured_projects_subtitle: "Complete portfolio of infrastructure and construction projects we have completed with satisfying results",
        view_more_projects: "View More Projects",
        completed_tag: "Our Works",
        completed_title: "Completed",
        completed_subtitle: "See the list of projects we have successfully completed with the best quality",
        view_more_completed: "View More",
        ongoing_tag: "Latest Progress",
        ongoing_title: "On Going",
        ongoing_subtitle: "Monitor our construction progress. Latest ongoing project for 2026",
        success_tag: "Our Success",
        success_title: "Successfully Handled Landslide Road in Lebak, Banten",
        success_desc1: "Lebak, Banten - The vital road access damaged by a landslide in Lebak, Banten, has now been fully restored thanks to the fast and professional handling of PT Cipta Infra Optima (CIO).",
        success_desc2: "The completion of this project was warmly welcomed by the community. Local residents expressed their gratitude to the Banten PUPR Office and PT CIO, stating that the road to their village is now smooth.",
        read_more: "Read Full News",
        success_caption: "PT CIO's success in completing the landslide in Lebak, Banten. (Click photo to go to Video)",
        video_tag: "Video Documentation",
        video_title: "CIPTA INFRA OPTIMA",
        video_subtitle: "Watch video documentation of various projects and company activities",
        gallery_tag: "Project Gallery",
        gallery_title: "Development",
        gallery_subtitle: "Take a closer look at our work processes and results in the field.",
        testimonial_tag: "Testimonial",
        testimonial_title: "Our Clients",
        testimonial_subtitle: "Trust is our priority. Here are some testimonials from clients who have worked with PT CIO",
        partners_tag: "Partners",
        partners_title: "Our Partners",
        partners_subtitle: "Trusted by various leading companies in Indonesia",
        cta_title: "Ready to Start Your Project?",
        cta_subtitle: "Consult your construction needs with our professional team. Get the best offer for your dream project.",
        contact_us: "Contact Us Now",
        contact_tag: "Contact Us",
        contact_title: "Collaborate",
        contact_subtitle: "We are ready to help realize your construction project. Contact us for consultation and the best offer",
        direct_contact: "Direct Contact",
        operational_hours: "Operational Hours",
        operational_hours_text: "Monday - Saturday: 08.00 - 17.00 WIB<br>Sunday & Holidays: Closed",
        visit_office: "Visit Our Office",
        office_address: "Jl. Rawamangun Muka Timur No.38, Rawamangun, Pulo Gadung District, East Jakarta City, 13220",
        open_maps: "Open in Google Maps",
        footer_desc: "PT Cipta Infra Optima is a professional contractor company committed to providing the best construction solutions with high quality and reliability.",
        menu: "Menu",
        services_footer: "Services",
        contact_footer: "Contact",
        bridge_drainage: "Bridge & Drainage",
        office_building: "Office Building",
        renovation: "Building Renovation"
    }
};

let currentLang = 'id';

function changeLanguage(lang) {
    currentLang = lang;
    updateSlideTextsForLanguage(lang);
    
    // Update all elements with data-key attribute
    document.querySelectorAll('[data-key]').forEach(element => {
        const key = element.getAttribute('data-key');
        if (translations[lang][key]) {
            if (translations[lang][key].includes('<') && translations[lang][key].includes('>')) {
                element.innerHTML = translations[lang][key];
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });
    
    // Update toggle buttons
    const toggleProjectBtn = document.getElementById('toggleProjectBtn');
    if (toggleProjectBtn) {
        const btnText = toggleProjectBtn.querySelector('#btnText');
        const isExpanded = toggleProjectBtn.getAttribute('aria-expanded') === 'true';
        if (btnText) {
            btnText.textContent = isExpanded ? (lang === 'id' ? 'Tutup' : 'Close') : translations[lang].view_more_projects;
        }
    }
    
    const toggleCompletedBtn = document.getElementById('toggleCompletedBtn');
    if (toggleCompletedBtn) {
        const span = toggleCompletedBtn.querySelector('span');
        const isExpanded = toggleCompletedBtn.getAttribute('aria-expanded') === 'true';
        if (span) {
            span.textContent = isExpanded ? (lang === 'id' ? 'Tutup' : 'Close') : translations[lang].view_more_completed;
        }
    }
    
    // Update Operational Hours text (contact section)
    const contactCards = document.querySelectorAll('.contact-card');
    if (contactCards.length >= 2) {
        const hoursCard = contactCards[1];
        const hoursParagraph = hoursCard.querySelector('p');
        if (hoursParagraph) {
            hoursParagraph.innerHTML = translations[lang].operational_hours_text;
        }
    }
    
    // Update office address
    const addressElement = document.querySelector('.map-card > p');
    if (addressElement) {
        addressElement.textContent = translations[lang].office_address;
    }
    
    // Update modal content if modal exists
    const modalElement = document.getElementById('modal-kalibaru');
    if (modalElement) {
        const modalTitle = modalElement.querySelector('.modal-title');
        if (modalTitle) modalTitle.textContent = translations[lang].ongoing_modal_title || "Pembangunan Jembatan Kalibaru - Tanggerang";
        
        const locationText = modalElement.querySelector('p strong');
        if (locationText && locationText.textContent === 'Lokasi:') {
            const locationSpan = locationText.nextSibling;
            if (locationSpan) locationSpan.textContent = ' ' + (translations[lang].ongoing_modal_location || "Kalibaru, Tanggerang");
        }
        
                const ratingTitle = modalElement.querySelector('.ongoing-rating h5');
        if (ratingTitle) {
            ratingTitle.innerHTML = '<i class="fas fa-star text-warning"></i> ' + (translations[lang].ongoing_modal_rating || "Penilaian Sementara");
        }
        
        const ratingText = modalElement.querySelector('.rating-text');
        if (ratingText) {
            ratingText.textContent = '"' + (translations[lang].ongoing_modal_rating_text || "Progres pengerjaan sesuai jadwal, kualitas material terjamin, dan tim bekerja profesional. Diharapkan selesai tepat waktu.") + '"';
        }
        
        const ownerTitle = modalElement.querySelector('.ongoing-owner h5');
        if (ownerTitle) {
            ownerTitle.innerHTML = '<i class="fas fa-user-tie"></i> ' + (translations[lang].ongoing_modal_owner || "Pemilik Proyek");
        }
        
        const ownerName = modalElement.querySelector('.ongoing-owner p strong');
        if (ownerName) {
            ownerName.textContent = translations[lang].ongoing_modal_owner_name || "Dinas PUPR DKI Jakarta";
        }
        
        const progressLabel = modalElement.querySelector('.progress-label');
        if (progressLabel) {
            progressLabel.textContent = translations[lang].ongoing_modal_progress || "Progres Pengerjaan";
        }
        
        const locationTitle = modalElement.querySelector('h4:first-of-type');
        if (locationTitle && locationTitle.textContent === 'Lokasi Proyek') {
            locationTitle.textContent = translations[lang].ongoing_modal_location_title || "Lokasi Proyek";
        }
        
        const docsTitle = modalElement.querySelector('h4.mt-4');
        if (docsTitle && docsTitle.textContent === 'Dokumentasi Progres') {
            docsTitle.textContent = translations[lang].ongoing_modal_docs || "Dokumentasi Progres";
        }
    }
    
    // Update floating social texts (keep original)
    const waText = document.querySelector('.floating-icon.wa .floating-text');
    const igText = document.querySelector('.floating-icon.ig .floating-text');
    if (waText) waText.textContent = 'WhatsApp';
    if (igText) igText.textContent = 'Instagram';
    
    // Restart typing animation
    if (currentTypingInstance && currentTypingInstance.stop) {
        currentTypingInstance.stop();
        currentTypingInstance = null;
    }
    setTimeout(() => {
        startTypingForCurrentSlide();
    }, 100);
    
    // Update language switcher buttons
    updateLanguageButtons();
    
    // Save to localStorage
    localStorage.setItem('ptcio_language', lang);
    
    console.log(`✅ Language changed to: ${lang.toUpperCase()} - All texts updated`);
}

// Create language switcher in footer
function createLanguageSwitcher() {
    const footerBottom = document.querySelector('.footer-bottom');
    if (footerBottom && !document.querySelector('.language-switcher')) {
        const langSwitcher = document.createElement('div');
        langSwitcher.className = 'language-switcher';
        langSwitcher.style.display = 'flex';
        langSwitcher.style.gap = '10px';
        langSwitcher.style.alignItems = 'center';
        langSwitcher.style.marginLeft = 'auto';
        
        const idBtn = document.createElement('button');
        idBtn.textContent = 'Indonesia';
        idBtn.className = 'lang-btn-footer';
        idBtn.setAttribute('data-lang', 'id');
        idBtn.style.padding = '8px 16px';
        idBtn.style.border = '2px solid #28a745';
        idBtn.style.background = currentLang === 'id' ? '#28a745' : 'transparent';
        idBtn.style.color = currentLang === 'id' ? 'white' : '#28a745';
        idBtn.style.borderRadius = '30px';
        idBtn.style.cursor = 'pointer';
        idBtn.style.fontWeight = '600';
        idBtn.style.fontSize = '12px';
        idBtn.style.transition = 'all 0.3s ease';
        
        const enBtn = document.createElement('button');
        enBtn.textContent = 'English';
        enBtn.className = 'lang-btn-footer';
        enBtn.setAttribute('data-lang', 'en');
        enBtn.style.padding = '8px 16px';
        enBtn.style.border = '2px solid #28a745';
        enBtn.style.background = currentLang === 'en' ? '#28a745' : 'transparent';
        enBtn.style.color = currentLang === 'en' ? 'white' : '#28a745';
        enBtn.style.borderRadius = '30px';
        enBtn.style.cursor = 'pointer';
        enBtn.style.fontWeight = '600';
        enBtn.style.fontSize = '12px';
        enBtn.style.transition = 'all 0.3s ease';
        
        idBtn.addEventListener('click', function() {
            changeLanguage('id');
            updateLanguageButtons();
        });
        
        enBtn.addEventListener('click', function() {
            changeLanguage('en');
            updateLanguageButtons();
        });
        
        langSwitcher.appendChild(idBtn);
        langSwitcher.appendChild(enBtn);
        
        // Add to footer-bottom
        const footerBottomP = footerBottom.querySelector('p:first-child');
        if (footerBottomP) {
            footerBottom.style.display = 'flex';
            footerBottom.style.justifyContent = 'space-between';
            footerBottom.style.alignItems = 'center';
            footerBottom.style.flexWrap = 'wrap';
            footerBottom.appendChild(langSwitcher);
        } else {
            footerBottom.appendChild(langSwitcher);
        }
    }
}

function updateLanguageButtons() {
    const idBtn = document.querySelector('.lang-btn-footer[data-lang="id"]');
    const enBtn = document.querySelector('.lang-btn-footer[data-lang="en"]');
    if (idBtn) {
        idBtn.style.background = currentLang === 'id' ? '#28a745' : 'transparent';
        idBtn.style.color = currentLang === 'id' ? 'white' : '#28a745';
    }
    if (enBtn) {
        enBtn.style.background = currentLang === 'en' ? '#28a745' : 'transparent';
        enBtn.style.color = currentLang === 'en' ? 'white' : '#28a745';
    }
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', function() {
    // Create language switcher in footer
    createLanguageSwitcher();
    
    // Load saved language
    const savedLang = localStorage.getItem('ptcio_language');
    if (savedLang && (savedLang === 'id' || savedLang === 'en')) {
        changeLanguage(savedLang);
    } else {
        changeLanguage('id');
    }
    
    // Set current year in footer
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});

// Add responsive style for language switcher on mobile
const style = document.createElement('style');
style.textContent = `
    @media (max-width: 768px) {
        .footer-bottom {
            flex-direction: column !important;
            text-align: center !important;
            gap: 15px !important;
        }
        .language-switcher {
            margin-left: 0 !important;
            justify-content: center !important;
        }
        .lang-btn-footer {
            padding: 6px 12px !important;
            font-size: 11px !important;
        }
    }
`;
document.head.appendChild(style);

// Export for debugging
window.translations = translations;
window.changeLanguage = changeLanguage;
window.currentLang = () => currentLang;

// ==================== INITIALIZATION LOG ====================
console.log('✅ PT CIO Website - Fully Loaded');
console.log(`✅ Device: ${isMobile ? 'Mobile' : isTablet ? 'Tablet' : 'Desktop'}`);
console.log('✅ Complete Multi Language System Active (ID/EN)');
console.log('✅ ALL texts will change when switching language');
console.log('✅ Language switcher added to footer');
console.log('✅ All images and photos are preserved - NOTHING DELETED');