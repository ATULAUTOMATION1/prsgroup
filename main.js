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

    // 7. Dynamic Navratri Popup Logic (Chaitra Navratri 2026: Mar 18 - Mar 26)
    const popupOverlay = document.getElementById('festivalPopup');
    const closeBtn = document.getElementById('closePopup');
    const popupImg = document.querySelector('.popup-img');
    const popupHeading = document.querySelector('.popup-content h3');
    
    if (popupOverlay && popupImg) {
        const navratriImages = {
            18: { img: 'navratri_day_1_shailputri_1773927818026.png', title: 'Day 1: Maa Shailputri' },
            19: { img: 'navratri_day_2_brahmacharini_1773927841627.png', title: 'Day 2: Maa Brahmacharini' },
            20: { img: 'navratri_day_3_chandraghanta_1773927877387.png', title: 'Day 3: Maa Chandraghanta' },
            21: { img: 'navratri_day_4_kushmanda_1773927904348.png', title: 'Day 4: Maa Kushmanda' },
            22: { img: 'navratri_day_5_skandamata_1773927935431.png', title: 'Day 5: Maa Skandamata' },
            23: { img: 'navratri_day_6_katyayani_1773927963113.png', title: 'Day 6: Maa Katyayani' },
            24: { img: 'navratri_day_7_kalaratri_1773927988662.png', title: 'Day 7: Maa Kalaratri' },
            25: { img: 'navratri_day_8_mahagauri_1773928016345.png', title: 'Day 8: Maa Mahagauri' },
            26: { img: 'navratri_day_9_siddhidatri_1773928047505.png', title: 'Day 9: Maa Siddhidatri' }
        };

        const today = new Date();
        const month = today.getMonth(); // 2 is March
        const date = today.getDate();

        // Check if we are in the Navratri window (Mar 18 - Mar 26, 2026)
        if (month === 2 && navratriImages[date]) {
            const data = navratriImages[date];
            popupImg.src = 'assets/' + data.img;
            if (popupHeading) popupHeading.innerText = 'Jai Mata Di! ' + data.title;

            // Show after 2 seconds
            setTimeout(() => {
                const storageKey = 'hasSeenNavratriPopup_' + date; // Once per day
                const hasSeenPopup = sessionStorage.getItem(storageKey);
                if (!hasSeenPopup) {
                    popupOverlay.classList.add('active');
                    sessionStorage.setItem(storageKey, 'true');

                    // AUTO-CLOSE after 10 seconds (User requested automatic behavior)
                    setTimeout(() => {
                        popupOverlay.classList.remove('active');
                    }, 10000);
                }
            }, 2000);
        }

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
