// NenoDance Academy - Main JavaScript

// Ensure scripts are loaded
document.addEventListener("DOMContentLoaded", function() {
    if (window.lucide) {
        lucide.createIcons();
    }

    // Mobile Menu Toggle
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const mobileMenuClose = document.getElementById('mobile-menu-close');

    function closeMobileMenu() {
        if (mobileMenu && mobileMenuOverlay) {
            mobileMenu.classList.add('translate-x-full');
            mobileMenuOverlay.classList.add('hidden');
        }
    }

    if (mobileMenuToggle && mobileMenu && mobileMenuOverlay) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenu.classList.remove('translate-x-full');
            mobileMenuOverlay.classList.remove('hidden');
        });

        // Close mobile menu when clicking on close button
        if (mobileMenuClose) {
            mobileMenuClose.addEventListener('click', closeMobileMenu);
        }

        // Close mobile menu when clicking on overlay
        mobileMenuOverlay.addEventListener('click', closeMobileMenu);

        // Close mobile menu when clicking on a link
        const mobileMenuLinks = mobileMenu.querySelectorAll('a');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
    }

    // Render desktop schedule (all days)
    renderDesktopSchedule();

    // Init default day for mobile
    switchDay('montag');
});

// Schedule Data (Based on kursplan.avif)
const scheduleData = {
    montag: [
        { time: '16:30 - 17:30 Uhr', title: 'HIP-HOP KIDS', age: '(ab 6 J.)', color: 'blue' },
        { time: '17:30 - 18:30 Uhr', title: 'HIP-HOP KIDS', age: '(ab 8 J.)', color: 'blue' },
        { time: '18:30 - 19:30 Uhr', title: 'FEMININE HIP-HOP', age: '(Anf. ab 16 J.)', color: 'pink' },
    ],
    dienstag: [
        { time: '15:30 - 16:15 Uhr', title: 'MINIS', age: '(ab 4-5 J.)', color: 'blue' },
        { time: '16:15 - 17:15 Uhr', title: 'HIP-HOP KIDS', age: '(ab 6 J.)', color: 'blue' },
        { time: '17:15 - 18:15 Uhr', title: 'BREAKING', age: '(Anf. ab 7 J.)', color: 'blue' },
        { time: '18:15 - 19:15 Uhr', title: 'BREAKING', age: '(Fort.)', color: 'purple' },
        { time: '19:15 - 20:15 Uhr', title: 'JAZZ FUNK', age: '', color: 'pink' },
        { time: '20:15 - 21:15 Uhr', title: 'HEELS', age: '(Fort.)', color: 'pink' },
    ],
    mittwoch: [
        { time: '16:15 - 17:15 Uhr', title: 'HIP-HOP KIDS', age: '(ab 6 J.)', color: 'blue' },
        { time: '17:15 - 18:15 Uhr', title: 'HIP-HOP TEENS', age: '', color: 'purple' },
        { time: '18:15 - 19:15 Uhr', title: 'FREESTYLE', age: '', color: 'purple' },
    ],
    donnerstag: [
        { time: '16:30 - 17:30 Uhr', title: 'HIP-HOP KIDS', age: '(Fort. ab 6 J.)', color: 'blue' },
        { time: '17:30 - 18:30 Uhr', title: 'HIP-HOP KIDS', age: '(Fort. ab 8 J.)', color: 'blue' },
        { time: '18:30 - 19:30 Uhr', title: 'TIK TOK TÄNZE', age: '', color: 'purple' },
        { time: '19:30 - 20:30 Uhr', title: 'Ü30', age: '', color: 'pink' },
    ],
    freitag: [
        { time: '16:30 - 17:30 Uhr', title: 'HIP-HOP KIDS', age: '', color: 'blue' },
        { time: '17:30 - 18:30 Uhr', title: 'HIP-HOP TEENS', age: '', color: 'purple' },
        { time: '18:30 - 19:30 Uhr', title: 'AFRO STYLES', age: '', color: 'pink' },
        { time: '19:30 - 20:30 Uhr', title: 'HIP-HOP ADULTS', age: '(Fort.)', color: 'pink' },
    ]
};

