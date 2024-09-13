// Configuration object
const experimentConfig = {
  ratios: [1, ...Array.from({ length: 18 }, (_, i) => 2 + i * 2)],
  magnitudes: [1, 2, 5, 10],
  trialDuration: 6000, // in milliseconds
  minITI: 1400,
  maxITI: 1600
};

// Global variables
window.totalReward = 0;
window.totalPresses = 0;
window.sampledVigourReward = 0;

// Functions for animation
// Shake piggy bank animation
function shakePiggy() {
  const piggyBank = document.getElementById('piggy-bank');
  piggyBank.animate([
    { transform: `translateX(-2%)` },
    { transform: `translateX(2%)` },
    { transform: 'translateX(0)' }
  ], {
    duration: 100,
    easing: 'ease-in-out'
  });
}

// Wiggle piggy bank animation
function wigglePiggy() {
  const piggyBank = document.getElementById('piggy-bank');
  piggyBank.animate([
    { transform: 'translate(1%, 1%) rotate(0deg)' },
    { transform: 'translate(-1%, -1.5%) rotate(-2deg)' },
    { transform: 'translate(-2%, 0%) rotate(2deg)' },
    { transform: 'translate(2%, 1.5%) rotate(0deg)' },
    { transform: 'translate(1%, -1%) rotate(2deg)' },
    { transform: 'translate(-1%, 1.5%) rotate(-2deg)' },
    { transform: 'translate(-2%, 1%) rotate(0deg)' },
    { transform: 'translate(2%, 1%) rotate(-2deg)' },
    { transform: 'translate(-1%, -1%) rotate(2deg)' },
    { transform: 'translate(1%, 1.5%) rotate(0deg)' },
    { transform: 'translate(1%, -1.5%) rotate(-2deg)' }
  ], {
    duration: 100,
    easing: 'linear'
  });
}

// Drop coin animation
function dropCoin(magnitude) {
  const coinContainer = document.getElementById('coin-container');
  const coin = document.createElement('img');
  coin.className = 'coin';
  coin.src = magnitude === 0 ? 'img/ooc_2p.png' : `img/${magnitude}p.png`;
  coin.alt = `Coin of value ${magnitude}`;

  coinContainer.appendChild(coin);

  if (magnitude === 0) {
    coin.animate([
      { top: '-15%', opacity: 0.8, offset: 0 },
      { top: '70%', opacity: 1, offset: 0.2 },
      { top: '70%', opacity: 1, offset: 0.9 },
      { top: '70%', opacity: 0, offset: 1 }
    ], {
      duration: 2500,
      easing: 'ease-in-out'
    }).onfinish = () => coin.remove();
  } else {
    coin.animate([
      { top: '-15%', opacity: 0.8, offset: 0 },
      { top: '70%', opacity: 1, offset: 0.5 },
      { top: '70%', opacity: 0, offset: 1 }
    ], {
      duration: 1000,
      easing: 'ease-in-out'
    }).onfinish = () => coin.remove();
  }
}

// Generate trials (deprecated)
function generateTrials() {
  let trials = [];
  for (let magnitude of experimentConfig.magnitudes) {
    for (let ratio of experimentConfig.ratios) {
      trials.push({ magnitude, ratio });
    }
  }
  return jsPsych.randomization.shuffle(trials);
}

