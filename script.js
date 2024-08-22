const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            {text: "Shark",correct: false},
            {text: "Blue Whale",correct: true},
            {text: "Elephant",correct: false},
            {text: "Giraffe",correct: false},
        ]
    },
    {
        question: "Which is smallest continent the world?",
        answers: [
            {text: "Asia",correct: false},
            {text: "Australia",correct: true},
            {text: "Arctic",correct: false},
            {text: "Africa",correct: false},
        ]
    },
    {
        question: "What comapny was originally called 'Cadabra'?",
        answers: [
            {text: "Google",correct: false},
            {text: "Microsoft",correct: false},
            {text: "Adobe",correct: false},
            {text: "Amazon",correct: true},
        ]
    },
    {
        question: "Which city is known as 'The Eternal City'?",
        answers: [
            {text: "Norway",correct: false},
            {text: "Mumbai",correct: false},
            {text: "Rome",correct: true},
            {text: "London",correct: false},
        ]
    },
    {
        question: "Which palnet in the milky way is hottest?",
        answers: [
            {text: "Venus",correct: true},
            {text: "Mars",correct: false},
            {text: "Jupiter",correct: false},
            {text: "Earth",correct: false},
        ]
    },
    {
        question: "Which is the only body part that is fully grown from birth?",
        answers: [
            {text: "Ears",correct: false},
            {text: "Eyes",correct: true},
            {text: "Nose",correct: false},
            {text: "Tounge",correct: false},
        ]
    },
    {
        question: "Which country has most islands?",
        answers: [
            {text: "China",correct: false},
            {text: "India",correct: false},
            {text: "Sweden",correct: true},
            {text: "Britain",correct: false},
        ]
    },
    {
        question: "How many dots appear on a pair of dice?",
        answers: [
            {text: "42",correct: true},
            {text: "24",correct: false},
            {text: "32",correct: false},
            {text: "23",correct: false},
        ]
    },
    {
        question: "In which country Elon Musk born?",
        answers: [
            {text: "England",correct: false},
            {text: "West Indies",correct: false},
            {text: "America",correct: false},
            {text: "South Africa",correct: true},
        ]
    },
    {
        question: "Compared to the body weight ,which animal is strongest?",
        answers: [
            {text: "Ant",correct: false},
            {text: "Elephant",correct: false},
            {text: "Dung Beetle",correct: true},
            {text: "Cow",correct: false},
        ]
    }
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct ==="true";
    if(isCorrect){
        selectBtn.classList.add("correct");
        score++;
    }else{
        selectBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
});

startQuiz();