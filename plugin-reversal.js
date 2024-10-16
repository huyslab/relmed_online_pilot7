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
                default: 900
            },
            /** Duration of coin toss animation in ms */
            response_deadline: {
                type: jspsych.ParameterType.INT,
                default: 3000
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
            /** Presented outcome */
            chosen_outcome: {
                type: jspsych.ParameterType.FLOAT
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
                    rt: response.rt,
                    response: response.key
                };

                // Tell jsPsych to finish trial and pass data
                this.jsPsych.finishTrial(trial_data);
            };

            // Post response procedure
            var after_response = (resp) => {

                // If this is the first response, update response
                if (response.key == null) {
                    response = resp;
                }
                end_trial();
            };

            // Set up keyboard response listener
            var keyboardListener = this.jsPsych.pluginAPI.getKeyboardResponse({
                callback_function: after_response,
                valid_responses: trial.choices,
                rt_method: "performance",
                persist: false,
                allow_held_key: false
            });
            
            // end trial
            this.jsPsych.finishTrial(trial_data);
        }

        // Create stimuli
        create_stimuli(trial) {

            let stimulus = `
                <div class="squirrel_bg">
                    <img id="squirrel_bg" src="imgs/squirrel_bg.png"></img>
                </div>
                <div class="coins">
                    <div id='coin_left' class="coin_side">
                        <img id="coin_left" src="imgs/${trial.coin_images[trial.feedback_left]}.png"></img>
                    </div>
                    <div id='coin_right' class="coin_side">
                        <img id="coin_right" src="imgs/${trial.coin_images[trial.feedback_right]}.png"></img>
                    </div>
                </div>
                <div class="squirrel_fg">
                    <img id="squirrel_fg" src="imgs/squirrel_fg.png"></img>
                </div>
            `
            
            return '<div id="reversal-stimulus">' + stimulus + "</div>";
        }
    }
    ReversalPlugin.info = info;

    return ReversalPlugin;
})(jsPsychModule);