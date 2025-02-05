// Configuration PIT object
const PITconfig = {
  magnitudes: [1, 2, 5],
  ratios: [16, 8, 1],
  RPPs: [0.0625, 0.25, 5.0],
  coins: [1, 0.01, -1, -0.01],
  trialDuration: 7000 // in milliseconds on average, U[9500, 10500]
};

var PITtrialList = [{ "magnitude": 5, "ratio": 8, "coin": 0, "trialDuration": 4110 }, { "magnitude": 5, "ratio": 8, "coin": -0.01, "trialDuration": 6666 }, { "magnitude": 5, "ratio": 8, "coin": 0.01, "trialDuration": 7261 }, { "magnitude": 2, "ratio": 8, "coin": 0, "trialDuration": 4188 }, { "magnitude": 2, "ratio": 8, "coin": -1, "trialDuration": 7490 }, { "magnitude": 2, "ratio": 8, "coin": 1, "trialDuration": 6825 }, { "magnitude": 1, "ratio": 1, "coin": 0, "trialDuration": 4130 }, { "magnitude": 1, "ratio": 1, "coin": 0.01, "trialDuration": 6891 }, { "magnitude": 1, "ratio": 1, "coin": -0.01, "trialDuration": 6902 }, { "magnitude": 2, "ratio": 8, "coin": 0, "trialDuration": 4193 }, { "magnitude": 2, "ratio": 8, "coin": -0.5, "trialDuration": 6535 }, { "magnitude": 2, "ratio": 8, "coin": -0.01, "trialDuration": 6652 }, { "magnitude": 1, "ratio": 1, "coin": 0, "trialDuration": 3978 }, { "magnitude": 1, "ratio": 1, "coin": -0.5, "trialDuration": 6888 }, { "magnitude": 1, "ratio": 1, "coin": -1, "trialDuration": 6962 }, { "magnitude": 2, "ratio": 16, "coin": 0, "trialDuration": 3833 }, { "magnitude": 2, "ratio": 16, "coin": 0.5, "trialDuration": 7452 }, { "magnitude": 2, "ratio": 16, "coin": 0.01, "trialDuration": 6954 }, { "magnitude": 5, "ratio": 8, "coin": 0, "trialDuration": 3913 }, { "magnitude": 5, "ratio": 8, "coin": -0.5, "trialDuration": 6956 }, { "magnitude": 5, "ratio": 8, "coin": 0.5, "trialDuration": 7376 }, { "magnitude": 2, "ratio": 8, "coin": 0, "trialDuration": 4005 }, { "magnitude": 2, "ratio": 8, "coin": 0.5, "trialDuration": 7009 }, { "magnitude": 2, "ratio": 8, "coin": 0.01, "trialDuration": 7228 }, { "magnitude": 5, "ratio": 8, "coin": 0, "trialDuration": 4114 }, { "magnitude": 5, "ratio": 8, "coin": -1, "trialDuration": 7386 }, { "magnitude": 5, "ratio": 8, "coin": 1, "trialDuration": 7221 }, { "magnitude": 2, "ratio": 16, "coin": 0, "trialDuration": 4245 }, { "magnitude": 2, "ratio": 16, "coin": 1, "trialDuration": 6679 }, { "magnitude": 2, "ratio": 16, "coin": -0.01, "trialDuration": 7207 }, { "magnitude": 1, "ratio": 1, "coin": 0, "trialDuration": 3767 }, { "magnitude": 1, "ratio": 1, "coin": 1, "trialDuration": 7236 }, { "magnitude": 1, "ratio": 1, "coin": 0.5, "trialDuration": 6501 }, { "magnitude": 2, "ratio": 16, "coin": 0, "trialDuration": 3826 }, { "magnitude": 2, "ratio": 16, "coin": -0.5, "trialDuration": 7465 }, { "magnitude": 2, "ratio": 16, "coin": -1, "trialDuration": 6827 }, { "magnitude": 2, "ratio": 8, "coin": 0, "trialDuration": 4118 }, { "magnitude": 2, "ratio": 8, "coin": -0.5, "trialDuration": 6535 }, { "magnitude": 2, "ratio": 8, "coin": 1, "trialDuration": 6825 }, { "magnitude": 1, "ratio": 1, "coin": 0, "trialDuration": 3751 }, { "magnitude": 1, "ratio": 1, "coin": 0.01, "trialDuration": 6891 }, { "magnitude": 1, "ratio": 1, "coin": -1, "trialDuration": 6962 }, { "magnitude": 2, "ratio": 16, "coin": 0, "trialDuration": 3946 }, { "magnitude": 2, "ratio": 16, "coin": -0.01, "trialDuration": 7207 }, { "magnitude": 2, "ratio": 16, "coin": -1, "trialDuration": 6827 }, { "magnitude": 1, "ratio": 1, "coin": 0, "trialDuration": 3981 }, { "magnitude": 1, "ratio": 1, "coin": 0.5, "trialDuration": 6501 }, { "magnitude": 1, "ratio": 1, "coin": 1, "trialDuration": 7236 }, { "magnitude": 2, "ratio": 16, "coin": 0, "trialDuration": 3944 }, { "magnitude": 2, "ratio": 16, "coin": 0.5, "trialDuration": 7452 }, { "magnitude": 2, "ratio": 16, "coin": 1, "trialDuration": 6679 }, { "magnitude": 5, "ratio": 8, "coin": 0, "trialDuration": 3951 }, { "magnitude": 5, "ratio": 8, "coin": -1, "trialDuration": 7386 }, { "magnitude": 5, "ratio": 8, "coin": -0.5, "trialDuration": 6956 }, { "magnitude": 5, "ratio": 8, "coin": 0, "trialDuration": 3839 }, { "magnitude": 5, "ratio": 8, "coin": -0.01, "trialDuration": 6666 }, { "magnitude": 5, "ratio": 8, "coin": 0.01, "trialDuration": 7261 }, { "magnitude": 2, "ratio": 8, "coin": 0, "trialDuration": 4226 }, { "magnitude": 2, "ratio": 8, "coin": 0.01, "trialDuration": 7228 }, { "magnitude": 2, "ratio": 8, "coin": -1, "trialDuration": 7490 }, { "magnitude": 1, "ratio": 1, "coin": 0, "trialDuration": 3977 }, { "magnitude": 1, "ratio": 1, "coin": -0.01, "trialDuration": 6902 }, { "magnitude": 1, "ratio": 1, "coin": -0.5, "trialDuration": 6888 }, { "magnitude": 2, "ratio": 16, "coin": 0, "trialDuration": 3913 }, { "magnitude": 2, "ratio": 16, "coin": 0.01, "trialDuration": 6954 }, { "magnitude": 2, "ratio": 16, "coin": -0.5, "trialDuration": 7465 }, { "magnitude": 5, "ratio": 8, "coin": 0, "trialDuration": 4233 }, { "magnitude": 5, "ratio": 8, "coin": 1, "trialDuration": 7221 }, { "magnitude": 5, "ratio": 8, "coin": 0.5, "trialDuration": 7376 }, { "magnitude": 2, "ratio": 8, "coin": 0, "trialDuration": 4104 }, { "magnitude": 2, "ratio": 8, "coin": -0.01, "trialDuration": 6652 }, { "magnitude": 2, "ratio": 8, "coin": 0.5, "trialDuration": 7009 }];

