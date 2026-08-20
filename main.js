// Search highlight
function handleSearch(val) {
  document.querySelectorAll('h2,h3,p,.card-body').forEach(el => {
    el.style.outline = '';
  });
  if (!val.trim()) return;
  const q = val.toLowerCase();
  document.querySelectorAll('h2,h3,p').forEach(el => {
    if (el.textContent.toLowerCase().includes(q)) {
      el.style.outline = '2px solid #16a868';
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
}

// Doc upload feedback
function markDoc(input, lblId) {
  const lbl = document.getElementById(lblId);
  if (input.files.length) {
    lbl.textContent = '✅ ' + input.files[0].name.substring(0, 22) + (input.files[0].name.length > 22 ? '…' : '');
    lbl.parentElement.parentElement.style.borderColor = '#16a868';
    lbl.parentElement.parentElement.style.background = '#d4f5e5';
  }
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(a.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth' });
  });
});
await window.supabaseClient.from('eleves').insert({
  nom: document.querySelector('[name="nom"]').value,
  prenom: document.querySelector('[name="prenom"]').value,
  email: document.querySelector('[name="email"]').value,
  telephone: document.querySelector('[name="telephone"]').value,
  pays: document.querySelector('[name="pays"]').value,
  classe: document.querySelector('[name="classes"]').value
});

// Envoi du formulaire d'inscription vers Netlify Forms (sans quitter la page)
const inscriptionForm = document.querySelector('form[name="inscription"]');
if (inscriptionForm) {
  inscriptionForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const btn = document.getElementById('inscriptionSubmitBtn');
    const originalText = btn.textContent;
    btn.disabled = true;
    btn.textContent = 'Envoi en cours…';

    const formData = new FormData(inscriptionForm);

    fetch('/', {
      method: 'POST',
      body: formData
    })
      .then(() => {
        alert('✅ Demande envoyée ! Nous vous contacterons dans les 48h.');
        inscriptionForm.reset();
        document.querySelectorAll('.doc-item').forEach(el => {
          el.style.borderColor = '';
          el.style.background = '';
        });
        document.querySelectorAll('.doc-item span').forEach(el => {
          el.textContent = el.dataset.original || el.textContent;
        });
      })
      .catch(() => {
        alert('❌ Une erreur est survenue. Vérifie ta connexion et réessaie.');
      })
      .finally(() => {
        btn.disabled = false;
        btn.textContent = originalText;
      });
  });
}
