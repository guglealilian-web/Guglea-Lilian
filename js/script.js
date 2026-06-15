// =============================================
//   DISCOVER MOLDOVA - script.js
// =============================================


// -----------------------------------------------
// 1. NAVIGATIE ACTIVA — evidentiaza link-ul curent
// -----------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll(".header-nav ul li a");
    const currentPage = window.location.pathname.split("/").pop();

    navLinks.forEach(function (link) {
        const linkPage = link.getAttribute("href").split("/").pop();
        if (linkPage === currentPage) {
            navLinks.forEach(l => l.classList.remove("active"));
            link.classList.add("active");
        }
    });
});


// -----------------------------------------------
// 2. NEWSLETTER — mesaj de confirmare la submit
// -----------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".newsletter-form");
    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            const input = form.querySelector("input[type='email']");
            const email = input.value.trim();

            if (email !== "") {
                input.value = "";
                input.placeholder = "✔ Înregistrat cu succes!";
                input.style.color = "#2e7d32";
                setTimeout(function () {
                    input.placeholder = "email.com";
                    input.style.color = "";
                }, 3000);
            }
        });
    }
});


// -----------------------------------------------
// 3. CAUTARE DESTINATII — filtreaza cardurile live
// -----------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.querySelector(".search-box input");
    const cards = document.querySelectorAll(".dest-card");

    if (searchInput && cards.length > 0) {
        searchInput.addEventListener("input", function () {
            const query = searchInput.value.toLowerCase().trim();

            cards.forEach(function (card) {
                const title = card.querySelector("h3");
                if (title) {
                    const text = title.textContent.toLowerCase();
                    if (text.includes(query)) {
                        card.style.display = "";
                    } else {
                        card.style.display = "none";
                    }
                }
            });
        });
    }
});


// -----------------------------------------------
// 4. SCROLL TO TOP — buton apare dupa scroll
// -----------------------------------------------
(function () {
    // Cream butonul
    const btn = document.createElement("button");
    btn.textContent = "↑";
    btn.title = "Înapoi sus";
    btn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 42px;
        height: 42px;
        border-radius: 50%;
        background: #4caf50;
        color: white;
        border: none;
        font-size: 20px;
        cursor: pointer;
        display: none;
        z-index: 999;
        box-shadow: 0 3px 10px rgba(0,0,0,0.25);
        transition: background 0.2s;
    `;
    document.body.appendChild(btn);

    // Arata/ascunde la scroll
    window.addEventListener("scroll", function () {
        if (window.scrollY > 300) {
            btn.style.display = "block";
        } else {
            btn.style.display = "none";
        }
    });

    // Click — scroll sus
    btn.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // Hover
    btn.addEventListener("mouseenter", function () {
        btn.style.background = "#2e7d32";
    });
    btn.addEventListener("mouseleave", function () {
        btn.style.background = "#4caf50";
    });
})();


// -----------------------------------------------
// 5. ANIMATIE CARDURI — fade-in la incarcare
// -----------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
    const allCards = document.querySelectorAll(".card, .dest-card");

    allCards.forEach(function (card, index) {
        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";
        card.style.transition = "opacity 0.4s ease, transform 0.4s ease";

        setTimeout(function () {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
        }, 100 + index * 100);
    });
});


// -----------------------------------------------
// 6. SLIDER — Pachete Turistice (auto + dots)
// -----------------------------------------------
(function () {
    const track = document.getElementById("sliderTrack");
    const dots = document.querySelectorAll(".dot");
    if (!track || dots.length === 0) return;

    let current = 0;
    const total = dots.length;

    function goToSlide(index) {
        current = index;
        // Arata 3 slide-uri deodata, scrollam cu 1 slide (33.333%)
        track.style.transform = "translateX(-" + (current * 33.333) + "%)";
        dots.forEach(function (d, i) {
            d.classList.toggle("active", i === current);
        });
    }

    // Expune global pentru onclick din HTML
    window.goToSlide = goToSlide;

    // Auto-play la fiecare 3 secunde
    setInterval(function () {
        goToSlide((current + 1) % total);
    }, 3000);
})();


// -----------------------------------------------
// 7. FILTRE GALERIE — afiseaza/ascunde imagini
// -----------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
    const filtreBtns = document.querySelectorAll(".filtru-btn");
    const galerieItems = document.querySelectorAll(".galerie-item");

    if (filtreBtns.length === 0) return;

    filtreBtns.forEach(function (btn) {
        btn.addEventListener("click", function () {
            // Activeaza butonul selectat
            filtreBtns.forEach(function (b) { b.classList.remove("active"); });
            btn.classList.add("active");

            const filter = btn.getAttribute("data-filter");

            galerieItems.forEach(function (item) {
                if (filter === "toate" || item.getAttribute("data-category") === filter) {
                    item.classList.remove("hidden");
                    item.style.display = "";
                } else {
                    item.classList.add("hidden");
                    item.style.display = "none";
                }
            });
        });
    });
});


// -----------------------------------------------
// 8. FORMULAR CONTACT — mesaj de confirmare
// -----------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contactForm");
    if (!contactForm) return;

    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const btn = contactForm.querySelector(".btn-trimite");
        btn.textContent = "✔ Mesaj trimis!";
        btn.style.background = "#2e7d32";
        btn.disabled = true;

        setTimeout(function () {
            contactForm.reset();
            btn.textContent = "Trimite mesaj!";
            btn.style.background = "";
            btn.disabled = false;
        }, 3000);
    });
});