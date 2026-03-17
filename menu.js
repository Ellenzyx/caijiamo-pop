const ALL_CUISINE_IMAGES = [
  'fuzhu.png',
  'la baicai.png',
  'la doufu pi.png',
  'la haidai.png',
  'la luobo.png',
  'liangban doufu pi.png',
  'liangban douya.png',
  'liangban fentiao.png',
  'liangban haidai si.png',
  'liangban huanggua.png',
  'liangban lianou.png',
  'liangban muer.png',
  'liangban tudousi.png',
  'lu doufu gan.png',
  'lu haidai.png',
  'lu jidan.png',
  'lu jitui.png',
  'lu jizhua.png',
  'lu oupian.png',
  'lu zhu erduo.png',
  'mianjin.png',
  'suancai.png',
  'youzha huasheng.png',
  'zhacai.png',
];

function labelFromFileName(fileName) {
  const dotIndex = fileName.lastIndexOf('.');
  return dotIndex === -1 ? fileName : fileName.slice(0, dotIndex);
}

function fileToCuisineSrc(fileName) {
  // 文件名里有空格，必须 URL 编码
  return `./cuisine/${encodeURIComponent(fileName)}`;
}

const FAV_STORAGE_KEY = 'caijiamo_menu_favs_v1';

function loadFavSet() {
  try {
    const raw = localStorage.getItem(FAV_STORAGE_KEY);
    if (!raw) return new Set();
    const arr = JSON.parse(raw);
    if (!Array.isArray(arr)) return new Set();
    return new Set(arr.filter((x) => typeof x === 'string'));
  } catch {
    return new Set();
  }
}

function saveFavSet(favSet) {
  try {
    localStorage.setItem(FAV_STORAGE_KEY, JSON.stringify(Array.from(favSet)));
  } catch {
    // ignore
  }
}

function renderMenu() {
  const grid = document.getElementById('menuGrid');
  if (!grid) return;

  const favSet = loadFavSet();

  grid.innerHTML = '';
  ALL_CUISINE_IMAGES.forEach((fileName) => {
    const card = document.createElement('div');
    card.className = 'menu-card';

    const favBtn = document.createElement('button');
    favBtn.className = 'menu-fav-btn';
    favBtn.type = 'button';
    favBtn.setAttribute('aria-label', 'favorite');
    favBtn.textContent = '♥';
    if (favSet.has(fileName)) {
      favBtn.classList.add('is-fav');
    }
    favBtn.addEventListener(
      'pointerdown',
      (e) => {
        e.preventDefault();
        if (favSet.has(fileName)) {
          favSet.delete(fileName);
          favBtn.classList.remove('is-fav');
        } else {
          favSet.add(fileName);
          favBtn.classList.add('is-fav');
        }
        saveFavSet(favSet);
      },
      { passive: false }
    );

    const img = document.createElement('img');
    img.className = 'menu-image';
    img.src = fileToCuisineSrc(fileName);
    img.alt = labelFromFileName(fileName);
    img.loading = 'lazy';

    const name = document.createElement('div');
    name.className = 'menu-name';
    name.textContent = labelFromFileName(fileName);

    card.appendChild(favBtn);
    card.appendChild(img);
    card.appendChild(name);
    grid.appendChild(card);
  });
}

window.addEventListener('load', renderMenu);