// var PITtrialList = jsPsych.randomization.shuffleNoRepeats(PITtrialList, function(trial1, trial2) {trial1.coin == trial2.coin && trial1.ratio == trial2.ratio && trial1.magnitude == trial2.magnitude});

// Trial stimulus function
function generatePITstimulus(coin, ratio) {
  const ratio_index = experimentConfig.ratios.indexOf(ratio);
  // Calculate saturation based on ratio
  const ratio_factor = ratio_index / (experimentConfig.ratios.length - 1);
  const piggy_style = `filter: saturate(${50 * (400 / 50) ** ratio_factor}%) brightness(${115 * (90/115) ** ratio_factor}%);`;
  const cloud_style = `filter: brightness(0.8) contrast(1.2);`;
  let PIT_imgs = {
    0.01: "PIT3.png",
    1.0: "PIT1.png",
    0.5: "PIT2.png",
    "-0.01": "PIT4.png",
    "-1": "PIT6.png",
    "-0.5": "PIT5.png"
  };
  PIT_imgs = Object.fromEntries(Object.entries(PIT_imgs).map(([k, v]) => [k, "imgs/Pav_stims/session" + sessionNum + "/" + v]));
  PIT_imgs["0"] = "";
  const piggyBgImg = PIT_imgs[coin];
  return `
    <div class="experiment-wrapper" style="background-image: url(${piggyBgImg});background-repeat: repeat; background-size: 30vw;">
      <!-- Middle Row (Piggy Bank & Coins) -->
      <div id="experiment-container">
        <div id="bg-container">
          <img id="piggy-bg-1" src="imgs/piggy-cloud.png" alt="Piggy background" style="transform: translate(0vw, -4vh); position: absolute; height: 120%; width: auto; ${cloud_style}">
          <img id="piggy-bg-2" src="imgs/piggy-cloud.png" alt="Piggy background" style="transform: translate(0vw, -4vh); position: absolute; height: 120%; width: auto;">
        </div>
        <div id="piggy-container">
          <!-- Piggy Bank Image -->
          <img id="piggy-bank" src="imgs/piggy-bank.png" alt="Piggy Bank" style="${piggy_style}">
        </div>
        <div id="obstructor-container">
          <img id="obstructor" src="imgs/occluding_clouds.png" alt="Obstructor">
        </div>
      </div>
    </div>
  `;
}

