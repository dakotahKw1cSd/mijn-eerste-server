/* =========================
   🌍 LANGUAGE SYSTEM
========================= */

let currentLang = "nl";

const translations = {
    nl: {
        "app-title": "Health Tracker",
        "activiteit-titel": "Nieuwe activiteit",
        "toevoegen-knop": "Toevoegen",
        "weekly-title": "Weekelijkse voortgang",
        "weekly-sub": "Je activiteit per dag (0–100%)",
        "recent-titel": "Recente Activiteiten",
        "quick-title": "Snelle acties",
        "water-btn": "Water toevoegen",
        "steps-btn": "Stappen toevoegen",
        "home-link": "Home",
        "stats-link": "Stats",
        "profile-link": "Profiel",
        "water-title": "Water",
        "steps-title": "Stappen",
        "sleep-title": "Slaap",
        "weight-title": "Gewicht",
        "water-unit": "glazen",
        "sleep-sub": "gisteravond"
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
   🌍 SET LANGUAGE FUNCTION
========================= */

function setLanguage(lang) {
    currentLang = lang;

    const data = translations[lang];

    // tekst vertalen
    for (let key in data) {
        let el = document.getElementById(key);
        if (el) el.innerText = data[key];
    }

    // input placeholder
    const input = document.getElementById("activiteit-input");
    if (input) {
        input.placeholder =
            lang === "nl"
                ? "Wat ga je doen?"
                : "What will you do?";
    }

    // dagen van chart vertalen
    document.querySelectorAll(".bar").forEach(bar => {
        let day = bar.dataset.day;
        bar.dataset.day = days[lang][day];
    });

    updateDate(lang);
    // knop tekst
    document.getElementById("taal-knop").innerText =
        lang === "nl" ? "English" : "Nederlands";
}

/* =========================
   🔘 LANGUAGE BUTTON
========================= */

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("taal-knop").addEventListener("click", () => {
        if (currentLang === "nl") {
            setLanguage("en");
        } else {
            setLanguage("nl");
        }
    });

    // start in NL
    setLanguage("nl");
});

/* =========================
   📊 WEEKLY CHART
========================= */

document.querySelectorAll(".bar").forEach(bar => {

    // 🧠 altijd originele waarde bewaren
    if (!bar.dataset.originalDay) {
        bar.dataset.originalDay = bar.dataset.day;
    }

    let original = bar.dataset.originalDay;

    bar.dataset.day = days[lang][original] || original;
});

function updateDate(lang) {
    const el = document.getElementById("app-date");

    const today = new Date();

    const locale = lang === "nl" ? "nl-NL" : "en-US";

    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    };

    el.innerText = today.toLocaleDateString(locale, options);
}