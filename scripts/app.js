
const formulier =
document.getElementById("activiteit-form");

const lijst =
document.getElementById("activiteiten-lijst");

let activiteiten =
JSON.parse(localStorage.getItem("activiteiten"))
|| [];

function toonActiviteiten() {

    lijst.innerHTML = "";

    activiteiten.forEach((item, index) => {

        lijst.innerHTML += `
            <li class="list-group-item d-flex justify-content-between">
                ${item}
                <button
                    class="btn btn-danger btn-sm"
                    onclick="verwijderActiviteit(${index})">
                    X
                </button>
            </li>
        `;
    });
}

formulier.addEventListener("submit", function(e){

    e.preventDefault();

    const input =
    document.getElementById("activiteit-input");

    activiteiten.push(input.value);

    localStorage.setItem(
        "activiteiten",
        JSON.stringify(activiteiten)
    );

    input.value = "";

    toonActiviteiten();

});

function verwijderActiviteit(index){

    activiteiten.splice(index, 1);

    localStorage.setItem(
        "activiteiten",
        JSON.stringify(activiteiten)
    );

    toonActiviteiten();
}

toonActiviteiten();

const teksten = {

    nl: {
        activiteitTitel: "Nieuwe activiteit",
        placeholder: "Wat ga je doen?",
        toevoegen: "Toevoegen",
        recent: "Recente Activiteiten",
        home: "Home",
        stats: "Statistieken",
        profile: "Profiel",
        taalKnop: "English"
    },

    en: {
        activiteitTitel: "New Activity",
        placeholder: "What are you going to do?",
        toevoegen: "Add",
        recent: "Recent Activity",
        home: "Home",
        stats: "Statistics",
        profile: "Profile",
        taalKnop: "Nederlands"
    }
};

let taal =
localStorage.getItem("taal") || "nl";

function veranderTaal() {

    document.getElementById("activiteit-titel")
        .textContent =
        teksten[taal].activiteitTitel;

    document.getElementById("activiteit-input")
        .placeholder =
        teksten[taal].placeholder;

    document.getElementById("toevoegen-knop")
        .textContent =
        teksten[taal].toevoegen;

    document.getElementById("recent-titel")
        .textContent =
        teksten[taal].recent;

    document.getElementById("home-link")
        .textContent =
        teksten[taal].home;

    document.getElementById("stats-link")
        .textContent =
        teksten[taal].stats;

    document.getElementById("profile-link")
        .textContent =
        teksten[taal].profile;

    document.getElementById("taal-knop")
        .textContent =
        teksten[taal].taalKnop;
}

document
.getElementById("taal-knop")
.addEventListener("click", () => {

    taal = taal === "nl"
        ? "en"
        : "nl";

    localStorage.setItem(
        "taal",
        taal
    );

    veranderTaal();
});

veranderTaal();