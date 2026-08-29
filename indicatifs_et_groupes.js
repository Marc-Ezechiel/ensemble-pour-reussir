// ==========================================================
// INDICATIFS TÉLÉPHONIQUES + GROUPES WHATSAPP PAR CLASSE
// Ensemble Pour Reussir
// ==========================================================

// Indicatif téléphonique selon le pays choisi (mêmes pays que pays_dropdown.js)
const indicatifsPays = {
  "Côte d'Ivoire": "+225", "Sénégal": "+221", "Mali": "+223", "Burkina Faso": "+226",
  "Guinée": "+224", "Togo": "+228", "Bénin": "+229", "Niger": "+227", "Ghana": "+233",
  "Nigeria": "+234", "Cameroun": "+237", "Gabon": "+241", "RD Congo": "+243",
  "Congo": "+242", "Tchad": "+235", "Centrafrique": "+236", "Mauritanie": "+222",
  "Gambie": "+220", "Guinée-Bissau": "+245", "Sierra Leone": "+232", "Liberia": "+231",
  "Maroc": "+212", "Algérie": "+213", "Tunisie": "+216", "Libye": "+218", "Égypte": "+20",
  "France": "+33", "Belgique": "+32", "Suisse": "+41", "Canada": "+1", "États-Unis": "+1",
  "Royaume-Uni": "+44", "Allemagne": "+49", "Espagne": "+34", "Portugal": "+351",
  "Italie": "+39", "Pays-Bas": "+31", "Arabie Saoudite": "+966", "Émirats Arabes Unis": "+971"
};

// ⚠️ REMPLACE chaque lien par le vrai lien du groupe WhatsApp correspondant à la classe
const groupesParClasse = {
  "Ensemble Pour Reussir": "https://chat.whatsapp.com/lien-classe-1",
  "Ensemble Pour Reussir feminin": "https://chat.whatsapp.com/lien-classe-2",
  "Ensemble Pour Reussir Gratuite": "https://chat.whatsapp.com/lien-classe-3",
  "Cours Tiebissaba": "https://chat.whatsapp.com/lien-classe-4",
  "Dalal Kaïra": "https://chat.whatsapp.com/lien-classe-5",
  "Plantes et Guerrison": "https://chat.whatsapp.com/lien-classe-6",
  "Protection Totale": "https://chat.whatsapp.com/lien-classe-7",
  "Ahme Çaqaqoum": "https://chat.whatsapp.com/lien-classe-8",
  "Sirrou Mutakim": "https://chat.whatsapp.com/lien-classe-9",
  "Cours Carré Magique": "https://chat.whatsapp.com/lien-classe-10",
  "Sirrou Geomncie": "https://chat.whatsapp.com/lien-classe-11",
  "Savant Nouraniyat": "https://chat.whatsapp.com/lien-classe-12",
  "Savant Zulmaniyat": "https://chat.whatsapp.com/lien-classe-13",
  "Zulmaniyat Interdit": "https://chat.whatsapp.com/lien-classe-14"
};

// Applique l'indicatif automatiquement quand le pays change
document.addEventListener('DOMContentLoaded', () => {
  const paysSelect = document.getElementById('pays-select');
  const telInput = document.querySelector('input[name="telephone"]');
  let dernierIndicatif = null;

  if (paysSelect && telInput) {
    paysSelect.addEventListener('change', () => {
      const nouvelIndicatif = indicatifsPays[paysSelect.value];
      if (!nouvelIndicatif) return;

      telInput.placeholder = `${nouvelIndicatif} …`;

      const valeurActuelle = telInput.value.trim();

      if (!valeurActuelle) {
        // Champ vide -> on insère juste le nouvel indicatif
        telInput.value = nouvelIndicatif + " ";
      } else if (dernierIndicatif && valeurActuelle.startsWith(dernierIndicatif)) {
        // Le champ contient déjà un indicatif qu'on a mis nous-même -> on le remplace,
        // en gardant les chiffres tapés après
        const reste = valeurActuelle.slice(dernierIndicatif.length).trim();
        telInput.value = nouvelIndicatif + " " + reste;
      }
      // Sinon : l'élève a tapé son propre numéro sans passer par nous -> on ne touche à rien

      dernierIndicatif = nouvelIndicatif;
    });
  }
});

// Fonction utilisée par le script de connexion pour trouver le bon groupe
function getGroupeWhatsApp(classe) {
  return groupesParClasse[classe] || window.WHATSAPP_GROUPE_ETUDE; // lien par défaut si classe inconnue
}
