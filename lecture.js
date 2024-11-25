// Fonction principale pour récupérer et afficher les données
async function readData() {
    const sheetId = '1O2dwrZBShHpLCS2TcVhHHbBahDfhtkZFOflWCauIOoI';
    const apiKey = 'AIzaSyAEeiHh74hDUPTijbwP0MxvrBaWQbw4V-I';
    const range = 'Feuille1!A2:C3'; // Inclut les lignes 2 et 3
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!data.values || data.values.length === 0) {
            console.warn("Aucune donnée trouvée.");
            afficherAucuneDonnee(); // Cas où aucune donnée n'est trouvée
            return;
        }

        const matin = data.values[0] || []; // Ligne 2
        const soir = data.values[1] || [];  // Ligne 3

        // Vérification du type de donnée en A2
        if (matin[0] === 'Gamelle entière') {
            afficherGamelleEntiere({
                quantite: matin[0],
                personne: matin[1],
                date: matin[2],
            });
        } else if (matin[0] === 'Demie gamelle') {
            afficherDemieGamelle({
                quantiteMatin: matin[0],
                personneMatin: matin[1],
                dateMatin: matin[2],
                quantiteSoir: soir[0] || 'Pas encore nourri',
                personneSoir: soir[1] || 'Pas encore nourri',
                dateSoir: soir[2] || 'Pas encore nourri',
            });
        } else {
            afficherAucuneDonnee();
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        alert("Erreur lors de la récupération des données.");
    }
}

// Affichage pour une gamelle entière
function afficherGamelleEntiere({ quantite, personne, date }) {
    document.getElementById('modal-donne').innerText = quantite || 'Pas encore nourri';
    document.getElementById('modal-personne').innerText = personne || 'Pas encore nourri';
    document.getElementById('modal-date').innerText = date || 'Pas encore nourri';

    document.getElementById('modal').style.display = 'flex';
}

// Affichage pour une demie gamelle
function afficherDemieGamelle({ quantiteMatin, personneMatin, dateMatin, quantiteSoir, personneSoir, dateSoir }) {
    document.getElementById('modal-donne-matin').innerText = quantiteMatin || 'Pas encore nourri';
    document.getElementById('modal-personne-matin').innerText = personneMatin || 'Pas encore nourri';
    document.getElementById('modal-date-matin').innerText = dateMatin || 'Pas encore nourri';

    document.getElementById('modal-donne-soir').innerText = quantiteSoir || 'Pas encore nourri';
    document.getElementById('modal-personne-soir').innerText = personneSoir || 'Pas encore nourri';
    document.getElementById('modal-date-soir').innerText = dateSoir || 'Pas encore nourri';

    document.getElementById('modal-complete').style.display = 'flex';
}

// Affichage si aucune donnée
function afficherAucuneDonnee() {
    document.getElementById('modal-donne').innerText = 'Pas encore nourri';
    document.getElementById('modal-personne').innerText = 'Pas encore nourri';
    document.getElementById('modal-date').innerText = 'Pas encore nourri';

    document.getElementById('modal').style.display = 'flex';
}

// Redirection vers le formulaire
document.getElementById('openFormButton').addEventListener('click', function () {
    window.location.href = 'formulaireU.html';
});

// Lancer la récupération des données au chargement de la page
window.onload = readData;
