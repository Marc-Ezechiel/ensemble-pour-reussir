// ==========================================================
// LISTE DÉROULANTE PAYS AVEC DRAPEAUX — Ensemble Pour Reussir
// ==========================================================
// Ce script remplit automatiquement un <select> avec tous les pays
// du monde, chacun précédé de son drapeau 🇨🇮 🇫🇷 🇸🇳 etc.

const paysListe = [
  ["CI","Côte d'Ivoire"],["SN","Sénégal"],["ML","Mali"],["BF","Burkina Faso"],
  ["GN","Guinée"],["TG","Togo"],["BJ","Bénin"],["NE","Niger"],["GH","Ghana"],
  ["NG","Nigeria"],["CM","Cameroun"],["GA","Gabon"],["CD","RD Congo"],
  ["CG","Congo"],["TD","Tchad"],["CF","Centrafrique"],["MR","Mauritanie"],
  ["GM","Gambie"],["GW","Guinée-Bissau"],["SL","Sierra Leone"],["LR","Liberia"],
  ["MA","Maroc"],["DZ","Algérie"],["TN","Tunisie"],["LY","Libye"],["EG","Égypte"],
  ["SD","Soudan"],["ET","Éthiopie"],["KE","Kenya"],["TZ","Tanzanie"],["UG","Ouganda"],
  ["RW","Rwanda"],["ZA","Afrique du Sud"],["ZM","Zambie"],["ZW","Zimbabwe"],
  ["MZ","Mozambique"],["AO","Angola"],["MG","Madagascar"],["FR","France"],
  ["BE","Belgique"],["CH","Suisse"],["CA","Canada"],["US","États-Unis"],
  ["GB","Royaume-Uni"],["DE","Allemagne"],["ES","Espagne"],["PT","Portugal"],
  ["IT","Italie"],["NL","Pays-Bas"],["SA","Arabie Saoudite"],["AE","Émirats Arabes Unis"],
  ["QA","Qatar"],["KW","Koweït"],["TR","Turquie"],["LB","Liban"],["JO","Jordanie"],
  ["IQ","Irak"],["SY","Syrie"],["YE","Yémen"],["OM","Oman"],["BH","Bahreïn"],
  ["IN","Inde"],["PK","Pakistan"],["BD","Bangladesh"],["CN","Chine"],["JP","Japon"],
  ["KR","Corée du Sud"],["ID","Indonésie"],["MY","Malaisie"],["BR","Brésil"],
  ["MX","Mexique"],["AR","Argentine"],["AU","Australie"],["RU","Russie"],
  ["autre","Autre pays"]
];

function codeVersEmoji(code) {
  if (code === "autre") return "🌍";
  return code
    .toUpperCase()
    .replace(/./g, char => String.fromCodePoint(127397 + char.charCodeAt(0)));
}

function remplirSelectPays(selectId) {
  const select = document.getElementById(selectId);
  if (!select) return;

  select.innerHTML = '<option value="">Choisissez votre pays</option>';

  paysListe
    .sort((a, b) => a[1].localeCompare(b[1], 'fr'))
    .forEach(([code, nom]) => {
      const option = document.createElement('option');
      option.value = nom;
      option.textContent = `${codeVersEmoji(code)} ${nom}`;
      select.appendChild(option);
    });
}

document.addEventListener('DOMContentLoaded', () => {
  remplirSelectPays('pays-select');
});
