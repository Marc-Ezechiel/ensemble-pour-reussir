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

// ---- Envoi du formulaire d'inscription vers Netlify Forms + Supabase ----
const inscriptionForm = document.querySelector('form[name="inscription"]');
if (inscriptionForm) {
  inscriptionForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const btn = document.getElementById('inscriptionSubmitBtn');
    const originalText = btn.textContent;
    btn.disabled = true;
    btn.textContent = 'Envoi en cours…';

    // 1. Enregistre l'élève dans Supabase (pour le système de connexion)
    try {
      await window.supabaseClient.from('eleves').insert({
        nom: document.querySelector('[name="nom"]').value,
        prenom: document.querySelector('[name="prenom"]').value,
        email: document.querySelector('[name="email"]').value,
        telephone: document.querySelector('[name="telephone"]').value,
        pays: document.querySelector('[name="pays"]').value,
        classe: document.querySelector('[name="classes"]').value
      });
    } catch (err) {
      console.error('Erreur Supabase :', err);
    }

    // 2. Envoie toujours vers Netlify Forms (comme avant)
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

// ---- Connexion élève (Supabase) ----
const loginForm = document.getElementById('login-form');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const msg = document.getElementById('login-msg');
    msg.textContent = '';
    msg.className = 'form-msg';

    const email = document.getElementById('login-email').value.trim();
    const code = document.getElementById('login-code').value.trim();

    const btn = e.target.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Vérification…';

    const { data, error } = await window.supabaseClient.rpc('verifier_connexion', {
      p_email: email,
      p_code: code
    });

    btn.disabled = false;
    btn.textContent = 'Se connecter';

    if (error || !data || data.length === 0 || !data[0].valide) {
      msg.textContent = "❌ Email ou code incorrect.";
      msg.classList.add('error');
      return;
    }

    if (!data[0].paye) {
      msg.textContent = "⏳ Ton paiement n'est pas encore confirmé. Contacte l'école.";
      msg.classList.add('error');
      return;
    }

    msg.textContent = "✅ Bienvenue " + data[0].prenom + " ! Redirection…";
    msg.classList.add('success');

    const lienGroupe = getGroupeWhatsApp(data[0].classe);
    setTimeout(() => {
      window.location.href = lienGroupe;
    }, 1200);
  });
}
