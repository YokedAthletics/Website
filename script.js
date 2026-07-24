const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');
menuButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));

document.querySelector('#year').textContent = new Date().getFullYear();

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const comparison = document.querySelector('[data-comparison]');
if (comparison) {
  const range = comparison.querySelector('input');
  const afterWrap = comparison.querySelector('.comparison-after-wrap');
  const line = comparison.querySelector('.comparison-line');
  range.addEventListener('input', () => {
    const value = `${range.value}%`;
    afterWrap.style.width = value;
    line.style.left = value;
  });
}

const tdeeForm = document.querySelector('#tdee-form');
tdeeForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const sex = document.querySelector('#sex').value;
  const age = Number(document.querySelector('#age').value);
  const heightIn = Number(document.querySelector('#height').value);
  const weightLb = Number(document.querySelector('#weight').value);
  const activity = Number(document.querySelector('#activity').value);
  const goal = Number(document.querySelector('#goal').value);
  if (!age || !heightIn || !weightLb) return;
  const kg = weightLb * 0.453592;
  const cm = heightIn * 2.54;
  const bmr = sex === 'male'
    ? (10 * kg) + (6.25 * cm) - (5 * age) + 5
    : (10 * kg) + (6.25 * cm) - (5 * age) - 161;
  const target = Math.max(1200, Math.round((bmr * activity + goal) / 10) * 10);
  document.querySelector('#calculator-result strong').textContent = target.toLocaleString();
});

const applicationForm = document.querySelector('#application-form');
applicationForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = document.querySelector('#app-name').value.trim();
  const phone = document.querySelector('#app-phone').value.trim();
  const email = document.querySelector('#app-email').value.trim();
  const goal = document.querySelector('#app-goal').value;
  const message = document.querySelector('#app-message').value.trim();
  const subject = encodeURIComponent(`Coaching Application — ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nMain goal: ${goal}\n\nGoals and current routine:\n${message}`);
  window.location.href = `mailto:mikegreen@yokedathletics.co.site?subject=${subject}&body=${body}`;
});
