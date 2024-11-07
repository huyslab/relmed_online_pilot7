// Label for questionnaires
var likert_phq = [
    "Not at all",
    "Several days",
    "More than half the days",
    "Nearly every day"
];
var likert_gad = [
    "Not at all",
    "Several days",
    "More than half the days",
    "Nearly every day"
];
var likert_WSAS = [
    "Not at all",
    "",
    "Slightly",
    "",
    "Definitely",
    "",
    "Markedly",
    "",
    "Very severely"
];
var multichoice_ICECAP = [
    [
        "I am able to feel settled and secure in <b>all</b> areas of my life",
        "I am able to feel settled and secure in <b>many</b> areas of my life",
        "I am able to feel settled and secure in <b>a few</b> areas of my life",
        "I am <b>unable</b> to feel settled and secure in <b>any</b> areas of my life"
    ],
    [
        "I can have <b>a lot</b> of love, friendship and support",
        "I can have <b>quite a lot</b> of love, friendship and support",
        "I can have <b>a little</b> love, friendship and support",
        "I <b>cannot</b> have <b>any</b> love, friendship and support"
    ],
    [
        "I am able to be <b>completely</b> independent",
        "I am able to be independent in <b>many</b> things",
        "I am able to be independent in <b>a few</b> things",
        "I am <b>unable</b> to be at all independent"
    ],
    [
        "I can achieve and progress in <b>all</b> aspects of my life",
        "I can achieve and progress in <b>many</b> aspects of my life",
        "I can achieve and progress in <b>a few</b> aspects of my life",
        "I <b>cannot</b> achieve and progress in <b>any</b> aspects of my life"
    ],
    [
        "I can have <b>a lot</b> of enjoyment and pleasure",
        "I can have <b>quite a lot</b> of enjoyment and pleasure",
        "I can have a <b>little</b> enjoyment and pleasure",
        "I <b>cannot</b> have <b>any</b> enjoyment and pleasure"
    ]
];
var likert_BFI = [
    "Disagree strongly",
    "Disagree a little",
    "Neither agree nor disagree",
    "Agree a little",
    "Agree strongly"
];
var likert_pvss = [
    "Extremely untrue of me",
    "Very untrue of me",
    "Moderately untrue of me",
    "Slightly untrue of me",
    "Neutral",
    "Slightly true of me",
    "Moderately true of me",
    "Very true of me",
    "Extremely true of me"
];
var likert_BADS = [
    "Not at all",
    "",
    "A little",
    "",
    "A lot",
    "",
    "Completely"
];
var likert_hopelessness = [
    "Absolutely agree",
    "Somewhat agree",
    "Cannot say",
    "Somewhat disagree",
    "Absolutely disagree"
];
var likert_RRS_brooding = [
    "Almost never",
    "Sometimes",
    "Often",
    "Almost always"
];
var likert_PERS_negAct = [
    "Very unlike me",
    "Somewhat unlike me",
    "Neither like nor unlike me",
    "Somewhat like me",
    "Very like me"
];

// Prompts for questionnaires

var prompt_gad = [
    "Feeling nervous, anxious or on edge",
    "Not being able to stop or control worrying",
    "Worrying too much about different things",
    "Trouble relaxing",
    "Being so restless that it is hard to sit still",
    "Becoming easily annoyed or irritable",
    "Worrying about the 1974 Eurovision Song Contest", // Catch
    "Feeling afraid as if something awful might happen"
];

var prompt_WSAS = [
    "Because of my [problem] my <b>ability to work</b> is impaired. '0' means 'not at all impaired' and '8' means very severely impaired to the point I can't work.",
    "Because of my [problem] my <b>home management</b> (cleaning, tidying, shopping, cooking, looking after home or children, paying bills) is impaired.",
    "Because of my [problem] my <b>social leisure activities</b> (with other people e.g. parties, bars, clubs, outings, visits, dating, home entertaining) are impaired.",
    "Because of my [problem], my <b>private leisure activities</b> (done alone, such as reading, gardening, collecting, sewing, walking alone) are impaired.",
    "Because of my [problem], my ability to form and maintain <b>close relationships</b> with others, including those I live with, is impaired."
];

