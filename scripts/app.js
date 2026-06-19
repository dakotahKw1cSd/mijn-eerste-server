const toggleButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

toggleButton.addEventListener('click', () => {
    // Schakel de klasse 'is-open' op het navigatie-element
    nav.classList.toggle('is-open');

    // Optioneel maar beter voor toegankelijkheid: update aria-expanded
    const isExpanded = nav.classList.contains('is-open');
    toggleButton.setAttribute('aria-expanded', isExpanded);
});

const formulier = document.querySelector('#taak-formulier');

function getTaken() {
  const data = localStorage.getItem('taken');
  return data ? JSON.parse(data) : [];
}

function saveTaken(taken) {
  localStorage.setItem('taken', JSON.stringify(taken));
}

function toonItems() {
  const taken = getTaken();
  const lijst = document.querySelector('#taken-lijst');
  if (taken.length === 0) {
    lijst.innerHTML = '<li>Nog geen taken.</li>';
    return;
  }
lijst.innerHTML = taken
  .map(t => `
    <li data-id="${t.id}">
      ${t.titel} <small>${t.datum}</small>
      <button class="verwijder-btn">Verwijder</button>
    </li>
  `)
  .join('');
}

formulier.addEventListener('submit', function(event) {
  event.preventDefault();
  const taken = getTaken();
  taken.push({
    id: Date.now(),
    titel: document.querySelector('#taak-titel').value.trim(),
    datum: document.querySelector('#taak-datum').value
  });
  saveTaken(taken);
  toonItems();
  formulier.reset();
});

// Direct bij laden van de pagina
toonItems();
document.querySelector('#taken-lijst').addEventListener('click', function(event) {
  if (event.target.classList.contains('verwijder-btn')) {
    
    const li = event.target.parentElement;
    const id = Number(li.dataset.id);

    let taken = getTaken();

    taken = taken.filter(taak => taak.id !== id);

    saveTaken(taken);
    toonItems();
  }
});