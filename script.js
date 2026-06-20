// ===== Confetti Celebration Effect =====
const confettiCanvas = document.getElementById('confetti-canvas');
const confettiCtx = confettiCanvas ? confettiCanvas.getContext('2d') : null;
let confettiParticles = [];
let confettiAnimationId = null;

function resizeConfettiCanvas() {
    if (!confettiCanvas) return;
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
}
resizeConfettiCanvas();
window.addEventListener('resize', resizeConfettiCanvas);

const confettiColors = ['#1e88e5', '#2a5298', '#89cff0', '#ffd54f', '#ffffff', '#7db9e8'];

function createConfettiParticle() {
    return {
        x: Math.random() * confettiCanvas.width,
        y: -20 - Math.random() * confettiCanvas.height * 0.3,
        size: Math.random() * 8 + 6,
        color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
        speedY: Math.random() * 3 + 2,
        speedX: (Math.random() - 0.5) * 3,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        shape: Math.random() > 0.5 ? 'rect' : 'circle',
        opacity: 1,
        life: 0,
        maxLife: 180 + Math.random() * 60
    };
}

function launchConfetti() {
    if (!confettiCanvas || !confettiCtx) return;
    resizeConfettiCanvas();

    // Add a fresh burst of particles
    for (let i = 0; i < 120; i++) {
        confettiParticles.push(createConfettiParticle());
    }

    // Start the animation loop if it isn't already running
    if (!confettiAnimationId) {
        animateConfetti();
    }
}

function animateConfetti() {
    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

    confettiParticles.forEach((p) => {
        p.life++;
        p.x += p.speedX;
        p.y += p.speedY;
        p.speedY += 0.02; // gentle gravity
        p.rotation += p.rotationSpeed;

        if (p.life > p.maxLife * 0.7) {
            p.opacity = Math.max(0, 1 - (p.life - p.maxLife * 0.7) / (p.maxLife * 0.3));
        }

        confettiCtx.save();
        confettiCtx.globalAlpha = p.opacity;
        confettiCtx.translate(p.x, p.y);
        confettiCtx.rotate((p.rotation * Math.PI) / 180);
        confettiCtx.fillStyle = p.color;

        if (p.shape === 'rect') {
            confettiCtx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        } else {
            confettiCtx.beginPath();
            confettiCtx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
            confettiCtx.fill();
        }

        confettiCtx.restore();
    });

    // Remove particles that have finished their life or fallen offscreen
    confettiParticles = confettiParticles.filter(
        (p) => p.life < p.maxLife && p.y < confettiCanvas.height + 50
    );

    if (confettiParticles.length > 0) {
        confettiAnimationId = requestAnimationFrame(animateConfetti);
    } else {
        confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
        confettiAnimationId = null;
    }
}

// ===== Throwback Secret Code Unlock =====
const SECRET_CODE = '1430842439';

function toggleHint() {
    const hint = document.getElementById('hintText');
    if (hint) hint.classList.toggle('show');
}

function showToast(message, duration = 2600) {
    const toast = document.getElementById('toastMessage');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, duration);
}

function checkSecretCode() {
    const input = document.getElementById('secretCodeInput');
    const errorText = document.getElementById('errorText');
    if (!input) return;

    const value = input.value.trim();

    if (value === SECRET_CODE) {
        errorText.classList.remove('show');
        input.disabled = true;

        showToast('Since you already have the account at hand, just press 😊');

        setTimeout(() => {
            revealThrowbackGallery();
        }, 2200);
    } else {
        errorText.classList.add('show');
        input.classList.remove('shake');
        // Force reflow so the shake animation can replay
        void input.offsetWidth;
        input.classList.add('shake');
    }
}

function revealThrowbackGallery() {
    const lockPrompt = document.getElementById('lockPrompt');
    const gallery = document.getElementById('throwbackGallery');
    if (!gallery) return;

    if (lockPrompt) lockPrompt.style.display = 'none';
    gallery.classList.add('visible');

    // Make sure the newly revealed cards animate in immediately
    gallery.querySelectorAll('[data-aos]').forEach((el) => {
        el.classList.add('aos-animate');
    });
    const title = gallery.querySelector('.section-title');
    if (title) title.classList.add('aos-animate');

    gallery.querySelectorAll('.photo-card img').forEach((img) => {
        img.style.animation = 'photoEnter 0.8s ease-out forwards';
    });

    gallery.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

document.addEventListener('DOMContentLoaded', function () {
    const codeInput = document.getElementById('secretCodeInput');
    if (codeInput) {
        codeInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                checkSecretCode();
            }
        });
    }
});

