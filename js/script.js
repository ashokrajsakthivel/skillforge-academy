document.addEventListener('DOMContentLoaded', () => {

    /* =========================
       HAMBURGER MENU
    ========================= */
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Close menu when a link is clicked
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    /* =========================
       SMOOTH SCROLL
    ========================= */
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');

            // Skip invalid links
            if (!targetId || targetId === '#') return;

            const target = document.querySelector(targetId);

            if (target) {
                e.preventDefault();

                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    /* =========================
       SCROLL REVEAL ANIMATION
    ========================= */
    const animatedElements = document.querySelectorAll(
        '.course-card, .why-card, .testimonial-card, .hero-content, .about-content, .contact-form, .cta-content'
    );

    // Add hidden class initially
    animatedElements.forEach(el => el.classList.add('hidden'));

    if ('IntersectionObserver' in window) {

        const observer = new IntersectionObserver((entries, observer) => {

            entries.forEach((entry, index) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add('show');
                    entry.target.style.transitionDelay = `${index * 0.1}s`;

                    // Animate only once
                    observer.unobserve(entry.target);
                }
            });

        }, {
            threshold: 0.2
        });

        animatedElements.forEach(el => observer.observe(el));

    } else {
        animatedElements.forEach(el => el.classList.add('show'));
    }

    /* =========================
       FAQ ACCORDION
    ========================= */
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {

        question.addEventListener('click', () => {

            const currentItem = question.parentElement;

            // Close other open items
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== currentItem) {
                    item.classList.remove('active');
                }
            });

            // Toggle current item
            currentItem.classList.toggle('active');
        });
    });

    /* =========================
       CONTACT FORM SUBMISSION
    ========================= */
    // Contact Form Submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            course: document.getElementById('course').value,
            message: document.getElementById('message').value
        };

        try {
          const response = await fetch('http://localhost:3000/contact', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
});
            const data = await response.json();

            if (response.ok) {
                alert('Enquiry submitted successfully!');
                contactForm.reset();
            } else {
                alert(data.message || 'Error submitting enquiry');
            }

        } catch (error) {
            console.error(error);
            alert('Server connection failed');
        }
    });
}
    console.log('SkillForge Academy Website Loaded Successfully');

});