// Generate trials
// const trials = generateTrials();
const trials = [{ "magnitude": 10, "ratio": 22 }, { "magnitude": 10, "ratio": 34 }, { "magnitude": 1, "ratio": 18 }, { "magnitude": 1, "ratio": 2 }, { "magnitude": 2, "ratio": 16 }, { "magnitude": 1, "ratio": 16 }, { "magnitude": 5, "ratio": 10 }, { "magnitude": 5, "ratio": 16 }, { "magnitude": 1, "ratio": 12 }, { "magnitude": 2, "ratio": 10 }, { "magnitude": 5, "ratio": 24 }, { "magnitude": 5, "ratio": 26 }, { "magnitude": 10, "ratio": 8 }, { "magnitude": 5, "ratio": 6 }, { "magnitude": 10, "ratio": 10 }, { "magnitude": 5, "ratio": 30 }, { "magnitude": 1, "ratio": 14 }, { "magnitude": 1, "ratio": 10 }, { "magnitude": 10, "ratio": 24 }, { "magnitude": 1, "ratio": 24 }, { "magnitude": 2, "ratio": 12 }, { "magnitude": 5, "ratio": 28 }, { "magnitude": 2, "ratio": 4 }, { "magnitude": 2, "ratio": 22 }, { "magnitude": 2, "ratio": 26 }, { "magnitude": 1, "ratio": 1 }, { "magnitude": 1, "ratio": 20 }, { "magnitude": 2, "ratio": 34 }, { "magnitude": 2, "ratio": 28 }, { "magnitude": 5, "ratio": 36 }, { "magnitude": 10, "ratio": 28 }, { "magnitude": 5, "ratio": 2 }, { "magnitude": 2, "ratio": 1 }, { "magnitude": 10, "ratio": 6 }, { "magnitude": 10, "ratio": 4 }, { "magnitude": 2, "ratio": 2 }, { "magnitude": 5, "ratio": 8 }, { "magnitude": 10, "ratio": 30 }, { "magnitude": 2, "ratio": 32 }, { "magnitude": 5, "ratio": 12 }, { "magnitude": 10, "ratio": 20 }, { "magnitude": 2, "ratio": 18 }, { "magnitude": 5, "ratio": 18 }, { "magnitude": 5, "ratio": 20 }, { "magnitude": 1, "ratio": 36 }, { "magnitude": 1, "ratio": 26 }, { "magnitude": 1, "ratio": 22 }, { "magnitude": 2, "ratio": 24 }, { "magnitude": 10, "ratio": 14 }, { "magnitude": 10, "ratio": 32 }, { "magnitude": 2, "ratio": 20 }, { "magnitude": 5, "ratio": 34 }, { "magnitude": 10, "ratio": 18 }, { "magnitude": 2, "ratio": 36 }, { "magnitude": 1, "ratio": 8 }, { "magnitude": 5, "ratio": 22 }, { "magnitude": 1, "ratio": 6 }, { "magnitude": 1, "ratio": 30 }, { "magnitude": 5, "ratio": 32 }, { "magnitude": 5, "ratio": 14 }, { "magnitude": 1, "ratio": 28 }, { "magnitude": 1, "ratio": 32 }, { "magnitude": 10, "ratio": 26 }, { "magnitude": 10, "ratio": 16 }, { "magnitude": 10, "ratio": 12 }, { "magnitude": 1, "ratio": 4 }, { "magnitude": 2, "ratio": 30 }, { "magnitude": 1, "ratio": 34 }, { "magnitude": 2, "ratio": 14 }, { "magnitude": 10, "ratio": 36 }, { "magnitude": 5, "ratio": 4 }, { "magnitude": 2, "ratio": 6 }, { "magnitude": 2, "ratio": 8 }];

// Trial stimulus function
function generateTrialStimulus(magnitude, ratio) {
  const magnitude_text = magnitude === 1 ? '1 penny' : `${magnitude} pence`;
  const ratio_text = ratio === 1 ? 'time' : 'times';
  return `
        <div class="experiment-wrapper">
          <!-- Middle Row (Piggy Bank & Coins) -->
          <div id="experiment-container">
            <div id="coin-container"></div>
            <img id="piggy-bank" src="img/piggy-bank.png" alt="Piggy Bank">
          </div>
          <!-- Bottom Row (Trial Info) -->
          <div id="bottom-container">
            <div id="info-container">
              <div id="trial-info">Press ${ratio + ' ' + ratio_text} for ${magnitude_text}</div>
            </div>
            <div id="progress-container">
              <div id="progress-bar"></div>
              <div id="progress-text">0/0</div>
            </div>
          </div>
      </div>
  `;
}

// Box shaking trial
let vigourTrialCounter = 0;
const piggyBankTrial = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: function () {
    return generateTrialStimulus(jsPsych.evaluateTimelineVariable('magnitude'), jsPsych.evaluateTimelineVariable('ratio'));
  },
  choices: 'NO_KEYS',
  // response_ends_trial: false,
  trial_duration: experimentConfig.trialDuration,
  save_timeline_variables: true,
  data: {
    trial_presses: () => { return window.trialPresses },
    trial_reward: () => { return window.trialReward },
    response_time: () => { return window.responseTime },
    // Record global data
    total_presses: () => { return window.totalPresses },
    total_reward: () => { return window.totalReward }
  },
  simulation_options: {
    data: {
      trial_presses: () => { window.trialPresses = jsPsych.randomization.randomInt(20, 30) },
      trial_reward: () => { window.trialReward = Math.floor(window.trialPresses / jsPsych.evaluateTimelineVariable('ratio')) * jsPsych.evaluateTimelineVariable('magnitude') },
      response_time: () => {
        do {
          window.responseTime = [];
          for (let i = 0; i < window.trialPresses; i++) {
            window.responseTime.push(Math.floor(jsPsych.randomization.sampleExGaussian(150, 15, 0.01, true)));
          }
        } while (window.responseTime.reduce((acc, curr) => acc + curr, 0) > experimentConfig.trialDuration);
      },
      total_presses: () => { window.totalPresses += window.trialPresses },
      total_reward: () => { window.totalReward += window.trialReward }
    }
  },
  on_start: function (trial) {
    if (window.simulate) {
      trial.trial_duration = 1000 / 60;
    }
    // Create a shared state object
    window.trialPresses = 0;
    window.trialReward = 0;
    window.responseTime = [];

    let lastPressTime = 0;
    let pressCount = 0;

    const ratio = jsPsych.evaluateTimelineVariable('ratio');
    const magnitude = jsPsych.evaluateTimelineVariable('magnitude');

    const keyboardListener = jsPsych.pluginAPI.getKeyboardResponse({
      callback_function: function (info) {
        window.responseTime.push(info.rt - lastPressTime);
        lastPressTime = info.rt;
        // wigglePiggy();
        shakePiggy();
        pressCount++;
        window.trialPresses++;
        window.totalPresses++;

        // Update progress bar
        const progressBar = document.getElementById('progress-bar');
        const progressText = document.getElementById('progress-text');
        const progress = (pressCount / ratio) * 100;
        progressBar.style.width = `${progress}%`;
        progressText.textContent = `${pressCount}/${ratio}`;

        if (pressCount === ratio) {
          window.trialReward += magnitude;
          window.totalReward += magnitude;
          pressCount = 0;
          dropCoin(magnitude);

          // Show full progress bar briefly before resetting
          progressBar.style.backgroundColor = '#78909c'; // Slightly darker shade for completion
          setTimeout(() => {
            pressCount = 0;
            progressBar.style.width = '0%';
            progressBar.style.backgroundColor = '#90a4ae'; // Reset to original color
            progressText.textContent = `0/${ratio}`;
          }, 200);
        }
      },
      valid_responses: [' '],
      rt_method: 'performance',
      persist: true,
      allow_held_key: false,
      minimum_valid_rt: 50
    });
  },
  on_load: function () {
    const magnitude_index = experimentConfig.magnitudes.indexOf(jsPsych.evaluateTimelineVariable('magnitude'));
    document.getElementById('piggy-bank').style.filter = `hue-rotate(${magnitude_index * 45}deg)`;

    // Initialize progress bar
    const ratio = jsPsych.evaluateTimelineVariable('ratio');
    const progressText = document.getElementById('progress-text');
    progressText.textContent = `0/${ratio}`;
  },
  on_finish: function (data) {
    // Clean up listener
    jsPsych.pluginAPI.cancelAllKeyboardResponses();
    vigourTrialCounter += 1;
    data.trial_number = vigourTrialCounter;
  }
};

