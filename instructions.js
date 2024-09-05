// instruction-page.js

// Instruction page
const instructionPage = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: function () {
    return `
      <div class="experiment-wrapper">
        <div id="info-container">
          <div id="instruction-text">Press <span class="spacebar-icon">Spacebar</span> to shake the piggy bank...</div>
        </div>
        <div id="experiment-container">
          <div id="coin-container"></div>
          <img id="piggy-bank" src="img/piggy-bank.png" alt="Piggy Bank">
        </div>
        <div id="info-container" style="visibility: hidden;">
          <div id="trial-info">Press for </div>
        </div>
        <div id="progress-container" style="visibility: hidden;">
          <div id="progress-bar"></div>
          <div id="progress-text">0/0</div>
        </div> 
        <div id="button-container">
          <button id="restart-button" class="jspsych-btn">Retry</button>
          <button id="continue-button" class="jspsych-btn">Continue</button>
        </div>
      </div>
    `;
  },
  choices: "NO_KEYS",
  trial_duration: null,
  on_load: function () {
    let shakeCount = 0;
    const instructionText = document.getElementById('instruction-text');
    const buttonContainer = document.getElementById('button-container');
    const restartButton = document.getElementById('restart-button');
    const continueButton = document.getElementById('continue-button');

    // Modularize the update of instruction text
    function updateInstructionText() {
      const messages = [
        'Press <span class="spacebar-icon">Spacebar</span> to shake the piggy bank...',
        'Press <span class="spacebar-icon">Spacebar</span> to shake the piggy bank... shake...',
        'Press <span class="spacebar-icon">Spacebar</span> to shake the piggy bank... shake... and shake again!'
      ];
      instructionText.innerHTML = messages[shakeCount] || messages[0];
    }

    function handleSpacebar(info) {
      shakeCount++;
      shakePiggy();
      updateInstructionText();

      if (shakeCount === 3) {
        dropCoin(0);  // Out-of-circulation coin for instruction
        buttonContainer.style.visibility = 'visible';
        jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener);
      }
    }

    function restart() {
      shakeCount = 0;
      instructionText.innerHTML = 'Press <span class="spacebar-icon">Spacebar</span> to shake the piggy bank...';
      buttonContainer.style.visibility = 'hidden';
      keyboardListener = jsPsych.pluginAPI.getKeyboardResponse({
        callback_function: handleSpacebar,
        valid_responses: [' '],
        rt_method: 'performance',
        persist: true,
        allow_held_key: false
      });
    }

    let keyboardListener = jsPsych.pluginAPI.getKeyboardResponse({
      callback_function: handleSpacebar,
      valid_responses: [' '],
      rt_method: 'performance',
      persist: true,
      allow_held_key: false
    });

    restartButton.addEventListener('click', restart);
    continueButton.addEventListener('click', () => {
      jsPsych.finishTrial();
    });
  }
};

// Function to add styles to the document
function addInstructionStyles() {
  // Additional styles
  const instructionStyles = `
    #instruction-text {
      font-size: 3vmin;
      text-align: center;
    }
    .spacebar-icon {
      display: inline-block;
      padding: 10px 15px;
      background-color: #f0f0f0;
      border: 1px solid #ccc;
      border-radius: 3px;
      font-weight: bold;
    }
    #button-container {
      display: flex;
      justify-content: center;
      visibility: hidden;
    }
    #button-container button {
      margin: 0 10px;
    }
  `;
  document.head.insertAdjacentHTML('beforeend', `<style>${instructionStyles}</style>`);
}