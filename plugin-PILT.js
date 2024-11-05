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
            response_optimalline: {
                type: jspsych.ParameterType.INT,
                default: 3000,
            },
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
            this.data = {
                response:'',
                key: '',
                stimulus_left: '',
                stimulus_right: '',
                feedback_left: '',
                feedback_right: '',
                optimalSide: '',
                chosen_stimulus: '',
                chosen_feedback: '',
                rt: ''
            }
            this.keys = {
                'arrowleft':'left',
                'arrowright': 'right',
            }
        }

        trial(display_element, trial) {
            this.jsPsych.pluginAPI.clearAllTimeouts()
            this.jsPsych.pluginAPI.cancelAllKeyboardResponses()
            window.onbeforeunload = function () {
                window.scrollTo(0, 0);
            }

            this.contingency = {
                img: [trial.stimulus_left, trial.stimulus_right],
                outcome: [trial.feedback_left,trial.feedback_right],
            }
            this.data.stimulus_left = this.contingency.img[0]
            this.data.stimulus_right = this.contingency.img[1]
            this.data.feedback_left = this.contingency.outcome[0]
            this.data.feedback_right = this.contingency.outcome[1]
            this.data.optimal_right = trial.optimal_right

            display_element.innerHTML = this.initGamPage()

            this.jsPsych.pluginAPI.getKeyboardResponse({
                callback_function: this.keyResponse,
                valid_responses: Object.keys(this.keys),
                rt_method: 'performance',
                persist: false,
                allow_held_key: false
            });

            if (trial.response_deadline > 0) {
                this.jsPsych.pluginAPI.setTimeout(() => {
                    this.keyResponse('')
                }, trial.response_deadline);
            }
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

            default_data.optimalSide = default_data.optimal_right == 1 ? 'right' : 'left'
            default_data.response = this.keys[default_data.key]
            default_data.response_optimal = default_data.response === default_data.optimalSide
            default_data.chosen_stimulus = default_data.response === "right" ? default_data.stimulus_right : default_data.stimulus_left
            default_data.chosen_feedback = default_data.response === "right" ? default_data.feedback_right : default_data.feedback_left


            const data = this.jsPsych.pluginAPI.mergeSimulationData(default_data, simulation_options);
            this.jsPsych.pluginAPI.ensureSimulationDataConsistency(trial, data);
            return data;
        }
        simulate_data_only(trial, simulation_options) {
            const data = this.create_simulation_data(trial, simulation_options);
            this.jsPsych.finishTrial(data);
        }
        simulate_visual(trial, simulation_options, load_callback) {
            const data = this.create_simulation_data(trial, simulation_options);
            const display_element = this.jsPsych.getDisplayElement();
            this.trial(display_element, trial);
            load_callback();
            if (data.rt !== null) {
                this.jsPsych.pluginAPI.pressKey(data.key, data.rt);
            }
        }

        initGamPage() {
            let html = ''
            html += `
            <style>
                div {
                    border: 0px solid #73AD21;
                }

                .optionBox {
                    margin: auto;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                }
                
                .optionSide {
                    display: grid;
                    flex-direction: column;
                    height: 70vh;
                    width: 25vw;
                    max-width: 1000px;
                    position: relative;
                    justify-content: center;
                }
                
                .optionSide img {
                    height: auto;
                    width: 20vw;
                    max-width: 500px;
                   /* flex-direction: column;*/
                    margin: auto;
                    grid-column: 1;
                    grid-row: 1;
                }

                #rightImg, #leftImg {
                    border: 1px solid darkgrey;
                }
                
                .helperTxt {
                    display: flex;
                    justify-content: space-around;
                    margin: auto;
                    width: 12vw;
                    max-width: 325px;
                    
                    text-wrap: normal;
                    font-size: 1.5rem;
                    font-weight: bold;
                    line-height: 3rem;
                }
                
                .coin {
                    visibility: hidden;
                    max-width: 12vw;
                    margin: auto;
                    z-index: 3;
                }

                .optionSide .coinCircle {
                    visibility: hidden;
                    height: 21vw;
                    width: 21vw;
                    max-width: 500px;
                    margin: auto;
                    grid-column: 1;
                    grid-row: 1;
                    background-color: white;
                    border-radius: 50%;
                    z-index: 2;
                }

                .optionSide img.coinBackground {
                    visibility: hidden;
                    width: 30vw;
                    z-index: 1;
                }
                
            </style>
            <body>
                    <div id="optionBox" class="optionBox">
                        <div id='left' class="optionSide">
                            <img id='leftImg' src=${this.contingency.img[0]}></img> 
                        </div>
                        <div class="helperTxt">
                            <h2 id="centerTxt">?</h2>
                        </div>
                        <div id='right' class="optionSide">
                            <img id='rightImg' src=${this.contingency.img[1]}></img>
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
                coin.id = 'coin'
                coin.className = 'coin'

                const coinCircle = document.createElement('div')
                coinCircle.id = 'coinCircle'
                coinCircle.className = 'coinCircle'

                const coinBackground = document.createElement('img')
                coinBackground.id = 'coinBackground'
                coinBackground.className = 'coinBackground'

                if (this.data.chosen_feedback === 1) {
                    coin.src = 'imgs/1pound.png'
                    coinBackground.src = "imgs/marble1.png"
                } else if (this.data.chosen_feedback === 0.5) {
                    coin.src = 'imgs/50pence.png'
                    coinBackground.src = "imgs/marble2.png"
                } else if (this.data.chosen_feedback === 0.01) {
                    coin.src = 'imgs/1penny.png'
                    coinBackground.src = "imgs/marble3.png"
                } else if (this.data.chosen_feedback === -1) {
                    coin.src = 'imgs/1poundbroken.png'
                    coinBackground.src = "imgs/marble4.png"
                } else if (this.data.chosen_feedback === -0.5) {
                    coin.src = 'imgs/50pencebroken.png'
                    coinBackground.src = "imgs/marble5.png"
                } else if (this.data.chosen_feedback === -0.01) {
                    coin.src = 'imgs/1pennybroken.png'
                    coinBackground.src = "imgs/marble6.png"
                }

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
            let optionBox = document.getElementById("optionBox");
            optionBox.style.display = 'none';

            this.data.optimalSide = this.data.optimal_right == 1 ? 'right' : 'left'
            this.data.response_optimal = this.data.response === this.data.optimalSide
            this.jsPsych.pluginAPI.cancelAllKeyboardResponses()
            this.jsPsych.pluginAPI.clearAllTimeouts()
            this.jsPsych.finishTrial(this.data)

        }
    }
    PILTPlugin.info = info;

    return PILTPlugin;
})(jsPsychModule);


