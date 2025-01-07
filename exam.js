var examContainer = document.getElementById("examContainer");
var time = document.getElementById("timer");
var questionContainer = document.getElementById("questionContainer");
var prevBtn = document.getElementById("prevBtn");
var nextBtn = document.getElementById("nextBtn");
var markBtn = document.getElementById("markBtn");
var currentQuestion = 0;
var timeLimit = 10 * 60;
var markqs = document.getElementById("markquestion");
var timeRemaining = timeLimit;
var markedquestions = [];
var answers = [];
const urlParams = new URLSearchParams(window.location.search)
var name = urlParams.get('name')
var questions = [
  { question: "2-4-6-   -10", choices: ["4", "6", "8", "5"], answer: 2 },
  {
    question: "How many minutes are in a full week?",
    choices: ["11350", "10080", "15600", "12400"],
    answer: 1,
  },
  {
    question: "Which language runs in a browser?",
    choices: ["Python", "JavaScript", "C++", "Java"],
    answer: 1,
  },
  { question: "What city is known as The Eternal City?", choices: ["london", "Rome", "paris", "cairo"], answer: 1 },
  {
    question: "What is HTML?",
    choices: [
      "Hypertext Markup Language",
      "Hypertext Makeup Language",
      "Hyper Tool Machine Language",
      "Hypertext Management Language",
    ],
    answer: 0,
  },
]; 

function shuffleQuestions() {
  shuffleArray(questions);
  currentQuestion = 0;
}

function shuffleArray(Array) {
  for (var i = Array.length - 1; i > 0; --i) {
    var j = Math.floor(Math.random() * (i + 1));
    [Array[i], Array[j]] = [Array[j], Array[i]];
  }
}

function renderQuestion() {
  var question = questions[currentQuestion];

  var storedAnswer = answers[currentQuestion] || null;

  questionContainer.innerHTML = `
        <p>${question.question}</p>
        ${question.choices
          .map(
            (choice, index) => `
            <label>
               ${String.fromCharCode(65 + index)} <input type="radio" name="answer" value="${index}" ${
              storedAnswer === index ? "checked" : ""
            } onclick="saveAnswer(${index})">
                . ${choice}
            </label><br>
        `
          )
          .join("")}
    `;

  if (currentQuestion === questions.length - 1) {
    document.getElementById('submitBtn').style.display = 'inline';
    document.getElementById('nextBtn').style.display = 'none';
  } else {
    document.getElementById('submitBtn').style.display = 'none';
    document.getElementById('nextBtn').style.display = 'inline';
  }

  if (currentQuestion === 0) {
    document.getElementById('prevBtn').style.display = 'none';
  } else {
    document.getElementById('prevBtn').style.display = 'inline';
  }
}


function saveAnswer(answerIndex) {
  answers[currentQuestion] = answerIndex;
}

function startTimer() {
  var timer = setInterval(() => {
    if (timeRemaining <= 0) {
      clearInterval(timer);
     document.write(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
    h2{text-align: center}
</head>
<body>
    <h2> sorry ${name} the time is up </h2>
</body>
</html>`);
    } else {
      timeRemaining--;
      var minutes = Math.floor(timeRemaining / 60);
      var seconds = timeRemaining % 60;
      time.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }
  }, 1000);
}
document.addEventListener("DOMContentLoaded", () => {
  shuffleQuestions();
  renderQuestion();
  startTimer();
});

document.getElementById("nextBtn").addEventListener("click", () => {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    renderQuestion();
  }
});

document.getElementById("prevBtn").addEventListener("click", () => {
  if (currentQuestion > 0) {
    currentQuestion--;
    renderQuestion();
  }
});

document.getElementById("markBtn").addEventListener("click", () => {
  if (markedquestions.includes(currentQuestion)) {
    markedquestions = markedquestions.filter((q) => q !== currentQuestion);
  } else {
    markedquestions.push(currentQuestion);
  }

  updateMarkedQuestionsDiv();
});

function updateMarkedQuestionsDiv() {
  markqs.innerHTML = markedquestions
    .map(
      (q) =>
        `<div style="cursor: pointer; color: white;" onclick="jumpToQuestion(${q})">
            Question ${q + 1}
        </div>`
    )
    .join("");
}

function jumpToQuestion(questionIndex) {
  currentQuestion = questionIndex;
  renderQuestion();
}

document.getElementById("submitBtn").addEventListener("click", () => {
  var correctAnswers = 0
  questions.forEach((question, index) => {
    if (answers[index] ===question.answer){
      correctAnswers++
    }
  });
    var result =(correctAnswers/questions.length)*100
   
   if (result > 50) {
    document.write(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        *{
            margin: 0px;
            background-color: #f5f4fa;
        }
    h1{
        text-align: center;
        background-color: #7fd898;
        border-radius: 5px;
        height: 40px;
    }
    img{
        width: 400px;
        margin-left:450px ;
        
    }
    </style>
</head>
<body>
   <h1> congratulations ${name} your result is ${result}% and passed the exam</h1>
   <img src="Download Happy Students Celebrating Graduation for free.jpeg" alt="">
</body>
</html>`)}
else{
  document.write(`<!DOCTYPE html>
   <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <style>
            *{
                margin: 0px;
                background-color: #f5f4fa;
            }
        h2{
            text-align: center;
            background-color: #d8524f;
            border-radius: 5px;
            height: 40px;
        }
        img{
            width: 400px;
            margin-left:450px ;
            
        }
        </style>
    </head>
    <body>
        <h2> we are sorry ${name} your result is ${result}% and didm't pass the exam</h2>
        <img src="Desperate studying student stock vector_ Illustration of hand - 9374969.jpeg" alt="">
    </body>
    </html>`)
}

});

renderQuestion();
startTimer();
