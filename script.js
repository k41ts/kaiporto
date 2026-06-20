document.addEventListener('DOMContentLoaded', () => {

    // 0. Loading Screen Logic
    const loader = document.querySelector('.cyber-loader');
    const loaderBar = document.querySelector('.loader-bar');
    const loadingProgress = document.querySelector('.loading-progress');
    
    let progress = 0;
    const loadInterval = setInterval(() => {
        progress += Math.floor(Math.random() * 15) + 5;
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadInterval);
            setTimeout(() => {
                loader.classList.add('hidden');
                setTimeout(() => loader.style.display = 'none', 500);
            }, 300);
        }
        if (loaderBar) loaderBar.style.width = `${progress}%`;
        if (loadingProgress) loadingProgress.innerText = `${progress}%`;
    }, 150);

    // 1. Navigation Active State on Scroll (window based)
    const sections = document.querySelectorAll('.cyber-section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let currentId = '';
        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            // Section is "current" if scroll is within its range
            if (scrollTop >= sectionTop - windowHeight * 0.4 && scrollTop < sectionTop + sectionHeight - windowHeight * 0.4) {
                currentId = section.getAttribute('id');
            }
        });

        if (currentId) {
            navLinks.forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector(`.nav-link[href="#${currentId}"]`);
            if (activeLink) activeLink.classList.add('active');
        }
    });


    // 2. Glitch Text Effect on Hover for Titles
    const glitchTitles = document.querySelectorAll('.glitch-title');
    const glitchLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";

    glitchTitles.forEach(title => {
        title.addEventListener('mouseover', event => {
            let iterations = 0;
            const originalText = event.target.dataset.text;
            
            clearInterval(title.glitchInterval);

            title.glitchInterval = setInterval(() => {
                event.target.innerText = event.target.innerText.split("")
                    .map((letter, index) => {
                        if(index < iterations) {
                            return originalText[index];
                        }
                        return glitchLetters[Math.floor(Math.random() * glitchLetters.length)];
                    })
                    .join("");
                
                if(iterations >= originalText.length) {
                    clearInterval(title.glitchInterval);
                }
                iterations += 1 / 3;
            }, 30);
        });
    });

    // 3. Sequential Animation for Chevron Arrows in Hero
    const chevrons = document.querySelectorAll('.chevron-svg polygon');
    let chevronIndex = 0;
    
    if (chevrons.length > 0) {
        setInterval(() => {
            chevrons.forEach(c => c.style.fill = '#111');
            if (chevronIndex < chevrons.length) {
                chevrons[chevronIndex].style.fill = '#f1fc2f';
            }
            chevronIndex = (chevronIndex + 1) % (chevrons.length + 1);
        }, 200);
    }

    // 4. Dashboard Clock
    const timeEl = document.getElementById('sys-time');
    const dateEl = document.getElementById('sys-date');
    if(timeEl && dateEl) {
        setInterval(() => {
            const now = new Date();
            timeEl.innerText = now.toTimeString().split(' ')[0];
            const year = now.getFullYear();
            const month = String(now.getMonth()+1).padStart(2, '0');
            const date = String(now.getDate()).padStart(2, '0');
            const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
            const day = days[now.getDay()];
            dateEl.innerText = `${year}.${month}.${date} // ${day}`;
        }, 1000);
    }

    // 5. One-time Glitch on Scroll to About
    const bioStatus = document.getElementById('bio-status');
    let hasGlitched = false;

    if (bioStatus) {
        const aboutSection = document.getElementById('about');
        const finalName = "ZAIDAN IKRAM [ONLINE]";
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
        
        const aboutObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !hasGlitched) {
                hasGlitched = true;
                
                setTimeout(() => {
                    let iterations = 0;
                    
                    const glitchInt = setInterval(() => {
                        bioStatus.innerText = finalName.split("")
                            .map((letter, index) => {
                                if(index < iterations) {
                                    return finalName[index];
                                }
                                if (finalName[index] === " ") return " ";
                                return letters[Math.floor(Math.random() * letters.length)];
                            })
                            .join("");
                        
                        if(iterations >= finalName.length) {
                            clearInterval(glitchInt);
                            bioStatus.innerText = finalName;
                        }
                        iterations += 0.3;
                    }, 50);
                }, 1000);
            }
        }, { threshold: 0.3 });
        
        if(aboutSection) {
            aboutObserver.observe(aboutSection);
        }

    }

    // 1.5 Hero Media Box Hover/Click Glitch Effect
    const heroMain = document.querySelector('.hero-main-row');
    const mediaBoxGlitch = document.querySelector('.hero-media-box');
    
    if (heroMain && mediaBoxGlitch) {
        heroMain.addEventListener('mouseenter', () => {
            mediaBoxGlitch.classList.add('glitch-active');
            setTimeout(() => mediaBoxGlitch.classList.remove('glitch-active'), 300);
        });
    }

    // 6. Hero Media Box Idle Glitch Animation (every 5 seconds)
    const mediaBox = document.querySelector('.hero-media-box');
    if (mediaBox) {
        setInterval(() => {
            mediaBox.classList.add('glitch-active');
            setTimeout(() => {
                mediaBox.classList.remove('glitch-active');
            }, 300);
        }, 5000);
    }
    
    // 7. Initial Typing Effect for HAKAI TSU
    const mainTitle = document.querySelector('.hero-center .glitch-title');
    if (mainTitle) {
        const originalText = mainTitle.dataset.text;
        mainTitle.textContent = '';
        setTimeout(() => {
            let i = 0;
            const typeInt = setInterval(() => {
                mainTitle.textContent += originalText.charAt(i);
                i++;
                if (i >= originalText.length) {
                    clearInterval(typeInt);
                }
            }, 100);
        }, 800); // Start typing after loader finishes
    }
});