// PIT trial
let PITtrialCounter = 0;
const PITtrial = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: function () {
    return generatePITstimulus(jsPsych.evaluateTimelineVariable('coin'), jsPsych.evaluateTimelineVariable('ratio'));
  },
  choices: 'NO_KEYS',
  // response_ends_trial: false,
  trial_duration: jsPsych.timelineVariable('trialDuration'),
  save_timeline_variables: ["magnitude", "ratio"],
  data: {
    trialphase: 'pit_trial',
    pit_coin: jsPsych.timelineVariable('coin'),
    trial_duration: jsPsych.timelineVariable('trialDuration'),
    response_time: () => { return window.responseTime },
    trial_presses: () => { return window.trialPresses },
    trial_reward: () => { return window.trialReward },
    // Record global data
    total_presses: () => { return window.totalPresses },
    total_reward: () => { return window.totalReward }
  },
  on_start: function (trial) {
    if (window.prolificPID.includes("simulate")) {
      trial.trial_duration = 1000;
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

        if (pressCount === ratio) {
          window.trialReward += magnitude;
          window.totalReward += magnitude;
          pressCount = 0;
        }
      },
      valid_responses: ['b'],
      rt_method: 'performance',
      persist: true,
      allow_held_key: false,
      minimum_valid_rt: 0
    });
  },
  on_load: function () {
    updatePiggyTails(jsPsych.evaluateTimelineVariable('magnitude'), jsPsych.evaluateTimelineVariable('ratio'));
    // console.log([jsPsych.evaluateTimelineVariable('magnitude'), jsPsych.evaluateTimelineVariable('ratio')]);
  },
  on_finish: function (data) {
    // Clean up listener
    jsPsych.pluginAPI.cancelAllKeyboardResponses();
    PITtrialCounter += 1;
    data.pit_trial_number = PITtrialCounter;
    if (PITtrialCounter % (PITtrials.length / 3) == 0 || PITtrialCounter == PITtrials.length) {
      saveDataREDCap(retry = 3);
    }

    // No response
    if (data.trial_presses === 0 && data.timeline_variables.ratio === 1) {
      var up_to_now = parseInt(jsPsych.data.get().last(1).select('n_warnings').values);
      jsPsych.data.addProperties({
        n_warnings: up_to_now + 1
      });
      // console.log(jsPsych.data.get().last(1).select('n_warnings').values[0]);
      showTemporaryWarning("Don't forget to participate!", 800); // Enable this line for non-stopping warning
    }
  },
  simulation_options: {
    data: {
      trial_presses: () => { window.trialPresses = jsPsych.randomization.randomInt(8, 20) },
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
  }
};

// Create timeline for PIT task
const PITtrials = [];
PITtrialList.forEach(trial => {
  PITtrials.push({
    timeline: [kick_out, fullscreen_prompt, PITtrial],
    timeline_variables: [trial]
  });
});

function getSelectedPITtrial() {
  const raw_data = jsPsych.data.get().filterCustom((trial) => trial.trialphase == "pit_trial");
  const trial_rewards = raw_data.select('trial_reward').values;
  // Select a random trial to be the bonus round with weights based on the rewards
  const selected_trial = jsPsych.randomization.sampleWithReplacement(raw_data.values(), 1, trial_rewards.map(reward => logNormalPDF(reward+1, Math.log(40), 0.3)));
  // Side effect: Save the reward for the bonus round
  window.sampledPITreward = selected_trial[0].trial_reward;
  // Return the trial index for referencing and the trial number for display
  return { trial_index: selected_trial[0].trial_index, pit_trial_number: selected_trial[0].pit_trial_number };
}

// Get fractional rewards of Vigour
function getFracPITReward() {
  const raw_data = jsPsych.data.get().filterCustom((trial) => trial.trialphase == "pit_trial");
  const total_reward = raw_data.select('total_reward').values.slice(-1)[0];
  try {
    total_reward === window.trialReward;
  } catch (error) {
    console.error("Total reward for PIT mismatch!");
  }
  return total_reward / 100 * 0.0213;
}

