const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById ('answer-buttons')

//variables for quiz
var quizTimer = document.getElementById("timer");
var timeLeft = 40;
var timerInterval;

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

// Game start
function startGame() {
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(()=> Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()

    //Time start
     timerInterval = setInterval(function() {
     timeLeft--;
     quizTimer.textContent = "Time left: " + timeLeft;
        
         if(timeLeft === 0) {
              clearInterval(timerInterval);
            }
          }, 1000);
    }

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('selects')
        if (answer.correct) {
            button.dataset.correct =answer.correct
        }
            button.addEventListener('click', selectAnswer)
            answerButtonsElement.appendChild(button)
    })
}

//Reset answers
function resetState(){
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while(answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild
        (answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if(shuffledQuestions.length > currentQuestionIndex + 1){
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
}
 
function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct){
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

//. list of questions for the quiz 

const questions = [
    {
        question: 'Commonly used data types do not include:',
        answers: [
            {text:'Alerts', correct: true },
            {text:'Booleans',correct: false},
            {text:'Numbers', correct: false},
            {text:'Strings', correct: false}

        ]
    },

    {
        question: 'JS stands for',
        answers: [
            {text:'Javascript', correct: true },
            {text:'John Smith',correct: false},
            {text:'tacos', correct: false},
            {text:'Just Simply', correct: false}

        ]
    },
    {
        question: 'Primary resource for styling a webpage',
        answers: [
            {text:'CSS', correct: true },
            {text:'MS Paint',correct: false},
            {text:'HTML', correct: false},
            {text:'JS', correct: false}

        ]
    }
]
