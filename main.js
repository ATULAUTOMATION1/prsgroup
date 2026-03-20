/**
 * PRS GROUP - Industrial Brand Strategy Interaction
 */

document.addEventListener('DOMContentLoaded', () => {
    // 0. Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 1. Sticky Header Animation
    const header = document.getElementById('mainHeader');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Active section highlighting
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 150) {
                const id = section.getAttribute('id');
                if (id) current = id;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // 2. Quote Form Submission State
    const quoteForm = document.getElementById('quoteForm');
    if (quoteForm) {
        quoteForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = quoteForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            
            // Loading
            btn.innerHTML = '<i data-lucide="loader-2" class="spin"></i> Initializing Inquiry...';
            lucide.createIcons();
            btn.disabled = true;

            // Success simulation
            setTimeout(() => {
                btn.innerHTML = '<i data-lucide="check-circle"></i> Bidding Request Initialized!';
                btn.style.background = '#059669'; 
                lucide.createIcons();
                quoteForm.reset();

                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = 'var(--accent-purple)';
                    btn.disabled = false;
                    lucide.createIcons();
                }, 4000);
            }, 1800);
        });
    }

    // 3. Download Center Simulation with Progress
    const downloadProfile = document.getElementById('downloadCompanyProfile');
    if (downloadProfile) {
        downloadProfile.addEventListener('click', (e) => {
            e.preventDefault();
            downloadProfile.classList.add('download-active');
            const originalContent = downloadProfile.innerHTML;
            
            downloadProfile.innerHTML = '<i data-lucide="loader-2" class="spin"></i> Preparing...';
            lucide.createIcons();

            setTimeout(() => {
                downloadProfile.innerHTML = '<i data-lucide="check"></i> Ready';
                lucide.createIcons();
                alert('Secure Download Initialized: PRS_GROUP_Profile.pdf');
                
                setTimeout(() => {
                    downloadProfile.innerHTML = originalContent;
                    downloadProfile.classList.remove('download-active');
                    lucide.createIcons();
                }, 2000);
            }, 2000);
        });
    }

    // 4. Scroll-Triggered Counter Animation
    const counters = document.querySelectorAll('.stat-number');
    const animateCounters = () => {
        counters.forEach(counter => {
            const target = parseFloat(counter.getAttribute('data-target'));
            const suffix = counter.getAttribute('data-suffix') || '';
            let count = 0;
            const step = target / 60; 

            const update = () => {
                if (count < target) {
                    count += step;
                    if (count > target) count = target;
                    counter.innerText = (target % 1 === 0 ? Math.floor(count) : count.toFixed(2)) + suffix;
                    requestAnimationFrame(update);
                }
            };
            update();
        });
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const aboutSection = document.getElementById('about');
    if (aboutSection) counterObserver.observe(aboutSection);

    // Helper for loading animation
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .spin { animation: spin 0.8s linear infinite; }
    `;
    document.head.appendChild(style);

    // 5. Status Badge Enhancement for Project Table
    document.querySelectorAll('.tech-table td').forEach(td => {
        const text = td.textContent.trim();
        if (text === 'On Going') {
            td.innerHTML = '<span class="status-ongoing">' + text + '</span>';
        } else if (text === 'Completed') {
            td.innerHTML = '<span class="status-completed">' + text + '</span>';
        }
    });

    // 6. Smooth Anchor Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 100, // Adjust for sticky header
                    behavior: 'smooth'
                });
            }
        });
    });

    // 7. Navratri Popup Logic
    const popupOverlay = document.getElementById('festivalPopup');
    const closeBtn = document.getElementById('closePopup');
    
    if (popupOverlay) {
        // Show after 2 seconds
        setTimeout(() => {
            const hasSeenPopup = sessionStorage.getItem('hasSeenNavratriPopup');
            if (!hasSeenPopup) {
                popupOverlay.classList.add('active');
                sessionStorage.setItem('hasSeenNavratriPopup', 'true');
            }
        }, 2000);

        closeBtn.addEventListener('click', () => {
            popupOverlay.classList.remove('active');
        });

        // Close on escape key
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && popupOverlay.classList.contains('active')) {
                popupOverlay.classList.remove('active');
            }
        });
    }
});
