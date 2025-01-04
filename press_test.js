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
            <div class="press-container" style="text-align: center;">
                <h2>Press 'j' to start, then keep pressing as fast as you can!</h2>
                <div id="countdown" style="font-size: 48px; margin: 20px;">Press 'j' to begin</div>
                <div id="press-counter" style="font-size: 24px;">Presses: 0</div>
                <div id="speed-display" style="font-size: 24px; color: #2563eb;">Speed: 0.00 presses/sec</div>
                <div style="width: 300px; margin: 20px auto; border: 1px solid black;">
                    <div id="speed-bar" style="height: 20px; width: 0%; background-color: #2563eb; transition: width 0.1s ease;"></div>
                </div>
            </div>
        `;
    },
    choices: 'NO_KEYS',
    post_trial_gap: 800,
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
                const speed = (pressCount - 1) / elapsedSeconds; // Subtract initial press
                const speedDisplay = document.getElementById('speed-display');
                const speedBar = document.getElementById('speed-bar');
                if (speedDisplay) {
                    speedDisplay.textContent = `Speed: ${speed.toFixed(2)} presses/sec`;
                    // Assume max speed is 10 presses/sec for 100% bar width
                    const barWidth = Math.min(speed * 10, 100);
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
                    console.log(getDifferences(RTs).reduce((a, b) => a + b, 0));
                    jsPsych.finishTrial({responseTime: getDifferences(RTs), trialPresses: pressCount - 1});
                }, maxPressConfig.duration + 1000);
                
                // Start countdown
                countdownInterval = setInterval(() => {
                    timeLeft = timeLeft - 0.1;
                    const countdownElement = document.getElementById('countdown');
                    if (countdownElement) {
                        if (timeLeft > 0) {
                            countdownElement.textContent = `${timeLeft.toFixed(1)}`;
                            updateSpeed();
                        } else {
                            countdownElement.textContent = 'Time\'s up!';
                            clearInterval(countdownInterval);
                            cancelAnimationFrame(animationFrameId);
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
    stimulus: `
        <div id="instruction-text" style="text-align: left">
            <p>Before starting the main tasks, <strong>you will first press <span class="spacebar-icon">J</span> on the keyboard as fast as you can for 7 seconds for a baseline measure.</strong></p>
            <p>Your performance in this test will not have any effect on later tasks and potential bonuses.</p>
            <p>When you're ready:</p>
            <ul>
                <li>Press <span class="spacebar-icon">J</span> once to start the timer</li>
                <li>Keep pressing <span class="spacebar-icon">J</span> as fast as you can until time runs out</li>
            </ul>
            <p>Try to maintain the maximum speed you can achieve!</p>
        </div>
    `,
    choices: ['Start']
};

// Define the timeline
const maxPressTimeline = [
    maxPressInstructions,
    maxPressRateTrial
];

// Example usage:
// jsPsych.run(maxPressTimeline);