# RELMED probabilistic learning task pilot #1
This reposistory hosts the experiment website for the first pilot of the probabilistic learning task (PLT) for RELMED. The task is coded with jsPsych.

The task consists of two sessions, each comprising 24 blocks. There are 12 blocks of rewarding feedback and 12 blocks of punishing feedback in each session. The blocks are either grouped or interleaved, depending on the condition participants are assigned to. Additionally, participants are assigned to an early stop / no stop condition. Blocks in the early stop condition are stopped after 5 consecutive correct responses, while in the no stop they always continue to the full 13 trials.

Feedback sequences were chosen to optimize Fisher Information, while conserving a distribution of feedback such that the probability of receiving confusing feedback is close to uniform over trial positions. In each block, one stimulus commonly gives 1 pound and 50 pence coins / 1 pound coins, while the other gives 1 pence / 1 pence and 50 pence coins respectively.

On each block, one stimulus is from a novel category, while another is an exemplar from the category that was novel on the previous block. Each session, and each valence phase in the grouped valenced conditions, start with two novel categories.

At the end of the experiment, participants are presented with a representative sample of the coins they had collected (for punishment block, the absolute value of the coin not selected on each trial is added to the purse). They draw their bonus payment from a distribution based on their winnings, but biased towards high value coins.

Data is written to REDCap via a call to an AWS lamda function.

Unfortunatley, the order of sequences was not shuffled, and so there are systematic differences between session 1 and 2. This ought to be fixed in future applications of this task.

## Files in this repository
.
├── consent.html - first page particiapnts land on.
├── experiment.html - main experiment script, participants are redirected here from consent.
├── instructions.js - PLT instruction-generation functions.
├── plugin-coin-lottery.js - jsPsych plugin for lottery to determine bonus.
├── plugin-PLT.js - jsPsych plugin for PLT trial.
├── utils.js - various functions used in the experiment.
├── style.css - stylesheet for consent.html
├── jspsych/ - jsPsych library and plugins used in the experiment./
│   └── ...
├── imgs/ - imgs displayed/
│   └── ...
└── labda/ - AWS lambda files. Only backup - changes won't get pushed to AWS/
    ├── lamda_function.py - script of AWS lambda function.
    └── ... the rest is python packages needed for function.
