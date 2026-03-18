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

const MENU_NAME_DATA = {
  fuzhu: { zh: '腐竹', en: 'Yuba Sticks' },
  'la baicai': { zh: '辣白菜', en: 'Spicy Napa Cabbage' },
  'la doufu pi': { zh: '辣豆腐皮', en: 'Spicy Tofu Skin' },
  'la haidai': { zh: '辣海带', en: 'Spicy Kelp Salad' },
  'la luobo': { zh: '辣萝卜', en: 'Spicy Radish' },
  'liangban doufu pi': { zh: '凉拌豆腐皮', en: 'Cold Tofu Skin Salad' },
  'liangban douya': { zh: '凉拌豆芽', en: 'Cold Bean Sprouts' },
  'liangban fentiao': { zh: '凉拌粉条', en: 'Cold Glass Noodles' },
  'liangban haidai si': { zh: '凉拌海带丝', en: 'Cold Kelp Shreds' },
  'liangban huanggua': { zh: '凉拌黄瓜', en: 'Garlic Cucumber Salad' },
  'liangban lianou': { zh: '凉拌莲藕片', en: 'Cold Lotus Root Salad' },
  'liangban muer': { zh: '凉拌木耳', en: 'Cold Wood Ear Mushrooms' },
  'liangban tudousi': { zh: '凉拌土豆丝', en: 'Cold Shredded Potato' },
  'lu doufu gan': { zh: '卤豆腐干', en: 'Braised Tofu' },
  'lu haidai': { zh: '卤海带', en: 'Braised Kelp' },
  'lu jidan': { zh: '卤鸡蛋', en: 'Braised Eggs' },
  'lu jitui': { zh: '卤鸡腿', en: 'Braised Chicken Drumstick' },
  'lu jizhua': { zh: '卤鸡爪', en: 'Braised Chicken Feet' },
  'lu oupian': { zh: '卤藕片', en: 'Braised Lotus Root' },
  'lu zhu erduo': { zh: '卤猪耳朵', en: 'Braised Pig Ears' },
  mianjin: { zh: '面筋', en: 'Wheat Gluten' },
  suancai: { zh: '酸菜', en: 'Pickled Cabbage' },
  'youzha huasheng': { zh: '油炸花生', en: 'Fried Peanuts' },
  zhacai: { zh: '榨菜', en: 'Pickled Mustard Tuber' },
};

function labelFromFileName(fileName) {
  const dotIndex = fileName.lastIndexOf('.');
  return dotIndex === -1 ? fileName : fileName.slice(0, dotIndex);
}

function fileToCuisineSrc(fileName) {
  // 文件名里有空格，必须 URL 编码
  return `./cuisine/${encodeURIComponent(fileName)}`;
}

const FAV_STORAGE_KEY = 'caijiamo_menu_favs_v1';
const UNLOCK_STORAGE_KEY = 'caijiamo_unlocked_v1';

let menuCurrentLang = 'zh';

function loadUnlockedSet() {
  try {
    const raw = localStorage.getItem(UNLOCK_STORAGE_KEY);
    if (!raw) return new Set();
    const arr = JSON.parse(raw);
    if (!Array.isArray(arr)) return new Set();
    return new Set(arr.filter((x) => typeof x === 'string'));
  } catch {
    return new Set();
  }
}

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
  const unlockedSet = loadUnlockedSet();

  grid.innerHTML = '';
  ALL_CUISINE_IMAGES.forEach((fileName) => {
    const id = labelFromFileName(fileName);
    const card = document.createElement('div');
    card.className = 'menu-card';
    const isUnlocked = unlockedSet.has(id);
    if (!isUnlocked) {
      card.classList.add('menu-card-locked');
    }

    const favBtn = document.createElement('button');
    favBtn.className = 'menu-fav-btn';
    favBtn.type = 'button';
    favBtn.setAttribute('aria-label', 'favorite');
    favBtn.textContent = '♥';
    if (favSet.has(fileName)) {
      favBtn.classList.add('is-fav');
    }
    const toggleFav = () => {
      if (favSet.has(fileName)) {
        favSet.delete(fileName);
        favBtn.classList.remove('is-fav');
      } else {
        favSet.add(fileName);
        favBtn.classList.add('is-fav');
      }
      saveFavSet(favSet);
    };

    favBtn.addEventListener(
      'pointerdown',
      (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFav();
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
    const nameData = MENU_NAME_DATA[id];
    if (nameData) {
      name.textContent = menuCurrentLang === 'zh' ? nameData.zh : nameData.en;
    } else {
      name.textContent = id;
    }

    card.appendChild(favBtn);
    card.appendChild(img);
    card.appendChild(name);
    card.addEventListener('click', (event) => {
      // 如果这次点击是落在小心心按钮上，则不跳转
      if (event.target.closest('.menu-fav-btn')) {
        return;
      }
      // 未解锁的菜品不允许进入做法页面
      if (!unlockedSet.has(id)) {
        return;
      }
      const url = new URL('./dish.html', window.location.href);
      url.searchParams.set('id', id);
      window.location.href = url.toString();
    });
    grid.appendChild(card);
  });
}

window.addEventListener('load', () => {
  const zhBtn = document.getElementById('menuLangZhBtn');
  const enBtn = document.getElementById('menuLangEnBtn');

  function syncButtons() {
    if (!zhBtn || !enBtn) return;
    if (menuCurrentLang === 'zh') {
      zhBtn.classList.add('is-active');
      enBtn.classList.remove('is-active');
    } else {
      enBtn.classList.add('is-active');
      zhBtn.classList.remove('is-active');
    }
  }

  if (zhBtn) {
    zhBtn.addEventListener('click', () => {
      menuCurrentLang = 'zh';
      syncButtons();
      renderMenu();
    });
  }
  if (enBtn) {
    enBtn.addEventListener('click', () => {
      menuCurrentLang = 'en';
      syncButtons();
      renderMenu();
    });
  }

  syncButtons();
  renderMenu();
});

