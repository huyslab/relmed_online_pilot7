// vigour_instructions.js

// Instruction page configuration
const instructionPage = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: generateInstructStimulus,
  choices: "NO_KEYS",
  trial_duration: null,
  data: {trialphase: 'vigour_instructions'},
  on_load: function () {
    updatePersistentCoinContainer();
    observeResizing('coin-container', updatePersistentCoinContainer);

    let shakeCount = 0;
    let FR = 5;
    let timerStarted = false;
    let timer;
    updateInstructionText(shakeCount);
    const bottomContainer = document.getElementById('bottom-container');
    const experimentContainer = document.getElementById('experiment-container');
    const buttonInstruction = document.getElementById('button-instruction');
    let keyboardListener = setupKeyboardListener(handleSpacebar);

    function handleSpacebar() {
      shakeCount++;
      shakePiggy();
      updateInstructionText(shakeCount);

      if (shakeCount % FR === 0) {
        dropCoin(0);
      }

      if (shakeCount === FR + 1) {
        bottomContainer.style.visibility = 'visible';

        if (!timerStarted) {
          timerStarted = true;
          startTimer();
        }
      }
    }

    function startTimer() {
      timer = setTimeout(() => {
        experimentContainer.style.visibility = 'hidden';
        // buttonInstruction.style.fontSize = '1.5em';
        buttonInstruction.style.color = '#0066cc';
      }, 10000); // 10 seconds
    }

    function restart() {
      shakeCount = 0;
      timerStarted = false;
      clearTimeout(timer);
      updateInstructionText(shakeCount);
      experimentContainer.style.visibility = 'visible';
      bottomContainer.style.visibility = 'hidden';
      buttonInstruction.style.fontSize = '';
      buttonInstruction.style.color = '';
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
const ruleInstruction = {
  type: jsPsychInstructions,
  data: {trialphase: 'vigour_instructions'},
  show_clickable_nav: true,
  pages: [`
  <div id="instruction-text" style="text-align: left">
    <p><strong>You will now play a few minutes of this game, collecting coins!</strong></p>
    
    <p>Throughout the game, you will see different piggy banks with unique appearances:</p>
    <ul>
        <li><img src="imgs/saturate-icon.png" style="height:1.3em; transform: translateY(0.2em)"> <span class="highlight">Vividness</span> of piggy colors: Indicates how hard you need to shake it.</li>
        <li><img src="imgs/tail-icon.png" style="height:1.3em; transform: translateY(0.2em)"> <span class="highlight">Tail length</span>: Longer piggy tails = more valuable coins.</li>
    </ul>
    </div>
    `,
    `<div id="instruction-text" style="text-align: left">
    <p>Types of coins you can win:</p>
    <div class="instruct-coin-container">
        <div class="instruct-coin">
            <img src="imgs/1p-num.png" alt="1 Penny">
            <p>1 Penny</p>
        </div>
        <div class="instruct-coin">
            <img src="imgs/2p-num.png" alt="2 Pence">
            <p>2 Pence</p>
        </div>
        <div class="instruct-coin">
            <img src="imgs/5p-num.png" alt="5 Pence">
            <p>5 Pence</p>
        </div>
    </div>
    
    <p><span class="highlight">Your bonus</span>: We will pay you the total amount of coins from a randomly selected piggy bank at the end of the game.</p>
    </div>
      `]
};

const startConfirmation = {
  type: jsPsychHtmlKeyboardResponse,
  choices: [' ', 'r'],
  stimulus: `
  <div id="instruction-text">
      <p><strong>When you're ready, press the <span class="spacebar-icon">Spacebar</span> to start!</strong></p>
    <p>If you want to start over from the beginning, press <span class="spacebar-icon">R</span>.</p>
  </div>
    `,
  post_trial_gap: 300,
  data: {trialphase: 'vigour_instructions'},
  on_finish: function (data) {
    const seed = jsPsych.randomization.setSeed();
    data.rng_seed = seed;
  },
  simulation_options: {
    simulate: false
  }
}

const vigourInstructions = {
  timeline: [instructionPage, ruleInstruction, startConfirmation],
  loop_function: function (data) {
    const last_iter = data.last(1).values()[0];
    if (jsPsych.pluginAPI.compareKeys(last_iter.response, 'r')) {
      return true;
    } else {
      return false;
    }
  }
}

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
        <p id="button-instruction" style="margin: 24px">Press <span style="font-weight: bold;">Restart</span> to try again, or <span style="font-weight: bold;">Continue</span> to proceed.</p>
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
    'Press <span class="spacebar-icon">B</span> on the keyboard to shake this piggy bank!',
    '<p>Press <span class="spacebar-icon">B</span> on the keyboard to shake this piggy bank!</p><p>You can keep pressing <span class="spacebar-icon">B</span> to keep on shaking...</p>',
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
    valid_responses: ['b'],
    rt_method: 'performance',
    persist: true,
    allow_held_key: false
  });
}
