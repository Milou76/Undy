// Fonction principale pour récupérer et afficher les données pour Eyra
async function readDataEyra() {
    const sheetId = '1O2dwrZBShHpLCS2TcVhHHbBahDfhtkZFOflWCauIOoI';
    const apiKey = 'AIzaSyAEeiHh74hDUPTijbwP0MxvrBaWQbw4V-I';
    const range = 'Eyra!A2:C3'; // Inclut les lignes 2 et 3 pour Eyra
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!data.values || data.values.length === 0) {
            console.warn("Aucune donnée trouvée pour Eyra.");
            afficherAucuneDonneeEyra();
            return;
        }

        const matin = data.values[0] || []; // Ligne 2 (Eyra matin)
        const soir = data.values[1] || [];  // Ligne 3 (Eyra soir)

        // Vérification du type de donnée en E2
        if (matin[0] === 'Gamelle entière') {
            afficherGamelleEntiereEyra({
                quantite: matin[0],
                personne: matin[1],
                date: matin[2],
            });
        } else if (matin[0] === 'Demie gamelle') {
            afficherDemieGamelleEyra({
                quantiteMatin: matin[0],
                personneMatin: matin[1],
                dateMatin: matin[2],
                quantiteSoir: soir[0] || 'Non spécifié',
                personneSoir: soir[1] || 'Non spécifié',
                dateSoir: soir[2] || 'Non spécifié',
            });
        } else {
            afficherAucuneDonneeEyra();
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des données pour Eyra :", error);
        alert("Erreur lors de la récupération des données.");
    }
}

// Affichage pour une gamelle entière pour Eyra
function afficherGamelleEntiereEyra({ quantite, personne, date }) {
    document.getElementById('modal-donne-eyra').innerText = quantite || 'Non spécifié';
    document.getElementById('modal-personne-eyra').innerText = personne || 'Non spécifié';
    document.getElementById('modal-date-eyra').innerText = date || 'Non spécifié';

    document.getElementById('modal-eyra').style.display = 'flex';
}

// Affichage pour une demie gamelle pour Eyra
function afficherDemieGamelleEyra({ quantiteMatin, personneMatin, dateMatin, quantiteSoir, personneSoir, dateSoir }) {
    document.getElementById('modal-donne-matin-eyra').innerText = quantiteMatin || 'Non spécifié';
    document.getElementById('modal-personne-matin-eyra').innerText = personneMatin || 'Non spécifié';
    document.getElementById('modal-date-matin-eyra').innerText = dateMatin || 'Non spécifié';

    document.getElementById('modal-donne-soir-eyra').innerText = quantiteSoir || 'Non spécifié';
    document.getElementById('modal-personne-soir-eyra').innerText = personneSoir || 'Non spécifié';
    document.getElementById('modal-date-soir-eyra').innerText = dateSoir || 'Non spécifié';

    document.getElementById('modal-complete-eyra').style.display = 'flex';
}

// Affichage si aucune donnée pour Eyra
function afficherAucuneDonneeEyra() {
    document.getElementById('modal-donne-eyra').innerText = 'Non spécifié';
    document.getElementById('modal-personne-eyra').innerText = 'Non spécifié';
    document.getElementById('modal-date-eyra').innerText = 'Non spécifié';

    document.getElementById('modal-eyra').style.display = 'flex';
}

// Redirection vers le formulaire pour Eyra
document.getElementById('openFormButtonEyra').addEventListener('click', function () {
    window.location.href = 'formulaireE.html';
});

// Lancer la récupération des données pour Eyra au chargement de la page
window.onload = readDataEyra;
