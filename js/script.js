let etudiants = [];

// Charger le fichier JSON au chargement de la page
window.addEventListener("DOMContentLoaded", () => {
  fetch('PV/id.json')
    .then(response => response.json())
    .then(data => {
      etudiants = data;
    })
    .catch(error => {
      afficherMessage("Erreur de chargement des données.", true);
      console.error("Erreur lors du chargement du JSON :", error);
    });
});

function chercherPDF() {
  const champ = document.getElementById('matricule');
  const matricule = champ.value.trim().toUpperCase();

  // Recherche de l'étudiant par matricule
  const etudiant = etudiants.find(e => e.matricule.toUpperCase() === matricule);

  if (etudiant) {
    const chemin = `PV/${etudiant.filiere}/${etudiant.option}/${etudiant.niveau}/${etudiant.matricule}.pdf`;

    afficherMessage(`
      Bonjour <strong>${etudiant.nom+"\n"+etudiant.filiere+"("+etudiant.option+"-"+etudiant.niveau+")" }</strong>.<br>
      <a href="${chemin}" open>Télécharger votre PV</a>
    `);
  } else {
    afficherMessage("❌ Matricule introuvable. Vérifiez bien les majuscules.", true);
  }
}

function afficherMessage(message, erreur = false) {
  const div = document.getElementById('resultat');
  div.innerHTML = message;
  div.style.color = erreur ? '#c62828' : '#2e7d32'; // rouge ou vert
}