const diceFaces = ["⚀","⚁","⚂","⚃","⚄","⚅"];
let historyList = document.getElementById("history");

function rollDice() {
    const randomIndex = Math.floor(Math.random() * 6);
    const dice = document.getElementById("dice");

    dice.textContent = diceFaces[randomIndex];

    const li = document.createElement("li");
    li.textContent = "Rolled: " + (randomIndex + 1);
    historyList.prepend(li);
}
