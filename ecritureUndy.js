const scriptURL = 'https://script.google.com/macros/s/AKfycby9dAwrdsmfOVXw9uqIcYOQtNnEdUDSVWdKz0QiLKgLry5VON4KOTVJFAGhkQZmFyXs/exec';
const form = document.getElementById('ticket-form');

// Fonction pour mettre à jour la date et l'heure au format personnalisé
function updateCurrentTime() {
    const now = new Date();
    const formattedDate = now.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit'
    }); // Format JJ/MM
    const formattedTime = now.toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit'
    }); // Format HH:MM

    // Met à jour l'affichage visible
    document.getElementById('current-time').textContent = `Date actuelle : ${formattedDate}, ${formattedTime}`;

    // Met à jour la valeur du champ caché
    document.getElementById('heure').value = `${formattedDate} ${formattedTime}`;
}

// Met à jour la date et l'heure toutes les secondes
setInterval(updateCurrentTime, 2000);

// Afficher ou masquer le choix entre "matin" et "soir" en fonction de "Demie gamelle"
document.querySelectorAll('input[name="choixU"]').forEach(input => {
    input.addEventListener('change', function() {
        const momentChoice = document.getElementById('momentChoice');
        if (this.value === 'Demie gamelle') {
            momentChoice.style.display = 'block';  // Afficher le choix matin/soir
        } else {
            momentChoice.style.display = 'none';  // Cacher le choix matin/soir
        }
    });
});

// Envoi des données du formulaire
form.addEventListener('submit', e => {
    e.preventDefault(); // Empêche le rechargement de la page par défaut

    // Envoi des données vers le script Google Apps
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => response.json())
        .then(data => {
            if (data.result === 'success') {
                alert("Les données ont été enregistrées avec succès !");
                window.location.href = "affichageUndy.html";  // Redirige vers la page principale après soumission
            } else {
                alert("Une erreur est survenue : " + data.error);
            }
        })
        .catch(error => {
            console.error('Erreur lors de l\'envoi des données !', error);
            alert("Une erreur est survenue. Veuillez réessayer.");
        });
});

// Initialisation pour mettre à jour l'heure dès le chargement de la page
window.onload = updateCurrentTime;
