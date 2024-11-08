// Function setting up PILT blocks
window.defaul_response_deadline = 3000;
window.pilt_test_confidence_every = 4;

window.skipThisBlock = false;

// Message between blocks
const inter_block_msg = {
    type: jsPsychHtmlKeyboardResponse,
    choices: () => {

        const n_stimuli = jsPsych.data.get().filter({ trial_type: "PILT" }).last(1).select("n_stimuli").values[0];

        return n_stimuli === 2 ? ['arrowright', 'arrowleft'] : ['arrowright', 'arrowleft', 'arrowup']
    },
    css_classes: ['instructions'],
    stimulus: inter_block_stimulus,
    data: {
        trialphase: "inter_block",
    },
    on_start: saveDataREDCap,
    on_finish: () => { window.skipThisBlock = false }
}

// Post-PILT test trial
const id_from_stimulus = () => {
    const is_pit = jsPsych.evaluateTimelineVariable('stimulus_left').includes("PIT");

    return is_pit ? "imgPIT" : "imgPILT"
}

const test_trial = {
    timeline: [
        kick_out,
        fullscreen_prompt,
        // Test trial
        {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: () => {
                return `<style>
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

                #imgPILT, #imgPIT {
                    border: 1px solid darkgrey;
                }

                #imgPIT{
                    transform: scale(1.5);             
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
                }
                
            </style>
            <div id="optionBox" class="optionBox">
                <div id='left' class="optionSide">
                    <img id='${id_from_stimulus()}' src=${jsPsych.evaluateTimelineVariable('stimulus_left')}></img> 
                </div>
                <div class="helperTxt">
                    <p2 id="centerTxt">?</p2>
                </div>
                <div id='right' class="optionSide">
                    <img id='${id_from_stimulus()}' src=${jsPsych.evaluateTimelineVariable('stimulus_right')}></img>
                </div>
            </div>`
            },
            choices: ["ArrowRight", "ArrowLeft"],
            trial_duration: 4000,
            data: {
                trialphase: "PILT_test",
                block: jsPsych.timelineVariable("block"),
                trial: jsPsych.timelineVariable("trial"),
                stimulus_left: jsPsych.timelineVariable("stimulus_left"),
                stimulus_right: jsPsych.timelineVariable("stimulus_right"),
                same_valence: jsPsych.timelineVariable("same_valence"),
                same_block: jsPsych.timelineVariable("same_block"),
                magnitude_left: jsPsych.timelineVariable("magnitude_left"),
                magnitude_right: jsPsych.timelineVariable("magnitude_right"),
                original_block_left: jsPsych.timelineVariable("original_block_left"),
                original_block_right: jsPsych.timelineVariable("original_block_right"),

            }
        },
        // Timeout message
        {
            timeline: [
                {
                    type: jsPsychHtmlKeyboardResponse,
                    data: {
                        trialphase: "PILT_test_timeout"
                    },
                    stimulus: () => {
                        return `<style>
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
        
                        #imgPILT, #imgPIT {
                            border: 1px solid darkgrey;
                        }

                        #imgPIT{
                            transform: scale(1.5);             
                        }         

                        .helperTxt {
                            display: flex;
                            justify-content: space-around;
                            margin: auto;
                            width: 12vw;
                            max-width: 325px;
                            background-color: rgba(255, 255, 255, 0.5);
                            text-wrap: normal;
                            font-size: 1.5rem;
                            font-weight: bold;
                            line-height: 3rem;
                            z-index: 10
                        }
                        
                        .coin {
                            visibility: hidden;
                            max-width: 12vw;
                            margin: auto;
                        }
                        
                    </style>
                    <div id="optionBox" class="optionBox">
                        <div id='left' class="optionSide">
                            <img id='${id_from_stimulus()}' src=${jsPsych.evaluateTimelineVariable('stimulus_left')}></img> 
                        </div>
                        <div class="helperTxt">
                            <p id="centerTxt">Please respond more quickly!</p>
                        </div>
                        <div id='right' class="optionSide">
                            <img id='${id_from_stimulus()}' src=${jsPsych.evaluateTimelineVariable('stimulus_right')}></img>
                        </div>
                    </div>`
                    },
                    choices: "NO_KEYS",
                    trial_duration: 1500
                }
            ],
            conditional_function: () => {
                let missed = jsPsych.data.get().filter({
                    trialphase: "PILT_test"
                }).last(1).select("response").values[0] == null

                if (missed) {
                    // Update warning count
                    var up_to_now = parseInt(jsPsych.data.get().last(1).select('n_warnings').values);
                    jsPsych.data.addProperties({
                        n_warnings: up_to_now + 1
                    });
                }

                return missed
            }
        },
        {
            type: jsPsychHtmlKeyboardResponse,
            choices: "NO_KEYS",
            stimulus: "",
            data: {
                trialphase: "PILT_test_ITI"
            },
            trial_duration: 0,
            post_trial_gap: 600
        },
        {
            timeline: [
                {
                    type: jsPsychHtmlButtonResponse,
                    stimulus: '<p>How confident are you that your last choice was correct?</p>',
                    choices: ["1<br>Not at all", "2", "3", "4", "5<br>Very confident"],
                    data: {
                        trialphase: "pilt_confidence"
                    }
                }
            ],
            conditional_function: () => {
                let missed = jsPsych.data.get().filter({
                    trialphase: "PILT_test"
                }).last(1).select("response").values[0] == null

                let n_trials = jsPsych.data.get().filter({
                    trialphase: "PILT_test"
                }).count()

                return !missed && ((n_trials % window.pilt_test_confidence_every) === (window.pilt_test_confidence_every - 1))
            },
            post_trial_gap: 800
        }
    ]
};

