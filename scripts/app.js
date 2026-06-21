let currentLang = "nl";

/* =========================
       TRANSLATIONS
========================= */

const translations = {
    nl: {
        "app-title": "Health Tracker",
        "activiteit-titel": "Nieuwe activiteit",
        "toevoegen-knop": "Toevoegen",
        "weekly-title": "Weekelijkse voortgang voor stappen",
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
        "weekly-title": "Weekly Progress for steps",
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

/* =========================
            DAYS
========================= */

const days = {
    nl: { Mon:"Ma", Tue:"Di", Wed:"Wo", Thu:"Do", Fri:"Vr", Sat:"Za", Sun:"Zo" },
    en: { Mon:"Mon", Tue:"Tue", Wed:"Wed", Thu:"Thu", Fri:"Fri", Sat:"Sat", Sun:"Sun" }
};

/* =========================
            DATE
========================= */

function updateDate(lang) {
    const el = document.getElementById("app-date");

    const locale = lang === "nl" ? "nl-NL" : "en-US";

    el.innerText = new Date().toLocaleDateString(locale, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    });
}

/* =========================
     LANGUAGE FUNCTION
========================= */

function setLanguage(lang) {
    currentLang = lang;

    const data = translations[lang];

    for (let key in data) {
        const el = document.getElementById(key);
        if (el) el.innerText = data[key];
    }

    // input placeholder
    const input = document.getElementById("activiteit-input");
    if (input) {
        input.placeholder = lang === "nl"
            ? "Wat ga je doen?"
            : "What will you do?";
    }

    // days fix (NO undefined)
    document.querySelectorAll(".bar").forEach(bar => {
        if (!bar.dataset.originalDay) {
            bar.dataset.originalDay = bar.dataset.day;
        }

        const original = bar.dataset.originalDay;
        bar.dataset.day = days[lang][original] || original;
    });

    updateDate(lang);

    document.getElementById("taal-knop").innerText =
        lang === "nl" ? "English" : "Nederlands";
}

/* =========================
          BUTTON
========================= */

document.getElementById("taal-knop").addEventListener("click", () => {
    setLanguage(currentLang === "nl" ? "en" : "nl");
});

/* =========================
          CHART
========================= */

document.querySelectorAll(".bar").forEach(bar => {
    bar.style.height = bar.dataset.value + "%";
    bar.title = bar.dataset.label;
});

/* =========================
          START
========================= */

setLanguage("nl");