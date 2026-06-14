document.addEventListener("DOMContentLoaded", () => {
    
    // 1. تأثير الكتابة الحركي (Typing Effect) في قسم الـ Hero
    const words = ["خبير تكنولوجيا التعليم (EdTech).", "مطور برمجيات وأتمتة.", "رئيس قسم الحاسب الآلي."];
    let i = 0;
    let timer;

    function typingEffect() {
        let word = words[i].split("");
        var loopTyping = function() {
            if (word.length > 0) {
                document.getElementById('typing-text').innerHTML += word.shift();
            } else {
                setTimeout(deletingEffect, 2000);
                return false;
            }
            timer = setTimeout(loopTyping, 100);
        };
        loopTyping();
    }

    function deletingEffect() {
        let word = words[i].split("");
        var loopDeleting = function() {
            if (word.length > 0) {
                word.pop();
                document.getElementById('typing-text').innerHTML = word.join("");
            } else {
                if (words.length > (i + 1)) {
                    i++;
                } else {
                    i = 0;
                }
                setTimeout(typingEffect, 500);
                return false;
            }
            timer = setTimeout(loopDeleting, 50);
        };
        loopDeleting();
    }
    
    // تشغيل تأثير الكتابة لأول مرة
    if(document.getElementById('typing-text')) {
        typingEffect();
    }


    // 2. شريط مؤشر القراءة الاحترافي (Reading Progress Bar)
    window.addEventListener("scroll", () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        document.getElementById("progress-bar").style.width = scrollPercent + "%";
        
        // 5. إظهار/إخفاء زر الصعود للأعلى
        const scrollToTopBtn = document.getElementById("scroll-to-top");
        if (scrollTop > 400) {
            scrollToTopBtn.style.display = "block";
        } else {
            scrollToTopBtn.style.display = "none";
        }
    });


    // 3. زر العودة للأعلى عند الضغط
    document.getElementById("scroll-to-top").addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });


    // 4. العدادات الحية للأرقام (Animated Counters) عند التمرير إليها
    const counters = document.querySelectorAll('.counter-number');
    const speed = 200;

    const startCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 15);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    };

    // استخدام IntersectionObserver لتشغيل العداد فقط عندما يراه المستخدم
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                startCounters();
                observer.unobserve(entry.target); // تشغيلها مرة واحدة فقط
            }
        });
    }, { threshold: 0.5 });

    if(document.getElementById('counters')) {
        observer.observe(document.getElementById('counters'));
    }


    // 5. ميزة تبديل الوضع الليلي والنهاري (Dark/Light Mode) مع حفظ الخيار
    const themeToggleBtn = document.getElementById("theme-toggle");
    const currentTheme = localStorage.getItem("theme");

    if (currentTheme) {
        document.documentElement.setAttribute("data-theme", currentTheme);
        if (currentTheme === "dark") {
            themeToggleBtn.innerText = "☀️";
        }
    }

    themeToggleBtn.addEventListener("click", () => {
        let theme = document.documentElement.getAttribute("data-theme");
        if (theme === "dark") {
            document.documentElement.setAttribute("data-theme", "light");
            localStorage.setItem("theme", "light");
            themeToggleBtn.innerText = "🌙";
        } else {
            document.documentElement.setAttribute("data-theme", "dark");
            localStorage.setItem("theme", "dark");
            themeToggleBtn.innerText = "☀️";
        }
    });


    // 6. التحقق من نموذج الاتصال (Contact Form validation) بشكل تفاعلي
    const contactForm = document.getElementById("main-contact-form");
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("form-name").value;
        alert(`شكراً لتواصلك يا أستاذ محمد، تم استلام رسالة من (${name}) بنجاح!`);
        contactForm.reset();
    });
});