// Post-PILT test confidence trial

// Build post_PILT test block
function build_post_PILT_test(structure) {

    // Preload images
    let test = [
        {
            type: jsPsychPreload,
            images: structure[1]
                .flatMap(item => [item.stimulus_right, item.stimulus_left]),
            post_trial_gap: 800
        }
    ];

    // Push blocks from structure
    for (let i = 0; i < structure.length; i++) {

        // Push block                
        test.push({
            timeline: [
                test_trial
            ],
            timeline_variables: structure[i]
        });
    }

    return test
}


// PILT trial
const pavlovian_images_f = () => {
    let PIT_imgs = {
        0.01: "PIT3.png",
        1.0: "PIT1.png",
        0.5: "PIT2.png",
        "-0.01": "PIT6.png",
        "-1": "PIT4.png",
        "-0.5": "PIT5.png"
    };
    PIT_imgs = Object.fromEntries(Object.entries(PIT_imgs).map(([k, v]) => [k, "Pav_stims/session" + sessionNum + "/" + v]));
    return PIT_imgs;
};

const PILT_trial = {
    timeline: [
        kick_out,
        fullscreen_prompt,
    {
        type: jsPsychPILT,
        stimulus_right: () => 'imgs/PILT_stims/'+ jsPsych.evaluateTimelineVariable('stimulus_right'),
        stimulus_left: () => 'imgs/PILT_stims/'+ jsPsych.evaluateTimelineVariable('stimulus_left'),
        stimulus_middle: () => 'imgs/PILT_stims/'+ jsPsych.evaluateTimelineVariable('stimulus_middle'),
        feedback_left: jsPsych.timelineVariable('feedback_left'),
        feedback_right: jsPsych.timelineVariable('feedback_right'),
        feedback_middle: jsPsych.timelineVariable('feedback_middle'),
        optimal_right: jsPsych.timelineVariable('optimal_right'),
        optimal_side: jsPsych.timelineVariable('optimal_side'),
        response_deadline: jsPsych.timelineVariable('response_deadline'),
        n_stimuli: jsPsych.timelineVariable('n_stimuli'),
        present_pavlovian: jsPsych.timelineVariable('present_pavlovian'),
        pavlovian_images: pavlovian_images_f(),
        data: {
            trialphase: "task",
            block: jsPsych.timelineVariable('block'),
            trial: jsPsych.timelineVariable('trial'),
            stimulus_group: jsPsych.timelineVariable('stimulus_group'),
            stimulus_group_id: jsPsych.timelineVariable('stimulus_group_id'),
            valence: jsPsych.timelineVariable('valence'),
            n_groups: jsPsych.timelineVariable('n_groups'),
            rest_1pound: jsPsych.timelineVariable('rest_1pound'),
            rest_50pence: jsPsych.timelineVariable('rest_50pence'),
            rest_1penny: jsPsych.timelineVariable('rest_1penny')
        },
        on_finish: function(data) {
            if (data.response === "noresp") {
                var up_to_now = parseInt(jsPsych.data.get().last(1).select('n_warnings').values);
                jsPsych.data.addProperties({
                    n_warnings: up_to_now + 1
                });
            }
         },
         simulation_options: {
            mode: 'data-only'
         },
        post_trial_gap: 400
    }
    ],
    conditional_function: function () {

        // Only consider stopping if this is an early stop group, if this is not a practice block, and if there had been at least five previous trials
        if (Number.isInteger(jsPsych.evaluateTimelineVariable('block')) &&
            jsPsych.evaluateTimelineVariable('trial') > 5
        ) {

            // Block number
            const block = jsPsych.data.get().last(1).select('block').values[0];

            // Find all sitmulus-pairs in block
            let unique_stimulus_pairs = [...new Set(jsPsych.data.get().filter({
                trial_type: "PILT",
                block: block
            }).select('stimulus_group').values)]

            // Initialize a variable to store the result
            let all_optimal = true;

            // Iterate over each unique stimulus_group and check the last 5 choices
            unique_stimulus_pairs.forEach(g => {

                // Filter data for the current stimulus_group
                let num_optimal = jsPsych.data.get().filter({
                    trial_type: "PILT",
                    block: block,
                    stimulus_group: g
                }).last(5).select('response_optimal').sum();

                // Check if all last 5 choices for this group are correct
                if (num_optimal < 5) {
                    all_optimal = false;
                }
            });

            if (all_optimal) {
                window.skipThisBlock = true;
            }

            return !all_optimal
        } else {
            return true
        }

    }
}