// Inter-trial interval
const interTrialInterval = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: function () {
    return `
      <div class="experiment-wrapper">
        <div id="experiment-container">
          <img id="piggy-bank" src="img/piggy-bank.png" alt="Piggy Bank" class="grayscale-blur">
        </div>
        <div id="info-container">
          <div id="iti-text">Preparing next round...</div>
        </div>
      </div>
        `;
  },
  choices: "NO_KEYS",
  on_start: function (trial) {
    if (window.simulate) {
      trial.trial_duration = 1000 / 60;
    } else {
      trial.trial_duration = Math.floor(Math.random() * (experimentConfig.maxITI - experimentConfig.minITI) + experimentConfig.minITI);
    }
  },
  save_trial_parameters: { trial_duration: true }
};

// Before starting the first trial
const startFirstTrial = {
  type: jsPsychHtmlKeyboardResponse,
  choices: [' '],
  stimulus: `
      <div id="info-container">
        <div id="iti-text">
          <p style="line-height:1.5"> When you finish the game, a random round will be picked and you will earn what you get from that round as your bonus.</p>
          <p> When you are ready, Press <span class="spacebar-icon">Spacebar</span> to start!</p>
        </div>
      </div>`,
  on_finish: function () {
    const seed = jsPsych.randomization.setSeed();
    jsPsych.data.addProperties({
      rng_seed: seed
    });
  },
  simulation_options: {
    simulate: false
  }
};

// Debriefing
const debriefing = {
  type: jsPsychHtmlButtonResponse,
  stimulus: "Congratulations! You've finished this game!",
  choices: ['Finish'],
  on_start: function (trial) {
    const selected_trial = getSelectedTrial();
    // console.log(selected_trial);
    trial.stimulus = `
            <p>Congratulations! You've finished this game!</p>
            <p>Round ${selected_trial.trial_number} was picked and you earned a ${(window.sampledVigourReward / 100).toLocaleString('en-GB', { style: 'currency', currency: 'GBP' })} for the game.</p>
            <p>If you have any questions about the experiment, please message the experimenter.</p>
        `;
  },
  simulation_options: {
    simulate: false
  }
};

// Create main experiment timeline
const experimentTimeline = [];
trials.forEach(trial => {
  experimentTimeline.push({
    timeline: [piggyBankTrial, interTrialInterval],
    timeline_variables: [trial]
  });
});

// Get trial reward data
function getSelectedTrial() {
  const raw_data = jsPsych.data.get().filterCustom((trial) => trial.trial_reward !== undefined);
  const trial_rewards = raw_data.select('trial_reward').values;
  // Select a random trial to be the bonus round with weights based on the rewards
  const selected_trial = jsPsych.randomization.sampleWithReplacement(raw_data.values(), 1, trial_rewards.map(reward => (reward) ** 2));
  // Side effect: Save the reward for the bonus round
  window.sampledVigourReward = selected_trial[0].trial_reward;
  // Return the trial index for referencing and the trial number for display
  return { trial_index: selected_trial[0].trial_index, trial_number: selected_trial[0].trial_number };
}
