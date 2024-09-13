// instruction-page.js

// Instruction page configuration
const instructionPage = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: generateInstructStimulus,
  choices: "NO_KEYS",
  trial_duration: null,
  on_load: function () {
    let shakeCount = 0;
    const instructionText = document.getElementById('instruction-text');
    const buttonContainer = document.getElementById('button-container');
    const restartButton = document.getElementById('restart-button');
    const continueButton = document.getElementById('continue-button');

    // Keyboard listener
    let keyboardListener = setupKeyboardListener(handleSpacebar);

    // Handle spacebar key press
    function handleSpacebar() {
      shakeCount++;
      shakePiggy();
      updateInstructionText(shakeCount);

      if (shakeCount === 3) {
        dropCoin(0);  // Out-of-circulation coin for instruction
        buttonContainer.style.visibility = 'visible';
        jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener);
      }
    }

    // Restart the trial
    function restart() {
      shakeCount = 0;
      updateInstructionText(shakeCount);
      buttonContainer.style.visibility = 'hidden';
      keyboardListener = setupKeyboardListener(handleSpacebar);
    }

    // Button event listeners
    restartButton.addEventListener('click', restart);
    continueButton.addEventListener('click', jsPsych.finishTrial);
  }
};

// Function to generate stimulus HTML
function generateInstructStimulus() {
  return `
    <div class="experiment-wrapper">
      <!-- Upper Information (Instructions) -->
      <div id="instruction-container">
        <div id="instruction-text">Press <span class="spacebar-icon">Spacebar</span> to shake the piggy bank...</div>
      </div>

      <!-- Middle Row (Piggy Bank & Coins) -->
      <div id="experiment-container">
        <div id="coin-container"></div>
        <img id="piggy-bank" src="imgs/piggy-bank.png" alt="Piggy Bank">
      </div>

      <!-- Lower Information (Buttons) -->
      <div id="button-container">
        <button id="restart-button" class="jspsych-btn">Restart</button>
        <button id="continue-button" class="jspsych-btn">Continue</button>
      </div>
    </div>
  `;
}

// Function to update instruction text based on shake count
function updateInstructionText(shakeCount) {
  const messages = [
    'Press <span class="spacebar-icon">Spacebar</span> to shake the piggy bank...',
    'Press <span class="spacebar-icon">Spacebar</span> to shake the piggy bank... shake...',
    'Press <span class="spacebar-icon">Spacebar</span> to shake the piggy bank... shake... and shake again!',
    'Well done! You just got a coin out of the piggy bank!<br /> Press <span style="font-weight: bold;">Continue</span> to proceed, or <span style="font-weight: bold;">Restart</span> to try again.'
  ];
  document.getElementById('instruction-text').innerHTML = messages[shakeCount];
}

// Function to set up keyboard listener
function setupKeyboardListener(callback) {
  return jsPsych.pluginAPI.getKeyboardResponse({
    callback_function: callback,
    valid_responses: [' '],
    rt_method: 'performance',
    persist: true,
    allow_held_key: false
  });
}