var prompt_ICECAP = [
    "Feeling settled and secure",
    "Love, friendship and support",
    "Being independent",
    "Achievement and progress",
    "Enjoyment and pleasure"
];

var prompt_BFI = [ 
    "I see myself as someone who is reserved",
    "I see myself as someone who is generally trusting",
    "I see myself as someone who tends to be lazy",
    "I see myself as someone who is relaxed, handles stress well",
    "I see myself as someone who has few artistic interests",
    "I see myself as someone who is outgoing, sociable",
    "I see myself as someone who tends to find fault with others",
    "I see myself as someone who does a thorough job",
    "I see myself as someone who gets nervous easily",
    "I see myself as someone who has an active imagination"
];

var prompt_BADS = [
    "There were certain things I needed to do that I didn't do",
    "I am content with the amount and types of things I did.",
    "I engaged in many different activities.",
    "I made good decisions about what type of activities and/or situations I put myself in.",
    "I was an active person and accomplished the goals I set out to do.",
    "Most of what I did was to escape from or avoid something unpleasant.",
    "I was able to lift my coffee cup or water glass when drinking.", // Catch
    "I spent a long time thinking over and over about my problems.",
    "I engaged in activities that would distract me from feeling bad.",
    "I did things that were enjoyable."
];

var prompt_hopelessness = [
    "The future seems to me to be hopeless and I can't believe that things are changing for the better.",
    "I feel that it is impossible to reach the goals I would like to strive for."
];

var prompt_RRS_brooding = [
    'think "What am I doing to deserve this?"',
    'think "Why do I always react this way?"',
    'think about a recent situation, wishing it had gone better',
    'think "Why do I have problems other people don\'t have?"',
    'think "Why can\'t I handle things better?"'
];

var prompt_PERS_negAct = [
    "I tend to get upset very easily",
    "I tend to get disappointed very easily",
    "I tend to get frustrated very easily",
    "My emotions go from neutral to negative very quickly",
    "I tend to get pessimistic about negative things very quickly"
];

// Questionnaires

var questionnaire_phq = {
    type: jsPsychSurveyLikert,
    preamble: ["<h1>Questionnaire 1</h1>" +
        "<p>Over the <u>last 2 weeks</u>, how often have you been bothered by any of the following problems?</p>" +
        "<p>Please respond to all items.</p>"
    ],
    questions: [
        { prompt: "Little interest or pleasure in doing things", labels: likert_phq, required: true },
        { prompt: "Feeling down, depressed, or hopeless", labels: likert_phq, required: true },
        { prompt: "Trouble falling or staying asleep, or sleeping too much", labels: likert_phq, required: true },
        { prompt: "Feeling tired or having little energy", labels: likert_phq, required: true },
        { prompt: "Poor appetite or overeating", labels: likert_phq, required: true },
        { prompt: "Feeling bad about yourself - or that you are a failure or have let yourself or your family down", labels: likert_phq, required: true },
        { prompt: "Trouble concentrating on things, such as reading the newspaper of watching television", labels: likert_phq, required: true },
        { prompt: "Moving or speaking so slowly that other people have noticed, or the opposite - being so fidgety or restless that you have been moving around a lot more than usual", labels: likert_phq, required: true },
        { prompt: "Experiencing sadness or a sense of despair", labels: likert_phq, required: true }, // Catch
        { prompt: "Thoughts that you would be better off dead, or of hurting yourself in some way", labels: likert_phq, required: true },
    ],
    scale_width: 900,
    data: {
        trialphase: "PHQ"
    }
};

var questionnaire_gad = {
    type: jsPsychSurveyLikert,
    preamble: ["<h1>Questionnaire 2</h1>" +
        "<p>Over the <u>last 2 weeks</u>, how often have you been bothered by following problems?</p>"
    ],
    questions: prompt_gad.map(prompt => ({
        prompt: prompt,
        labels: likert_gad,
        required: true
    })),
    scale_width: 900,
    data: {
        trialphase: "GAD"
    }
};

