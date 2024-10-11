// Configuration for the comparison task
const comparisonConfig = {
  magnitudes: [1, 2, 5],
  ratios: [1, 8, 16],
};
comparisonConfig.ratios.reverse();

// Function to generate stimulus HTML for comparison task
function generateComparisonStimulus(left, right) {
  return `
    <div class="experiment-wrapper">
      <div id="experiment-container">
        <div id="piggy-container-left">
          ${generatePiggyHTML(left.magnitude, left.ratio, 'left')}
        </div>
        <div id="piggy-container-right">
          ${generatePiggyHTML(right.magnitude, right.ratio, 'right')}
        </div>
      </div>
    </div>
  `;
}

// Function to generate HTML for a single piggy bank
function generatePiggyHTML(magnitude, ratio, side) {
  const ratio_index = comparisonConfig.ratios.indexOf(ratio);
  const ratio_factor = ratio_index / (comparisonConfig.ratios.length - 1);
  const piggy_style = `filter: saturate(${50 * (400/50) ** ratio_factor}%);`;
  
  return `
      <img id="piggy-bank-${side}" src="imgs/piggy-bank.png" alt="Piggy Bank" style="${piggy_style}">
  `;
}


// Function to generate HTML for piggy tails
function updateDualPiggyTails(magnitude, ratio, side) {
  const piggyContainer = document.getElementById(`piggy-container-${side}`);
  const piggyBank = document.getElementById(`piggy-bank-${side}`);

  const magnitude_index = comparisonConfig.magnitudes.indexOf(magnitude);
  const ratio_index = comparisonConfig.ratios.indexOf(ratio);
  // Calculate saturation based on ratio
  const ratio_factor = ratio_index / (comparisonConfig.ratios.length - 1);

  // Remove existing tails
  document.querySelectorAll('.piggy-tail').forEach(tail => tail.remove());

  // Wait for the piggy bank image to load
  piggyBank.onload = () => {
      const piggyBankWidth = piggyBank.offsetWidth;
      const tailWidth = piggyBankWidth * 0.1; // Adjust this factor as needed
      const spacing = tailWidth * 0; // Adjust spacing between tails
      for (let i = 0; i < magnitude_index + 1; i++) {
          const tail = document.createElement('img');
          tail.src = 'imgs/piggy-tail2.png';
          tail.alt = 'Piggy Tail';
          tail.className = 'piggy-tail';
          
          // Position each tail
          tail.style.left = `calc(50% + ${piggyBankWidth / 2 + (tailWidth + spacing) * i}px - ${tailWidth / 20}px)`;
          tail.style.width = `${tailWidth}px`;
          tail.style.filter = `saturate(${50 * (400/50) ** ratio_factor}%)`;

          piggyContainer.appendChild(tail);
      }
  };

  // Trigger onload if the image is already cached
  if (piggyBank.complete) {
      piggyBank.onload();
  }
}


// Comparison trial
const postVigourTrial = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: function() {
    const pair = jsPsych.evaluateTimelineVariable('pair');
    // console.log(pair);
    return generateComparisonStimulus(pair.left, pair.right);
  },
  choices: ['ArrowLeft', 'ArrowRight'],
  data: function() {
    const pair = jsPsych.evaluateTimelineVariable('pair');
    return {
      trialphase: 'vigour_test',
      left_magnitude: pair.left.magnitude,
      left_ratio: pair.left.ratio,
      right_magnitude: pair.right.magnitude,
      right_ratio: pair.right.ratio
    };
  },
  on_load: function () {
    const pair = jsPsych.evaluateTimelineVariable('pair');
    updateDualPiggyTails(pair.left.magnitude, pair.left.ratio, "left");
    updateDualPiggyTails(pair.right.magnitude, pair.right.ratio, "right");
  },
  on_finish: function(data) {
    const pair = jsPsych.evaluateTimelineVariable('pair');
    if (data.response === 'ArrowLeft') {
      data.chosen_magnitude = pair.left.magnitude;
      data.chosen_ratio = pair.left.ratio;
    } else if (data.response === 'ArrowRight') {
      data.chosen_magnitude = pair.right.magnitude;
      data.chosen_ratio = pair.right.ratio;
    }
  },
  post_trial_gap: 400
};