// Initialize particles on page load
document.addEventListener('DOMContentLoaded', function () {
    createParticles();
    initializeAnimations();
    setupScrollAnimations();
});

// Create floating particles
function createParticles() {
    const particles = document.getElementById('particles');
    const particleEmojis = ['💙', '⭐', '🏆', '🩺', '🧢', '✨', '💫', '🎣', '🏅'];

    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.innerHTML = particleEmojis[Math.floor(Math.random() * particleEmojis.length)];

        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';

        // Random animation duration and delay
        particle.style.animationDuration = (Math.random() * 3 + 4) + 's';
        particle.style.animationDelay = Math.random() * 2 + 's';

        particles.appendChild(particle);
    }
}

// Initialize typewriter and other animations
function initializeAnimations() {
    // Typewriter effect is handled by CSS

    // Add staggered animation delays to elements
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach((element, index) => {
        element.style.animationDelay = (index * 0.2) + 's';
    });
}

// Scroll animations (AOS - Animate On Scroll)
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const elementsToObserve = document.querySelectorAll('[data-aos], .section-title');
    elementsToObserve.forEach(element => {
        observer.observe(element);

        // Add delay based on data-delay attribute
        const delay = element.getAttribute('data-delay');
        if (delay) {
            element.style.transitionDelay = delay + 'ms';
        }
    });
}

// Smooth scroll to sections
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Toggle like functionality for photos
function toggleLike(button) {
    const heartIcon = button.querySelector('.heart-icon');
    button.classList.toggle('liked');

    if (button.classList.contains('liked')) {
        heartIcon.textContent = '❤️';
        // Create floating heart effect
        createFloatingHeart(button);
    } else {
        heartIcon.textContent = '🤍';
    }
}

// Create floating heart animation when photo is liked
function createFloatingHeart(button) {
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.style.position = 'absolute';
    heart.style.fontSize = '1.5rem';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '1000';

    const rect = button.getBoundingClientRect();
    heart.style.left = rect.left + 'px';
    heart.style.top = rect.top + 'px';

    document.body.appendChild(heart);

    // Animate the heart
    heart.animate([
        { transform: 'translateY(0px) scale(1)', opacity: 1 },
        { transform: 'translateY(-60px) scale(1.5)', opacity: 0 }
    ], {
        duration: 1500,
        easing: 'ease-out'
    }).onfinish = () => {
        document.body.removeChild(heart);
    };
}

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const parallaxSpeed = 0.5;

    if (hero) {
        hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    }

    // Update particles position based on scroll
    const particles = document.querySelectorAll('.particle');
    particles.forEach((particle, index) => {
        const speed = 0.2 + (index % 3) * 0.1;
        particle.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add mouse movement effect to hero section
document.addEventListener('mousemove', (e) => {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    // Subtle movement effect
    const moveX = (x - 0.5) * 20;
    const moveY = (y - 0.5) * 20;

    const floatingHearts = document.querySelector('.floating-hearts');
    if (floatingHearts) {
        floatingHearts.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
});

// Add click effect to buttons
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Add entrance animations for photos when they come into view
const photoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target.querySelector('img');
            if (img) {
                img.style.animation = 'photoEnter 0.8s ease-out forwards';
            }
        }
    });
}, { threshold: 0.2 });

// Observe all photo cards
document.querySelectorAll('.photo-card').forEach(card => {
    photoObserver.observe(card);
});

// Add photo enter animation
const photoStyle = document.createElement('style');
photoStyle.textContent = `
    @keyframes photoEnter {
        from {
            transform: scale(0.8) rotate(-5deg);
            opacity: 0;
        }
        to {
            transform: scale(1) rotate(0deg);
            opacity: 1;
        }
    }
`;
document.head.appendChild(photoStyle);