// vigour_instructions.js

// Instruction page configuration
const instructionPage = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: generateInstructStimulus,
  choices: "NO_KEYS",
  trial_duration: null,
  on_load: function () {
    updatePersistentCoinContainer();
    observeResizing('coin-container', updatePersistentCoinContainer);
    
    let shakeCount = 0;
    updateInstructionText(shakeCount);
    const bottomContainer = document.getElementById('bottom-container');
    let keyboardListener = setupKeyboardListener(handleSpacebar);

    function handleSpacebar() {
      shakeCount++;
      shakePiggy();
      updateInstructionText(shakeCount);

      if (shakeCount % 5 === 0) {
        dropCoin(0);
        bottomContainer.style.visibility = 'visible';
      }
    }

    function restart() {
      shakeCount = 0;
      updateInstructionText(shakeCount);
      bottomContainer.style.visibility = 'hidden';
      jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener);
      keyboardListener = setupKeyboardListener(handleSpacebar);
      const coinContainer = document.getElementById('coin-container');
      coinContainer.innerHTML = '';
    }

    document.getElementById('restart-button').addEventListener('click', restart);
    document.getElementById('continue-button').addEventListener('click', jsPsych.finishTrial);
  },
  on_finish: function () {
    jsPsych.pluginAPI.cancelAllKeyboardResponses();
  }
};

// Before starting the first trial
const startFirstTrial = {
  type: jsPsychHtmlKeyboardResponse,
  choices: [' ', 'r'],
  stimulus: `
  <div id="instruction-text" style="text-align: left">
    <p><strong>You will now play a few minutes of this game, collecting coins!</strong></p>
    
    <p>Throughout the game, you will see different piggy banks with unique appearances:</p>
    <ul>
        <li><img src="imgs/saturate-icon.png" style="height:1.3em; transform: translateY(0.2em)"> <span class="highlight">Vividness</span> of piggy colors: Indicates how hard you need to shake it.</li>
        <li><img src="imgs/tail-icon.png" style="height:1.3em; transform: translateY(0.2em)"> <span class="highlight">Tail length</span>: Longer piggy tails = more valuable coins.</li>
    </ul>
    
    <p>Types of coins you can win:</p>
    <div class="instruct-coin-container">
        <div class="instruct-coin">
            <img src="imgs/1p.png" alt="1 Penny">
            <p>1 Penny</p>
        </div>
        <div class="instruct-coin">
            <img src="imgs/2p.png" alt="2 Pence">
            <p>2 Pence</p>
        </div>
        <div class="instruct-coin">
            <img src="imgs/5p.png" alt="5 Pence">
            <p>5 Pence</p>
        </div>
        <div class="instruct-coin">
            <img src="imgs/10p.png" alt="10 Pence">
            <p>10 Pence</p>
        </div>
    </div>
    
    <p><span class="highlight">Your bonus</span>: You will keep all the coins from a randomly selected piggy bank at the end of the game.</p>
    
    <p><strong>When you're ready, press the <span class="spacebar-icon">Spacebar</span> to start!</strong></p>
    <p>If you want to revisit the previous example, press <span class="spacebar-icon">R</span>.</p>
    </div>
      `,
  on_finish: function (data) {
    const seed = jsPsych.randomization.setSeed();
    data.rng_seed = seed;
  },
  post_trial_gap: 250
};

// Function to generate stimulus HTML
function generateInstructStimulus() {
  return `
    <div class="experiment-wrapper">
      <!-- Upper Information (Instructions) -->
      <div id="instruction-container">
        <div id="instruction-text"></div>
      </div>

      <!-- Middle Row (Piggy Bank & Coins) -->
      <div id="experiment-container">
        <div id="coin-container"></div>
        <div id="piggy-container">
          <!-- Piggy Bank Image -->
          <img id="piggy-bank" src="imgs/piggy-bank.png" alt="Piggy Bank">
        </div>
      </div>

      <!-- Lower Information (Buttons) -->
      <div id="bottom-container" style="visibility: hidden">
        <p>Press <span style="font-weight: bold;">Restart</span> to retry from the beginning, or <span style="font-weight: bold;">Continue</span> to proceed.</p>
        <div id="button-container">
          <button id="restart-button" class="jspsych-btn">Restart</button>
          <button id="continue-button" class="jspsych-btn">Continue</button>
        </div>
      </div>
    </div>
  `;
}

// Function to update instruction text based on shake count
function updateInstructionText(shakeCount) {
  const messages = [
    'Press <span class="spacebar-icon">Spacebar</span> to shake this piggy bank!',
    '<p>Press <span class="spacebar-icon">Spacebar</span> to shake this piggy bank!</p><p>You can keep pressing <span class="spacebar-icon">Spacebar</span> to keep on shaking...</p>',
    '<p>Well done! You just got a coin out of the piggy bank!</p><p><span class="highlight">You can always keep pressing for more coins.</span> Try getting some more!</p>'
  ];
  let messageIndex = 0;
  if (shakeCount < 1) {
    messageIndex = 0;
  } else if (shakeCount >= 1 && shakeCount < 5) {
    messageIndex = 1;
  } else {
    messageIndex = 2;
  }
  document.getElementById('instruction-text').innerHTML = messages[messageIndex];
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
