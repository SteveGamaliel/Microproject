const cards = [...document.querySelectorAll('.request-card')];
const filters = [...document.querySelectorAll('.filter')];
const searchInput = document.getElementById('searchInput');
const resultCount = document.getElementById('resultCount');
const emptyState = document.getElementById('emptyState');
let activeFilter = 'all';

function updateBoard() {
  const query = searchInput.value.trim().toLowerCase();
  let visible = 0;
  cards.forEach(card => {
    const matchesCategory = activeFilter === 'all' || card.dataset.category === activeFilter;
    const matchesSearch = !query || `${card.dataset.search} ${card.innerText}`.toLowerCase().includes(query);
    const show = matchesCategory && matchesSearch;
    card.hidden = !show;
    if (show) visible++;
  });
  resultCount.textContent = visible;
  emptyState.style.display = visible ? 'none' : 'block';
}

filters.forEach(button => button.addEventListener('click', () => {
  activeFilter = button.dataset.filter;
  filters.forEach(item => item.classList.toggle('active', item === button));
  updateBoard();
}));
searchInput.addEventListener('input', updateBoard);

const modalBackdrop = document.getElementById('formModal');
const modal = modalBackdrop.querySelector('.modal');
const nameField = modal.querySelector('[name="name"]');
const toast = document.getElementById('toast');
let previousFocus;
let toastTimer;

function openModal(name = '') {
  previousFocus = document.activeElement;
  modalBackdrop.classList.add('open');
  modalBackdrop.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  if (name) {
    modal.querySelector('[name="kind"]').value = 'Offer my time or skills';
    modal.querySelector('[name="details"]').value = `I'd like to offer help to ${name}.`;
  }
  window.setTimeout(() => nameField.focus(), 80);
}

function closeModal() {
  modalBackdrop.classList.remove('open');
  modalBackdrop.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  if (previousFocus) previousFocus.focus();
}

document.getElementById('openForm').addEventListener('click', () => openModal());
document.querySelectorAll('.offer-button').forEach(button => button.addEventListener('click', () => openModal(button.dataset.name)));
modal.querySelector('.modal-close').addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', event => { if (event.target === modalBackdrop) closeModal(); });
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && modalBackdrop.classList.contains('open')) closeModal();
});

document.getElementById('helpForm').addEventListener('submit', event => {
  event.preventDefault();
  closeModal();
  event.currentTarget.reset();
  toast.classList.add('show');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove('show'), 4200);
});

const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
menuToggle.addEventListener('click', () => {
  const opened = navLinks.classList.toggle('mobile-open');
  menuToggle.setAttribute('aria-expanded', String(opened));
  menuToggle.setAttribute('aria-label', opened ? 'Close menu' : 'Open menu');
  menuToggle.textContent = opened ? '×' : '☰';
});
navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navLinks.classList.remove('mobile-open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.textContent = '☰';
}));
