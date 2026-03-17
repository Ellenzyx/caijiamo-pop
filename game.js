// 菜品配置：cuisine 里所有菜品文件名（文件名就是菜名）
// 每次“新游戏”会从这里随机抽一批不同菜品来玩
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

const DISH_BATCH_SIZE = 8; // 每局随机抽多少种不同菜品（可调：6~10 都行）

let activeDishTypes = [];

function shuffleCopy(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function toDishType(fileName) {
  const dotIndex = fileName.lastIndexOf('.');
  const nameWithoutExt = dotIndex === -1 ? fileName : fileName.slice(0, dotIndex);
  return {
    id: nameWithoutExt,
    label: nameWithoutExt,
    image: `./cuisine/${fileName}`,
  };
}

function pickNewDishBatch() {
  const batch = shuffleCopy(ALL_CUISINE_IMAGES).slice(
    0,
    Math.min(DISH_BATCH_SIZE, ALL_CUISINE_IMAGES.length)
  );
  activeDishTypes = batch.map(toDishType);
}

// 网格配置：用规则网格避免图标重叠，并支持纵向堆积 & 下落
const GRID_COLS = 7;
const GRID_ROWS = 7;
const CELL_SIZE = 64;

const boardEl = document.getElementById('board');
const stepCountEl = document.getElementById('stepCount');
const comboCountEl = document.getElementById('comboCount');
const endOverlayEl = document.getElementById('endOverlay');
// 结束弹窗不再展示“超大菜夹馍”，因此不需要 burgerFillings
const caijiamoStageEl = document.getElementById('caijiamoStage');
const timeBarFillEl = document.getElementById('timeBarFill');
const startOverlayEl = document.getElementById('startOverlay');
const startBtnEl = document.getElementById('startBtn');
const endCount4El = document.getElementById('endCount4');
const endCount3El = document.getElementById('endCount3');
const endCount2El = document.getElementById('endCount2');
const endCount1El = document.getElementById('endCount1');

const restartBtn = document.getElementById('restartBtn');
const shuffleBtn = document.getElementById('shuffleBtn');

let tiles = [];
let boardGrid = []; // [row][col] => tile 或 null
let stepCount = 0;
let comboCount = 0;
let gameOver = false;
let selectedTiles = []; // 当前已选中的菜品（最多 3 个）
let timerStartMs = 0;
let timerRaf = 0;
let gameStarted = false;
let audioCtx = null;

const GAME_DURATION_MS = 60_000;

function sampleDishType() {
  const source = activeDishTypes.length > 0 ? activeDishTypes : ALL_CUISINE_IMAGES.map(toDishType);
  return source[Math.floor(Math.random() * source.length)];
}

function createTileElement(tile) {
  const el = document.createElement('div');
  el.className = 'tile';
  el.style.left = `${tile.x}px`;
  el.style.top = `${tile.y}px`;
  el.dataset.id = tile.id;

  const img = document.createElement('img');
  img.className = 'tile-image';
  img.src = tile.image;
  img.alt = tile.label;
  el.appendChild(img);

  const label = document.createElement('div');
  label.className = 'tile-label';
  label.textContent = tile.label;
  el.appendChild(label);

  el.addEventListener('click', () => onTileClick(tile));

  tile.el = el;
  return el;
}

// 根据当前 row/col 把 tile 放到棋盘上，整齐排布在网格中
function positionTileInGrid(tile) {
  const rect = boardEl.getBoundingClientRect();
  const width = rect.width;
  const totalGridWidth = GRID_COLS * CELL_SIZE;
  const offsetX = (width - totalGridWidth) / 2;
  const offsetY = 20;

  const baseX = offsetX + tile.col * CELL_SIZE;
  const baseY = offsetY + tile.row * CELL_SIZE;

  tile.x = baseX;
  tile.y = baseY;

  if (tile.el) {
    tile.el.style.left = `${tile.x}px`;
    tile.el.style.top = `${tile.y}px`;
  }
}

function layoutBoard() {
  let attempts = 0;
  let ok = false;

  while (!ok && attempts < 30) {
    attempts += 1;

    boardEl.innerHTML = '';
    tiles = [];
    boardGrid = Array.from({ length: GRID_ROWS }, () =>
      Array.from({ length: GRID_COLS }, () => null)
    );

    for (let row = 0; row < GRID_ROWS; row++) {
      for (let col = 0; col < GRID_COLS; col++) {
        const t = sampleDishType();
        const tile = {
          ...t,
          row,
          col,
        };
        const el = createTileElement(tile);
        boardEl.appendChild(el);
        tiles.push(tile);
        boardGrid[row][col] = tile;

        positionTileInGrid(tile);
      }
    }

    ok = hasAnyTripleCandidate();
  }
}

function onTileClick(tile) {
  if (gameOver || !gameStarted) return;

  // 连连看规则：只有“与同类菜品相邻”的菜才允许被点击
  if (!hasAdjacentSameTile(tile)) {
    shakeTile(tile);
    return;
  }

  // 再次点击同一块，视为取消选中
  if (selectedTiles.includes(tile)) {
    selectedTiles = selectedTiles.filter((t) => t !== tile);
    if (tile.el) {
      tile.el.classList.remove('tile-selected');
    }
    return;
  }

  // 已经选中了一种菜，只能继续选同一种
  if (selectedTiles.length > 0 && selectedTiles[0].id !== tile.id) {
    shakeTile(tile);
    return;
  }

  // 至多同时选中 3 个
  if (selectedTiles.length >= 3) {
    shakeTile(tile);
    return;
  }

  // 先选中（仅高亮，不立刻消除）
  selectedTiles.push(tile);
  if (tile.el) {
    tile.el.classList.add('tile-selected');
  }

  // 记录步数（点击一次算一步）
  stepCount += 1;
  if (stepCountEl) {
    stepCountEl.textContent = String(stepCount);
  }

  // 不足 3 个时，先不处理
  if (selectedTiles.length < 3) {
    return;
  }

  // 已经选中 3 个同样的菜品，直接从棋盘上一起消除
  removeSelectedTilesAndCollapse();

  comboCount += 1;
  if (comboCountEl) {
    comboCountEl.textContent = String(comboCount);
  }
  if (comboCount % 4 === 0) {
    playDingSound();
  } else {
    playPopSound();
  }

  updateCaijiamoDisplay();

  selectedTiles = [];
}

function playPopSound() {
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const now = audioCtx.currentTime;

    // 一个短促的“气泡”音：快速上扬再衰减
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.06);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.18, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(now);
    osc.stop(now + 0.14);
  } catch (e) {
    // 忽略音频不可用的情况
  }
}

