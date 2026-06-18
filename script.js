// Project Data - Your Real Projects
const projects = [
    {
        id: 1,
        title: "Apex Athletic",
        description: "Modern athletic brand e-commerce platform featuring product showcase, multilingual support (English/Albanian), and user authentication system for a professional shopping experience.",
        image: "Projects/Apex-Athletics-Preview.png",
        url: "https://apex-athletic.vercel.app/",
        tag: "E-Commerce"
    },
    {
        id: 2,
        title: "Limani Studio",
        description: "Professional photography and video production portfolio. Showcases wedding photography, event coverage, and creative production services with a sleek, elegant design.",
        image: "Projects/Foto-Limani-Preview.png",
        url: "https://foto-limani.netlify.app/",
        tag: "Photography"
    },
    {
        id: 3,
        title: "SUVATIMI-H",
        description: "Professional facade and exterior renovation services website. Features project gallery, service descriptions, supplier information, and bilingual interface (English/Albanian).",
        image: "Projects/SUVATIMI-H-Preview.png",
        url: "https://suvatimi.vercel.app/",
        tag: "Business"
    },
    {
        id: 4,
        title: "Nordwall Studio",
        description: "Nordwall Studio is a modern creative web studio focused on building sleek, responsive, and visually engaging digital experiences. The website showcases clean design, smooth animations, and professional development work tailored for brands, startups, and businesses looking to strengthen their online presence.",
        image: "Projects/nordwall-Preview.png",
        url: "https://nordwall-studio.vercel.app/",
        tag: "Business"
    },
    {
        id: 5,
        title: "Nissi Barber Shop",
        description: "Professional barber shop website showcasing services, gallery, and booking information. Clean, modern design tailored for a salon business.",
        image: "Projects/nissi-barber-shop/Preview.png",
        url: "https://barbershop-nissi.vercel.app/",
        tag: "Barber Shop"
    },
    {
        id: 6,
        title: "Kosovo EVENTS",
        description: "Event listing and management platform for Kosovo. Features event discovery, categorization, and user-friendly interface for organizers and attendees.",
        image: "Projects/ksevents-Preview.png",
        url: "https://kosovo-events.vercel.app/",
        tag: "Events"
    },
    {
        id: 7,
        title: "Fshati Ratkoc",
        description: "Informative website about Ratkoc village in Kosovo. Showcases local culture, history, attractions, and community information with a clean, modern design.",
        image: "Projects/Ratkoc-Preview.png",
        url: "https://fshati-ratkoc.vercel.app/",
        tag: "Local"
    },
    {
        id: 8,
        title: "Pecara Vojvodina",
        description: "Freshly baked every day, Pecara Vojvodina offers delicious breads, pastries, burek, sandwiches, and desserts made with traditional recipes and high-quality ingredients. Experience the taste of homemade goodness in every bite..",
        image: "Projects/Furra-Preview.jpeg",
        url: "https://pecara-vojvodina.vercel.app/",
        tag: "Local"
    }
];

// DOM Elements
const projectsContainer = document.getElementById('projectsContainer');
const modal = document.getElementById('projectModal');
const closeBtn = document.querySelector('.close');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

