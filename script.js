const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');

menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

document.getElementById('year').textContent = new Date().getFullYear();

document.getElementById('bookingForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const subject = encodeURIComponent('YokedAthletics Booking Request');
  const body = encodeURIComponent(
    `Name: ${data.get('name')}\n` +
    `Email: ${data.get('email')}\n` +
    `Phone: ${data.get('phone')}\n` +
    `Goal: ${data.get('goal')}\n\n` +
    `Goals and availability:\n${data.get('message')}`
  );
  window.location.href = `mailto:mikegreen@yokedathletics.co.site?subject=${subject}&body=${body}`;
});

document.getElementById('paymentButton').addEventListener('click', (event) => {
  const paymentLink = event.currentTarget.dataset.paymentLink;
  if (!paymentLink) {
    event.preventDefault();
    alert('Payment setup is almost complete. Please call 518-461-5856 or email mikegreen@yokedathletics.co.site to purchase the $100 online training package.');
  }
});
