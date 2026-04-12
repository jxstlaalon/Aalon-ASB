/**
 * SPEAR Campaign — script.js
 * Handles: modal open/close, zoom for candidate photo,
 *          team logo, and goal bubble cards.
 */

'use strict';

/* =========================================
   MODAL CONTENT DEFINITIONS
   ========================================= */
const MODAL_CONTENT = {

  /** Team logo zoom */
  logo: {
    type: 'image',
    src: '/img/spear.jpg',
    alt: 'SPEAR — Students Propelled by Execution, Authenticity & Reform',
    caption: 'SPEAR Campaign Team Logo'
  },

  /** Candidate photo zoom */
  candidate: {
    type: 'image',
    src: '/img/aalon.jpg',
    alt: 'Aalon Peters — Candidate for Director of Extracurricular Academic Activities',
    caption: 'Aalon Peters — Running for Director of Extracurricular Academic Activities'
  },

  /** Goal 1 */
  goal1: {
    type: 'goal',
    number: '01',
    tag: 'Get involved',
    title: 'Bring every club into the spotlight',
    body: `We'll host a <strong>Club Fair</strong> at the start of every semester so you can
           explore what's out there and find your people. As the bridge between clubs and
           student leadership, we'll make sure every club on every campus gets the support
           and attention it deserves — through regular meetups, team events, and a monthly
           <strong>Club Spotlight</strong> on social media.`
  },

  /** Goal 2 */
  goal2: {
    type: 'goal',
    number: '02',
    tag: 'Compete and grow',
    title: "Show the world what you've got",
    body: `We're bringing back the thrill of competition with <strong>debate contests</strong>,
           <strong>public speaking events</strong>, and an exciting
           <strong>Interdepartmental Quiz Bowl</strong> across both campuses. And we're taking it
           even further with an <strong>Inter-School Debate Competition</strong> — because your
           voice deserves a bigger stage.`
  },

  /** Goal 3 */
  goal3: {
    type: 'goal',
    number: '03',
    tag: 'Make some noise online',
    title: 'A social media presence that actually matters',
    body: `Every month, our <strong>Club Spotlight</strong> series will shine a light on what
           clubs are doing, celebrate student achievements, and show future students why this
           campus is the place to be. More followers, more energy, more community.`
  }
};

/* =========================================
   DOM REFERENCES
   ========================================= */
const overlay     = document.getElementById('modalOverlay');
const modalBox    = overlay.querySelector('.modal-box');
const closeBtn    = document.getElementById('modalClose');
const contentArea = document.getElementById('modalContent');

/* =========================================
   BUILD MODAL HTML
   ========================================= */

/**
 * Returns HTML string for an image modal (logo or candidate photo).
 * @param {Object} data
 * @returns {string}
 */
function buildImageModal(data) {
  return `
    <div class="modal-img-wrap">
      <img src="${data.src}" alt="${data.alt}" />
      <p class="modal-img-caption">${data.caption}</p>
    </div>
  `;
}

/**
 * Returns HTML string for a goal modal.
 * @param {Object} data
 * @returns {string}
 */
function buildGoalModal(data) {
  return `
    <div class="modal-goal-number">${data.number}</div>
    <span class="modal-goal-tag">${data.tag}</span>
    <h2 class="modal-goal-title">${data.title}</h2>
    <p class="modal-goal-body">${data.body}</p>
  `;
}

/* =========================================
   MODAL OPEN / CLOSE
   ========================================= */

/** Tracks the element that triggered the modal (for focus restoration). */
let lastFocusedElement = null;

/**
 * Opens the modal with content matching the given key.
 * @param {string} key — matches a key in MODAL_CONTENT
 * @param {HTMLElement} triggerEl — the button that was clicked
 */
function openModal(key, triggerEl) {
  const data = MODAL_CONTENT[key];
  if (!data) return;

  lastFocusedElement = triggerEl;

  /* Build inner HTML based on content type */
  contentArea.innerHTML =
    data.type === 'image'
      ? buildImageModal(data)
      : buildGoalModal(data);

  /* Show overlay */
  overlay.classList.add('is-open');
  overlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  /* Move focus into modal for accessibility */
  contentArea.focus();
}

/**
 * Closes the modal and restores focus to the trigger element.
 */
function closeModal() {
  overlay.classList.remove('is-open');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  contentArea.innerHTML = '';

  /* Restore focus */
  if (lastFocusedElement) {
    lastFocusedElement.focus();
    lastFocusedElement = null;
  }
}

/* =========================================
   EVENT LISTENERS
   ========================================= */

/* All trigger buttons (logo, candidate photo, goal cards) */
document.querySelectorAll('[data-modal]').forEach(function (btn) {
  btn.addEventListener('click', function () {
    openModal(btn.dataset.modal, btn);
  });
});

/* Close button inside modal */
closeBtn.addEventListener('click', closeModal);

/* Click outside modal box closes it */
overlay.addEventListener('click', function (e) {
  if (e.target === overlay) {
    closeModal();
  }
});

/* Escape key closes modal */
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && overlay.classList.contains('is-open')) {
    closeModal();
  }
});

/* Trap focus inside modal when it is open */
overlay.addEventListener('keydown', function (e) {
  if (e.key !== 'Tab' || !overlay.classList.contains('is-open')) return;

  const focusable = modalBox.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const first = focusable[0];
  const last  = focusable[focusable.length - 1];

  if (e.shiftKey) {
    if (document.activeElement === first) {
      e.preventDefault();
      last.focus();
    }
  } else {
    if (document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
});

/* =========================================
   FOOTER YEAR
   ========================================= */
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}