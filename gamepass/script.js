const STATE = {
  all: [],
  view: [],
  genres: new Set(),
  route: 'home',
  genre: null,
  search: ''
};

const els = {
  grid: document.getElementById('grid'),
  sectionTitle: document.getElementById('sectionTitle'),
  countPill: document.getElementById('countPill'),
  genreList: document.getElementById('genreList'),
  searchInput: document.getElementById('searchInput'),
  cardTpl: document.getElementById('cardTpl'),
  modal: document.getElementById('modal'),
  modalCover: document.getElementById('modalCover'),
  modalTitle: document.getElementById('modalTitle'),
  modalMeta: document.getElementById('modalMeta'),
  modalDesc: document.getElementById('modalDesc'),
  modalTags: document.getElementById('modalTags'),
  sidebar: document.getElementById('sidebar'),
  openSidebar: document.getElementById('openSidebar'),
  closeSidebar: document.getElementById('closeSidebar'),
  menuBackdrop: document.getElementById('menuBackdrop')
};

const getTitle = g => g.title || g.productTitle || g.name || 'Untitled';
const getGenres = g => {
  const arr = g.categories || g.genres || g.category || [];
  return Array.isArray(arr) ? arr : [arr].filter(Boolean);
};
const getCover = g => {
  if (g.cover || g.image || g.poster || g.coverImage) {
    return g.cover || g.image || g.poster || g.coverImage;
  }
  if (g.images && typeof g.images === 'object') {
    const keys = ['Poster', 'BoxArt', 'SuperHeroArt', 'TitledHeroArt', 'BrandedKeyArt'];
    for (const k of keys) {
      if (Array.isArray(g.images[k]) && g.images[k].length > 0) return g.images[k][0];
    }
  }
  if (Array.isArray(g.images)) {
    const poster = g.images.find(i =>
      /poster|boxart|cover/i.test(i.purpose || i.type || '') || /jpg|png|webp/i.test(i.url || '')
    );
    if (poster && poster.url) return poster.url;
  }
  return 'assets/placeholder.svg';
};

const getSquareCover = g => {
  if (g.images && typeof g.images === 'object') {
    const squareKeys = ['FeaturePromotionalSquareArt', 'Logo'];
    for (const k of squareKeys) {
      if (Array.isArray(g.images[k]) && g.images[k].length > 0) return g.images[k][0];
    }
  }
  return getCover(g);
};

const getAdded = g =>
  new Date(g.added || g.addedDate || g.dateAdded || g.releaseDate || g.date || 0).getTime() || 0;
const getDesc = g => g.productDescription || g.description || '';
const getDeveloper = g => g.developer || g.developerName || '';
const getPublisher = g => g.publisher || g.publisherName || '';

async function boot() {
  const res = await fetch('games.json', { cache: 'no-store' });
  const data = await res.json();
  STATE.all = Array.isArray(data) ? data : data.products || data.titles || [];
  STATE.all.forEach(g => getGenres(g).forEach(x => x && STATE.genres.add(x)));
  renderGenres();
  routeTo('home');
  wireUI();
}

function renderGenres() {
  const frag = document.createDocumentFragment();
  [...STATE.genres]
    .sort((a, b) => a.localeCompare(b))
    .forEach(name => {
      const btn = document.createElement('button');
      btn.textContent = name;
      btn.addEventListener('click', () => {
        document.querySelectorAll('.genre-list button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        STATE.route = 'genre';
        STATE.genre = name;
        applyFilters();
        closeMenu();
      });
      frag.appendChild(btn);
    });
  els.genreList.innerHTML = '';
  els.genreList.appendChild(frag);
}

function wireUI() {
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      routeTo(btn.dataset.route);
      closeMenu();
    });
  });

  els.searchInput.addEventListener('input', e => {
    STATE.search = e.target.value.toLowerCase().trim();
    applyFilters();
  });

  els.modal.addEventListener('click', e => {
    if (e.target.hasAttribute('data-close') || e.target.classList.contains('modal-close')) {
      closeModal();
    }
  });

  window.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeModal();
      closeMenu();
    }
  });

  els.openSidebar.addEventListener('click', openMenu);
  els.closeSidebar.addEventListener('click', closeMenu);
  els.menuBackdrop.addEventListener('click', closeMenu);
}

function setDialogBlendColor(rgb) {
  const dialog = document.querySelector('.modal-dialog');
  dialog?.style.setProperty('--modal-color', `rgb(${rgb.r} ${rgb.g} ${rgb.b})`);
}

