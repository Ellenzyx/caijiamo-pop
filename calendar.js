function getStorageKey(year) {
  return `caijiamo_calendar_${year}_v1`;
}

let currentYear = new Date().getFullYear();

function loadCalendarSet(year) {
  try {
    const raw = localStorage.getItem(getStorageKey(year));
    if (!raw) return new Set();
    const arr = JSON.parse(raw);
    if (!Array.isArray(arr)) return new Set();
    return new Set(arr.filter((x) => typeof x === 'string'));
  } catch {
    return new Set();
  }
}

function saveCalendarSet(year, set) {
  try {
    localStorage.setItem(getStorageKey(year), JSON.stringify(Array.from(set)));
  } catch {
    // ignore
  }
}

function formatKey(year, monthIndex, day) {
  // monthIndex: 0-11, day: 1-31
  const m = String(monthIndex + 1).padStart(2, '0');
  const d = String(day).padStart(2, '0');
  return `${year}-${m}-${d}`;
}

let currentMonthIndex = 0; // 0-11 for 2026
let eatenSet = loadCalendarSet(currentYear);

const monthNames = [
  'JAN',
  'FEB',
  'MAR',
  'APR',
  'MAY',
  'JUN',
  'JUL',
  'AUG',
  'SEP',
  'OCT',
  'NOV',
  'DEC',
];

function renderMonth() {
  const monthTitleEl = document.getElementById('monthTitle');
  const gridEl = document.getElementById('calendarGrid');
  if (!monthTitleEl || !gridEl) return;

  monthTitleEl.textContent = `${monthNames[currentMonthIndex]} ${currentYear}`;
  gridEl.innerHTML = '';

  const firstDay = new Date(currentYear, currentMonthIndex, 1);
  const firstWeekday = (firstDay.getDay() + 6) % 7; // make Monday=0
  const daysInMonth = new Date(currentYear, currentMonthIndex + 1, 0).getDate();

  // Fill leading empty cells
  for (let i = 0; i < firstWeekday; i++) {
    const empty = document.createElement('div');
    empty.className = 'calendar-cell calendar-cell-empty';
    gridEl.appendChild(empty);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const key = formatKey(currentYear, currentMonthIndex, day);
    const cell = document.createElement('button');
    cell.type = 'button';
    cell.className = 'calendar-cell';
    cell.setAttribute('data-key', key);

    const dayLabel = document.createElement('div');
    dayLabel.className = 'calendar-cell-day';
    dayLabel.textContent = String(day);
    cell.appendChild(dayLabel);

    const icon = document.createElement('div');
    icon.className = 'calendar-cell-icon';
    cell.appendChild(icon);

    if (eatenSet.has(key)) {
      cell.classList.add('is-eaten');
    }

    cell.addEventListener('click', () => {
      if (eatenSet.has(key)) {
        eatenSet.delete(key);
        cell.classList.remove('is-eaten');
      } else {
        eatenSet.add(key);
        cell.classList.add('is-eaten');
      }
      saveCalendarSet(currentYear, eatenSet);
      renderYearBars(); // keep year view in sync
    });

    gridEl.appendChild(cell);
  }
}

function countMonthDays(monthIndex) {
  let count = 0;
  const daysInMonth = new Date(currentYear, monthIndex + 1, 0).getDate();
  for (let day = 1; day <= daysInMonth; day++) {
    const key = formatKey(currentYear, monthIndex, day);
    if (eatenSet.has(key)) count += 1;
  }
  return count;
}

function renderYearBars() {
  const barsEl = document.getElementById('yearBars');
  if (!barsEl) return;

  const monthlyCounts = monthNames.map((_, idx) => countMonthDays(idx));

  barsEl.innerHTML = '';

  const yearTitleEl = document.getElementById('yearTitle');
  const yearSubEl = document.getElementById('yearSub');
  if (yearTitleEl) {
    yearTitleEl.textContent = `${currentYear}`;
  }
  if (yearSubEl) {
    yearSubEl.textContent = 'Bars show how many CAIJIAMO days each month.';
  }
  monthlyCounts.forEach((count, idx) => {
    const item = document.createElement('div');
    item.className = 'year-bar-item';

    const label = document.createElement('div');
    label.className = 'year-bar-label';
    label.textContent = monthNames[idx];

    const barOuter = document.createElement('div');
    barOuter.className = 'year-bar-outer';

    const barInner = document.createElement('div');
    barInner.className = 'year-bar-inner';
    const daysInMonth = new Date(currentYear, idx + 1, 0).getDate();
    const ratio = count / daysInMonth;
    // 最少给一点高度，最多 100%：只有当当月每天都有 caijiamo1 时才满格
    const pct = Math.max(4, ratio * 100);
    barInner.style.height = `${pct}%`;

    barOuter.appendChild(barInner);
    const value = document.createElement('div');
    value.className = 'year-bar-value';
    value.textContent = String(count);
    // 让数字跟着条的高度“浮”在条顶上方
    if (pct >= 92) {
      value.style.bottom = 'calc(100% - 14px)';
    } else {
      value.style.bottom = `calc(${pct}% + 4px)`;
    }
    barOuter.appendChild(value);
    item.appendChild(barOuter);
    item.appendChild(label);

    barsEl.appendChild(item);
  });
}

function switchView(target) {
  const monthView = document.getElementById('monthView');
  const yearView = document.getElementById('yearView');
  const monthBtn = document.getElementById('monthViewBtn');
  const yearBtn = document.getElementById('yearViewBtn');
  if (!monthView || !yearView || !monthBtn || !yearBtn) return;

  if (target === 'month') {
    monthView.classList.remove('calendar-panel-hidden');
    yearView.classList.add('calendar-panel-hidden');
    monthBtn.classList.add('is-active');
    yearBtn.classList.remove('is-active');
  } else {
    monthView.classList.add('calendar-panel-hidden');
    yearView.classList.remove('calendar-panel-hidden');
    monthBtn.classList.remove('is-active');
    yearBtn.classList.add('is-active');
  }
}

window.addEventListener('load', () => {
  const monthBtn = document.getElementById('monthViewBtn');
  const yearBtn = document.getElementById('yearViewBtn');
  const prevBtn = document.getElementById('prevMonthBtn');
  const nextBtn = document.getElementById('nextMonthBtn');
  const prevYearBtn = document.getElementById('prevYearBtn');
  const nextYearBtn = document.getElementById('nextYearBtn');

  if (monthBtn) {
    monthBtn.addEventListener('click', () => switchView('month'));
  }
  if (yearBtn) {
    yearBtn.addEventListener('click', () => switchView('year'));
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentMonthIndex -= 1;
      if (currentMonthIndex < 0) {
        currentMonthIndex = 11;
        currentYear -= 1;
        eatenSet = loadCalendarSet(currentYear);
      }
      renderMonth();
      renderYearBars();
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentMonthIndex += 1;
      if (currentMonthIndex > 11) {
        currentMonthIndex = 0;
        currentYear += 1;
        eatenSet = loadCalendarSet(currentYear);
      }
      renderMonth();
      renderYearBars();
    });
  }

  if (prevYearBtn) {
    prevYearBtn.addEventListener('click', () => {
      currentYear -= 1;
      eatenSet = loadCalendarSet(currentYear);
      renderMonth();
      renderYearBars();
    });
  }

  if (nextYearBtn) {
    nextYearBtn.addEventListener('click', () => {
      currentYear += 1;
      eatenSet = loadCalendarSet(currentYear);
      renderMonth();
      renderYearBars();
    });
  }

  renderMonth();
  renderYearBars();
});

