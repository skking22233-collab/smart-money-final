// ============================================================
// SMART MONEY — script.js  |  Shared across all pages
// ============================================================

// ---- Mobile menu ----
function initMobileMenu() {
    const btn = document.getElementById('mobileMenuBtn');
    const nav = document.getElementById('mainNav');
    const dropdown = document.getElementById('categoryDropdown');
    if (btn && nav) btn.onclick = () => nav.classList.toggle('active');
    if (dropdown && window.innerWidth <= 768) {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        if (toggle) toggle.onclick = e => { e.preventDefault(); dropdown.classList.toggle('active'); };
    }
}

// ---- Share buttons (global) ----
function shareOn(platform) {
    const url   = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    const map   = {
        facebook:  `https://www.facebook.com/sharer/sharer.php?u=${url}`,
        twitter:   `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
        whatsapp:  `https://wa.me/?text=${title}%20${url}`
    };
    if (map[platform]) window.open(map[platform], '_blank', 'width=600,height=400');
}

// ---- Newsletter forms ----
function initNewsletterForms() {
    document.querySelectorAll('.newsletter-form').forEach(form => {
        if (form.dataset.bound) return;
        form.dataset.bound = '1';
        form.onsubmit = e => {
            e.preventDefault();
            alert('Thank you for subscribing to Smart Money!');
            form.reset();
        };
    });
}

// ---- Contact form ----
function initContactForm() {
    const f = document.getElementById('contactForm');
    if (f) f.onsubmit = e => {
        e.preventDefault();
        alert('Thank you! We will get back to you soon.');
        f.reset();
    };
}

// ---- Format date ----
function formatDate(d) {
    try { return new Date(d).toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric' }); }
    catch { return d; }
}

// ---- Init ----
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initNewsletterForms();
    initContactForm();
});
