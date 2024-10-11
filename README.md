# RELMED probabilistic learning task pilot #3
This reposistory hosts the experiment website for the second pilot of the vigour task for RELMED （Internal name Pilot 3, 3.1, and 3.2). The task is coded with jsPsych.

Data is written to REDCap via a call to an AWS lamda function.

Additionally, future versions should implement condition assignment via the lambda funciton / hosting server, as Prolfic doesn't handle this well (it doesn't exclude participants from concurrently running studies).

## Files in this repository
```
.
├── consent.html - first page particiapnts land on.
├── experiment.html - main experiment script, participants are redirected here from consent.
├── instructions.js - PLT instruction-generation functions.
├── plugin-coin-lottery.js - jsPsych plugin for lottery to determine bonus.
├── plugin-PLT.js - jsPsych plugin for PLT trial.
├── utils.js - various functions used in the experiment.
├── style.css - stylesheet for consent.html
├── PLT_task_structure_XX.json - files containing timeline variables for the stimuli and feedback sequences in each block and trial.
├── jspsych/ - jsPsych library and plugins used in the experiment.
│   └── ...
├── imgs/ - imgs displayed
│   └── ...
└── labda/ - AWS lambda files. Only backup - changes won't get pushed to AWS/
    ├── lamda_function.py - script of AWS lambda function.
    └── ... the rest is python packages needed for function.
```
