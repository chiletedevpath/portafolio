import { sendContact } from './contact-request.js';
import './welcome.js';
import { revealElement } from './motion.js';
for (const tablist of document.querySelectorAll('.system-tabs')) {
  const tabs = [...tablist.querySelectorAll('[role="tab"]')];
  const activate = tab => {
    tabs.forEach(item => { const active = item === tab; item.setAttribute('aria-selected', String(active)); item.tabIndex = active ? 0 : -1; const panel = document.getElementById(item.getAttribute('aria-controls')); panel.hidden = !active; if (active) revealElement(panel); });
  };
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activate(tab));
    tab.addEventListener('keydown', event => {
      let next = index;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      else if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = tabs.length - 1;
      else return;
      event.preventDefault(); activate(tabs[next]); tabs[next].focus();
    });
  });
}
for (const button of document.querySelectorAll('[data-project-filter]')) {
  button.addEventListener('click', () => {
    const kind = button.dataset.projectFilter;
    document.querySelectorAll('[data-project-filter]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    let count = 0;
    document.querySelectorAll('[data-project-kind]').forEach(project => { project.hidden = kind !== 'all' && project.dataset.projectKind !== kind; if (!project.hidden) count++; });
    document.querySelectorAll('[data-project-group]').forEach(group => { group.hidden = ![...group.querySelectorAll('[data-project-kind]')].some(project => !project.hidden); });
    document.querySelectorAll('[data-project-kind]:not([hidden])').forEach((project,index) => revealElement(project,index * 60));
    document.querySelector('[data-project-count]').textContent = `${count} ${document.documentElement.lang === 'en' ? 'projects' : 'proyectos'}`;
  });
}
document.querySelector('[data-theme-toggle]')?.addEventListener('click', () => {
  const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = theme;
  try { localStorage.setItem('portfolio-theme', theme); } catch {}
});
for (const form of document.querySelectorAll('[data-contact-form]')) {
  const en = form.dataset.lang === 'en';
  const field = name => form.querySelector(`[name="${name}"]`)?.value.trim() || '';
  const message = form.querySelector('[name="mensaje"]');
  message.addEventListener('input', () => { form.querySelector('[data-counter]').textContent = `${message.value.length}/700`; });
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const status = form.querySelector('[data-form-status]');
    const token = field('cf-turnstile-response');
    if (!token) { status.textContent = en ? 'Complete the human verification.' : 'Completa la verificación humana.'; return; }
    const payload = { context: 'home', lang: en ? 'en' : 'es', name: field('nombre'), email: field('correo'), subject: field('asunto'), type: field('tipo'), topic: '', message: field('mensaje'), confirmation: form.querySelector('[name="confirmacion"]').checked, website: field('website'), turnstileToken: token };
    const button = form.querySelector('button[type="submit"]');
    button.disabled = true; button.setAttribute('aria-busy', 'true');
    status.textContent = en ? 'Sending…' : 'Enviando…';
    try {
      await sendContact(form.action, payload);
      form.reset(); form.querySelector('[data-counter]').textContent = '0/700';
      status.textContent = en ? 'Message sent successfully.' : 'Mensaje enviado correctamente.';
      status.className = 'formulario-estado-exito';
    } catch (error) {
      status.className = 'formulario-estado-error';
      status.textContent = error.code === 'DELIVERY_UNCONFIRMED' ? (en ? 'Delivery could not be confirmed. Wait before retrying.' : 'No pudimos confirmar la entrega. Espera antes de reintentar.') : (en ? 'Unable to send. Please try later or email me directly.' : 'No pudimos enviar. Inténtalo más tarde o escribe al correo indicado.');
    } finally {
      button.disabled = false; button.removeAttribute('aria-busy');
      if (window.turnstile) window.turnstile.reset();
    }
  });
}
