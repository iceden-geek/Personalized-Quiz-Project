// Get all required elements
const sModals = document.querySelectorAll('.s-modal')
const hModals = document.querySelectorAll('.h-modal')
const spModals = document.querySelectorAll('.sp-modal')
const mModals = document.querySelectorAll('.m-modal')
const scienceCard = document.getElementById('science')
const historyCard = document.getElementById('history')
const sportsCard = document.getElementById('sports')
const moviesCard = document.getElementById('movies')
const main = document.querySelector('main')
const note = document.querySelector('.note')
const topic = document.querySelectorAll('.topic')
const sAnswerInput = document.querySelectorAll('.sAnswer')
const hAnswerInput = document.querySelectorAll('.hAnswer')
const spAnswerInput = document.querySelectorAll('.spAnswer')
const mAnswerInput = document.querySelectorAll('.mAnswer')
const sSubmitButtons = document.querySelectorAll('.sSubmit')
const hSubmitButtons = document.querySelectorAll('.hSubmit')
const spSubmitButtons = document.querySelectorAll('.spSubmit')
const mSubmitButtons = document.querySelectorAll('.mSubmit')
const result = document.querySelector('#result')
const result_1 = document.querySelector('#result-1')
const atom =document.querySelector('.atom')
const resultMessage = document.querySelector('.message')
const scoreBasedMessage = document.querySelector('.scoreBasedMessage')
const retakeButton = document.querySelector('.retake')
const exitButton = document.querySelector('.exit')
const timer = document.querySelector('.timer')

// Declaring required variables
let currentModal = []
let currentCard = []
let submitButtons = []
let answerInput = []
let scienceUserAnswers = []
let historyUserAnswers = []
let sportsUserAnswers = []
let moviesUserAnswers = []
let scienceCorrectAnswers = ['A', 'D', 'C', 'A', 'B']
let historyCorrectAnswers = ['C', 'B', 'B', 'C', 'A']
let sportsCorrectAnswers = ['B', 'B', 'A', 'C', 'D']
let moviesCorrectAnswers = ['A', 'C', 'B', 'A', 'C']
let timeLimit = 50

// Function that displays the questions and lets user input the answers then submit
function answerQuestions() {
    submitButtons.forEach((button, index) => { // Grabbing each button
        quizTimer(index) // starting the timer
        button.addEventListener('click', (event) => {
            let response = answerInput[index].value // Getting the user answer
            takeUserAnswers(index)
            if (response === '') {
                event.preventDefault()
                // Outline the input red when no answer is given
                answerInput[index].classList.add('input-empty')
                answerInput[index].addEventListener('input', () => {
                    answerInput[index].classList.remove('input-empty')
                })
            } else {
                // Hide current modal
                event.preventDefault()
                answerInput[index].value = ''
                currentModal[index].style.display = 'none'
                // Show next modal
                if (index < currentModal.length - 1) {
                    currentModal[index + 1].style.display = 'block'
                }
                if (index === currentModal.length - 1) {
                    // Displaying the results when the user finishes the quiz
                    displayResultMessage()
                    displayResultModal()
                    // Giving the user an option to retake the quiz or exit
                    retakeQuiz()
                    closeResultModal()
                }
            }
        })
    })
}

// function to open the modal with science questions
function sModalOpenStyling() {
    currentModal = sModals
    currentCard = scienceCard
    submitButtons = sSubmitButtons
    answerInput = sAnswerInput
    sModals[0].style.display = 'block'
    timer.style.display = 'block'
    main.classList.add('blur')
    note.classList.add('blur')
    topic.forEach(subject => {
        subject.classList.add('topic-open')
    })
    removeModalEventListeners()
    answerQuestions()
}

// function to open the modal with history questions
function hModalOpenStyling() {
    currentModal = hModals
    currentCard = historyCard
    submitButtons = hSubmitButtons
    answerInput = hAnswerInput
    hModals[0].style.display = 'block'
    timer.style.display = 'block'
    main.classList.add('blur')
    note.classList.add('blur')
    topic.forEach(subject => {
        subject.classList.add('topic-open')
    })
    removeModalEventListeners()
    answerQuestions()
}

// function to open the modal with sports questions
function spModalOpenStyling() {
    currentModal = spModals
    currentCard = sportsCard
    submitButtons = spSubmitButtons
    answerInput = spAnswerInput
    spModals[0].style.display = 'block'
    timer.style.display = 'block'
    main.classList.add('blur')
    note.classList.add('blur')
    topic.forEach(subject => {
        subject.classList.add('topic-open')
    })
    removeModalEventListeners()
    answerQuestions()
}

// function to open the modal with movies questions
function mModalOpenStyling() {
    currentModal = mModals
    currentCard = moviesCard
    submitButtons = mSubmitButtons
    answerInput = mAnswerInput
    mModals[0].style.display = 'block'
    timer.style.display = 'block'
    main.classList.add('blur')
    note.classList.add('blur')
    topic.forEach(subject => {
        subject.classList.add('topic-open')
    })
    removeModalEventListeners()
    answerQuestions()
}