var questions_WSAS = prompt_WSAS.map(prompt => ({
    prompt: prompt,
    labels: likert_WSAS,
    required: true
}));
questions_WSAS.unshift({prompt: "If you're retired or choose not to have a job for reasons unrelated to your problem, tick here", labels: [""], required: false});
var questionnaire_WSAS = {
    type: jsPsychSurveyLikert,
    preamble: ["<h1>Questionnaire 3</h1>" +
        "<p>People's problems sometimes affect their ability to do certain day-to-day tasks in their lives. To rate your problems look at each section and determine on the scale provided how much your problem impairs your ability to carry out the activity. This assessment is not intended to be a diagnosis. If you are concerned about your results in any way, please speak with a qualified health professional.</p>"
    ],
    questions: questions_WSAS,
    scale_width: 900,
    data: {
        trialphase: "WSAS"
    }
};

var questionnaire_ICECAP = {
    type: jsPsychSurveyMultiChoice,
    preamble: ["<h1>Questionnaire 4</h1>" +
        "<p>Please indicate which statements best describe your overall quality of life at the moment by choosing ONE option for each of the five groups below.</p>"
    ],
    questions: prompt_ICECAP.map((prompt, index) => ({
        prompt: prompt,
        options: multichoice_ICECAP[index],
        required: true
    })),
    scale_width: 900,
    data: {
        trialphase: "ICECAP"
    }
};

var questionnaire_BFI = {
    type: jsPsychSurveyLikert,
    preamble: ["<h1>Questionnaire 5</h1>" +
        "<p>How well do the following statements describe your personality?</p>"
    ],
    questions: prompt_BFI.map(prompt => ({
        prompt: prompt,
        labels: likert_BFI,
        required: true
    })),
    scale_width: 900,
    data: {
        trialphase: "BFI"
    }
};

var questionnaire_pvss = {
    type: jsPsychSurveyLikert,
    preamble: ["<h1>Questionnaire 6</h1>" +
        'Please indicate to what extent these statements describe your <b><u>responses over the last two weeks, including today.</u></br>' +
        'Did you NOT have this experience? No problem. Please indicate how you <u>would have responded</u> if you had experienced the situation over the last two weeks.</b></br>' +
        'Please consider only the aspect of the situation that is described, paying particular attention to the <u>underlined text</u>. For example, if the statement says, "<u>I wanted</u> to meet new people," rate how much you wanted or would have wanted to meet new people over the last two weeks, assuming that the opportunity presented itself. Do not consider what the situation would have required of you or whether it would have been possible for you to meet people.'
    ],
    questions: [
        { prompt: 'I <u>savoured</u> my first bite of food after feeling hungry', labels: likert_pvss, required: true },
        { prompt: 'I <u>put energy</u> into activities I enjoy', labels: likert_pvss, required: true },
        { prompt: 'I <u>was delighted</u> to catch a breath of fresh air outdoors', labels: likert_pvss, required: true },
        { prompt: 'I <u>wanted</u> to spend time with people I know', labels: likert_pvss, required: true },
        { prompt: 'A fun activity during the weekend sustained my good mood <u>throughout the new week</u>', labels: likert_pvss, required: true },
        { prompt: 'It <u>felt good</u> to have physical contact with someone I felt close to', labels: likert_pvss, required: true },
        { prompt: 'I <u>expected</u> to enjoy a brief moment outdoors', labels: likert_pvss, required: true },
        { prompt: 'I <u>looked forward</u> to hearing feedback on my work', labels: likert_pvss, required: true },
        { prompt: 'I <u>expected</u> to enjoy my meals', labels: likert_pvss, required: true },
        { prompt: 'Receiving praise about my work made me feel pleased <u>for the rest of the day</u>', labels: likert_pvss, required: true },
        { prompt: 'I <u>looked forward</u> to spending time with others', labels: likert_pvss, required: true },
        { prompt: 'I <u>wanted</u> to accomplish goals I set for myself', labels: likert_pvss, required: true },
        { prompt: 'I <u>expected</u> to enjoy being hugged by someone I love', labels: likert_pvss, required: true },
        { prompt: 'I <u>wanted</u> to participate in a fun activity with friends', labels: likert_pvss, required: true },
        { prompt: 'I <u>worked hard</u> to earn positive feedback on my projects', labels: likert_pvss, required: true },
        { prompt: 'I <u>looked forward</u> to an upcoming meal', labels: likert_pvss, required: true },
        { prompt: 'I <u>felt pleased</u> when I reached a goal I set for myself', labels: likert_pvss, required: true },
        { prompt: 'Getting a hug from someone close to me made me happy <u>even after</u> we parted', labels: likert_pvss, required: true },
        { prompt: 'I <u>expected</u> to master the tasks I undertook', labels: likert_pvss, required: true },
        { prompt: "I wished to engage in enjoyable activities with people I'm close to", labels: likert_pvss, required: true }, // Catch
        { prompt: 'I <u>actively pursued</u> activities I thought would be fun', labels: likert_pvss, required: true },
        { prompt: 'I <u>went out of my way</u> to admire the beauty around me', labels: likert_pvss, required: true },
    ],
    scale_width: 900,
    data: {
        trialphase: "PVSS"
    }
}

