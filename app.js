
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getDatabase, get, child, ref } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCgl8lTrazZ2feL3j13RLBCUQo9S9JX37s",
    authDomain: "quiz-app-c873b.firebaseapp.com",
    projectId: "quiz-app-c873b",
    storageBucket: "quiz-app-c873b.appspot.com",
    messagingSenderId: "81412152630",
    appId: "1:81412152630:web:142b0f763a141c9c7ee797"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();
const dbRef = ref(db);

// renderQuestion()
// function renderQuestion() {

// }
var snapData =
    [
        {
            question: "Html Stands For __________________",
            options: [
                "Hyper Text Makeup Language",
                "html",
                "Case Cading Style Sheet",
                "Hypertext markup language",
            ],
            correctAns: "Hypertext markup language",
        },
        {
            question: "Css Stands For _______________________",
            options: [
                "Casecading Style Sheet",
                "Java",
                "Ram",
                "Hypertext markup language",
            ],
            correctAns: "Casecading Style Sheet",
        },
        {
            question: "Js Stands For _______________________",
            options: ["Java Style", "Java Script", "Script", "Script Src"],
            correctAns: "Java Script",
        },
        {
            question: "Dom Stands For _______________________",
            options: ["Document Object Model", "html", "Css", "Java"],
            correctAns: "Document Object Model",
        },
        {
            question: "Ram Stands For _______________________",
            options: ["Read Only Memory", "Dom", "Random Acccess Memory", "For Pc"],
            correctAns: "Random Acccess Memory",
        },
        {
            question: "Rom Stands For _______________________",
            options: [
                "Hyper Text Markup Language",
                "html",
                "HTml",
                "Read Only Memory",
            ],
            correctAns: "Read Only Memory",
        },
    ]

// console.log(snapData)

var questionTotalIndex = document.getElementById("questionTotalIndex");
var questionCurrentIndex = document.getElementById("questionCurrentIndex");
var qusteions = document.getElementById("qusteions");
var quiz_btns = document.getElementById("quiz-btns");
var totalMarks = 0;
var correctAnswerCount = 0;
var getModel = document.querySelector(".result_modal");


var currentIndex = 0
var snapData;
var getKeys;
var getValues;

window.result = function () {
    var totalQuestion = document.getElementById("totalQuestion");
    var correctAnswer = document.getElementById("correctAnswer");
    var marks = document.getElementById("marks");
    var percentage = document.getElementById("percentage");

    totalQuestion.innerHTML = getKeys.length;
    correctAnswer.innerHTML = correctAnswerCount;
    marks.innerHTML = totalMarks;
    percentage.innerHTML = ((totalMarks / (questionTotalIndex.innerHTML * 5)) * 100).toFixed(2) + '%';
}

window.initRender = function () {
    get(child(dbRef, 'question')).then(function (snapshot) {
        if (snapshot.exists()) {
            snapData = snapshot.val();

            getKeys   = Object.keys(snapData);
            getValues = Object.values(snapData);

            // console.log(getValues[0].correctAnswer)

            questionTotalIndex.innerHTML = getKeys.length;
            questionCurrentIndex.innerHTML = currentIndex + 1;
            qusteions.innerHTML = getValues[currentIndex].question

            for (let i = 0; i < getValues[currentIndex].options.length; i++) {
                const element = getValues[currentIndex].options[i];
                console.log(element)
                // quiz_btns.innerHTML = ''
                quiz_btns.innerHTML += `
            <div class="col-md-6">
                <button onclick="checkAnswer('${element}','${getValues[currentIndex].correctAnswer}')">${element}</button>
            </div>
            `
                // console.log(element)
            }

            // console.log(snapData)
        } else {
            console.log("No Data Available")
        }
    }).catch((error) => {
        console.error(error);
    });
}
initRender()


window.checkAnswer = function (a, b) {
    if (a == b) {
        correctAnswerCount += 1;
        totalMarks += 5;
        console.log("Correct Answer")
        nextQuestion()
    }
    else {
        nextQuestion()
        console.log("Not Correct")
    }
    console.log(totalMarks)

}

window.nextQuestion = function () {
    quiz_btns.innerHTML = ''
    currentIndex++;
    if (questionTotalIndex.innerHTML <= questionCurrentIndex.innerHTML) {
        getModel.style.display = 'flex';
        result()
        currentIndex--;
    }
    initRender()
}

document.getElementById("modalClose").addEventListener("click", function () {
    getModel.style.display = 'none';
    location.reload();
});
