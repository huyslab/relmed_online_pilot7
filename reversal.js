// This files creates the jsPsych timeline for the reversal task block

// Parameters
const rev_n_trials = 200; // N trials

// Parse json sequence
const reversal_timeline = JSON.parse(reversal_json);

// Assemble list of blocks
var reversal_blocks = [];
for (i=0; i<reversal_timeline.length; i++){
    reversal_blocks.push([
        {
            timeline: [
                {
                    timeline: [{
                        type: jsPsychReversal,
                        feedback_right: jsPsych.timelineVariable('feedback_right'),
                        feedback_left: jsPsych.timelineVariable('feedback_left'),
                        optimal_right: jsPsych.timelineVariable('optimal_right')
                    }],
                    conditional_function: () => {

                        // Check whether participants are up to crtierion
                        const criterion = jsPsych.evaluateTimelineVariable('criterion');

                        let num_correct = jsPsych.data.get()
                            .filter({block: jsPsych.evaluateTimelineVariable('block'), trial_type: 'reversal'})
                            .select('response_optimal').sum()

                        // Check whether trial limit reached
                        let n_trials = jsPsych.data.get()
                        .filter({trial_type: 'reversal'})
                        .count()

                        return (n_trials < rev_n_trials) && (num_correct < criterion)
                }
            }
            ],
            timeline_variables: reversal_timeline[i],
            data: {
                block: jsPsych.timelineVariable('block'),
                trial: jsPsych.timelineVariable('trial')
            }
        }
    ]);
}