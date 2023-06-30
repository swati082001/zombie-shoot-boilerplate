// Iteration 1: Declare variables required for this game
let timerBox = document.getElementById("timer-box");
let timerInSec = document.getElementById("timer").textContent;
let maxlives = document.getElementById("max-lives");
let lives = document.getElementById("lives");
let gameBody = document.getElementById("game-body");
var zombieId = 0;
const img = [
  "zombie-1.png",
  "zombie-2.png",
  "zombie-4.png",
  "zombie-5.png",
  "zombie-6.png",
];


// Iteration 1.2: Add shotgun sound
let shotgunSound = new Audio("./assets/shotgun.wav");
shotgunSound.volume = 0.2;
gameBody.onclick = () => {
  shotgunSound.pause();
  shotgunSound.currentTime = 0;
  shotgunSound.play();
};

// Iteration 1.3: Add background sound
const bgSound = new Audio("./assets/bgm.mp3");
bgSound.play();
bgSound.loop = true;

// Iteration 1.4: Add lives
const maximumLives = 4;
var live = 4;


// Iteration 2: Write a function to make a zombie
function makeZombie() {
    randomImage = img[getRandomInt(0, img.length)];
    gameBody.innerHTML += `<img src="./assets/${randomImage}" class="zombie-image" id="zombie${zombieId}">`;
    let zombie = document.getElementById("zombie" + zombieId);
    zombie.style.transform = `translateX(${getRandomInt(20, 80)}vw)`;
    zombie.style.animationDuration = `${getRandomInt(2, 6)}s`;
    zombie.onclick = () => {
      zombieDestruct(zombie);
    };
  }

// Iteration 3: Write a function to check if the player missed a zombie
function checkCollision(zombie) {
    if (zombie.getBoundingClientRect().top <= 0) {
      live--;
      return true;
    }
    return false;
  }
  

// Iteration 4: Write a function to destroy a zombie when it is shot or missed
function zombieDestruct(zombie) {
    zombie.style.display = "none";
    zombieId++;
    makeZombie();
  }
  

// Iteration 5: Creating timer

let timer = setInterval(function () {
    timerInSec--;
    document.getElementById("timer").textContent = timerInSec;
    let zombie = document.getElementById("zombie" + zombieId);
    if (checkCollision(zombie) == true) {
      zombieDestruct(zombie);
      if (live == 0) {
        clearInterval(timer);
        location.href = "./game-over.html";
      }
    }
    if (timerInSec == 0) {
      clearInterval(timer);
      location.href = "./win.html";
    }
  }, 1000);
  

// Iteration 6: Write a code to start the game by calling the first zombie
makeZombie(zombieId);

// Iteration 7: Write the helper function to get random integer
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }




