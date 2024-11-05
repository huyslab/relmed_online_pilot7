/*
 * Adapted from Jiazhou Chen's gambling task
 *
 * Modified and used by zeguo.qiu@ucl.ac.uk
 *
 * Version 0.2 - adding Pavlovian stimuli learning - Haoyang
 * 
 * Version 1.0 - modified by Yaniv
 */

jsPsychPILT = (function(jspsych) {

    const info = {
        name: 'PILT',
        description: '',
        version: "1.0",
        parameters: {
            stimulus_left: {
                type: jspsych.ParameterType.STRING,
                pretty_name: 'Left Image',
                default: '',
            },
            stimulus_right: {
                type: jspsych.ParameterType.STRING,
                pretty_name: 'Right Image',
                default: '',
            },
            feedback_left: {
                type: jspsych.ParameterType.STRING,
                pretty_name: 'Left Outcome',
                default: '',
            },
            feedback_right: {
                type: jspsych.ParameterType.STRING,
                pretty_name: 'Right Outcome',
                default: '',
            },
            optimal_right: {
                type: jspsych.ParameterType.INT,
                pretty_name: 'Is the optimal stimulus on the right?',
                default: '',
            },
            // Response deadline
            response_deadline: {
                type: jspsych.ParameterType.INT,
                default: 3000,
            },
            // Duration of coin presentation
            feedback_duration: {
                type: jspsych.ParameterType.INT,
                default: 1000
            },
            /** Duration of warning message */
            warning_duration: {
                type: jspsych.ParameterType.INT,
                default: 1500
            },
            /** Duration of choice feedback before flip */
            choice_feedback_duration: {
                type: jspsych.ParameterType.INT,
                default: 500
            },
            /** Duration of Pavlovian stimulus presentation before flip */
            pavlovian_stimulus_duration: {
                type: jspsych.ParameterType.INT,
                default: 300
            },
            /** Coin image filenames */
            coin_images: {
                type: jspsych.ParameterType.OBJECT,
                default: {
                    0.01: "1penny.png",
                    1.0: "1pound.png",
                    0.5: "50pence.png",
                    "-0.01": "1pennybroken.png",
                    "-1.0": "1poundbroken.png",
                    "-0.5": "50pencebroken.png"
                },
            },
            /** Coin image filenames */
            pavlovian_images: {
                type: jspsych.ParameterType.OBJECT,
                default: {
                    0.01: "marble3.png",
                    1.0: "marble1.png",
                    0.5: "marble2.png",
                    "-0.01": "marble6.png",
                    "-1.0": "marble4.png",
                    "-0.5": "marble5.png"
                },
            } 
        },
        data: {
            response: {
              type: jspsych.ParameterType.STRING,
              pretty_name: 'Chosen side (left or right)'
            },
            key: {
              type: jspsych.ParameterType.STRING,
              pretty_name: 'Key pressed (left or right arrow key)'
            },
            stimulus_left: {
              type: jspsych.ParameterType.STRING,
              pretty_name: 'Image shown on the left'
            },
            stimulus_right: {
              type: jspsych.ParameterType.STRING,
              pretty_name: 'Image shown on the right'
            },
            feedback_left: {
              type: jspsych.ParameterType.FLOAT,
              pretty_name: 'Outcome associated with the left image'
            },
            feedback_right: {
              type: jspsych.ParameterType.FLOAT,
              pretty_name: 'Outcome associated with the right image'
            },
            optimal_right: {
              type: jspsych.ParameterType.INT,
              pretty_name: 'Whether the right image is optimal (1 for yes, 0 for no)'
            },
            chosen_stimulus: {
              type: jspsych.ParameterType.STRING,
              pretty_name: 'The chosen image (left or right)'
            },
            chosen_feedback: {
              type: jspsych.ParameterType.FLOAT,
              pretty_name: 'The outcome associated with the chosen image'
            },
            rt: {
              type: jspsych.ParameterType.FLOAT,
              pretty_name: 'Reaction time'
            },
            response_optimal: {
              type: jspsych.ParameterType.BOOL,
              pretty_name: 'Whether the response was optimal'
            }
        }
    }

    class PILTPlugin {
        constructor(jsPsych) {
            this.jsPsych = jsPsych;

            // Data placeholder
            this.data = {
                response:'',
                key: '',
                stimulus_left: '',
                stimulus_right: '',
                feedback_left: '',
                feedback_right: '',
                chosen_stimulus: '',
                chosen_feedback: '',
                rt: ''
            }

            // Key dictionary
            this.keys = {
                'arrowleft': 'left',
                'arrowright': 'right',
            }
        }

        // Trial function
        trial(display_element, trial) {

            // Convenience variable
            this.contingency = {
                img: [trial.stimulus_left, trial.stimulus_right],
                outcome: [trial.feedback_left, trial.feedback_right],
            }

            // Set data values
            this.data.stimulus_left = this.contingency.img[0]
            this.data.stimulus_right = this.contingency.img[1]
            this.data.feedback_left = this.contingency.outcome[0]
            this.data.feedback_right = this.contingency.outcome[1]
            this.data.optimal_right = trial.optimal_right

            // Create stimuli
            display_element.innerHTML = this.create_stimuli()

            // Keyboard listener
            this.jsPsych.pluginAPI.getKeyboardResponse({
                callback_function: this.keyResponse,
                valid_responses: Object.keys(this.keys),
                rt_method: 'performance',
                persist: false,
                allow_held_key: false
            });

            // Set listener for response_deadline
            if (trial.response_deadline > 0) {
                this.jsPsych.pluginAPI.setTimeout(() => {
                    this.keyResponse('')
                }, trial.response_deadline);
            }
        }

        // Simulation method
        simulate(trial, simulation_mode, simulation_options, load_callback) {
            if (simulation_mode == "data-only") {
                load_callback();
                this.simulate_data_only(trial, simulation_options);
            }
            if (simulation_mode == "visual") {
                this.simulate_visual(trial, simulation_options, load_callback);
            }
        }

        // Create simulated data
        create_simulation_data(trial, simulation_options) {
            let default_data = {
                key: this.jsPsych.pluginAPI.getValidKey(Object.keys(this.keys)),
                stimulus_left: trial.stimulus_left,
                stimulus_right: trial.stimulus_right,
                feedback_left: trial.feedback_left,
                feedback_right: trial.feedback_right,
                optimal_right: trial.optimal_right,
                rt: this.jsPsych.randomization.sampleExGaussian(500, 50, 1 / 150, true),
            };

            const optimalSide = default_data.optimal_right == 1 ? 'right' : 'left'
            default_data.response = this.keys[default_data.key]
            default_data.response_optimal = default_data.response === optimalSide
            default_data.chosen_stimulus = default_data.response === "right" ? default_data.stimulus_right : default_data.stimulus_left
            default_data.chosen_feedback = default_data.response === "right" ? default_data.feedback_right : default_data.feedback_left


            const data = this.jsPsych.pluginAPI.mergeSimulationData(default_data, simulation_options);
            this.jsPsych.pluginAPI.ensureSimulationDataConsistency(trial, data);
            return data;
        }

        // Data only simulation function
        simulate_data_only(trial, simulation_options) {
            const data = this.create_simulation_data(trial, simulation_options);
            this.jsPsych.finishTrial(data);
        }

        // Visual simulation function
        simulate_visual(trial, simulation_options, load_callback) {
            const data = this.create_simulation_data(trial, simulation_options);
            const display_element = this.jsPsych.getDisplayElement();
            this.trial(display_element, trial);
            load_callback();
            if (data.rt !== null) {
                this.jsPsych.pluginAPI.pressKey(data.key, data.rt);
            }
        }

        // Stimuli creation
        create_stimuli() {
            let html = ''
            html += `
            <body>
                    <div id="PILTOptionBox" class="PILTOptionBox">
                        <div id='left' class="PILTOptionSide">
                            <img id='PILTLeftImg' src=${this.contingency.img[0]}></img> 
                        </div>
                        <div class="PILTHelperTxt">
                            <h2 id="centerTxt">?</h2>
                        </div>
                        <div id='right' class="PILTOptionSide">
                            <img id='PILTRightImg' src=${this.contingency.img[1]}></img>
                        </div>
                    </div>
            </body>
            `
            return html
        }

        keyResponse = (e) => {
            this.jsPsych.pluginAPI.cancelAllKeyboardResponses()
            this.jsPsych.pluginAPI.clearAllTimeouts()
            this.data.keyPressOnset = performance.now()

            if (e !== '') {
                // if there is a response:
                this.data.key = e.key.toLowerCase()
                this.data.response = this.keys[e.key.toLowerCase()]
                const inverse_response = this.data.response==='left'?'right':'left'
                this.data.rt = e.rt

                if (this.data.response === 'left') {
                    this.data.chosen_stimulus = this.contingency.img[0]
                    this.data.chosen_feedback = this.contingency.outcome[0]

                } else if (this.data.response === 'right') {
                    this.data.chosen_stimulus = this.contingency.img[1]
                    this.data.chosen_feedback = this.contingency.outcome[1]
                }

                // draw selection box:
                const selImg = document.getElementById(this.data.response + 'Img')
                selImg.style.border = '20px solid darkgrey'
                document.getElementById('centerTxt').innerText = ''

                const coin = document.createElement('img')
                coin.id = 'PILTCoin'
                coin.className = 'PILTCoin'

                const coinCircle = document.createElement('div')
                coinCircle.id = 'PILTCoinCircle'
                coinCircle.className = 'PILTCoinCircle'

                const coinBackground = document.createElement('img')
                coinBackground.id = '"PILTCoinBackground"'
                coinBackground.className = '"PILTCoinBackground"'

                coin.src = `imgs/${this.trial.coin_images[this.data.chosen_feedback]}`;
                coinBackground.src = `imgs/${this.trial.pavlovian_images[this.data.chosen_feedback]}`;

                document.getElementById(this.data.response).appendChild(coinBackground)
                document.getElementById(this.data.response).appendChild(coinCircle)
                document.getElementById(this.data.response).appendChild(coin)

                this.jsPsych.pluginAPI.setTimeout(()=> {
                    document.getElementById(inverse_response+'Img').style.opacity = '0'
                    const ani1 = selImg.animate([
                        { transform: "rotateY(0)", visibility: "visible" },
                        { transform: "rotateY(90deg)", visibility: "hidden"},
                    ],{duration:100,iterations:1,fill:'forwards'})

                    ani1.finished.then(()=> {

                        const ani2 = coinBackground.animate([
                            { transform: "rotateY(90deg)", visibility: "hidden" },
                            { transform: "rotateY(0deg)", visibility: "visible" },
                        ], { duration: 100, iterations: 1, fill: 'forwards' });

                        ani2.finished.then(() => {
                            this.jsPsych.pluginAPI.setTimeout(()=> {
                                coin.style.visibility = 'visible'
                                this.jsPsych.pluginAPI.setTimeout(this.endTrial, this.trial.feedback_duration);
                            },this.trial.pavlovian_stimulus_duration)
                        });
                    })
                },this.trial.choice_feedback_duration)
            } else {
                // no response
                this.data.response = 'noresp'

                // Set outcome to lowest possible on trial
                this.data.chosen_feedback = Math.min(this.data.feedback_left, this.data.feedback_right)

                // Display messge
                document.getElementById('centerTxt').innerText = 'Please respond more quickly!'


                this.jsPsych.pluginAPI.setTimeout(this.endTrial, (this.trial.warning_duration))
            }
        }

        endTrial = () => {
            // clear the display
            let optionBox = document.getElementById("PILTOptionBox");
            optionBox.style.display = 'none';

            const optimalSide = this.data.optimal_right == 1 ? 'right' : 'left'
            this.data.response_optimal = this.data.response === optimalSide
            this.jsPsych.pluginAPI.cancelAllKeyboardResponses()
            this.jsPsych.pluginAPI.clearAllTimeouts()
            this.jsPsych.finishTrial(this.data)

        }
    }
    PILTPlugin.info = info;

    return PILTPlugin;
})(jsPsychModule);


