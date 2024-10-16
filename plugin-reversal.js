var jsPsychReversal = (function (jspsych) {
  "use strict";

  const info = {
    name: "reversal",
    version: "0.1", 
    parameters: {
      /** Value of left-hand side feedback */
      feedback_left: {
        type: jspsych.ParameterType.FLOAT,
        default: undefined,
      },
      /** Value of right-hand side feedback */
      feedback_right: {
        type: jspsych.ParameterType.FLOAT,
        default: undefined,
      },
      /** Coin image filenames */
      coin_images: {
        type: jspsych.ParameterType.OBJECT,
        default: {
            0.01: "1penny.png",
            1.0: "1pound.png"
        },
      },
      /** Duration of coin toss animation in ms */
      animation_duration: {
        type: jspsych.ParameterType.INT,
        default: 900
      },
      /** Duration of coin toss animation in ms */
      response_deadline: {
        type: jspsych.ParameterType.INT,
        default: 3000
      },
    },
    data: {
      /** Value of left-hand side feedback. */
      feedback_left: {
        type: jspsych.ParameterType.FLOAT,
      },
      /** Value of left-hand side feedback. */
      feedback_right: {
        type: jspsych.ParameterType.FLOAT,
      },
      /** The participants' chioce (left or right) */
      choice: {
        type: jspsych.ParameterType.STRING
      },
      /** Reaction time */
      rt: {
        type: jspsych.ParameterType.INT
      },
      /** Presented outcome */
      chosen_outcome: {
        type: jspsych.ParameterType.FLOAT
      }
    },
  };

  /**
   * **{name}**
   *
   * {description}
   *
   * @author {author}
   * @see {@link {documentation-url}}
   */
  class PluginNamePlugin {
    constructor(jsPsych) {
      this.jsPsych = jsPsych;
    }
    trial(display_element, trial) {
      // data saving
      var trial_data = {
        data1: 99, // Make sure this type and name matches the information for data1 in the data object contained within the info const.
        data2: "hello world!", // Make sure this type and name matches the information for data2 in the data object contained within the info const.
      };
      // end trial
      this.jsPsych.finishTrial(trial_data);
    }
  }
  PluginNamePlugin.info = info;

  return PluginNamePlugin;
})(jsPsychModule);