var questionnaire_BADS = {
    type: jsPsychSurveyLikert,
    preamble: ["<h1>Questionnaire 8</h1>" +
        "<p>Please read each statement carefully and then circle the number which best describes how much the statement was true for you DURING THE PAST WEEK, INCLUDING TODAY.</p>"
    ],
    questions: prompt_BADS.map(prompt => ({
        prompt: prompt,
        labels: likert_BADS,
        required: true
    })),
    scale_width: 900,
    data: {
        trialphase: "BADS"
    }
};

var questionnaire_hopelessness = {
    type: jsPsychSurveyLikert,
    preamble: ["<h1>Questionnaire 9</h1>" +
        "<p>For each of the statements below, please choose the option that best applies to you.</p>"
    ],
    questions: prompt_hopelessness.map(prompt => ({
        prompt: prompt,
        labels: likert_hopelessness,
        required: true
    })),
    scale_width: 900,
    data: {
        trialphase: "Hopelessness"
    }
};

var questionnaire_RRS_brooding = {
    type: jsPsychSurveyLikert,
    preamble: ["<h1>Questionnaire 10</h1>" +
        "<p>People think and do many different things when they feel depressed. Please read each of the items below and indicate whether you almost never, sometimes, often, or almost always think or do each one when you feel down, sad, or depressed. Please indicate what you generally do, not what you think you should do.</p>"
    ],
    questions: prompt_RRS_brooding.map(prompt => ({
        prompt: prompt,
        labels: likert_RRS_brooding,
        required: true
    })),
    scale_width: 900,
    data: {
        trialphase: "RRS_brooding"
    }
};

var questionnaire_PERS_negAct = {
    type: jsPsychSurveyLikert,
    preamble: ["<h1>Questionnaire 11</h1>" +
        "<p>This questionnaire is designed to measure different aspects of how you typically react to experiencing emotional events. Please score the following statements according to how much they apply or do not apply to you on a typical day.</p>"
    ],
    questions: prompt_PERS_negAct.map(prompt => ({
        prompt: prompt,
        labels: likert_PERS_negAct,
        required: true
    })),
    scale_width: 900,
    data: {
        trialphase: "PERS_negAct"
    }
};

const questionnaires_timeline = [
    {
        type: jsPsychInstructions,
        css_classes: ['instructions'],
        pages: [
            `<p>Please answer the following questionnaires.</p>` +
            `<p>Each questionnaire will be presented on a separate page.</p>` +
            `<p>Your responses are important, and we ask that you carefully read each question and answer as accurately and thoughtfully as possible.</p>` +
            `<p>Please take your time with each item, and remember that there are no “right” or “wrong” answers. Your honest and thorough responses will help us gather meaningful data.</p>` +
            `<p>Click 'Next' to begin.</p>`
        ],
        show_clickable_nav: true,
        data: {trialphase: "pre_debrief_instructions"},
        simulation_options:{
            simulate: false
        }
    },
    questionnaire_phq,
    questionnaire_pvss,
    questionnaire_gad,
    questionnaire_WSAS,
    questionnaire_ICECAP,
    questionnaire_BFI,
    questionnaire_BADS,
    questionnaire_hopelessness,
    questionnaire_RRS_brooding,
    questionnaire_PERS_negAct
];