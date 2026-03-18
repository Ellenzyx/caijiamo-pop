// Global UI click sound (pixel style) for all buttons.
(() => {
  let ctx = null;

  function ensureCtx() {
    if (!ctx) {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    return ctx;
  }

  function playUiClick() {
    try {
      const c = ensureCtx();
      const now = c.currentTime;

      const master = c.createGain();
      master.gain.setValueAtTime(0.0001, now);
      master.gain.exponentialRampToValueAtTime(0.2, now + 0.01);
      master.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);
      master.connect(c.destination);

      const o1 = c.createOscillator();
      const o2 = c.createOscillator();
      const g1 = c.createGain();
      const g2 = c.createGain();

      o1.type = 'square';
      o2.type = 'triangle';

      o1.frequency.setValueAtTime(880, now);
      o1.frequency.exponentialRampToValueAtTime(1320, now + 0.06);
      o2.frequency.setValueAtTime(660, now);
      o2.frequency.exponentialRampToValueAtTime(990, now + 0.06);

      g1.gain.setValueAtTime(0.0001, now);
      g1.gain.exponentialRampToValueAtTime(0.12, now + 0.01);
      g1.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);

      g2.gain.setValueAtTime(0.0001, now);
      g2.gain.exponentialRampToValueAtTime(0.08, now + 0.01);
      g2.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);

      o1.connect(g1);
      o2.connect(g2);
      g1.connect(master);
      g2.connect(master);

      o1.start(now);
      o2.start(now);
      o1.stop(now + 0.11);
      o2.stop(now + 0.11);
    } catch {
      // ignore
    }
  }

  // Event delegation: any button press plays sound.
  document.addEventListener(
    'pointerdown',
    (e) => {
      const btn = e.target && e.target.closest ? e.target.closest('button') : null;
      if (!btn) return;
      if (btn.hasAttribute('data-no-ui-sound')) return;
      playUiClick();
    },
    { passive: true }
  );
})();

