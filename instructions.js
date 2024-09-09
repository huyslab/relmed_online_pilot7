// Instructions for the PLT
const small_coin_size = 70;

function prepare_instructions() {
    const inter_block_instruct = {
        type: jsPsychInstructions,
        css_classes: ['instructions'],
        pages: () => [inter_block_stimulus()],
        show_clickable_nav: true,
        data: {trialphase: "instruction"}
    }

    let inst =  [
        {
        type: jsPsychInstructions,
        css_classes: ['instructions'],
        pages: () => {

            let pages = [];
            if (window.sessionNum > 1){
                pages.push(`<p>Welcome back to the study!</p>\
                    <p>Today you will be playing the card choosing game again</p>
                    <p>Let's start with a reminder of how to play it.</p>`
                );
            }

            pages = pages.concat([
            `<p><b>THE CARD CHOOSING GAME</b></p>
                <p>In this game you are the owner of a safe.</p>
                <img src='imgs/safe.png' style='width:100px; height:100px;'>
                <p>At the start of the game, your safe contains:</p>
                <div style='display: grid'><table><tr><td><img src='imgs/1pound.png' style='width:${small_coin_size}px; height:${small_coin_size}px;'></td>
                <td><img src='imgs/50pence.png' style='width:${small_coin_size}px; height:${small_coin_size}px;'</td>
                <td><img src='imgs/1penny.png' style='width:${small_coin_size}px; height:${small_coin_size}px;'></td></tr>
                <tr><td>52x one pound coins</td><td>52x fifty pence coins</td><td>52x one penny coins</td></tr></table></div>
                <p>At the end of the game, you will draw one coin from your safe, and that will be your bonus payment.</p>
                <p>Your goal is to add coins to your safe while avoid losing coins already in it.</p>`,
            `<p>On each turn of this game, you will see two cards.
                You have three seconds to flip one of the two cards.</p>
                <p>This will reveal the coin you collect: either 1 pound, 50 pence, or 1 penny.</p>
                <div style='display: grid;'><table style='width: 200px; grid-column: 2;'><tr>
                <td><img src='imgs/1pound.png' style='width:${small_coin_size}px; height:${small_coin_size}px;'></td>
                <td><img src='imgs/50pence.png' style='width:${small_coin_size}px; height:${small_coin_size}px;'></td>
                <td><img src='imgs/1penny.png' style='width:${small_coin_size}px; height:${small_coin_size}px;'></td></tr></table></div>`,
            `<p>When you flip a card, you might also see broken coins like these:</p>\
                <div style='display: grid;'><table style='width: 200px; grid-column: 2;'><tr>
                <td><img src='imgs/1poundbroken.png' style='width:${small_coin_size}px; height:${small_coin_size}px;'></td>
                <td><img src='imgs/50pencebroken.png' style='width:${small_coin_size}px; height:${small_coin_size}px;'></td>
                <td><img src='imgs/1pennybroken.png' style='width:${small_coin_size}px; height:${small_coin_size}px;'></td></tr></table></div>
                <p>This means that such a coin was broken and removed from your safe.</p>`
        ]);
        return pages
    },
        show_clickable_nav: true,
        data: {trialphase: "instruction"}
    }
    ];

    if (window.sessionNum == 1) {
        inst.push(
            {
                type: jsPsychHtmlKeyboardResponse,
                css_classes: ['instructions'],
                stimulus: `<p>You choose a card by pressing the left or the right arrow keys.</p>
                        <p>Let's try it out now! Flip a card on the next screen.</p>
                        <p>Place your fingers on the left and right arrow keys, and press either one to continue.</p>`,
                choices: ['arrowleft', 'arrowright'],
                data: {trialphase: "instruction"}
            },
            {
                timeline: build_PLT_task(
                    [[
                        {
                            stimulus_left: "binoculars.png",
                            stimulus_right: "clock.png",
                            feedback_left: 1,
                            feedback_right: 1,
                            optimal_right: 1,
                            block: "practice1",
                            trial: 1,
                            valence: 1,
                            maxRespTime: -1
                        }
                    ]],
                    false
                )
            }
        );
    }
  
    inst = inst.concat([{
        type: jsPsychInstructions,
        css_classes: ['instructions'],
        pages: [
            `${window.sessionNum == 1 ? `<p>You found a one pound coin!</p>` : ``}
            <p>Some cards are better than others, but even good cards can sometimes only give a penny 
            or might sometimes break a one pound coin.</p>`
        ],
        show_clickable_nav: true,
        data: {trialphase: "instruction"}
    },
    {
        type: jsPsychHtmlKeyboardResponse,
        css_classes: ['instructions'],
        stimulus: `<p>Let's practice collecting coins. \
            On the next screen, choose card to collect as much money as you can.</p>
            <p>Place your fingers on the left and right arrow keys, and press either one to start practicing.</p>`,
        choices: ['arrowleft', 'arrowright'],
        data: {trialphase: "instruction"}
    }]);

    let dumbbell_on_right = [true, true, false, true, false, false];
    let reward_magnitude = [0.5, 1, 1, 0.5, 1, 0.5];

    if (window.sessionNum > 1){
        dumbbell_on_right = [1, 3, 4, 0].map(i => dumbbell_on_right[i])
        reward_magnitude = [3, 4, 0, 1].map(i => reward_magnitude[i])
    }

    inst.push(
        {
            timeline: build_PLT_task(
                [
                    dumbbell_on_right.map((e, i) => 
                        ({
                            stimulus_left: e ? "flashlight.png" : "dumbbell.png",
                            stimulus_right: e ? "dumbbell.png" : "flashlight.png",
                            feedback_left: e ? 0.01 : reward_magnitude[i],
                            feedback_right: e ? reward_magnitude[i] : 0.01,
                            optimal_right: e,
                            block: "practice2",
                            trial: i,
                            valence: 1
                        })
                    )
                ],
                false
            )
        }
    )


    inst = inst.concat([
        inter_block_instruct,
        {
            type: jsPsychHtmlKeyboardResponse,
            css_classes: ['instructions'],
            stimulus: `<p>Now, let's practice avoiding losing coins. 
            On the next screen, choose card to lose as little money as you can.</p>
            <p>Place your fingers on the left and right arrow keys, and press either one to start practicing.</p>`,
            choices: ['arrowright', 'arrowleft'],
            data: {trialphase: "instruction"}
        }
    ]);

    let hammer_on_right = [false, true, false, true, false, false];
    let punishment_magnitude = [-0.01, -0.5, -0.5, -0.01, -0.01, -0.5];

    if (window.sessionNum > 1){
        hammer_on_right = [1, 3, 4, 0].map(i => hammer_on_right[i])
        punishment_magnitude = [3, 4, 0, 1].map(i => punishment_magnitude[i])
    }


    inst.push(
        {
            timeline: build_PLT_task(
                [
                    hammer_on_right.map((e, i) => 
                        ({
                            stimulus_left: e ? "tricycle.png" : "hammer.png",
                            stimulus_right: e ? "hammer.png" : "tricycle.png",
                            feedback_left: e ? -1 : punishment_magnitude[i],
                            feedback_right: e ? punishment_magnitude[i] : -1,
                            optimal_right: e,
                            block: "practice3",
                            trial: i,
                            valence: -1
                        })
                    )
                ],
                false
            )
        }
    );

    inst = inst.concat(
        [
            inter_block_instruct,
            {
                type: jsPsychInstructions,
                css_classes: ['instructions'],
                pages: [`<p>Before you start playing, we will ask you to answer a few questions about the instructions you have just read.</p>
                        <p>You must answer all questions correctly to begin the challenge.</p>\
                        <p>Otherwise, you can repeat the instructions and try again.</p>`],
                show_clickable_nav: true,
                data: {trialphase: "instruction"}
            }
    ]);

    let quiz_questions = [
        {
            prompt: "Some cards are better than others, but even good cards can sometimes only give a penny or break a one pound coin.",
            options: ["True", "False"],
            required: true
        },
        {
            prompt: "If I find a broken coin, that means a coin was broken in my safe.",
            options: ["True", "False"],
            required: true
        },
        {
            prompt: "My goal is to collect and keep from breaking as many high-value coins as I can.",
            options: ["True", "False"],
            required: true
        },
    ];

    inst.push(
        {
            type: jsPsychSurveyMultiChoice,
            questions: quiz_questions,
            preamble: `<div class=instuctions><p>For each statement, please indicate whether it is true or false:</p></div>`,
            data: {
                trialphase: "instruction_quiz"
            },
            simulation_options: {
                data: {
                    response: {
                        Q0: `True`,
                        Q1: `True`,
                        Q2: `True`,
                    }
                }
            }   
        }
    );

    inst.push(
        {
            type: jsPsychInstructions,
            css_classes: ['instructions'],
            timeline: [
                {
                    pages: [
                    `<p>You did not answer all the quiz questions correctly. 
                    Please read the instructions again before you continue</p>`
                    ]
                }
            ],
            conditional_function: check_quiz_failed,
            show_clickable_nav: true,
            data: {
                trialphase: "quiz_failure"
            }
        }
    );

    const inst_loop = {
        timeline: inst,
        loop_function: check_quiz_failed
    }


    const inst_total = [
        inst_loop,
        {
            type: jsPsychHtmlKeyboardResponse,
            css_classes: ['instructions'],
            stimulus: `<p>Great! Let's start playing for real.</p>
            <p>Place your fingers on the left and right arrow keys, and press either one to start playing.</p>`,
            choices: ['arrowright', 'arrowleft'],
            data: {trialphase: "instruction"}
        }
    ]

    return inst_total
} 

function check_quiz_failed() {
    const data = jsPsych.data.get().filter({trialphase: "instruction_quiz"}).last(1).select('response').values[0];
    console.log(data)
    return !Object.values(data).every(value => value === "True");
}

const lottery_instructions = {
    type: jsPsychInstructions,
    css_classes: ['instructions'],
    pages: [
        '<p>You have completed the card choosing game!</p>\
            <p>Next, your bonus payment will be determined.</p>\
            <p>On the next page, you will be presented with a representative sample of the conents \
            your safe. After flipping the cards and shuffling, you will get to chose one card, and reveal the coin that will be paid to you as a bonus.</p>\
            <p>If you select a broken coin, no bonus payment will be paid to you today.</p>'
    ],
    show_clickable_nav: true,
    data: {trialphase: "lottery_instructions"}
}