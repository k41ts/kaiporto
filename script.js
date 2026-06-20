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
                // Optional: remove from DOM after fade out
                setTimeout(() => loader.style.display = 'none', 500);
            }, 300);
        }
        loaderBar.style.width = `${progress}%`;
        loadingProgress.innerText = `${progress}%`;
    }, 150);

    // 1. Navigation Active State on Scroll
    const sections = document.querySelectorAll('.cyber-section');
    const navLinks = document.querySelectorAll('.nav-link');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 // Trigger when 50% of the section is visible
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active from all
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active to current
                const activeId = entry.target.getAttribute('id');
                const activeLink = document.querySelector(`.nav-link[href="#${activeId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    sections.forEach(sec => sectionObserver.observe(sec));


    // 2. Glitch Text Effect on Hover for Titles
    const glitchTitles = document.querySelectorAll('.glitch-title');
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";

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
                        return letters[Math.floor(Math.random() * letters.length)];
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
                chevrons[chevronIndex].style.fill = '#f1fc2f'; // Highlight with yellow
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
                
                // Add a 1 second delay before starting so the user can read 'HAKAI TSU'
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
                        iterations += 0.3; // Slow down the glitch: 21 / 0.3 * 50ms = ~3.5 seconds
                    }, 50);
                }, 1000);
            }
        }, { threshold: 0.3 }); // Trigger when 30% of section is visible
        
        if(aboutSection) {
            aboutObserver.observe(aboutSection);
        }
    }
});
