        const sheetdbApiUrl = 'https://sheetdb.io/api/v1/g10izcuqn4u6k';
function getCurrentDate() {
    const date = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('fr-FR', options);
}
async function submitData() {
    const donne = document.querySelector('input[name="data[Donné ?]"]:checked').value;
    const personne = document.getElementById('person').value;
    const autres = document.getElementById('additional').value;
    const data = {
        "Date": getCurrentDate(),
        "Donné ?": donne,
        "Personne": personne,
        "Autres": autres
    };
    try {
        const response = await fetch(sheetdbApiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify([data]),
        });
        const result = await response.json();
        console.log('Données envoyées:', result);
        alert("Félicitation, tu as enfin reussi a faire quelque chose dans ta vie !");
    } catch (error) {
        console.error('Erreur d\'envoi:', error);
        alert("Une erreur s'est produite lors de l'envoi des données.");
}}
document.getElementById('formulaire').addEventListener('submit', function(e) {
    e.preventDefault();
    submitData();
});