const scriptURL = 'https://script.google.com/macros/s/AKfycbwUQgVSVExyfUn_RaNOZ14UTyzxgirNVY98lBwkUVFBN0xbO1yhUb8W9iDILZKPBvIF/exec';
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

// Envoi des données du formulaire
form.addEventListener('submit', e => {
    e.preventDefault(); // Empêche le rechargement de la page par défaut
    
    // Vérification avant d'envoyer
    const heureField = document.getElementById('heure');
    if (!heureField.value) {
        alert("L'heure n'a pas été correctement définie.");
        return; // Si l'heure n'est pas définie, on arrête l'envoi
    }

    // Envoi des données via fetch
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => response.json())
        .then(data => {
            if (data.result === 'success') {
                alert("Les données ont été enregistrées avec succès !");
                // Redirige vers la page principale après soumission
                window.location.href = "affichageEyra.html";
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