function playDingSound() {
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const now = audioCtx.currentTime;

    // 更像“微波炉完成提示音”的 ding：双音 + 更长的尾音 + 轻微回声
    const master = audioCtx.createGain();
    master.gain.setValueAtTime(0.0001, now);
    master.gain.exponentialRampToValueAtTime(0.25, now + 0.01);
    master.gain.exponentialRampToValueAtTime(0.0001, now + 0.7);

    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2600, now);
    filter.Q.setValueAtTime(0.7, now);

    // 简单回声：短延迟 + 衰减反馈（很轻微）
    const delay = audioCtx.createDelay(0.25);
    delay.delayTime.setValueAtTime(0.11, now);
    const feedback = audioCtx.createGain();
    feedback.gain.setValueAtTime(0.18, now);

    // dry -> master
    filter.connect(master);
    // wet (delay) -> master
    filter.connect(delay);
    delay.connect(feedback);
    feedback.connect(delay);
    delay.connect(master);

    master.connect(audioCtx.destination);

    const osc1 = audioCtx.createOscillator();
    const osc2 = audioCtx.createOscillator();
    osc1.type = 'sine';
    osc2.type = 'sine';

    // 两个接近的音高，听起来更像家电提示音
    osc1.frequency.setValueAtTime(1046.5, now); // C6
    osc2.frequency.setValueAtTime(1318.5, now); // E6

    osc1.connect(filter);
    osc2.connect(filter);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.18);
    osc2.stop(now + 0.18);
  } catch (e) {
    // 忽略音频不可用的情况
  }
}