// Coin lottery trial
const coin_lottery = {
    type: jsPsychCoinLottery,
    coins: () => {
        const coins_from_data = get_coins_from_data();

        return createProportionalArray(coins_from_data, 35).sort()
    },
    props: () => {

        // Compute data proportion
        const coins_from_data = get_coins_from_data();

        let raw_props = computeCategoryProportions(coins_from_data);

        raw_props = [raw_props[0.01], raw_props[0.5], raw_props[1], raw_props["-0.01"], raw_props["-0.5"], raw_props["-1"]]

        const prior = [0.1, 0.3, 0.5, 0.1 / 3, 0.1 / 3, 0.1 / 3];

        // Take weighted average
        const weight_data = 0.6;

        let weightedSum = raw_props.map((value, index) => {
            return (value * weight_data) + (prior[index] * (1 - weight_data));
        });

        // Normalize and return
        let sum = weightedSum.reduce((acc, value) => acc + value, 0);
        return weightedSum.map(value => value / sum);
    }
}

// Build PILT task block
function build_PILT_task(structure, insert_msg = true) {
    let PILT_task = [];
    for (let i = 0; i < structure.length; i++) {

        // Set default value of response_deadline
        structure[i].forEach(trial => {
            if (!trial.hasOwnProperty('response_deadline')) {
                trial.response_deadline = window.default_response_deadline; // Add the default value if missing
            }
        });

        // Get list of unique images in block to preload
        let preload_images = structure[i].flatMap(item => [item.stimulus_right, item.stimulus_left]);
        preload_images = [...new Set(preload_images)].map(value => `imgs/PILT_stims/${value}`);

        // Build block
        block = [
            {
                type: jsPsychPreload,
                images: preload_images,
                post_trial_gap: 800
            },
            {
                timeline: [
                    PILT_trial
                ],
                timeline_variables: structure[i]
            }
        ];

        // Add message
        if (insert_msg) {
            block.push(inter_block_msg);
        }

        PILT_task = PILT_task.concat(block)
    }

    return PILT_task
}

// Load PILT sequences from json file
async function load_squences(session) {
    try {
        // Fetch PILT sequences
        const response = await fetch('pilot6_PILT.json');

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const structure = await response.json();
        const sess_structure = structure[session - 1];

        window.totalBlockNumber = sess_structure.length

        // Fetch post-PILT test sequences
        const test_response = await fetch('pilot6_pilt_test.json');

        if (!test_response.ok) {
            throw new Error('Network response was not ok');
        }

        const test_structure = await test_response.json();
        let test_sess_structure = test_structure[session - 1];

        // Add folder to stimuli, and rename block
        for (i=0; i<test_sess_structure.length; i++){
            for(j=0; j<test_sess_structure[i].length; j++) {
                test_sess_structure[i][j].stimulus_left = `imgs/PILT_stims/${test_sess_structure[i][j].stimulus_left}`
                test_sess_structure[i][j].stimulus_right = `imgs/PILT_stims/${test_sess_structure[i][j].stimulus_right}`    
            }
        }

        // Fetch pavlovian test sequences
        const pavlovian_response = await fetch('pavlovian_test.json');
        let pav_test_structure = await pavlovian_response.json();

        // Add folder to stimuli, and rename block
        for (i=0; i<pav_test_structure.length; i++){
            pav_test_structure[i].stimulus_left = `imgs/Pav_stims/session${window.sessionNum}/${pav_test_structure[i].stimulus_left}`
            pav_test_structure[i].stimulus_right = `imgs/Pav_stims/session${window.sessionNum}/${pav_test_structure[i].stimulus_right}`
            pav_test_structure[i].block = "pavlovian"
        }

        // Add Pavlovaian test to the end of test strucutre
        test_sess_structure = [pav_test_structure].concat(test_sess_structure);

        // Fetch WM structure
        const WM_response = await fetch('pilot6_WM.json');
        const WM_structure = await WM_response.json();
        const WM_sess_structure = WM_structure[session - 1];

        run_full_experiment(sess_structure, test_sess_structure, WM_sess_structure);
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

function return_PILT_full_sequence(structure, test_structure, WM_structure) {
    // Compute best-rest
    computeBestRest(structure);
    computeBestRest(WM_structure);

    let PILT_procedure = [];

    // Add instructions
    PILT_procedure = PILT_procedure.concat(prepare_PILT_instructions());

    // Add PILT
    PILT_procedure = PILT_procedure.concat(build_PILT_task(structure));

    // Add test
    let PILT_test_procedure = [];
    PILT_test_procedure.push(test_instructions);
    PILT_test_procedure = PILT_test_procedure.concat(build_post_PILT_test(test_structure));

    // WM block
    let WM_procedure = WM_instructions;

    WM_procedure = WM_procedure.concat(build_PILT_task(WM_structure));


    return {
        PILT_procedure: PILT_procedure,
        PILT_test_procedure: PILT_test_procedure,
        WM_procedure: WM_procedure
    }
}