function averageBottomColor(img, portion = 0.2, step = 4) {
  try {
    const w = img.naturalWidth || img.width;
    const h = img.naturalHeight || img.height;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    canvas.width = w;
    canvas.height = Math.ceil(h * portion);
    const sy = h - canvas.height;

    ctx.drawImage(img, 0, sy, w, canvas.height, 0, 0, w, canvas.height);
    const { data } = ctx.getImageData(0, 0, w, canvas.height);

    let r = 0, g = 0, b = 0, count = 0;
    for (let y = 0; y < canvas.height; y += step) {
      for (let x = 0; x < w; x += step) {
        const i = (y * w + x) * 4;
        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
        count++;
      }
    }
    r = Math.round(r / count);
    g = Math.round(g / count);
    b = Math.round(b / count);
    return { r, g, b };
  } catch (e) {
    return { r: 17, g: 19, b: 25 };
  }
}


function openMenu() {
  document.body.classList.add('menu-open');
  els.sidebar.classList.add('open');
  els.sidebar.setAttribute('aria-hidden', 'false');
  els.menuBackdrop.classList.add('show');
  els.menuBackdrop.setAttribute('aria-hidden', 'false');
}

function closeMenu() {
  document.body.classList.remove('menu-open');
  els.sidebar.classList.remove('open');
  els.sidebar.setAttribute('aria-hidden', 'true');
  els.menuBackdrop.classList.remove('show');
  els.menuBackdrop.setAttribute('aria-hidden', 'true');
}

function routeTo(route) {
  STATE.route = route;
  STATE.genre = null;
  document.querySelectorAll('.genre-list button').forEach(b => b.classList.remove('active'));
  applyFilters();
}

function applyFilters() {
  let list = [...STATE.all];
  if (STATE.route === 'recent') list.sort((a, b) => getAdded(b) - getAdded(a));
  if (STATE.route === 'genre' && STATE.genre) list = list.filter(g => getGenres(g).includes(STATE.genre));
  if (STATE.search) list = list.filter(g => getTitle(g).toLowerCase().includes(STATE.search));
  STATE.view = list;
  if (STATE.route === 'home') els.sectionTitle.textContent = 'Home';
  if (STATE.route === 'recent') els.sectionTitle.textContent = 'Recently added';
  if (STATE.route === 'genre' && STATE.genre) els.sectionTitle.textContent = STATE.genre;
  renderGrid();
}

function renderGrid() {
  els.grid.innerHTML = '';
  const frag = document.createDocumentFragment();
  STATE.view.forEach(g => {
    const node = els.cardTpl.content.firstElementChild.cloneNode(true);
    const img = node.querySelector('.thumb');
    const h3 = node.querySelector('.card-title');
    img.src = getCover(g);
    img.alt = getTitle(g);
    h3.textContent = getTitle(g);
    node.addEventListener('click', () => openModal(g));
    frag.appendChild(node);
  });
  els.grid.appendChild(frag);
  els.countPill.textContent = `${STATE.view.length} games`;
}

function openModal(g) {
  const isMobile = window.matchMedia('(max-width: 900px)').matches;
  const cover = getCover(g);
  const square = getSquareCover(g);
  els.modalCover.src = isMobile ? square : cover;

  if (isMobile) {
    els.modalCover.classList.add('overlay-mode');
    els.modalCover.setAttribute('data-title', getTitle(g));
  } else {
    els.modalCover.classList.remove('overlay-mode');
    els.modalCover.removeAttribute('data-title');
  }

  els.modalTitle.textContent = getTitle(g);
  els.modalMeta.innerHTML = '';
  const addMeta = (label, value) => {
    if (!value) return;
    const box = document.createElement('div');
    box.className = 'meta-box';
    box.textContent = `${label}: ${value}`;
    els.modalMeta.appendChild(box);
  };
  addMeta('Developer', getDeveloper(g));
  addMeta('Publisher', getPublisher(g));
  const added = getAdded(g);
  if (added) addMeta('Added', new Date(added).toLocaleDateString());

  els.modalDesc.textContent = getDesc(g) || 'No description available.';
  els.modalTags.innerHTML = '';
  getGenres(g).forEach(t => {
    const span = document.createElement('span');
    span.className = 'tag';
    span.textContent = t;
    els.modalTags.appendChild(span);
  });

  document.body.classList.add('modal-open');
  els.modal.classList.add('show');
  els.modal.classList.remove('hidden');
  els.modal.setAttribute('aria-hidden', 'false');

  const applyBlend = () => setDialogBlendColor(averageBottomColor(els.modalCover));
  if (els.modalCover.complete) {
    applyBlend();
  } else {
    els.modalCover.onload = applyBlend;
    els.modalCover.onerror = () => setDialogBlendColor({ r: 17, g: 19, b: 25 });
  }
}


function closeModal() {
  document.body.classList.remove('modal-open');
  els.modal.classList.remove('show');
  els.modal.setAttribute('aria-hidden', 'true');
  els.modal.classList.add('hidden');
}


boot().catch(err => {
  console.error('Failed to boot', err);
  document.getElementById('grid').innerHTML =
    '<p style="opacity:.7">Could not load games.json</p>';
});