function renderEndSummary() {
  const total = comboCount;
  const fullBuns = Math.floor(total / 4);
  const remainder = total % 4;

  const c4 = fullBuns;
  const c3 = remainder === 3 ? 1 : 0;
  const c2 = remainder === 2 ? 1 : 0;
  const c1 = remainder === 1 ? 1 : 0;

  if (endCount4El) endCount4El.textContent = String(c4);
  if (endCount3El) endCount3El.textContent = String(c3);
  if (endCount2El) endCount2El.textContent = String(c2);
  if (endCount1El) endCount1El.textContent = String(c1);
}

// 检查当前棋盘上是否还存在任何“有机会组成三连”的菜品组合
// 简化规则：只要存在某个格子与同类相邻的数量 >= 2（在一条直线或拐角），就认为还有解
function hasAnyTripleCandidate() {
  for (let row = 0; row < GRID_ROWS; row++) {
    for (let col = 0; col < GRID_COLS; col++) {
      const tile = boardGrid[row][col];
      if (!tile) continue;

      const id = tile.id;
      let sameCount = 0;

      const neighbors = [
        [row - 1, col],
        [row + 1, col],
        [row, col - 1],
        [row, col + 1],
      ];

      neighbors.forEach(([r, c]) => {
        if (r < 0 || r >= GRID_ROWS || c < 0 || c >= GRID_COLS) return;
        const n = boardGrid[r][c];
        if (n && n.id === id) sameCount += 1;
      });

      if (sameCount >= 2) {
        return true;
      }
    }
  }
  return false;
}

function startTimer() {
  if (!gameStarted) return;
  timerStartMs = performance.now();
  if (timerRaf) cancelAnimationFrame(timerRaf);

  const tick = () => {
    if (gameOver) return;
    const now = performance.now();
    const elapsed = now - timerStartMs;
    const remaining = Math.max(0, GAME_DURATION_MS - elapsed);
    const ratio = remaining / GAME_DURATION_MS;

    if (timeBarFillEl) {
      timeBarFillEl.style.transform = `scaleX(${ratio})`;
    }

    if (remaining <= 0) {
      showEnd();
      return;
    }

    timerRaf = requestAnimationFrame(tick);
  };

  timerRaf = requestAnimationFrame(tick);
}

// 从棋盘中移除已选中的 3 个图标，并让所在列的上方图标下落填补
function removeSelectedTilesAndCollapse() {
  const affectedCols = new Set();

  selectedTiles.forEach((tile) => {
    if (tile.el && tile.el.parentElement) {
      tile.el.parentElement.removeChild(tile.el);
    }
    if (
      typeof tile.row === 'number' &&
      typeof tile.col === 'number' &&
      boardGrid[tile.row] &&
      boardGrid[tile.row][tile.col] === tile
    ) {
      boardGrid[tile.row][tile.col] = null;
      affectedCols.add(tile.col);
    }
  });

  affectedCols.forEach((col) => applyGravityForColumn(col));

  // 如果当前局面已经没有任何可行的三连组合，则重新洗牌一局
  if (!hasAnyTripleCandidate()) {
    layoutBoard();
  }
}

// 判断某个菜品上下左右是否存在相同 id 的菜品
function hasAdjacentSameTile(tile) {
  if (
    typeof tile.row !== 'number' ||
    typeof tile.col !== 'number' ||
    !boardGrid[tile.row] ||
    !boardGrid[tile.row][tile.col]
  ) {
    return false;
  }

  const { row, col, id } = tile;
  const neighbors = [
    [row - 1, col],
    [row + 1, col],
    [row, col - 1],
    [row, col + 1],
  ];

  for (const [r, c] of neighbors) {
    if (r < 0 || r >= GRID_ROWS || c < 0 || c >= GRID_COLS) continue;
    const neighbor = boardGrid[r][c];
    if (neighbor && neighbor.id === id) {
      return true;
    }
  }
  return false;
}

// 点击不符合条件的菜时，让它轻微抖动一下
function shakeTile(tile) {
  if (!tile.el) return;
  tile.el.classList.remove('tile-shake');
  void tile.el.offsetWidth; // 触发重新动画
  tile.el.classList.add('tile-shake');
}

