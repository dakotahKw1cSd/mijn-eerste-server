const toggleButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

// Menu
toggleButton.addEventListener('click', () => {
  nav.classList.toggle('is-open');

  const isExpanded = nav.classList.contains('is-open');
  toggleButton.setAttribute('aria-expanded', isExpanded);
});

// Vertalingen
const teksten = {
  nl: {
    titel: 'Mijn Health App',
    placeholder: 'Wat moet je doen?',
    toevoegen: 'Toevoegen',
    verwijderen: 'Verwijder',
    profiel: 'Profiel',
    stats: 'Statistieken',
    geenTaken: 'Nog geen taken.',
    taalKnop: 'English'
  },
  en: {
    titel: 'My Health App',
    placeholder: 'What do you need to do?',
    toevoegen: 'Add',
    verwijderen: 'Delete',
    profiel: 'Profile',
    stats: 'Statistics',
    geenTaken: 'No tasks yet.',
    taalKnop: 'Nederlands'
  }
};

let taal = localStorage.getItem('taal') || 'nl';

// Taken ophalen
function getTaken() {
  const data = localStorage.getItem('taken');
  return data ? JSON.parse(data) : [];
}

// Taken opslaan
function saveTaken(taken) {
  localStorage.setItem('taken', JSON.stringify(taken));
}

// Taal aanpassen
function veranderTaal() {
  document.title = teksten[taal].titel;

  document.querySelector('#taak-titel').placeholder =
    teksten[taal].placeholder;

  document.querySelector('#toevoegen-knop').textContent =
    teksten[taal].toevoegen;

  document.querySelector('#profiel-link').textContent =
    teksten[taal].profiel;

  document.querySelector('#stats-link').textContent =
    teksten[taal].stats;

  document.querySelector('#taal-knop').textContent =
    teksten[taal].taalKnop;

  toonItems();
}

// Taken tonen
function toonItems() {
  const taken = getTaken();
  const lijst = document.querySelector('#taken-lijst');

  if (taken.length === 0) {
    lijst.innerHTML = `<li>${teksten[taal].geenTaken}</li>`;
    return;
  }

  lijst.innerHTML = taken.map(t => `
    <li data-id="${t.id}">
      ${t.titel}
      <small>${t.datum}</small>
      <button class="verwijder-btn btn btn-danger btn-sm">
        ${teksten[taal].verwijderen}
      </button>
    </li>
  `).join('');
}

// Formulier
const formulier = document.querySelector('#taak-formulier');

formulier.addEventListener('submit', function(event) {
  event.preventDefault();

  const titel = document.querySelector('#taak-titel').value.trim();
  const datum = document.querySelector('#taak-datum').value;

  if (!titel || !datum) return;

  const taken = getTaken();

  taken.push({
    id: Date.now(),
    titel,
    datum
  });

  saveTaken(taken);
  toonItems();
  formulier.reset();
});

// Verwijderen
document.querySelector('#taken-lijst').addEventListener('click', function(event) {
  if (event.target.classList.contains('verwijder-btn')) {

    const id = Number(
      event.target.parentElement.dataset.id
    );

    const taken = getTaken().filter(
      taak => taak.id !== id
    );

    saveTaken(taken);
    toonItems();
  }
});

// Taal wisselen
document.querySelector('#taal-knop').addEventListener('click', () => {
  taal = taal === 'nl' ? 'en' : 'nl';

  localStorage.setItem('taal', taal);

  veranderTaal();
});

// Start
veranderTaal();