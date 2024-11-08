// Acceptability questions
const acceptability_intro =
{
    type: jsPsychInstructions,
    css_classes: ['instructions'],
    pages: [
        `<p>Please answer the following short questions.</p>`
    ],
    show_clickable_nav: true,
    data: { trialphase: "pre_debrief_instructions" },
    simulation_options: {
        simulate: false
    }
};


const acceptability_PILT = {
    type: jsPsychSurveyLikert,
    preamble: `<p>Please answer these questions regarding the card choosing game:<p>`,
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
};

const acceptability_vigour = {
    type: jsPsychSurveyLikert,
    preamble: `<p>Please answer these questions regarding the piggy-bank game:<p>`,
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
            prompt: "Was it clear to you what you needed to do in the piggy-bank game?",
            labels: ["1<br>Not clear at all", "2", "3", "4", "5<br>Extremely clear"],
            required: true,
            name: "vigour_clear"
        }
    ],
    data: {
        trialphase: "acceptability_vigour"
    },
    simulation_options: {
        simulate: false
    }
};

const acceptability_PIT = {
    type: jsPsychSurveyLikert,
    preamble: `<p>Please answer these questions about the piggy-bank game in cloudy space:<p>`,
    questions: [
        {
            prompt: "How difficult was the piggy-bank game in cloudy space?",
            labels: ["1<br>Not at all", "2", "3", "4", "5<br>Very difficult"],
            required: true,
            name: "pit_difficulty"
        },
        {
            prompt: "How enjoyable was the piggy-bank game in cloudy space?",
            labels: ["1<br>Not at all", "2", "3", "4", "5<br>Very enjoyable"],
            required: true,
            name: "pit_enjoy"
        },
        {
            prompt: "Was it clear to you what you needed to do in the piggy-bank game in cloudy space?",
            labels: ["1<br>Not clear at all", "2", "3", "4", "5<br>Extremely clear"],
            required: true,
            name: "pit_clear"
        }
    ],
    data: {
        trialphase: "acceptability_pit"
    },
    simulation_options: {
        simulate: false
    }
};

const acceptability_wm = {
    type: jsPsychSurveyLikert,
    preamble: `<p>Please answer these questions regarding the card choosing game with 3 cards:<p>`,
    questions: [
        {
            prompt: "How difficult was the card choosing game with 3 cards?",
            labels: ["1<br>Not at all", "2", "3", "4", "5<br>Very difficult"],
            required: true,
            name: "wm_difficulty"
        },
        {
            prompt: "How enjoyable was the card choosing game with 3 cards?",
            labels: ["1<br>Not at all", "2", "3", "4", "5<br>Very enjoyable"],
            required: true,
            name: "wm_enjoy"
        },
        {
            prompt: "Was it clear to you what you needed to do in the card choosing game with 3 cards?",
            labels: ["1<br>Not clear at all", "2", "3", "4", "5<br>Extremely clear"],
            required: true,
            name: "wm_clear"
        }
    ],
    data: {
        trialphase: "acceptability_wm"
    },
    simulation_options: {
        simulate: false
    }
};

const acceptability_reversal = {
    type: jsPsychSurveyLikert,
    preamble: `<p>Please answer these questions regarding the squirrel game:<p>`,
    questions: [
        {
            prompt: "How difficult was the squirrel game?",
            labels: ["1<br>Not at all", "2", "3", "4", "5<br>Very difficult"],
            required: true,
            name: "reversal_difficulty"
        },
        {
            prompt: "How enjoyable was the squirrel game?",
            labels: ["1<br>Not at all", "2", "3", "4", "5<br>Very enjoyable"],
            required: true,
            name: "reversal_enjoy"
        },
        {
            prompt: "Was it clear to you what you needed to do in the squirrel game?",
            labels: ["1<br>Not clear at all", "2", "3", "4", "5<br>Extremely clear"],
            required: true,
            name: "reversal_clear"
        }
    ],
    data: {
        trialphase: "acceptability_reversal"
    },
    simulation_options: {
        simulate: false
    }
};

const debrief = {
    type: jsPsychSurveyText,
    questions: [
        {
            prompt: "Thinking back on the whole study, was there anything unclear in any of the instructions?",
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
};