// 让某一列的图标自上而下紧凑排列，下方空位由上方图标“下落”填补
function applyGravityForColumn(col) {
  const newColumn = [];
  for (let row = 0; row < GRID_ROWS; row++) {
    if (boardGrid[row][col]) {
      newColumn.push(boardGrid[row][col]);
    }
  }

  // 清空原列
  for (let row = 0; row < GRID_ROWS; row++) {
    boardGrid[row][col] = null;
  }

  // 从底部开始重新放置，实现“往下掉”
  let currentRow = GRID_ROWS - 1;
  for (let i = newColumn.length - 1; i >= 0; i--) {
    const tile = newColumn[i];
    boardGrid[currentRow][col] = tile;
    tile.row = currentRow;
    tile.col = col;
    positionTileInGrid(tile);
    currentRow--;
  }

  // 顶部剩余空位用新菜品补齐
  for (let row = currentRow; row >= 0; row--) {
    const t = sampleDishType();
    const tile = {
      ...t,
      row,
      col,
    };
    const el = createTileElement(tile);
    boardEl.appendChild(el);
    tiles.push(tile);
    boardGrid[row][col] = tile;
    positionTileInGrid(tile);
  }
}

// 根据已完成份数，使用 caijiamo1-4 的阶段图片在积累区堆叠展示：
// 1 份 -> 一个 caijiamo1
// 2 份 -> 一个 caijiamo2
// 3 份 -> 一个 caijiamo3
// 4 份 -> 一个 caijiamo4
// 5 份 -> 一个 caijiamo4 + 一个 caijiamo1
// 以此类推……
function updateCaijiamoDisplay() {
  if (!caijiamoStageEl) return;

  caijiamoStageEl.innerHTML = '';

  if (comboCount <= 0) return;

  const total = comboCount;
  const fullBuns = Math.floor(total / 4); // 已经满级的 4 阶菜夹馍数量
  const remainder = total % 4; // 剩余进度（1~3）

  // 先画所有满级的 caijiamo4
  for (let i = 0; i < fullBuns; i++) {
    const img = document.createElement('img');
    img.className = 'caijiamo-image';
    img.src = './chengpincaijiamo/caijiamo4.png';
    img.alt = 'CAIJIAMO stage 4';
    img.style.transform = 'scale(1)';
    caijiamoStageEl.appendChild(img);
  }

  // 如果还有进度，画一个对应阶段（1~3）的半成品
  if (remainder > 0) {
    const img = document.createElement('img');
    img.className = 'caijiamo-image';
    img.src = `./chengpincaijiamo/caijiamo${remainder}.png`;
    img.alt = `CAIJIAMO stage ${remainder}`;
    img.style.transform = 'scale(1)';
    caijiamoStageEl.appendChild(img);
  }
}

function showEnd() {
  gameOver = true;
  renderEndSummary();
  endOverlayEl.classList.remove('hidden');
  if (timerRaf) {
    cancelAnimationFrame(timerRaf);
    timerRaf = 0;
  }
  if (timeBarFillEl) {
    timeBarFillEl.style.transform = 'scaleX(0)';
  }
}

function resetGame() {
  gameOver = false;
  stepCount = 0;
  comboCount = 0;
  selectedTiles = [];
  if (stepCountEl) stepCountEl.textContent = '0';
  if (comboCountEl) comboCountEl.textContent = '0';
  endOverlayEl.classList.add('hidden');

  // 每次新游戏随机抽一批不同菜品
  pickNewDishBatch();
  layoutBoard();
  updateCaijiamoDisplay();
  startTimer();
}

restartBtn.addEventListener('click', resetGame);
shuffleBtn.addEventListener('click', () => {
  if (gameOver || !gameStarted) return;
  layoutBoard();
  startTimer();
});

window.addEventListener('load', () => {
  // 初次加载也先抽一批菜品（点击开始后会再次抽一批）
  pickNewDishBatch();
  layoutBoard();
  updateCaijiamoDisplay();
});

function startGame() {
  if (gameStarted) return;
  gameStarted = true;
  if (startOverlayEl) {
    startOverlayEl.style.display = 'none';
  }
  resetGame();
}

if (startBtnEl) {
  startBtnEl.addEventListener('click', startGame);
}

if (startOverlayEl) {
  startOverlayEl.addEventListener('click', startGame);
}

