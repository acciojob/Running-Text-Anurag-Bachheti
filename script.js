
    (function(){
      const TEXT = "We love Programming!";
      const textEl = document.getElementById('text'); // required by instructions
      const speedInput = document.getElementById('speed'); // required by instructions
      const speedValueEl = document.getElementById('speedValue');
      const delayMsEl = document.getElementById('delayMs');
      const restartBtn = document.getElementById('restartBtn');

      let token = 0; // used to cancel prior runs
      function getDelay() {
        // ensure numeric in [1,10], fallback to 5
        let s = Number(speedInput.value) || 5;
        s = Math.max(1, Math.min(10, s));
        return 500 / s;
      }

      function updateUI(){
        const s = Number(speedInput.value) || 5;
        speedValueEl.textContent = s;
        delayMsEl.textContent = String(Math.round(getDelay()));
      }

      // type text char-by-char, reading the current delay each step
      async function typeText(runToken) {
        textEl.textContent = '';
        for (let i = 0; i < TEXT.length; i++) {
          // if a newer run started, stop this one
          if (runToken !== token) return;
          const ch = TEXT[i];
          // append next character
          textEl.textContent += ch;
          // compute delay freshly so adjustments apply immediately
          const delay = getDelay();
          // wait that long (promise-based)
          await new Promise(res => setTimeout(res, delay));
        }
      }

      function startTyping() {
        token++; // invalidate previous runs
        const myToken = token;
        typeText(myToken);
      }

      // initialize UI and events
      updateUI();
      speedInput.addEventListener('input', () => {
        updateUI();
        // No need to restart automatically; speed changes affect remaining chars
      });

      restartBtn.addEventListener('click', () => {
        startTyping();
        speedInput.focus();
      });

      // Start automatically on load
      window.addEventListener('load', () => {
        startTyping();
      });

      // also restart if the user reloads the page or presses Enter on the slider
      speedInput.addEventListener('change', () => {
        // keep current run; change only delay for remaining chars.
        updateUI();
      });

    })();