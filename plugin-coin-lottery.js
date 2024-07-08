var jsPsychCoinLottery = (function(jspsych) {

    const info = {
        name: 'coin-lottery',
        parameters: {
            num_rects: {
                type: jspsych.ParameterType.INT,
                default: 9,
                description: 'Number of rectangle divs'
            },
            num_rows: {
                type: jspsych.ParameterType.INT,
                default: 3,
                description: 'Number of rows in the grid'
            },
            num_cols: {
                type: jspsych.ParameterType.INT,
                default: 3,
                description: 'Number of columns in the grid'
            },
            flip: {
                type: jspsych.ParameterType.BOOL,
                default: true,
                description: 'Whether to allow flipping the divs'
            }
        }
    };

    class CointLotteryPlugin {
        constructor(jsPsych) {
            this.jsPsych = jsPsych;
        }

        trial(display_element, trial) {
            // Create the container div
            display_element.innerHTML = '<div id="container"></div>';
            const container = display_element.querySelector('#container');
            
            const m = trial.num_rects; // Number of divs
            const j = trial.num_rows; // Number of rows
            const k = trial.num_cols; // Number of columns
    
            // Create and append divs
            for (let i = 0; i < m; i++) {
                const div = document.createElement('div');
                div.className = 'rect';
                div.id = `rect-${i}`;
    
                const front = document.createElement('div');
                front.className = 'side front';
                const back = document.createElement('div');
                back.className = 'side back';
    
                div.appendChild(front);
                div.appendChild(back);
                container.appendChild(div);
            }
    
            // Add CSS styles
            const style = document.createElement('style');
            style.innerHTML = `
                #container {
                    position: relative;
                    width: 100%;
                    height: 500px;
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
                    gap: 10px;
                }
                .rect {
                    width: 100px;
                    height: 100px;
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
                .rect .front {
                    background-color: blue;
                }
                .rect .back {
                    background-color: red;
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
                    const x = col * 110; // 100px width + 10px gap
                    const y = row * 110; // 100px height + 10px gap
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
            function shuffleDivs() {
                const rects = Array.from(document.querySelectorAll('.rect'));
                const indices = rects.map((_, i) => i);
                const shuffledIndices = shuffleArray(indices);
    
                rects.forEach((rect, index) => {
                    const newIndex = shuffledIndices[index];
                    const row = Math.floor(newIndex / k);
                    const col = newIndex % k;
                    const x = col * 110;
                    const y = row * 110;
                    rect.style.transform = `translate(${x}px, ${y}px) rotateY(${rect.classList.contains('flipped') ? 180 : 0}deg)`;
                });
            }
    
            // Flip function
            function flipAllDivs() {
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

            // Make clickable function
            function makeClickable(){
                const rects = document.querySelectorAll('.rect');
                rects.forEach(rect => {
                    // Add click event listener to flip the rect
                    rect.addEventListener('click', function() {
                        rect.classList.toggle('flipped');
                        const transform = rect.style.transform;
                        if (rect.classList.contains('flipped')) {
                            rect.style.transform = transform + ' rotateY(180deg)';
                        } else {
                            rect.style.transform = transform.replace(' rotateY(180deg)', '');
                        }
                    });
                });
            }
        
            // Add flip button if flip is enabled
            if (trial.flip) {
                const flipButton = document.createElement('button');
                flipButton.innerHTML = 'Flip and shuffle';
                flipButton.onclick = () => {
                    flipAllDivs();
                    jsPsych.pluginAPI.setTimeout(shuffleDivs, 600);
                    makeClickable();
                };
                display_element.appendChild(flipButton);
            }
    
            // Add end trial button
            const endButton = document.createElement('button');
            endButton.innerHTML = 'End Trial';
            endButton.onclick = () => {
                display_element.innerHTML = ""; // Clear the display
                jsPsych.finishTrial();
            };
            display_element.appendChild(endButton);
        }
    }

    CointLotteryPlugin.info = info;

    return CointLotteryPlugin;

})(jsPsychModule);
