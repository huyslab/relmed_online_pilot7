// Instructions for the PLT
function prepare_instructions() {
    let inst =  [
        {
            type: jsPsychFullscreen,
            fullscreen_mode: true,
            css_classes: ['instructions'],
            message: "<p>This study runs in full screen mode.</p><p>Press the button below to continue.</p>"
        },
        {
        type: jsPsychInstructions,
        css_classes: ['instructions'],
        pages: [
            "<p><b>Welcome to The Card Collector's Challenge!</b></p>\
                <p>On each turn, the Card Collector will present you with two cards.</p>\
                    <p>The Card Collector has hidden a coin beneath each card.</p>\
                    <p>You get to choose which card to flip and reveal the coin underneath.</p>"
        ],
        show_clickable_nav: true,
        data: {trialphase: "instruction"}
    },
    {
        type: jsPsychHtmlKeyboardResponse,
        css_classes: ['instructions'],
        stimulus: "<p>Let's try it out! Two cards will appear on the next screen. \
                Use the left arrow key to choose the left card, or the right arrow key to choose the right card.</p>\
                <p>Place your fingers on the left and right arrow keys, and press either one to start the practice.</p>",
        choices: ['arrowleft', 'arrowright'],
        data: {trialphase: "instruction"}
    }];

    inst.push(
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
        
  
    inst = inst.concat([{
        type: jsPsychInstructions,
        css_classes: ['instructions'],
        pages: [
            "<p>Well done! You found a one-pound coin.</p>",
            "<p>The Card Collector uses 1 penny coins, 50 pence coins, and 1-pound coins. \
                Usually, the 50 pence or 1-pound coin is hidden under the same card each time, \
                while the penny is under the other card. However, they sometimes mix it up.</p>\
            <p>Your goal is to collect as many valuable coins as possible by figuring out which card usually hides the better coins. \
                When you complete the game, you will receive bonus money based on the value of the coins you collected.</p>",
            "<p>There are two versions of The Card Collector's Challenge:</p>\
            <p>1. <b>Winning Coins</b>: You start with no coins and keep each coin you find.<br>\
               2. <b>Avoiding Losses</b>: You start with a purse of coins. \
               Each card you flip reveals a broken coin, which is removed from your purse. \
               If you find a broken penny, you lose a penny; if you find a broken 50 pence, \
               you lose 50 pence; and if you find a broken pound, you lose one pound.<p>",
            "<p>In both versions, your goal is to finish with as many coins as possible. \
                The number of coins you have will determine your bonus money.</p>"
        ],
        show_clickable_nav: true,
        data: {trialphase: "instruction"}
    },
    {
        type: jsPsychHtmlKeyboardResponse,
        css_classes: ['instructions'],
        stimulus: "<p>Let's practice both versions. We'll start with winning coins. \
            You begin with zero coins. Try to collect as many as you can.</p>\
            <p>Place your fingers on the left and right arrow keys, and press either one to start practicing.</p>",
        choices: ['arrowleft', 'arrowright'],
        data: {trialphase: "instruction"}
    }]);

    let dumbbell_on_right = [true, true, false, true, false, false];
    let reward_magnitude = [0.5, 1, 1, 0.5, 1, 0.5];

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
        {
            type: jsPsychInstructions,
            css_classes: ['instructions'],
            pages: function() {
                let earnings = Math.round(jsPsych.data.get().filter({
                    block: "practice2", 
                    trial_type: "PLT"
                }).select('chosenOutcome').sum() * 1000) / 1000
    
                return ["<p>Well done! You would have earned £" + earnings + " in this game.</p>"]
            },
            show_clickable_nav: true,
            data: {trialphase: "instructions"}
        },
        {
            type: jsPsychHtmlKeyboardResponse,
            css_classes: ['instructions'],
            stimulus: "<p>Now, let's practice avoiding losses. You'll start with £4.5 in coins. Try to lose as few as possible.</p>\
                <p>Place your fingers on the left and right arrow keys, and press either one to start practicing.</p>",
            choices: ['arrowright', 'arrowleft'],
            data: {trialphase: "instruction"}
        }
    ]);

    let hammer_on_right = [false, true, false, true, false, false];
    let punishment_magnitude = [-1, -0.5, -0.5, -1, -1, -0.5];

    inst.push(
        {
            timeline: build_PLT_task(
                [
                    hammer_on_right.map((e, i) => 
                        ({
                            stimulus_left: e ? "tricycle.png" : "hammer.png",
                            stimulus_right: e ? "hammer.png" : "tricycle.png",
                            feedback_left: e ? -0.01 : punishment_magnitude[i],
                            feedback_right: e ? punishment_magnitude[i] : -0.01,
                            optimal_right: !e,
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
        {
            type: jsPsychInstructions,
            css_classes: ['instructions'],
            pages: function() {
                let losses = jsPsych.data.get().filter({
                    block: "practice3", 
                    trial_type: "PLT"
                }).select('chosenOutcome').sum();

                let earnings = Math.round((4.5 + losses) * 1000) / 1000

                let pages = [
                    "<p>Well done!</><p>You would have lost £" +  Math.round(Math.abs(losses) * 1000) / 1000 +
                    " in coins in this game, leaving £" + earnings + " in your purse.</p>"
                ];
        
                if (window.earlyStop) {
                    pages.push("<p>To save time in the real game, if you select the better card five times in a row, \
                the game will end, and you will get all the remaining coins as if you \
                had chosen the better card each time.</p>");
                }
        
                let final_page = "<p>You are almost ready to play for real.</p>\
                    <p>You will play multiple rounds of The Card Collector's Challenge. ";
                
                if (window.valenceGrouped){
                    if (window.rewardFirst){
                        final_page += "At first you'll play " +  window.totalBlockNumber / 2 + 
                            " rounds to win coins, and then another " +  window.totalBlockNumber / 2 + 
                            " rounds to avoid losing coins.</p>";
                    } else {
                        final_page += "At first you'll play " +  window.totalBlockNumber / 2 + 
                            " rounds to avoid losing coins, and then another " +  window.totalBlockNumber / 2 + 
                            " rounds to win coins. You start the game with £x of coins.</p>";
                    }
                } else {
                    final_page += "You will play  " +  window.totalBlockNumber  + 
                            " rounds, sometimes to win coins, and sometimes to avoid losing them.<br>\
                            You start the game with £x of coins. ";
                }
                
                pages.push(final_page);
        
                return(pages)
            },
            show_clickable_nav: true,
            data: {trialphase: "instructions"}
        }
    ])

    return inst
} 

const lottery_instructions = {
    type: jsPsychInstructions,
    css_classes: ['instructions'],
    pages: [
        '<p>You have completed the Card Collector Challenge!</p>\
            <p>Next, your bonus payment will be determined.</p>\
            <p>On the next page, you will be presented with a representative sample of the coins \
            you have collected during the challenge. The Card Collector will hide the coins behind cards and \
            shuffle them. You will then be able to chose one card, to reveal the coin that will be paid to you as a bonus.</p> '
    ],
    show_clickable_nav: true,
    data: {trialphase: "lottery_instructions"}
}