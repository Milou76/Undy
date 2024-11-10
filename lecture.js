async function readData() {
    const sheetId = '1O2dwrZBShHpLCS2TcVhHHbBahDfhtkZFOflWCauIOoI';
    const apiKey = 'AIzaSyAEeiHh74hDUPTijbwP0MxvrBaWQbw4V-I';
    const range = 'Feuille1!H6:J7';
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.values && data.values.length > 0) {
            const [donne, personne, autres] = data.values[0];
            document.getElementById('modal-donne').innerText = donne || 'Non spécifié';
            document.getElementById('modal-personne').innerText = personne || 'Non spécifié';
            document.getElementById('modal-autres').innerText = autres || 'Non spécifié';
        } else {
            console.error('Aucune donnée trouvée.');
            alert("Undy n'a pas été nourri pour le moment");
        }
        document.getElementById('myModal').style.display = 'flex';
    } catch (error) {
        console.error('Erreur de récupération de données:', error);
        alert("Erreur lors de la récupération des données.");
    }
}
document.getElementById('openFormButton').addEventListener('click', function() {
    readData();
});
document.getElementById('openFormButton').addEventListener('click', function() {
    window.location.href = 'formulaire.html';
});
window.onload = readData;