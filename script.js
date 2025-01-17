document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    // Sticky header
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Intersection Observer for animations
    const animatedElements = document.querySelectorAll('.feature-card, .pricing-card, .step');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Parallax effect for hero section
    const heroSection = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero .container');

    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        heroContent.style.transform = `translateY(${scrollPosition * 0.5}px)`;
        heroSection.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
    });

    // Typing effect for hero title
    const heroTitle = document.querySelector('.hero h1');
    const titleText = heroTitle.textContent;
    heroTitle.textContent = '';
    let i = 0;

    function typeWriter() {
        if (i < titleText.length) {
            heroTitle.innerHTML += titleText.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }

    typeWriter();

    // Counter animation for pricing
    const counters = document.querySelectorAll('.price');
    const speed = 200;

    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText.replace(/\D/g, '');
            const inc = target / speed;

            if (count < target) {
                counter.innerText = '$' + Math.ceil(count + inc);
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = '$' + target;
            }
        };

        updateCount();
    });
});