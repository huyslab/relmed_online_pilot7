 // Acceptability questions
const acceptability = [
    {
        type: jsPsychInstructions,
        css_classes: ['instructions'],
        pages: [
            `<p>Please answer the following short questions.</p>`
        ],
        show_clickable_nav: true,
        data: {trialphase: "pre_debrief_instructions"},
        simulation_options:{
            simulate: false
        }
    },
    {
        type: jsPsychSurveyLikert,
        preamble: `<div style="display: flex; justify-content: center;"><table><tr><td><img src="imgs/binoculars.png" width="80" style="border: 1px solid darkgrey;"></img></td>
        <td style="padding:20px;">?</td>
        <td><img src="imgs/clock.png" width="80" style="border: 1px solid darkgrey;"></img></td></tr></table></div>
        <p>Please answer these questions regarding the card choosing game:<p>`,
        questions: [
            {
                prompt: "How difficult was the card choosing game?",
                labels: ["1<br>Not at all", "2", "3", "4", "5<br>Very difficult"],
                required: true,
                name: "pilt_difficulty"
            },
            {
                prompt: "How enjoyable was the card choosing game?",
                labels: ["1<br>Not at all", "2", "3", "4", "5<br>Very enjoyable"],
                required: true,
                name: "pilt_enjoy"
            },
            {
                prompt: "Was it clear to you what you needed to do in the card choosing game?",
                labels: ["1<br>Not clear at all", "2", "3", "4", "5<br>Extremely clear"],
                required: true,
                name: "pilt_clear"
            }
        ],
        data: {
            trialphase: "acceptability_pilt"
        },
        simulation_options: {
            simulate: false
        }
    },
    {
        type: jsPsychSurveyLikert,
        preamble: `<img src="imgs/piggy-bank.png" width="50"></img><p>Please answer these questions regarding the piggy-bank game:<p>`,
        questions: [
            {
                prompt: "How difficult was the piggy-bank game?",
                labels: ["1<br>Not at all", "2", "3", "4", "5<br>Very difficult"],
                required: true,
                name: "vigour_difficulty"
            },
            {
                prompt: "How enjoyable was the piggy-bank game?",
                labels: ["1<br>Not at all", "2", "3", "4", "5<br>Very enjoyable"],
                required: true,
                name: "vigour_enjoy"
            },
            {
                prompt: "Was it clear to you what you needed to do in the piggy-bank game (no-cloud version)?",
                labels: ["1<br>Not clear at all", "2", "3", "4", "5<br>Extremely clear"],
                required: true,
                name: "vigour_clear"
            },
            {
                prompt: "Was it clear to you what you needed to do in the piggy-bank game (cloudy version)?",
                labels: ["1<br>Not clear at all", "2", "3", "4", "5<br>Extremely clear"],
                required: true,
                name: "pit_clear"
            }
        ],
        data: {
            trialphase: "acceptability_vigour"
        },
        simulation_options: {
            simulate: false
        }
    },
    {
        type: jsPsychSurveyText,
        questions: [
            {
                prompt: "Was there anything you did that helped you complete the piggy-bank task (no-cloud version) more easily?",
                columns: 35,
                rows: 2,
                value: '',
                name: "vigour_strategy",
                required: true
            },
            {
                prompt: "Was there anything you did that helped you complete the piggy-bank task (cloudy version) more easily?",
                columns: 35,
                rows: 2,
                value: '',
                name: "pit_strategy",
                required: true
            }
        ],
        data: {
            trialphase: 'debrief_vigour'
        },
        simulation_options: {
            simulate: false
        }
    },
    // {
    //     type: jsPsychSurveyLikert,
    //     preamble: `<img src="imgs/squirrels_bg.png" height="80"></img><p>Please answer these questions regarding the squirrel game:<p>`,
    //     questions: [
    //         {
    //             prompt: "How difficult was the squirrel game?",
    //             labels: ["1<br>Not at all", "2", "3", "4", "5<br>Very difficult"],
    //             required: true,
    //             name: "reversal_difficulty"
    //         },
    //         {
    //             prompt: "How enjoyable was the squirrel game?",
    //             labels: ["1<br>Not at all", "2", "3", "4", "5<br>Very enjoyable"],
    //             required: true,
    //             name: "reversal_enjoy"
    //         },
    //         {
    //             prompt: "Was it clear to you what you needed to do in the squirrel game?",
    //             labels: ["1<br>Not clear at all", "2", "3", "4", "5<br>Extremely clear"],
    //             required: true,
    //             name: "reversal_clear"
    //         }
    //     ],
    //     data: {
    //         trialphase: "acceptability_reversal"
    //     },
    //     simulation_options: {
    //         simulate: false
    //     }
    // },
    // {
    //     type: jsPsychSurveyText,
    //     questions: [
    //         {
    //             prompt: "Was there anything you did that helped you complete the squirrel task more easily?",
    //             columns: 35,
    //             rows: 2,
    //             value: '',
    //             name: "reversal_strategy",
    //             required: true
    //         },
    //     ],
    //     data: {
    //         trialphase: 'debrief_reversal'
    //     },
    //     simulation_options: {
    //         simulate: false
    //     }
    // },
    {
        type: jsPsychSurveyText,
        questions: [
        {
            prompt: "Was there anything unclear in the instructions?",
            columns: 35,
            rows: 2,
            value: '',
            name: "instructions",
            required: true
        }
        ],
        data: {
            trialphase: 'debrief_instructions'
        },
        simulation_options: {
            simulate: false
        }
    }
]