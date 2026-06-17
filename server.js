// =========================================
// STAP 1: Benodigde packages inladen
// =========================================
const express = require('express');
const app     = express();
const PORT    = 3000;

// =========================================
// STAP 2: Helper functie voor HTML pagina's
// Hiermee hoef je de HTML-structuur niet
// elke keer opnieuw te schrijven.
// =========================================
function maakPagina(titel, inhoud) {
    return `
        <!DOCTYPE html>
        <html lang="nl">
        <head>
            <meta charset="UTF-8">
            <title>${titel} – Mijn Films</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 40px; max-width: 700px; }
                nav a { margin-right: 16px; text-decoration: none; color: #1565C0; font-weight: bold; }
                nav a:hover { text-decoration: underline; }
                footer { margin-top: 40px; color: #888; font-size: 0.85rem; }
            </style>
        </head>
        <body>
            <nav>
                <a href="/">🏠 Home</a>
                <a href="/dashboard">📊 Dashboard</a>
                <a href="/about">ℹ️ Over</a>
            </nav>
            <hr>
            ${inhoud}
            <footer>Mijn Films App – Week 1</footer>
        </body>
        </html>
    `;
}

// =========================================
// STAP 3: Pagina-routes (sturen HTML terug)
// =========================================

// Route 1: Homepagina
app.get('/', (req, res) => {
    const inhoud = `
        <h1>🎬 Welkom bij Mijn Films!</h1>
        <p>Met deze app houd je bij welke films je hebt gezien.</p>
        <ul>
            <li>🎥 Films toevoegen</li>
            <li>⭐ Films beoordelen</li>
            <li>📋 Watchlist bijhouden</li>
        </ul>
        <a href="/dashboard">Naar dashboard →</a>
    `;
    res.send(maakPagina('Home', inhoud));
});

// Route 2: Dashboard
app.get('/dashboard', (req, res) => {
    const inhoud = `
        <h1>📊 Dashboard</h1>
        <p>Hier komt later jouw filmoverzicht.</p>
        <p><em>In week 6 bouwen we dit uit met echte data!</em></p>
    `;
    res.send(maakPagina('Dashboard', inhoud));
});

// Route 3: Over de app
app.get('/about', (req, res) => {
    const inhoud = `
        <h1>ℹ️ Over Deze App</h1>
        <p>Gebouwd als onderdeel van de module "Eenvoudige Mobiele App".</p>
        <p>Gemaakt door: <strong>dakotah</strong></p>
    `;
    res.send(maakPagina('Over de App', inhoud));
});

// =========================================
// STAP 4: API-routes (sturen JSON terug)
// =========================================

// API-route: basisinformatie van de app
app.get('/api/info', (req, res) => {
    res.json({
        naam:    'Mijn Films',
        versie:  '1.0.0',
        student: 'dakotah'
    });
});

// API-route: voorbeelddata (later uit LocalStorage)
app.get('/api/items', (req, res) => {
    const voorbeeldData = [
        { id: 1, categorie: 'actie',    omschrijving: 'The Dark Knight'    },
        { id: 2, categorie: 'komedie',  omschrijving: 'Home Alone'         },
        { id: 3, categorie: 'animatie', omschrijving: 'Spider-Man: Into the Spider-Verse' }
    ];
    res.json(voorbeeldData);
});

// =========================================
// STAP 5: 404-pagina (altijd als laatste!)
// =========================================
app.use((req, res) => {
    res.status(404).send(maakPagina(
        '404 – Niet gevonden',
        `<h1>😕 Pagina niet gevonden</h1>
         <p>De URL <code>${req.url}</code> bestaat niet.</p>
         <a href="/">← Terug naar home</a>`
    ));
});

// =========================================
// STAP 6: Server starten
// =========================================
app.listen(PORT, () => {
    console.log(`✅ Server draait op http://localhost:${PORT}`);
    console.log('📋 Routes:');
    console.log('   http://localhost:3000/');
    console.log('   http://localhost:3000/dashboard');
    console.log('   http://localhost:3000/about');
    console.log('   http://localhost:3000/api/info');
    console.log('   http://localhost:3000/api/items');
});