const PIT_bonus = {
  type: jsPsychHtmlButtonResponse,
  stimulus: "Congratulations! You've finished this game!",
  choices: ['Finish'],
  data: { trialphase: 'pit_bonus' },
  on_start: function (trial) {
    const selected_trial = getSelectedPITtrial();
    trial.stimulus = `
            <p>It is time to reveal your bonus payment for this round of cloudy piggy-bank game.</p>
            <p>The computer selected piggy bank number ${selected_trial.pit_trial_number}, which means you will earn ${(window.sampledPITreward / 100).toLocaleString('en-GB', { style: 'currency', currency: 'GBP' })} for the game.</p>
        `;
  },
  on_finish: (data) => {
    data.PIT_bonus = window.sampledPITreward / 100
  },
  simulation_options: {
    simulate: false
  }
};

// Debriefing
const vigour_PIT_bonus = {
  type: jsPsychHtmlButtonResponse,
  css_classes: ['instructions'],
  stimulus: "Congratulations! You've finished the Piggy-Bank Game!",
  choices: ['Finish'],
  data: { trialphase: 'vigour_bonus' },
  on_start: function (trial) {
    const selected_trial = getSelectedTrial();
    const selected_PIT_trial = getSelectedPITtrial();
    trial.stimulus = `
            <p>It is time to reveal your total bonus payment for the Piggy-Bank Game.</p>
            <p>The computer selected piggy bank number ${selected_trial.trial_number} of the no-cloud version and number ${selected_PIT_trial.pit_trial_number} of the cloudy version, which means you will earn ${((window.sampledVigourReward + window.sampledPITreward)/ 100).toLocaleString('en-GB', { style: 'currency', currency: 'GBP' })} in total for the game.</p>
        `;
  },
  on_finish: (data) => {
    data.vigour_bonus = (window.sampledVigourReward + window.sampledPITreward)/ 100
  },
  simulation_options: {
    simulate: false
  }
};

const vigour_PIT_bonus2 = {
  type: jsPsychHtmlButtonResponse,
  css_classes: ['instructions'],
  stimulus: "Congratulations! You've finished the Piggy-Bank Game!",
  choices: ['Finish'],
  data: { trialphase: 'vigour_bonus' },
  on_start: function (trial) {
    const total_bonus = getFracVigourReward() + getFracPITReward();
    trial.stimulus = `
            <p>It is time to reveal your total bonus payment for the Piggy-Bank Game.</p>
            <p>With the cloudy version and the no-cloud version combined, you will earn ${total_bonus.toLocaleString('en-GB', { style: 'currency', currency: 'GBP' })} in total for the game.</p>
        `;
  },
  on_finish: (data) => {
    data.vigour_bonus = getFracVigourReward() + getFracPITReward();
  },
  simulation_options: {
    simulate: false
  }
};

