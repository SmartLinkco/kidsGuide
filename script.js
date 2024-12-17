const questions = [
    {
        question: "What can we do to save water?",
        options: [
            "Leave the tap running while brushing teeth",
            "Take longer showers",
            "Turn off the tap while brushing teeth",
            "Play with water"
        ],
        correct: 2
    },
    {
        question: "Which of these helps reduce pollution?",
        options: [
            "Walking or cycling to nearby places",
            "Using more plastic bags",
            "Leaving lights on when not in use",
            "Taking the car for very short distances"
        ],
        correct: 0
    },
    {
        question: "What should we do with empty plastic bottles?",
        options: [
            "Throw them in the ocean",
            "Burn them",
            "Throw them in regular trash",
            "Recycle them"
        ],
        correct: 3
    },
    {
        question: "Which is good for the environment?",
        options: [
            "Planting trees",
            "Cutting down forests",
            "Using more paper",
            "Leaving garbage in parks"
        ],
        correct: 0
    },
    {
        question: "What helps save electricity?",
        options: [
            "Leaving TV on when not watching",
            "Turning off lights when leaving a room",
            "Using old inefficient bulbs",
            "Keeping the refrigerator door open"
        ],
        correct: 1
    },
    {
        question: "Which animal is endangered?",
        options: [
            "House cat",
            "Pigeon",
            "Giant Panda",
            "Chicken"
        ],
        correct: 2
    },
    {
        question: "What can we do with food scraps?",
        options: [
            "Throw them in regular trash",
            "Make compost",
            "Throw them on the street",
            "Burn them"
        ],
        correct: 1
    },
    {
        question: "Which is renewable energy?",
        options: [
            "Coal",
            "Oil",
            "Solar power",
            "Gasoline"
        ],
        correct: 2
    },
    {
        question: "What helps keep our oceans clean?",
        options: [
            "Using more plastic",
            "Throwing trash in the water",
            "Using reusable bags",
            "Using disposable items"
        ],
        correct: 2
    },
    {
        question: "Which is best for carrying groceries?",
        options: [
            "Plastic bags",
            "Reusable cloth bags",
            "Paper bags",
            "Getting new bags every time"
        ],
        correct: 1
    }
];

let currentQuestion = 0;
let score = 0;

function loadQuestion() {
    const quizContainer = document.getElementById('quiz');
    const question = questions[currentQuestion];
    
    const questionHTML = `
        <div class="question active">
            <h2>Question ${currentQuestion + 1}/10:</h2>
            <p>${question.question}</p>
            <div class="options">
                ${question.options.map((option, index) => `
                    <button onclick="checkAnswer(${index})">${option}</button>
                `).join('')}
            </div>
            <div class="feedback"></div>
        </div>
    `;
    
    quizContainer.innerHTML = questionHTML;
}

function checkAnswer(selectedOption) {
    const question = questions[currentQuestion];
    const feedback = document.querySelector('.feedback');
    const buttons = document.querySelectorAll('button');
    
    buttons.forEach(button => button.disabled = true);
    
    if (selectedOption === question.correct) {
        score++;
        feedback.innerHTML = "🎉 Correct! Well done!";
        feedback.className = "feedback correct";
        playSound(true);
    } else {
        feedback.innerHTML = "❌ Oops! The correct answer was: " + 
            question.options[question.correct];
        feedback.className = "feedback incorrect";
        playSound(false);
    }

    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < questions.length) {
            loadQuestion();
        } else {
            showResult();
        }
    }, 2000);
}

function showResult() {
    const resultDiv = document.getElementById('result');
    const percentage = (score / questions.length) * 100;
    let message = "";

    if (percentage === 100) {
        message = "🌟 Amazing! You're a true Earth Hero!";
    } else if (percentage >= 70) {
        message = "🌱 Great job! You know a lot about saving our planet!";
    } else if (percentage >= 50) {
        message = "🌍 Good effort! Keep learning about our environment!";
    } else {
        message = "🌱 Keep learning! Every day is a chance to learn more about our Earth!";
    }

    resultDiv.innerHTML = `
        <h2>Quiz Complete!</h2>
        <p>You got ${score} out of ${questions.length} questions correct!</p>
        <p>${message}</p>
        <button onclick="resetQuiz()">Try Again</button>
    `;
    document.getElementById('quiz').innerHTML = '';
}

function resetQuiz() {
    currentQuestion = 0;
    score = 0;
    document.getElementById('result').innerHTML = '';
    loadQuestion();
}

function playSound(correct) {
    const audio = new Audio(correct ? 'ding.mp3' : 'buzz.mp3');
    audio.play();
}

function moveWatermark() {
    const watermark = document.querySelector('.watermark');
    const quizContainer = document.querySelector('.quiz-container');
    const quizRect = quizContainer.getBoundingClientRect();
    
    function updatePosition() {
        const maxX = window.innerWidth - 200;
        const maxY = window.innerHeight - 50;
        let newX, newY;
        
        do {
            newX = Math.random() * maxX;
            newY = Math.random() * maxY;
        } while (
            newX < quizRect.right && 
            newX > quizRect.left - 200 && 
            newY < quizRect.bottom && 
            newY > quizRect.top - 50
        );

        watermark.style.transform = `translate(${newX}px, ${newY}px)`;
    }

    updatePosition();
    setInterval(updatePosition, 8000);
}

window.addEventListener('load', moveWatermark);

// Start the quiz when page loads
loadQuestion();