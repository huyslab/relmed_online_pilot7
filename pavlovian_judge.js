const PIT_imgs = [
  "imgs/PIT1.png",
  "imgs/PIT2.png",
  "imgs/PIT3.png",
  "imgs/PIT4.png",
  "imgs/PIT5.png",
  "imgs/PIT6.png"
];
function getOrCreateImgContainer() {
  let imgContainer = document.getElementById('img-container');
  if (!imgContainer) {
    imgContainer = document.createElement('div');
    imgContainer.id = 'img-container';
    document.body.appendChild(imgContainer);
  }
  return imgContainer;
}
function styleImgContainer(imgContainer, sortBorder) {
  imgContainer.style.position = 'absolute';
  imgContainer.style.zIndex = '-1';
  imgContainer.style.display = 'flex';
  imgContainer.style.justifyContent = 'space-around';
  if (sortBorder && imgContainer) {
    const rect = sortBorder.getBoundingClientRect();
    imgContainer.style.top = `${rect.top}px`;
    imgContainer.style.left = `${rect.left}px`;
    imgContainer.style.width = `${rect.width}px`;
    imgContainer.style.height = `${rect.height}px`;
  }
  if (sortBorder) {
    const coinImages = [
      "imgs/1poundbroken.png",
      "imgs/50pencebroken.png",
      "imgs/1pennybroken.png",
      "imgs/1penny.png",
      "imgs/50pence.png",
      "imgs/1pound.png"
    ];
    coinImages.forEach(src => {
      const img = document.createElement('img');
      img.src = src;
      img.style.pointerEvents = 'none';
      img.style.width = '90px';
      img.style.height = 'auto';
      img.style.objectFit = 'contain';
      img.draggable = false;
      img.style.userSelect = 'none';
      imgContainer.appendChild(img);
    });
  }
}

const sortTrial = {
  type: jsPsychFreeSort,
  stimuli: PIT_imgs,
  stim_width: 100,
  stim_height: 100,
  scale_factor: 1.25,
  sort_area_shape: "square",
  sort_area_width: 750,
  sort_area_height: 150,
  stim_starts_inside: false,
  prompt: "<p><span class='highlight'>Click and drag the images below to sort them so that similar items are close together.</span></p>",
  on_load: function () {
    const sortBorder = document.getElementById('jspsych-free-sort-border');
    let imgContainer = getOrCreateImgContainer();
    styleImgContainer(imgContainer, sortBorder);
  },
  on_finish: function (data) {
    const imgContainer = document.getElementById('img-container');
    imgContainer.remove();
  },
  simulation_options: {
    simulate: false
  }
};