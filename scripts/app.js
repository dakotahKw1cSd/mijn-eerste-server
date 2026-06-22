/* =========================
    TAAL
========================= */

let currentLang = "nl";

const translations = {
    nl: {
        "app-title": "Health Tracker",
        "activiteit-titel": "Nieuwe activiteit",
        "toevoegen-knop": "Toevoegen",
        "weekly-title": "Weekelijkse voortgang",
        "weekly-sub": "Je activiteit per dag (0–100%)",
        "recent-titel": "Recente activiteiten",
        "quick-title": "Snelle acties",
        "water-btn": "Water toevoegen",
        "steps-btn": "Stappen toevoegen",
        "home-link": "Home",
        "stats-link": "Statistieken",
        "profile-link": "Profiel",
        "water-title": "Water",
        "steps-title": "Stappen",
        "sleep-title": "Slaap",
        "weight-title": "Gewicht",
        "water-unit": "glazen",
        "sleep-sub": "afgelopen nacht"
    },
    en: {
        "app-title": "Health Tracker",
        "activiteit-titel": "New activity",
        "toevoegen-knop": "Add",
        "weekly-title": "Weekly Progress",
        "weekly-sub": "Your activity per day (0–100%)",
        "recent-titel": "Recent Activities",
        "quick-title": "Quick Actions",
        "water-btn": "Add Water",
        "steps-btn": "Add Steps",
        "home-link": "Home",
        "stats-link": "Stats",
        "profile-link": "Profile",
        "water-title": "Water",
        "steps-title": "Steps",
        "sleep-title": "Sleep",
        "weight-title": "Weight",
        "water-unit": "glasses",
        "sleep-sub": "last night"
    }
};

const days = {
    nl: {
        Mon: "Ma",
        Tue: "Di",
        Wed: "Wo",
        Thu: "Do",
        Fri: "Vr",
        Sat: "Za",
        Sun: "Zo"
    },
    en: {
        Mon: "Mon",
        Tue: "Tue",
        Wed: "Wed",
        Thu: "Thu",
        Fri: "Fri",
        Sat: "Sat",
        Sun: "Sun"
    }
};

/* =========================
   DATUM
========================= */

function updateDate(lang) {
    const el = document.getElementById("app-date");

    if (!el) return;

    const locale = lang === "nl" ? "nl-NL" : "en-US";

    el.textContent = new Date().toLocaleDateString(locale, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    });
}

/* =========================
    TAAL FUNCTIE
========================= */

function setLanguage(lang) {
    currentLang = lang;

    const data = translations[lang];

    for (const key in data) {
        const el = document.getElementById(key);

        if (el) {
            el.textContent = data[key];
        }
    }

    const input = document.getElementById("activiteit-input");

    if (input) {
        input.placeholder =
            lang === "nl"
                ? "Wat ga je doen?"
                : "What will you do?";
    }

    document.querySelectorAll(".bar").forEach(bar => {

        if (!bar.dataset.originalDay) {
            bar.dataset.originalDay = bar.dataset.day;
        }

        const original = bar.dataset.originalDay;

        bar.dataset.day = days[lang][original] || original;
    });

    updateDate(lang);

    const taalKnop = document.getElementById("taal-knop");

    if (taalKnop) {
        taalKnop.textContent =
            lang === "nl"
                ? "English"
                : "Nederlands";
    }
}

/* =========================
    CRUD ACTIVITEITEN
========================= */

function getActiviteiten() {
    const data = localStorage.getItem("activiteiten");
    return data ? JSON.parse(data) : [];
}

function saveActiviteiten(activiteiten) {
    localStorage.setItem(
        "activiteiten",
        JSON.stringify(activiteiten)
    );
}

function toonActiviteiten() {

    const lijst =
        document.getElementById("activiteiten-lijst");

    if (!lijst) return;

    const activiteiten =
        getActiviteiten();

    if (activiteiten.length === 0) {

        lijst.innerHTML =
            currentLang === "nl"
                ? "<li class='list-group-item'>Nog geen activiteiten.</li>"
                : "<li class='list-group-item'>No activities yet.</li>";

        return;
    }

    lijst.innerHTML = activiteiten
        .map(a => `
            <li
                class="list-group-item d-flex justify-content-between align-items-center"
                data-id="${a.id}">

                <div>
                    <strong>${a.titel}</strong><br>
                    <small>${a.datum}</small>
                </div>

                <button
                    class="btn btn-danger btn-sm verwijder-btn">
                    ✕
                </button>

            </li>
        `)
        .join("");
}

/* =========================
    START
========================= */

document.addEventListener("DOMContentLoaded", () => {

    // Chart
    document.querySelectorAll(".bar").forEach(bar => {
        bar.style.height =
            bar.dataset.value + "%";

        bar.title =
            bar.dataset.label;
    });

    // Formulier
    const formulier =
        document.getElementById("activiteit-form");

    const input =
        document.getElementById("activiteit-input");

    if (formulier && input) {

        formulier.addEventListener("submit", e => {

            e.preventDefault();

            const titel =
                input.value.trim();

            if (!titel) return;

            const activiteiten =
                getActiviteiten();

            activiteiten.push({
                id: Date.now(),
                titel,
                datum: new Date().toLocaleString()
            });

            saveActiviteiten(activiteiten);

            input.value = "";

            toonActiviteiten();
        });
    }

    // Delete
    const lijst =
        document.getElementById("activiteiten-lijst");

    if (lijst) {

        lijst.addEventListener("click", e => {

            if (
                e.target.classList.contains(
                    "verwijder-btn"
                )
            ) {

                const li =
                    e.target.closest("li");

                const id =
                    Number(li.dataset.id);

                let activiteiten =
                    getActiviteiten();

                activiteiten =
                    activiteiten.filter(
                        a => a.id !== id
                    );

                saveActiviteiten(
                    activiteiten
                );

                toonActiviteiten();
            }
        });
    }

    // Taal knop
    const taalKnop =
        document.getElementById("taal-knop");

    if (taalKnop) {

        taalKnop.addEventListener(
            "click",
            () => {

                setLanguage(
                    currentLang === "nl"
                        ? "en"
                        : "nl"
                );

                toonActiviteiten();
            }
        );
    }

    toonActiviteiten();
    setLanguage("nl");
});