// function for the timer
function quizTimer(modalCurrentlyOpened) {
    let timeRemaining = timeLimit // setting the remaining time to be 50 seconds
    let timerInterval = setInterval(() => {
        timeRemaining--

        timer.textContent = `${timeRemaining}`

        // Close questions and display results when the timer runs out
        if (timeRemaining <= 0) {
            clearInterval(timerInterval)
            currentModal[modalCurrentlyOpened].style.display = 'none'
            displayResultMessage()
            displayResultModal()
            retakeQuiz()
            closeResultModal()
        }

        // If user completed the quiz before the time runs out, the timer is reset
        if (timeRemaining > 0 && timer.style.display === 'none') {
            clearInterval(timerInterval)
        }
    }, 1000)
}

// function to remove the result modal
function removeResultModal() {
    result.classList.remove('result')
    result_1.classList.remove('result-1')
    atom.style.display = 'none'
    resultMessage.style.display = 'none'
    scoreBasedMessage.style.display = 'none'
    retakeButton.style.display = 'none'
    exitButton.style.display = 'none'
}

// function od resetting the user inputs
function resetInputFields() {
    answerInput.forEach(input => {
        input.value = ''
    })
}

// function that takes the user answers and stores them
function takeUserAnswers(index) {
    if (currentModal === sModals) {
        scienceUserAnswers.push(answerInput[index].value.toUpperCase())
    } else if (currentModal === hModals) {
        historyUserAnswers.push(answerInput[index].value.toUpperCase())
    } else if (currentModal === spModals) {
        sportsUserAnswers.push(answerInput[index].value.toUpperCase())
    } else {
        moviesUserAnswers.push(answerInput[index].value.toUpperCase())
    }
}

// function that resets the user stored answers
function resetUserAnswers() {
    scienceUserAnswers = []
    historyUserAnswers = []
    sportsUserAnswers = []
    moviesUserAnswers = []
}

// function that calculates the results of the user
function calculateResults () {
    let result = 0
    let numQuestions = currentModal.length

    // removing empty strings from the user answers
    scienceUserAnswers = scienceUserAnswers.filter(answer => answer !== '')
    historyUserAnswers = scienceUserAnswers.filter(answer => answer !== '')
    sportsUserAnswers = scienceUserAnswers.filter(answer => answer !== '')
    moviesUserAnswers = scienceUserAnswers.filter(answer => answer !== '')

    for (let i = 0; i < numQuestions; i++) {
        if (currentModal === sModals) {
            if (scienceUserAnswers[i] === scienceCorrectAnswers[i]) {
                result++
            }
        } else if (currentModal === hModals) {
            if (historyUserAnswers[i] === historyCorrectAnswers[i]) {
                result++
            }
        } else if (currentModal === spModals) {
            if (sportsUserAnswers[i] === sportsCorrectAnswers[i]) {
                result++
            }
        } else {
                if (moviesUserAnswers[i] === moviesCorrectAnswers[i]) {
                    result++
                }
            }
    }
    return (result/numQuestions)*100
}

// function that displays the result modal
function displayResultModal () {
    result.classList.add('result')
    result_1.classList.add('result-1')
    timer.style.display = 'none'
    atom.style.display = 'block'
    resultMessage.style.display = 'block'
    scoreBasedMessage.style.display = 'block'
    retakeButton.style.display = 'block'
    exitButton.style.display = 'block'
}

// function that displays the actual results and message associated with it
function displayResultMessage(percentage = calculateResults()) {
    resultMessage.textContent = 'Your score is ' + percentage + ' %'
    if (percentage >= 80) {
        scoreBasedMessage.textContent = 'You are a genius'
    }
    else if (percentage >= 50 && percentage < 80) {
        scoreBasedMessage.textContent = 'Not bad, keep it up!'
    }
    else {
        scoreBasedMessage.textContent = 'Better luck next time!'
    }
}

// for the retaking the quiz after the user completes a particular quiz
function retakeQuiz() {
    retakeButton.addEventListener('click', () => {
        removeResultModal()
        resetInputFields()

        // resetting user answers
        resetUserAnswers()

        // showing the first modal
        currentModal[0].style.display = 'block'
        timer.style.display = 'block'
        answerQuestions()
    })
}

// function to exit the result modal and return to the main page
function closeResultModal() {
    exitButton.addEventListener('click', () => {
        removeResultModal()

        // resetting user answers
        resetUserAnswers()

        main.classList.remove('blur')
        note.classList.remove('blur')
        topic.forEach(subject => {
            subject.classList.remove('topic-open')
        })
        if (currentCard === scienceCard) {
            scienceCard.addEventListener('click', sModalOpenStyling)
        } else if (currentCard === historyCard) {
            historyCard.addEventListener('click', hModalOpenStyling)
        } else if (currentCard === sportsCard) {
            sportsCard.addEventListener('click', spModalOpenStyling)
        } else {
            moviesCard.addEventListener('click', mModalOpenStyling)
        }

    })
}

// function for removing the event listeners from topic cards when the questions have been opened
function removeModalEventListeners() {
    scienceCard.removeEventListener('click', sModalOpenStyling)
    historyCard.removeEventListener('click', hModalOpenStyling)
    sportsCard.removeEventListener('click', spModalOpenStyling)
    moviesCard.removeEventListener('click', mModalOpenStyling)
}

// adding event listeners to the topic cards
scienceCard.addEventListener('click', sModalOpenStyling)
historyCard.addEventListener('click', hModalOpenStyling)
sportsCard.addEventListener('click', spModalOpenStyling)
moviesCard.addEventListener('click', mModalOpenStyling)
