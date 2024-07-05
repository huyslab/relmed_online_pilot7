/*
 * Adapted from Jiazhou Chen's gambling task
 *
 * Modified and used by zeguo.qiu@ucl.ac.uk
 *
 */

jsPsychPLT = (function(jspsych) {

    const info = {
        name: 'PLT',
        description: '',
        parameters: {
            imgLeft: {
                type: jspsych.ParameterType.STRING,
                pretty_name: 'Left Image',
                default: '',
            },
            imgRight: {
                type: jspsych.ParameterType.STRING,
                pretty_name: 'Right Image',
                default: '',
            },
            outcomeLeft: {
                type: jspsych.ParameterType.STRING,
                pretty_name: 'Left Outcome',
                default: '',
            },
            outcomeRight: {
                type: jspsych.ParameterType.STRING,
                pretty_name: 'Right Outcome',
                default: '',
            },
            optimalRight: {
                type: jspsych.ParameterType.INT,
                pretty_name: 'Is the optimal stimulus on the right?',
                default: '',
            },
            maxRespTime: {
                type: jspsych.ParameterType.INT,
                default: 3000,
            }
        }
    }

    class PLTPlugin {
        constructor(jsPsych) {
            this.jsPsych = jsPsych;
            this.timing = {
                maxRespTime: this.trial.maxRespTime,
                fbDur: 1000,
                deadlineDur: 1500,
                flipFb: 500,
            }
            this.data = {
                choice:'',
                key: '',
                imageLeft: '',
                imageRight: '',
                outcomeLeft: '',
                outcomeRight: '',
                optimalSide: '',
                chosenImg: '',
                chosenOutcome: '',
                rt: '',
                trialphase: 'task',
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

            this.data.initTime = performance.now()

            this.contingency = {
                img: [trial.imgLeft, trial.imgRight],
                outcome: [trial.outcomeLeft,trial.outcomeRight],
            }
            this.data.imageLeft = this.contingency.img[0]
            this.data.imageRight = this.contingency.img[1]
            this.data.outcomeLeft = this.contingency.outcome[0]
            this.data.outcomeRight = this.contingency.outcome[1]
            this.data.optimalRight = trial.optimalRight

            display_element.innerHTML = this.initGamPage()

            this.jsPsych.pluginAPI.getKeyboardResponse({
                callback_function: this.keyResponse,
                valid_responses: Object.keys(this.keys),
                rt_method: 'performance',
                persist: false,
                allow_held_key: false
            });

            if (trial.maxRespTime > 0) {
                this.jsPsych.pluginAPI.setTimeout(() => {
                    this.keyResponse('')
                }, trial.maxRespTime);
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
                    display: flex;
                    flex-direction: column;
                    height: 70vh;
                    width: 30vw;
                    max-width: 465px;
                    
                }
                
                .optionSide img {
                    height: auto;
                    width: 25vw;
                    max-width: 230px;
                    flex-direction: column;
                    margin: auto;
                }

                #rightImg, #leftImg {
                    border: 1px solid darkgrey;
                }
                
                .helperTxt {
                    display: flex;
                    justify-content: space-around;
                    margin: auto;
                    width: 10vw;
                    max-width: 150px;
                    
                    text-wrap: normal;
                    font-size: 1.5rem;
                    font-weight: bold;
                    line-height: 3rem;
                }
                
                .coin {
                    display: none;
                    max-width: 15vw;
                    margin: auto;
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

        keyResponse(e) {
            this.jsPsych.pluginAPI.cancelAllKeyboardResponses()
            this.jsPsych.pluginAPI.clearAllTimeouts()
            this.data.keyPressOnset = performance.now()

            if (e !== '') {
                // if there is a response:
                this.data.key = e.key.toLowerCase()
                this.data.choice = this.keys[e.key.toLowerCase()]
                const inverse_choice = this.data.choice==='left'?'right':'left'
                this.data.rt = e.rt

                if (this.data.choice === 'left') {
                    this.data.chosenImg = this.contingency.img[0]
                    this.data.chosenOutcome = this.contingency.outcome[0]

                } else if (this.data.choice === 'right') {
                    this.data.chosenImg = this.contingency.img[1]
                    this.data.chosenOutcome = this.contingency.outcome[1]
                }

                // draw selection box:
                const selImg = document.getElementById(this.data.choice + 'Img')
                selImg.style.border = '20px solid darkgrey'
                document.getElementById('centerTxt').innerText = ''

                const coin = document.createElement('img')
                coin.id = 'coin'
                coin.className = 'coin'
                if (this.data.chosenOutcome === 1) {
                    coin.src = 'imgs/1pound.png'
                } else if (this.data.chosenOutcome === 0.5) {
                    coin.src = 'imgs/50pence.png'
                } else if (this.data.chosenOutcome === 0.01) {
                    coin.src = 'imgs/1penny.png'
                } else if (this.data.chosenOutcome === -1) {
                    coin.src = 'imgs/1poundbroken.png'
                } else if (this.data.chosenOutcome === -0.5) {
                    coin.src = 'imgs/50pencebroken.png'
                } else if (this.data.chosenOutcome === -0.01) {
                    coin.src = 'imgs/1pennybroken.png'
                }

                document.getElementById(this.data.choice).appendChild(coin)

                this.jsPsych.pluginAPI.setTimeout(()=> {
                    document.getElementById(inverse_choice+'Img').style.opacity = '0'
                    const ani1 = selImg.animate([
                        { transform: "rotateY(0)", display: "inline"},
                        { transform: "rotateY(90deg)", display: "none" },
                    ],{duration:250,iterations:1,fill:'forwards'})

                    ani1.finished.then(()=> {

                        const ani2 = coin.animate([
                            { transform: "rotateY(90deg)", display: "none"},
                            { transform: "rotateY(0deg)", display: "inline" },
                        ],{duration:250,iterations:1,fill:'forwards'})
                        ani2.finished.then(()=> {
                            this.jsPsych.pluginAPI.setTimeout(this.endTrial, (this.timing.fbDur))
                        })
                    })
                },this.timing.flipFb)
            } else {
                // no response
                this.data.choice = 'noresp'

                // Set outcome to lowest possible on trial
                this.data.chosenOutcome = Math.min(this.data.outcomeLeft, this.data.outcomeRight)

                // Display messge
                document.getElementById('centerTxt').innerText = 'Please respond more quickly!'


                this.jsPsych.pluginAPI.setTimeout(this.endTrial, (this.timing.deadlineDur))
            }
        }

        endTrial() {
            this.data.optimalSide = this.data.optimalRight == 1 ? 'right' : 'left'
            this.data.isOptimal = this.data.choice === this.data.optimalSide
            this.data.endTime = performance.now()
            this.data.duration = this.data.endTime - this.data.initTime
            this.jsPsych.pluginAPI.cancelAllKeyboardResponses()
            this.jsPsych.pluginAPI.clearAllTimeouts()
            this.jsPsych.finishTrial(this.data)
        }
    }
    PLTPlugin.info = info;

    return PLTPlugin;
})(jsPsychModule);


