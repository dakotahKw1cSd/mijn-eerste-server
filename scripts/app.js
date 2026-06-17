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
    .map(t => `<li data-id="${t.id}">${t.titel} <small>${t.datum}</small></li>`)
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