// Instructions for comparison task
const PITruleInstruction = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
    <div id="instruction-text" style="text-align: left">
      <p><strong>You will now play the same game again for the next few minutes. The rules remain the same:</strong></p>
      <ul>
        <li><img src="imgs/saturate-icon.png" style="height:1.3em; transform: translateY(0.2em)"> <strong>Vividness</strong> of piggy colors: Indicates how hard you need to shake it.</li>
        <li><img src="imgs/tail-icon.png" style="height:1.3em; transform: translateY(0.2em)"> <strong>Tail length</strong>: Longer piggy tails = more valuable coins.</li>
        <li>You can win coins of <strong>1 Penny, 2 Pence, and 5 Pence.</strong></li>
      </ul>
      <p><span class="highlight">But this time, you'll play in a cloudy place.<br>Coins will drop and be collected as usual, but they'll be hidden behind clouds.<br>You won't see them during the game.</span></p>
      <p>We will also pay you the total amount of coins from a randomly selected piggy bank at the end of this game.</p>
      <p>When you're ready, press <span class="spacebar-icon">B</span> to start!</p>
    </div>
  `,
  data: { trialphase: 'pit_instructions' },
  choices: ['b'],
  post_trial_gap: 300,
  simulation_options: {
    simulate: false
  }
};

const PITruleInstruction_2 = {
  type: jsPsychInstructions,
  data: { trialphase: 'vigour_instructions' },
  show_clickable_nav: true,
  pages: [`
  <div id="instruction-text" style="text-align: left">
    <p><strong>You will now play the same game again for the next few minutes. The rules remain the same:</strong></p>

    <ul>
        <li><img src="imgs/saturate-icon.png" style="height:1.3em; transform: translateY(0.2em)"> <span class="highlight">Vividness</span> of piggy colors: Indicates how hard you need to shake it.</li>
        <li><img src="imgs/tail-icon.png" style="height:1.3em; transform: translateY(0.2em)"> <span class="highlight">Tail length</span>: Longer piggy tails = more valuable coins.</li>
    </ul>

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
    </div>
    `,
    `<div id="instruction-text" style="text-align: left">
      <p><strong>But this time, you'll play in a cloudy place.</strong></p>
      <img src="imgs/occluding_clouds.png" style="height:12em">
      <p><span class="highlight">Coins will drop and be collected as usual, but they'll be hidden behind clouds.<br>You won't see them during the game.</span></p>
      <p>We will also pay you the bonus in the same way as in the previous game at the end.</p>
    </div>`,
    `
    <div id="instruction-text" style="text-align: left">
      <p><span class="highlight">In this cloudy place, the background will also change occasionally.</span></p>
      <p>These are the backgrounds you will see. Each time you see a background, <strong>one</strong> coin will either be added or removed from your earnings, regardless of what you do.</p>

          <div class="pav-stimuli-container">
                <div class="pit-pav-row">
                      <img src=${"imgs/Pav_stims/session" + sessionNum + "/PIT1.png"} class="pit-pav-icon">
                      <img src=${"imgs/Pav_stims/session" + sessionNum + "/PIT2.png"} class="pit-pav-icon">
                      <img src=${"imgs/Pav_stims/session" + sessionNum + "/PIT3.png"} class="pit-pav-icon">
                      <img src=${"imgs/Pav_stims/session" + sessionNum + "/PIT4.png"} class="pit-pav-icon">
                      <img src=${"imgs/Pav_stims/session" + sessionNum + "/PIT5.png"} class="pit-pav-icon">
                      <img src=${"imgs/Pav_stims/session" + sessionNum + "/PIT6.png"} class="pit-pav-icon">
                </div>
          </div>
    </div>
    `, `
    <div id="instruction-text" style="text-align: left">
          <p><strong>Here's how each background affects your earnings:</strong></p>
          <p>The backgrounds on the left will <strong>add</strong> £1, 50p, or 1p, while the backgrounds on the right will <strong>remove</strong> 1p, 50p, or £1, regardless of what you do.</p>

          <div class="pav-stimuli-container">
                <div class="pit-pav-row">
                      <img src=${"imgs/Pav_stims/session" + sessionNum + "/PIT1.png"} class="pit-pav-icon">
                      <img src=${"imgs/Pav_stims/session" + sessionNum + "/PIT2.png"} class="pit-pav-icon">
                      <img src=${"imgs/Pav_stims/session" + sessionNum + "/PIT3.png"} class="pit-pav-icon">
                      <div class="vertical"></div>
                      <img src=${"imgs/Pav_stims/session" + sessionNum + "/PIT4.png"} class="pit-pav-icon">
                      <img src=${"imgs/Pav_stims/session" + sessionNum + "/PIT5.png"} class="pit-pav-icon">
                      <img src=${"imgs/Pav_stims/session" + sessionNum + "/PIT6.png"} class="pit-pav-icon">
                </div>
                <div class="pit-coin-row">
                      <img src="imgs/1pound.png" class="pit-coin-icon">
                      <img src="imgs/50pence.png" class="pit-coin-icon">
                      <img src="imgs/1penny.png" class="pit-coin-icon">
                      <div class="vertical"></div>
                      <img src="imgs/1pennybroken.png" class="pit-coin-icon">
                      <img src="imgs/50pencebroken.png" class="pit-coin-icon">
                      <img src="imgs/1poundbroken.png" class="pit-coin-icon">
                </div>
          </div>
    </div>
    `],
  simulation_options: {
    simulate: false
  }
};

const startPITconfirmation = {
  type: jsPsychHtmlKeyboardResponse,
  choices: ['b', 'r'],
  stimulus: `
  <div id="instruction-text">
      <p>When you're ready, press <span class="spacebar-icon">B</span> to start!</p>
      <p>If you want to read the rules again, press <span class="spacebar-icon">R</span>.</p>
  </div>
    `,
  post_trial_gap: 300,
  data: { trialphase: 'pit_instructions' },
  simulation_options: {
    simulate: false
  }
}

const PITinstructions = {
  timeline: [PITruleInstruction_2, startPITconfirmation],
  loop_function: function (data) {
    const last_iter = data.last(1).values()[0];
    if (jsPsych.pluginAPI.compareKeys(last_iter.response, 'r')) {
      return true;
    } else {
      return false;
    }
  }
}