// Hamburger Menu Toggle
if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// Close menu when scrolling
window.addEventListener('scroll', () => {
    if (hamburger && hamburger.classList.contains('active')) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// Initialize Projects
function initializeProjects() {
    renderProjects();
    attachEventListeners();
}

// Render Projects to Grid
function renderProjects() {
    projectsContainer.innerHTML = projects.map(project => `
        <div class="project-card" onclick="openProjectModal(${project.id})">
            <img src="${project.image}" alt="${project.title}" class="project-image">
            <div class="project-info">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <span class="project-tag">${project.tag}</span>
            </div>
        </div>
    `).join('');
}

// Open Modal with Project Details
function openProjectModal(projectId) {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;

    document.getElementById('modalImage').src = project.image;
    document.getElementById('modalTitle').textContent = project.title;
    document.getElementById('modalDescription').textContent = project.description;
    document.getElementById('modalLink').href = project.url;

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close Modal
function closeProjectModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Attach Event Listeners
function attachEventListeners() {
    closeBtn.onclick = closeProjectModal;

    window.onclick = function(event) {
        if (event.target === modal) {
            closeProjectModal();
        }
    }

    // Close on Escape Key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeProjectModal();
        }
    });
}

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Close hamburger menu if open
            if (hamburger && hamburger.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Initialize on Page Load
document.addEventListener('DOMContentLoaded', initializeProjects);

// --- Phone verification for contact form ---
(() => {
    const phone = document.getElementById('phone');
    const phoneVerification = document.getElementById('phoneVerification');
    const sendCodeBtn = document.getElementById('sendCodeBtn');
    const codeInput = document.getElementById('codeInput');
    const verifyCodeBtn = document.getElementById('verifyCodeBtn');
    const phoneMsg = document.getElementById('phoneMsg');
    const contactForm = document.getElementById('contactForm');

    if (!phone || !contactForm) return;

    let currentPhone = '';

    function showVerificationUI(show) {
        phoneVerification.style.display = show ? 'block' : 'none';
    }

    function setMessage(text, color) {
        phoneMsg.textContent = text || '';
        phoneMsg.style.color = color || '#333';
    }

    function generateCode() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }

    // Save verification state in sessionStorage: { phone: { verified: bool, code: '123456', expires: ms } }
    function saveState(phoneVal, obj) {
        const key = 'phone_ver_' + phoneVal;
        sessionStorage.setItem(key, JSON.stringify(obj));
    }

    function loadState(phoneVal) {
        const key = 'phone_ver_' + phoneVal;
        const v = sessionStorage.getItem(key);
        return v ? JSON.parse(v) : null;
    }

    phone.addEventListener('input', () => {
        const val = phone.value.trim();
        currentPhone = val;
        if (val.length > 3) {
            showVerificationUI(true);
            const st = loadState(val);
            if (st && st.verified && st.expires > Date.now()) {
                setMessage('Phone verified', 'green');
            } else {
                setMessage('Not verified', '#333');
            }
        } else {
            showVerificationUI(false);
        }
    });

    sendCodeBtn.addEventListener('click', async () => {
        const phoneVal = phone.value.trim();
        if (!phoneVal) { setMessage('Enter a phone number first', 'red'); return; }
        setMessage('Sending code...', '#666');
        sendCodeBtn.disabled = true;
        // Try server endpoint first
        try {
            const res = await fetch('/api/send-code', {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone: phoneVal })
            });
            if (res.ok) {
                codeInput.style.display = 'inline-block';
                verifyCodeBtn.style.display = 'inline-block';
                setMessage('Code sent. Check your SMS.', '#066');
            } else {
                throw new Error('server');
            }
        } catch (e) {
            // client-side fallback (demo mode) — show code in UI for testing
            const code = generateCode();
            const expires = Date.now() + 5 * 60 * 1000;
            saveState(phoneVal, { verified: false, code, expires });
            codeInput.style.display = 'inline-block';
            verifyCodeBtn.style.display = 'inline-block';
            setMessage('Demo code sent (visible for testing)', '#066');
            // For demo only: reveal code briefly in console and message
            console.info('Demo verification code for', phoneVal, ':', code);
        } finally {
            sendCodeBtn.disabled = false;
        }
    });

    verifyCodeBtn.addEventListener('click', async () => {
        const phoneVal = phone.value.trim();
        const code = codeInput.value.trim();
        if (!phoneVal || !code) { setMessage('Provide phone and code', 'red'); return; }
        setMessage('Verifying...', '#666');
        verifyCodeBtn.disabled = true;
        try {
            const res = await fetch('/api/verify-code', {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone: phoneVal, code })
            });
            if (res.ok) {
                const json = await res.json();
                if (json.verified) {
                    saveState(phoneVal, { verified: true, code: null, expires: Date.now() + 24 * 60 * 60 * 1000 });
                    setMessage('Phone verified', 'green');
                } else {
                    setMessage('Invalid code', 'red');
                }
            } else {
                // fallback: check client-side stored code
                const st = loadState(phoneVal);
                if (st && st.code === code && st.expires > Date.now()) {
                    saveState(phoneVal, { verified: true, code: null, expires: Date.now() + 24 * 60 * 60 * 1000 });
                    setMessage('Phone verified (demo)', 'green');
                } else {
                    setMessage('Invalid code', 'red');
                }
            }
        } catch (e) {
            const st = loadState(phoneVal);
            if (st && st.code === code && st.expires > Date.now()) {
                saveState(phoneVal, { verified: true, code: null, expires: Date.now() + 24 * 60 * 60 * 1000 });
                setMessage('Phone verified (demo)', 'green');
            } else {
                setMessage('Verification failed', 'red');
            }
        } finally {
            verifyCodeBtn.disabled = false;
        }
    });

    // Prevent form submit if phone present but not verified
    contactForm.addEventListener('submit', (e) => {
        const phoneVal = phone.value.trim();
        if (phoneVal.length > 3) {
            const st = loadState(phoneVal);
            if (!(st && st.verified && st.expires > Date.now())) {
                e.preventDefault();
                setMessage('Please verify your phone before submitting', 'red');
                codeInput.focus();
            }
        }
    });

})();
