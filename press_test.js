// Configuration object
const maxPressConfig = {
    duration: 7000,  // 7 seconds in milliseconds
    validKey: 'j'
};

// Function to get each key press RT
function getDifferences(array) {
    return array.map((currentValue, index, arr) => {
        if (index === 0) return 0; // or null, or any default for last element
        return currentValue - arr[index - 1];
    }).slice(1); // remove first element if you don't want the 0/null
}

// Trial to measure maximum press rate
const maxPressRateTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function() {
        return `
        <div id="instruction-container">
            <div id="instruction-text" style="text-align: center;">
                <h3><div id="countdown" style="margin: 20px;">Place your finger on the  <span class="spacebar-icon">J</span> key.<br>When you are ready, start pressing it repeatedly as fast as you can!</div></h3>
                <div id="press-counter">Presses: 0</div>
                <div id="speed-display" style="color: #0066cc;">Speed: 0.00 presses/sec</div>
                <div style="width: 300px; margin: 20px auto; border: 1px solid black;">
                    <div id="speed-bar" style="height: 20px; width: 0%; background-color: #0066cc; transition: width 0.1s ease;"></div>
                </div>
            </div>
        </div>
        `;
    },
    choices: 'NO_KEYS',
    data: {trialphase: 'max_press_rate'},
    on_start: function (trial) {
        if (window.prolificPID.includes("simulate")) {
            trial.trial_duration = 1000;
        }
        // Create a shared state object
        let pressCount = 0;
        let isStarted = false;
        let startTime;
        let timeLeft;
        let countdownInterval;
        let RTs = [];
    
        const keyboardListener = jsPsych.pluginAPI.getKeyboardResponse({
        callback_function: function (info) {
            const updateSpeed = () => {
                if (!isStarted) return;
                const currentTime = performance.now();
                const elapsedSeconds = (currentTime - startTime) / 1000;
                const speed = (pressCount - 1) / Math.min(elapsedSeconds, maxPressConfig.duration/1000); // Subtract initial press
                const speedDisplay = document.getElementById('speed-display');
                const speedBar = document.getElementById('speed-bar');
                if (speedDisplay) {
                    speedDisplay.textContent = `Speed: ${speed.toFixed(2)} presses/sec`;
                    // Assume max speed is 10 presses/sec for 100% bar width
                    const barWidth = Math.min(speed * 10, 110);
                    speedBar.style.width = `${barWidth}%`;
                }
            };

            if (!isStarted) {
                // First press - start the countdown
                isStarted = true;
                startTime = performance.now();
                lastPressTime = startTime;
                timeLeft = maxPressConfig.duration/1000;
                
                // Start animation loop
                animationFrameId = requestAnimationFrame(updateSpeed);

                // Set trial duration from first press
                jsPsych.pluginAPI.setTimeout(function() {
                    // const totalTime = getDifferences(RTs).reduce((a, b) => a + b, 0);
                    // console.log(totalTime);
                    jsPsych.finishTrial({responseTime: getDifferences(RTs), trialPresses: pressCount - 1, avgSpeed: (pressCount - 1) / (maxPressConfig.duration / 1000)});
                }, maxPressConfig.duration + 1000);
                
                // Start countdown
                countdownInterval = setInterval(() => {
                    timeLeft = timeLeft - 0.1;
                    const countdownElement = document.getElementById('countdown');
                    if (countdownElement) {
                        if (timeLeft >= 0) {
                            countdownElement.textContent = `${timeLeft.toFixed(1)} s left`;
                            updateSpeed();
                        } else {
                            clearInterval(countdownInterval);
                            cancelAnimationFrame(animationFrameId);
                            updateSpeed();
                            countdownElement.textContent = 'Time\'s up!';
                            jsPsych.pluginAPI.cancelAllKeyboardResponses();
                        }
                    }
                }, 100);
            }
            
            pressCount++;
            RTs.push(info.rt);
            const pressCounter = document.getElementById('press-counter');
            if (pressCounter) {
                pressCounter.textContent = `Presses: ${pressCount-1}`;
            }
        },
        valid_responses: [maxPressConfig.validKey],
        rt_method: 'performance',
        persist: true,
        allow_held_key: false,
        minimum_valid_rt: 10
        });
    }
};

// Instructions trial
const maxPressInstructions = {
    type: jsPsychHtmlButtonResponse,
    css_classes: ["instructions"],
    stimulus: `
    <div id="instruction-container">
        <div id="instruction-text" style="text-align: left;">
            <p>Before we start the first game, we need to complete a short test of your keyboard. On the next screen, you will need to <span class="highlight">press the <span class="spacebar-icon">J</span> key repeatedly as fast as you can.</span></p>
        </div>
    </div>
    `,
    choices: ['Start']
};

const maxPressFeedback = {
    type: jsPsychHtmlButtonResponse,
    stimulus: function() {
        const data = jsPsych.data.get().last(1).values()[0];
        return `
        <div id="instruction-container">
            <div id="instruction-text" style="text-align: center;">
                <h2><span class="highlight">Well done!</span></h2>
                <p>On average, you pressed <strong>${data.avgSpeed.toFixed(2)} times per second</strong> during the keyboard test.</p>
                <p>Press <strong>Continue</strong> to proceed to the first game.</p>
            </div>
        </div>
        `;
    },
    post_trial_gap: 800,
    choices: ['Continue']
};

// Define the timeline
const maxPressTimeline = [
    maxPressInstructions,
    maxPressRateTrial,
    maxPressFeedback
];

// Example usage:
// jsPsych.run(maxPressTimeline);