// Convert course title to URL anchor
function titleToAnchor(title) {
    const anchorMap = {
        'MINIS': 'minis',
        'HIP-HOP KIDS': 'hip-hop-kids',
        'HIP-HOP TEENS': 'hip-hop-teens',
        'BREAKING': 'breaking',
        'FEMININE HIP-HOP': 'feminine-hip-hop',
        'JAZZ FUNK': 'jazz-funk',
        'HEELS': 'heels',
        'TIK TOK TÄNZE': 'tiktok',
        'TIKTOK TÄNZE': 'tiktok',
        'FREESTYLE': 'freestyle',
        'AFRO STYLES': 'afro-styles',
        'HIP-HOP ADULTS': 'hip-hop-adults',
        'Ü30': 'ue30'
    };
    return anchorMap[title] || title.toLowerCase().replace(/\s+/g, '-');
}

// Create course card HTML
function createCourseCard(item) {
    let bgColor = '';
    let shadowColor = '';

    if (item.color === 'blue') {
        bgColor = 'bg-blue-500';
        shadowColor = 'shadow-[4px_4px_0px_rgba(59,130,246,0.4)]';
    } else if (item.color === 'purple') {
        bgColor = 'bg-purple-600';
        shadowColor = 'shadow-[4px_4px_0px_rgba(139,92,246,0.4)]';
    } else if (item.color === 'pink') {
        bgColor = 'bg-pink-500';
        shadowColor = 'shadow-[4px_4px_0px_rgba(236,72,153,0.4)]';
    }

    const anchor = titleToAnchor(item.title);

    return `
        <a href="kurse.html#${anchor}" class="relative block">
            <div class="relative ${bgColor} ${shadowColor} rounded-lg p-4 transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_rgba(0,0,0,0.3)] cursor-pointer">
                <div class="absolute -top-2 -left-2 bg-black text-white px-3 py-1 text-xs font-bold rounded">
                    ${item.time}
                </div>
                <div class="mt-4">
                    <h4 class="text-white font-display font-bold text-lg leading-tight">${item.title}</h4>
                    ${item.age ? `<p class="text-white text-sm mt-1 opacity-90">${item.age}</p>` : ''}
                </div>
            </div>
        </a>
    `;
}

// Render all days for desktop
function renderDesktopSchedule() {
    const days = ['montag', 'dienstag', 'mittwoch', 'donnerstag', 'freitag'];
    days.forEach(day => {
        const container = document.getElementById(`${day}-desktop`);
        if (container) {
            container.innerHTML = '';
            scheduleData[day].forEach(item => {
                container.innerHTML += createCourseCard(item);
            });
        }
    });
}

// Switch day for mobile
function switchDay(day) {
    // Update Buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        const isSelected = btn.innerText.toLowerCase().trim() === day;
        if (isSelected) {
            btn.className = 'tab-btn active px-4 py-2 font-display text-sm uppercase tracking-wider border border-purple-600 bg-purple-600 text-white transition-all';
        } else {
            btn.className = 'tab-btn px-4 py-2 font-display text-sm uppercase tracking-wider border border-gray-300 hover:border-black text-gray-500 hover:text-black transition-all';
        }
    });

    // Update Mobile Content
    const container = document.getElementById('schedule-container-mobile');
    if (container) {
        container.style.opacity = 0;

        setTimeout(() => {
            container.innerHTML = '';
            scheduleData[day].forEach(item => {
                container.innerHTML += createCourseCard(item);
            });
            container.style.opacity = 1;
        }, 150);
    }
}

// Add fadeIn animation
const styleSheet = document.createElement("style");
styleSheet.innerText = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(styleSheet);

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// Observe all elements with animation classes
document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in').forEach(el => {
    observer.observe(el);
});
