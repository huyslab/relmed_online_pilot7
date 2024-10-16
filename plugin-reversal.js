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
            /** Presented feedback */
            chosen_feedback: {
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
            
        }

        // Create stimuli
        create_stimuli(trial) {

            let stimulus = `
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
    }
    ReversalPlugin.info = info;

    return ReversalPlugin;
})(jsPsychModule);