var jsPsychReversal = (function (jspsych) {
    "use strict";

    const info = {
        name: "reversal",
        version: "0.1", 
        parameters: {
            /** Value of left-hand side feedback */
            feedback_left: {
                type: jspsych.ParameterType.FLOAT,
                default: undefined,
            },
            /** Value of right-hand side feedback */
            feedback_right: {
                type: jspsych.ParameterType.FLOAT,
                default: undefined,
            },
            /** Whether right-hand side squirrel is optimal */
            optimal_right: {
                type: jspsych.ParameterType.BOOL,
                default: undefined
            },
            choices: {
                type: jspsych.ParameterType.KEYS,
                default: ['arrowleft', 'arrowright'],
            },
            /** Coin image filenames */
            coin_images: {
                type: jspsych.ParameterType.OBJECT,
                default: {
                    0.01: "1penny.png",
                    1.0: "1pound.png"
                },
            },
            /** Duration of coin toss animation in ms */
            animation_duration: {
                type: jspsych.ParameterType.INT,
                default: 1350
            },
            /** Duration of coin toss animation in ms */
            response_deadline: {
                type: jspsych.ParameterType.INT,
                default: 3000
            },
            /** ITI */
            ITI: {
                type: jspsych.ParameterType.INT,
                default: 300
            },
        },
        data: {
            /** Value of left-hand side feedback. */
            feedback_left: {
                type: jspsych.ParameterType.FLOAT,
            },
            /** Value of left-hand side feedback. */
            feedback_right: {
                type: jspsych.ParameterType.FLOAT,
            },
            /** The participants' response (left or right) */
            response: {
                type: jspsych.ParameterType.STRING
            },
            /** Reaction time */
            rt: {
                type: jspsych.ParameterType.INT
            },
            /** Presented feedback */
            chosen_feedback: {
                type: jspsych.ParameterType.FLOAT
            },
            /** Whther optimal option chosen */
            response_optimal: {
                type: jspsych.ParameterType.BOOL
            }
        },
    };

  /**
   * **reversal**
   *
   * jsPysch plugin to dispaly a reversal learning task trial, with two squirrels in a forest, a choice of one of the results in the squirrel tossing a coin.
   *
   * @author {Yaniv Abir}
   */
    class ReversalPlugin {
        constructor(jsPsych) {
            this.jsPsych = jsPsych;
            this.keys = {
                'arrowleft':'left',
                'arrowright': 'right',
            }
        }

        // Trial procedure
        trial(display_element, trial) {
            
            // Placeholder for response data
            var response = {
                rt: null,
                key: null
            };
        
            // Create stimuli
            display_element.innerHTML = this.create_stimuli(trial);

            // Trial end procedure
            const end_trial = () => {

                // Remove keayboard listener
                this.jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener);

                // Create trial dta to be saved
                var trial_data = {
                    feedback_left: trial.feedback_left, 
                    feedback_right: trial.feedback_right,
                    optimal_right: trial.optimal_right,
                    rt: response.rt,
                    response: this.keys[response.key.toLowerCase()]
                };

                // Add optimality and presented feedback to trial data
                if (trial_data.response == null){
                    trial_data.response_optimal = null;
                    trial_data.chosen_feedback = null;
                }else{
                    trial_data.response_optimal = trial.optimal_right ? trial_data.response == "right" : trial_data.response == "left";
                    trial_data.chosen_feedback = trial_data.response == "right" ? trial.feedback_right : trial.feedback_left;
                }
                

                // Tell jsPsych to finish trial and pass data
                this.jsPsych.finishTrial(trial_data);
            };

            // ITI blur
            var ITI = () => {
                const bg = document.getElementById(`rev-squirrel-bg`);

                const fg = document.getElementById(`rev-squirrel-fg`);

                bg.animate([
                    { filter: "blur(0)", opacity: "1" },
                    { filter: "blur(2px)", opacity: "0"},
                ],{duration:50,iterations:1,fill:'forwards'});

                fg.style.opacity = '0';

                const coin_right = document.getElementById("rev-coin-right");

                const coin_left = document.getElementById("rev-coin-left");

                coin_right.style.opacity = '0';

                coin_left.style.opacity = '0';

                this.jsPsych.pluginAPI.setTimeout(end_trial, trial.ITI);
            }

            // Post response procedure
            var after_response = (resp) => {

                // If this is the first response, update response
                if (response.key == null) {
                    response = resp;
                }

                var chosen_side = this.keys[response.key.toLowerCase()];
                
                this.triggerCoinAnimation(chosen_side);
                
                this.jsPsych.pluginAPI.setTimeout(ITI, trial.animation_duration);

            };

            // Set up keyboard response listener
            var keyboardListener = this.jsPsych.pluginAPI.getKeyboardResponse({
                callback_function: after_response,
                valid_responses: trial.choices,
                rt_method: "performance",
                persist: false,
                allow_held_key: false
            });
            
        }

        // Create stimuli
        create_stimuli(trial) {

            let stimulus = `
                <div class="rev-squirrel-empty">
                    <img id="rev-squirrel-empty" src="imgs/squirrels_empty.png"></img>
                </div>
                <div class="rev-squirrel-bg">
                    <img id="rev-squirrel-bg" src="imgs/squirrels_bg.png"></img>
                </div>
                <div id='rev-coin-left' class="rev-coin-side">
                    <img id="rev-coin-left" src="imgs/${trial.coin_images[trial.feedback_left]}"></img>
                </div>
                <div id='rev-coin-right' class="rev-coin-side">
                    <img id="rev-coin-right" src="imgs/${trial.coin_images[trial.feedback_right]}"></img>
                </div>
                <div class="rev-squirrel-fg">
                    <img id="rev-squirrel-fg" src="imgs/squirrels_fg.png"></img>
                </div>
            `
            
            return '<div class="reversal-stimuli">' + stimulus + "</div>";
        }

        // Trigger animation
        // Function to trigger the animation
        triggerCoinAnimation(side) {
            const coinElement = document.getElementById(`rev-coin-${side}`);
            
            // Remove the class to reset the animation
            coinElement.classList.remove(`rev-coin-${side}-animate`);

            // Trigger reflow (essential for restarting CSS animations)
            void coinElement.offsetWidth; 
            
            // Add the class to start the animation
            coinElement.classList.add(`rev-coin-${side}-animate`);
        }

        create_simulation_data(trial, simulation_options) {

            // Define default simulated values
            let default_data = {
                feedback_right: trial.feedback_right,
                feedback_left: trial.feedback_left,
                rt: this.jsPsych.randomization.sampleExGaussian(500, 50, 1 / 150, true),
                key: this.jsPsych.pluginAPI.getValidKey(trial.choices).toLowerCase()
            };

            // Compute chosen_feedback and response_optimal
            default_data.response = this.keys[default_data.key];

            default_data.chosen_feedback = default_data.response == "right" ? trial.feedback_right : trial.feedback_left;

            default_data.response_optimal = trial.optimal_right ? default_data.response == "right" : default_data.response == "left";

            const data = this.jsPsych.pluginAPI.mergeSimulationData(default_data, simulation_options);
            this.jsPsych.pluginAPI.ensureSimulationDataConsistency(trial, data);
            return data;
        }

        simulate(trial, simulation_mode, simulation_options, load_callback) {
            if (simulation_mode == "data-only") {
                load_callback();
                this.simulate_data_only(trial, simulation_options);
            }
            if (simulation_mode == "visual") {
                this.simulate_visual(trial, simulation_options, load_callback);
            }
        }      

        simulate_data_only(trial, simulation_options) {
            const data = this.create_simulation_data(trial, simulation_options);
            this.jsPsych.finishTrial(data);
        }

        simulate_visual(trial, simulation_options, load_callback) {
            const data = this.create_simulation_data(trial, simulation_options);
            console.log(data)
            const display_element = this.jsPsych.getDisplayElement();
            this.trial(display_element, trial);
            load_callback();
            if (data.rt !== null) {
                this.jsPsych.pluginAPI.pressKey(data.key, data.rt);
            }
        }
    }
    ReversalPlugin.info = info;

    return ReversalPlugin;
})(jsPsychModule);