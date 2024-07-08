var jsPsychCoinLottery = (function(jspsych) {

    const info = {
        name: 'coin-lottery',
        parameters: {
            num_rects: {
                type: jspsych.ParameterType.INT,
                default: 30,
                description: 'Number of rectangle divs'
            },
            num_rows: {
                type: jspsych.ParameterType.INT,
                default: 5,
                description: 'Number of rows in the grid'
            },
            num_cols: {
                type: jspsych.ParameterType.INT,
                default: 6,
                description: 'Number of columns in the grid'
            },
            n_flips: {
                type: jspsych.ParameterType.INT,
                default: 3,
                description: 'Number of flips allowed'
            },
            card_width: {
                type: jspsych.ParameterType.INT,
                default: 100,
                description: 'Width of card in _'
            },
            card_height: {
                type: jspsych.ParameterType.INT,
                default: 100,
                description: 'Height of card in _'
            },
            card_gap: {
                type: jspsych.ParameterType.INT,
                default: 10,
                description: 'Gap between cards in _'
            },
            coins: {
                type: jspsych.ParameterType.COMPLEX,
                default: undefined,
                description: "Coin values to show"
            },
            props: {
                type: jspsych.ParameterType.COMPLEX,
                default: undefined,
                description: "Proportions of coin values"
            },
            values: {
                type: jspsych.ParameterType.COMPLEX,
                default: [0.01, 0.5, 1],
                description: "Unique coin values, match props in indices"
            }
        }
    };

    class CoinLotteryPlugin {
        constructor(jsPsych) {
            this.jsPsych = jsPsych;
        }

        trial(display_element, trial) {
            
            // Placeholder for choices
            var response = {
                choices: [],
                rts: []
            }

            // Placeholder for start time
            var start_time;

            // Create the container div
            display_element.innerHTML = '<div id="container"></div>';
            const container = display_element.querySelector('#container');
            
            const m = trial.num_rects; // Number of divs
            const j = trial.num_rows; // Number of rows
            const k = trial.num_cols; // Number of columns

            // Coin dictionary
            const coin_names = {
                0.01: "1penny",
                0.5: "50pence",
                1: "1pound"
            }
    
            // Create and append divs
            for (let i = 0; i < m; i++) {
                const div = document.createElement('div');
                div.className = 'rect';
                div.id = `rect-${i}`;
                div.setAttribute("data-choice", i)
    
                const front = document.createElement('div');
                front.className = 'side front';
                const back = document.createElement('div');
                back.className = 'side back';

                const coin = document.createElement('img');
                coin.className = 'coin';
                coin.src = "imgs/" + coin_names[trial.coins[i]] + ".png"
                coin.id = `coin-${i}`
                
                front.appendChild(coin);
                div.appendChild(front);
                div.appendChild(back);
                container.appendChild(div);
            }
    
            // Add CSS styles
            const style = document.createElement('style');
            style.innerHTML = `
                #container {
                    position: relative;
                    height: ${(trial.num_rows * (trial.card_height + trial.card_gap))}px;
                    width: ${(trial.num_cols * (trial.card_width + trial.card_gap))}px;
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
                    gap: 10px;
                }
                .rect {
                    width: ${trial.card_width}px;
                    height: ${trial.card_height}px;
                    position: absolute;
                    transition: transform 0.5s ease;
                    transform-style: preserve-3d;
                    perspective: 1000px;
                }
                .rect .side {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    backface-visibility: hidden;
                    border: 1px solid #000;
                }
                .rect .coin {
                    width: 100%;
                    height: 100%;
                    backface-visibility: hidden;
                }

                .rect .front {
                    background-color: lightgrey;
                }
                .rect .back {
                    background-color: darkgrey;
                    transform: rotateY(180deg);
                }
                .flipped {
                    transform: rotateY(180deg);
                }
            `;
            document.head.appendChild(style);
    
            // Function to position divs in grid
            function positionDivs() {
                const rects = document.querySelectorAll('.rect');
                rects.forEach((rect, index) => {
                    const row = Math.floor(index / k);
                    const col = index % k;

                    // Find coordinates of rect
                    const x = col * (trial.card_width + trial.card_gap); 
                    const y = row * (trial.card_height + trial.card_gap); 
                    rect.style.transform = `translate(${x}px, ${y}px) rotateY(${rect.classList.contains('flipped') ? 180 : 0}deg)`;
                });
            }
    
            // Initial positioning
            positionDivs();
    
            // Fisher-Yates shuffle with check for unchanged positions
            function shuffleArray(array) {
                let shuffled = false;
                while (!shuffled) {
                    for (let i = array.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1));
                        [array[i], array[j]] = [array[j], array[i]];
                    }
                    shuffled = array.every((val, index) => val !== index);
                }
                return array;
            }
    
            // Shuffle function
            function shuffle_cards() {
                const rects = Array.from(document.querySelectorAll('.rect'));
                const indices = rects.map((_, i) => i);
                const shuffledIndices = shuffleArray(indices);
    
                rects.forEach((rect, index) => {
                    const newIndex = shuffledIndices[index];
                    const row = Math.floor(newIndex / k);
                    const col = newIndex % k;
                    const x = col * (trial.card_width + trial.card_gap); 
                    const y = row * (trial.card_height + trial.card_gap); 
                    rect.style.transform = `translate(${x}px, ${y}px) rotateY(${rect.classList.contains('flipped') ? 180 : 0}deg)`;
                });
            }

            // Remove image function
            function remove_imgs(){
                const rects = Array.from(document.querySelectorAll('.rect'));
                
                rects.forEach((rect, i) => {
                    var img = document.getElementById(`coin-${i}`);

                    if (img) {
                        rect.children[0].removeChild(img);
                    }                    

                })
            }
    
            // Flip function
            function flip_all_cards() {
                const rects = document.querySelectorAll('.rect');
                rects.forEach(rect => {
                    rect.classList.toggle('flipped');
                    const transform = rect.style.transform;
                    if (rect.classList.contains('flipped')) {
                        rect.style.transform = transform + ' rotateY(180deg)';
                    } else {
                        rect.style.transform = transform.replace(' rotateY(180deg)', '');
                    }
                });
            }

            // Function for each button click
            function click_function(e) {

                var rect = e.currentTarget;

                // Get data
                var choice = rect.getAttribute("data-choice");
                var rt = Math.round(performance.now() - start_time);

                response.choices.push(choice);
                response.rts.push(rt);

                // Call after_last_response if last response
                if (response.choices.length >= trial.n_flips){
                    after_last_response();
                }

                // Add coin
                var draw = sampleCategorical(trial.props);
                console.log(draw);
                
                const coin = document.createElement('img');
                coin.className = 'coin';
                coin.src = "imgs/" + coin_names[trial.values[draw]] + ".png"

                rect.children[0].appendChild(coin);

                // Flip
                rect.classList.toggle('flipped');
                const transform = rect.style.transform;
                if (rect.classList.contains('flipped')) {
                    rect.style.transform = transform + ' rotateY(180deg)';
                } else {
                    rect.style.transform = transform.replace(' rotateY(180deg)', '');
                }
            }

            // Make clickable function
            function make_clickable(){

                const rects = document.querySelectorAll('.rect');
                rects.forEach(rect => {
                    // Add click event listener to flip the rect
                    rect.addEventListener('click', click_function);
                });
            }

            // What to do after last response
            function after_last_response(){
                const rects = document.querySelectorAll('.rect');
                rects.forEach(rect => {
                    rect.removeEventListener('click', click_function);
                });
            }

            // End trial function
            function end_trial() {
                // kill any remaining setTimeout handlers
                jsPsych.pluginAPI.clearAllTimeouts();

                // Clear the display
                display_element.innerHTML = ""; 

                jsPsych.finishTrial(response);
            }

            // What to do when button is clicked
            function initiate_button () {
                // Flip cards
                flip_all_cards();
                
                // Shuffle cards
                jsPsych.pluginAPI.setTimeout(shuffle_cards, 600);
                
                // Make them clickable
                make_clickable();
                
                // Remove images
                remove_imgs();

                // Start measuring RT
                start_time = performance.now();
            }

            // Sample from categorical distribution
            function sampleCategorical(probabilities) {
                // Step 1: Generate a random number between 0 and 1
                const random = Math.random();
                
                // Step 2: Initialize cumulative sum
                let cumulativeSum = 0;
                
                // Step 3: Iterate through probabilities array
                for (let i = 0; i < probabilities.length; i++) {
                    cumulativeSum += probabilities[i];
                    
                    // Step 4: Select the category if the random number is less than the cumulative sum
                    if (random < cumulativeSum) {
                        return i;
                    }
                }
                
                // In case of floating point precision issues, return the last category
                return probabilities.length - 1;
            }
        
            // Add flip button
            const flipButton = document.createElement('button');
            flipButton.innerHTML = 'Flip and shuffle';
            flipButton.onclick = initiate_button;
            display_element.appendChild(flipButton);
    
            // Add end trial button
            const endButton = document.createElement('button');
            endButton.innerHTML = 'End Trial';
            endButton.onclick = end_trial;
            display_element.appendChild(endButton);
        }
    }

    CoinLotteryPlugin.info = info;

    return CoinLotteryPlugin;

})(jsPsychModule);
