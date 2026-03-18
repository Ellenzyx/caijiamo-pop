window.addEventListener('load', () => {
  const zhBtn = document.getElementById('aboutZhBtn');
  const enBtn = document.getElementById('aboutEnBtn');
  const zhSection = document.getElementById('aboutZh');
  const enSection = document.getElementById('aboutEn');

  if (!zhBtn || !enBtn || !zhSection || !enSection) return;

  function setLang(lang) {
    if (lang === 'zh') {
      zhSection.classList.remove('about-section-hidden');
      enSection.classList.add('about-section-hidden');
      zhBtn.classList.add('is-active');
      enBtn.classList.remove('is-active');
    } else {
      enSection.classList.remove('about-section-hidden');
      zhSection.classList.add('about-section-hidden');
      enBtn.classList.add('is-active');
      zhBtn.classList.remove('is-active');
    }
  }

  zhBtn.addEventListener('click', () => setLang('zh'));
  enBtn.addEventListener('click', () => setLang('en'));

  setLang('zh');
});