// Generate all pair combinations
const postVigourPairs = 
[{"left":{"magnitude":1,"ratio":16},"right":{"magnitude":2,"ratio":8}},
  {"left":{"magnitude":5,"ratio":16},"right":{"magnitude":5,"ratio":1}},
  {"left":{"magnitude":5,"ratio":1},"right":{"magnitude":1,"ratio":8}},
  {"left":{"magnitude":2,"ratio":8},"right":{"magnitude":5,"ratio":8}},
  {"left":{"magnitude":2,"ratio":16},"right":{"magnitude":1,"ratio":1}},
  {"left":{"magnitude":2,"ratio":1},"right":{"magnitude":5,"ratio":16}},
  {"left":{"magnitude":1,"ratio":16},"right":{"magnitude":5,"ratio":1}},
  {"left":{"magnitude":5,"ratio":8},"right":{"magnitude":1,"ratio":8}},
  {"left":{"magnitude":2,"ratio":8},"right":{"magnitude":2,"ratio":1}},
  {"left":{"magnitude":2,"ratio":1},"right":{"magnitude":5,"ratio":1}},
  {"left":{"magnitude":2,"ratio":16},"right":{"magnitude":1,"ratio":8}},
  {"left":{"magnitude":1,"ratio":16},"right":{"magnitude":1,"ratio":8}},
  {"left":{"magnitude":1,"ratio":8},"right":{"magnitude":2,"ratio":1}},
  {"left":{"magnitude":2,"ratio":1},"right":{"magnitude":1,"ratio":1}},
  {"left":{"magnitude":2,"ratio":16},"right":{"magnitude":2,"ratio":1}},
  {"left":{"magnitude":1,"ratio":1},"right":{"magnitude":5,"ratio":16}},
  {"left":{"magnitude":2,"ratio":8},"right":{"magnitude":1,"ratio":8}},
  {"left":{"magnitude":2,"ratio":8},"right":{"magnitude":2,"ratio":16}},
  {"left":{"magnitude":5,"ratio":16},"right":{"magnitude":1,"ratio":8}},
  {"left":{"magnitude":2,"ratio":16},"right":{"magnitude":5,"ratio":1}},
  {"left":{"magnitude":5,"ratio":1},"right":{"magnitude":1,"ratio":1}},
  {"left":{"magnitude":5,"ratio":16},"right":{"magnitude":2,"ratio":16}},
  {"left":{"magnitude":5,"ratio":16},"right":{"magnitude":1,"ratio":16}},
  {"left":{"magnitude":2,"ratio":16},"right":{"magnitude":1,"ratio":16}},
  {"left":{"magnitude":1,"ratio":16},"right":{"magnitude":1,"ratio":1}},
  {"left":{"magnitude":1,"ratio":8},"right":{"magnitude":1,"ratio":1}},
  {"left":{"magnitude":2,"ratio":8},"right":{"magnitude":5,"ratio":1}},
  {"left":{"magnitude":5,"ratio":1},"right":{"magnitude":5,"ratio":8}},
  {"left":{"magnitude":5,"ratio":16},"right":{"magnitude":2,"ratio":8}},
  {"left":{"magnitude":5,"ratio":8},"right":{"magnitude":2,"ratio":16}},
  {"left":{"magnitude":5,"ratio":8},"right":{"magnitude":1,"ratio":16}},
  {"left":{"magnitude":5,"ratio":8},"right":{"magnitude":2,"ratio":1}},
  {"left":{"magnitude":2,"ratio":8},"right":{"magnitude":1,"ratio":1}},
  {"left":{"magnitude":2,"ratio":1},"right":{"magnitude":1,"ratio":16}},
  {"left":{"magnitude":5,"ratio":16},"right":{"magnitude":5,"ratio":8}},
  {"left":{"magnitude":5,"ratio":8},"right":{"magnitude":1,"ratio":1}}];

// Create timeline for post-vigour task
const postVigourTrials = [];
postVigourPairs.forEach(pair => {
  postVigourTrials.push({
    timeline: [kick_out, fullscreen_prompt, postVigourTrial],
    timeline_variables: [{ pair: pair }]
  });
});
// console.log(postVigourTrials);

// Instructions for comparison task
const postVigourInstructions = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
    <div id="instruction-text" style="text-align: left">
      <p><strong>Next you will see pairs of piggy banks that you have seen before.</strong></p>
      <p><span class="highlight">Your job is to choose which one you would prefer to play with in the future.</span></p>
      <p>Use the <span class="spacebar-icon">←</span> [left arrow] to choose the left piggy bank.</p>
      <p>Use the <span class="spacebar-icon">→</span> [right arrow] to choose the right piggy bank.</p>
      <p>Press <span class="spacebar-icon">Spacebar</span> to begin the task.</p>
    </div>
  `,
  choices: [' '],
  post_trial_gap: 300
};