// ============================================================
// SMART MONEY — script.js  |  Shared across all pages
// ============================================================

// ---- Mobile menu ----
function initMobileMenu() {
    const btn = document.getElementById('mobileMenuBtn');
    const nav = document.getElementById('mainNav');
    const dropdown = document.getElementById('categoryDropdown');
    if (btn && nav) {
        btn.onclick = () => {
            nav.classList.toggle('active');
            btn.classList.toggle('active');
        };
    }
    
    // Always bind dropdown toggle for mobile, CSS handles visibility breakpoints
    if (dropdown) {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        if (toggle) {
            toggle.onclick = e => {
                // Only prevent default and toggle on mobile-sized screens
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                }
            };
        }
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

// ---- Gold Calculator ----
function initGoldCalc() {
    const amt = document.getElementById('goldAmount');
    const bPrice = document.getElementById('buyPrice');
    const cPrice = document.getElementById('currentPrice');
    const result = document.getElementById('goldResultDisplay');
    const profit = document.getElementById('goldProfitDisplay');

    if (!amt || !bPrice || !cPrice || !result) return;

    const calc = () => {
        const amount = parseFloat(amt.value) || 0;
        const buy = parseFloat(bPrice.value) || 0;
        const current = parseFloat(cPrice.value) || 0;

        if (buy <= 0) {
            result.textContent = "$0.00";
            profit.textContent = "Enter valid buy price";
            return;
        }

        const ounces = amount / buy;
        const totalValue = ounces * current;
        const netProfit = totalValue - amount;
        const percent = (netProfit / amount) * 100;

        result.textContent = `$${totalValue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
        
        if (netProfit >= 0) {
            profit.style.color = "#22c55e";
            profit.textContent = `Profit: +$${netProfit.toLocaleString(undefined, {minimumFractionDigits: 2})} (${percent.toFixed(1)}%)`;
        } else {
            profit.style.color = "#ef4444";
            profit.textContent = `Loss: -$${Math.abs(netProfit).toLocaleString(undefined, {minimumFractionDigits: 2})} (${percent.toFixed(1)}%)`;
        }
    };

    [amt, bPrice, cPrice].forEach(input => input.oninput = calc);
    calc(); // initial run
}

// ---- Smooth Scroll ----
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.onclick = e => {
            const id = anchor.getAttribute('href');
            if (id === '#') return;
            const target = document.querySelector(id);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        };
    });
}

// ---- Cookie Consent Banner ----
function initCookieBanner() {
    const banner = document.getElementById('cookieBanner');
    const accept = document.getElementById('acceptCookies');
    const decline = document.getElementById('declineCookies');
    
    if (!banner || !accept || !decline) return;

    if (!localStorage.getItem('cookieConsent')) {
        banner.style.display = 'flex';
    }

    accept.onclick = () => {
        localStorage.setItem('cookieConsent', 'accepted');
        banner.style.display = 'none';
    };

    decline.onclick = () => {
        localStorage.setItem('cookieConsent', 'declined');
        banner.style.display = 'none';
    };
}

// ---- Reading Progress Bar ----
function initReadingProgress() {
    const bar = document.getElementById('readingProgress');
    if (!bar) return;

    window.onscroll = () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        bar.style.width = scrolled + "%";
    };
}

// ---- Adsterra Ads Injection (Global) ----
// ---- Init ----
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initNewsletterForms();
    initContactForm();
    initGoldCalc();
    initSmoothScroll();
    initCookieBanner();
    initReadingProgress();
});
