/* =========================================
   LE MÉDIA — JavaScript Principal
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ─── Bouton retour en haut ───────────────
  const btn = document.getElementById('backToTop');
  if (btn) {
    window.addEventListener('scroll', () => {
      btn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // ─── Auto-fermeture des messages flash ──
  setTimeout(() => {
    document.querySelectorAll('.alert.fade.show').forEach(el => {
      const bsAlert = bootstrap.Alert.getOrCreateInstance(el);
      bsAlert.close();
    });
  }, 5000);

  // ─── Compteur de caractères Commentss ─
  const textarea = document.querySelector('textarea[name="contenu"]');
  if (textarea) {
    const max = parseInt(textarea.getAttribute('maxlength')) || 1000;
    const counter = document.createElement('small');
    counter.className = 'text-muted d-block text-end mt-1';
    counter.textContent = `0 / ${max} caractères`;
    textarea.parentNode.insertBefore(counter, textarea.nextSibling);
    textarea.addEventListener('input', () => {
      const len = textarea.value.length;
      counter.textContent = `${len} / ${max} caractères`;
      counter.className = len > max * 0.9
        ? 'text-warning d-block text-end mt-1'
        : 'text-muted d-block text-end mt-1';
    });
  }

  // ─── Confirmation déconnexion ────────────
  document.querySelectorAll('form[action*="deconnexion"]').forEach(form => {
    form.addEventListener('submit', e => {
      if (!confirm('Voulez-vous vraiment vous déconnecter ?')) {
        e.preventDefault();
      }
    });
  });

  // ─── Lazy loading images ─────────────────
  if ('IntersectionObserver' in window) {
    const imgs = document.querySelectorAll('img[data-src]');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.src = e.target.dataset.src;
          io.unobserve(e.target);
        }
      });
    });
    imgs.forEach(img => io.observe(img));
  }

  // ─── Active nav highlighting ──────────────
  const currentPath = window.location.pathname;
  document.querySelectorAll('.main-nav .nav-link').forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
    }
  });

  // ─── Bottom nav — état actif dynamique ───
  // (complément aux classes Django côté serveur)
  document.querySelectorAll('.bottom-nav-item').forEach(link => {
    const href = link.getAttribute('href');
    if (href && href !== '#' && currentPath.startsWith(href) && href !== '/') {
      link.classList.add('active');
    } else if (href === '/' && currentPath === '/') {
      link.classList.add('active');
    }
  });

});