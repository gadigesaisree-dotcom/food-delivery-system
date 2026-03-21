const quizData = [
    {
        question: "Which language runs in a web browser?",
        options: ["Java", "C", "Python", "JavaScript"],
        correct: 3
    },
    {
        question: "What does CSS stand for?",
        options: ["Central Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Creative Style System"],
        correct: 1
    },
    {
        question: "What does HTML stand for?",
        options: ["Hyperlinks Text Mark Language", "Hyper Text Markup Language", "Home Tool Markup Language", "Hyper Tool Multi Language"],
        correct: 1
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

function loadQuestion() {
    const q = quizData[currentQuestion];
    document.getElementById("question").textContent = q.question;

    const answersDiv = document.getElementById("answers");
    answersDiv.innerHTML = "";

    q.options.forEach((option, index) => {
        const btn = document.createElement("button");
        btn.textContent = option;
        btn.onclick = () => selectAnswer(index);
        answersDiv.appendChild(btn);
    });

    answered = false;
}

function selectAnswer(index) {
    if (answered) return;

    const correctIndex = quizData[currentQuestion].correct;
    const buttons = document.querySelectorAll("#answers button");

    buttons.forEach((btn, i) => {
        btn.style.background = i === correctIndex ? "green" : "red";
    });

    if (index === correctIndex) score++;
    answered = true;
}

function nextQuestion() {
    if (!answered) {
        alert("Please select an answer!");
        return;
    }

    currentQuestion++;

    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        document.querySelector(".quiz-container").innerHTML = 
            `<h2>Quiz Finished!</h2>
             <p>Your Score: ${score} / ${quizData.length}</p>`;
    }
}

loadQuestion();
