const grid = document.getElementById("grid");
const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("time");

let score = 0;
let currentMole = null;
let gameInterval;
let countdown;

function createGrid() {
    grid.innerHTML = "";
    for (let i = 0; i < 9; i++) {
        const hole = document.createElement("div");
        hole.classList.add("hole");
        hole.addEventListener("click", () => whackMole(hole));
        grid.appendChild(hole);
    }
}

function randomMole() {
    const holes = document.querySelectorAll(".hole");
    holes.forEach(h => h.classList.remove("mole"));

    const randomIndex = Math.floor(Math.random() * holes.length);
    holes[randomIndex].classList.add("mole");
    currentMole = holes[randomIndex];
}

function whackMole(hole) {
    if (hole === currentMole) {
        score++;
        scoreDisplay.textContent = score;
        hole.classList.remove("mole");
        currentMole = null;
    }
}

function startGame() {
    score = 0;
    scoreDisplay.textContent = score;
    timeDisplay.textContent = 30;

    createGrid();

    gameInterval = setInterval(randomMole, 800);

    let timeLeft = 30;
    countdown = setInterval(() => {
        timeLeft--;
        timeDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(gameInterval);
            clearInterval(countdown);
            alert("Game Over! Your score: " + score);
        }
    }, 1000);
}
