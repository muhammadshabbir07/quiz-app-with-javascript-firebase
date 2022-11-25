
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";
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
const database = getDatabase();


var question = document.getElementById('question');
var options = document.getElementById('options');
var optionsrender = document.getElementById('optionsrender');
var correctAnswer = document.getElementById('correctAnswer');
var optionsArr = [];
var selectAnswer;
var qid = (Math.random(2) * 999999);
var queid = Math.round(qid);

function renderOption() {
  options.value = '';
  optionsrender.innerHTML = '';

  for (var i = 0; i < optionsArr.length; i++) {

    optionsrender.innerHTML += `<li class="bg-primary px-5 py-3 my-3" onclick="correctAnswerRender('${optionsArr[i]}')">${optionsArr[i]}</li>`;
  }
}

window.addOptions = function () {
  if (options.value == '') {
    swal({
      title: 'Validation!',
      text: 'Options are Required!',
      icon: 'warning',
      button: 'Ok'
    })
  }
  else {
    optionsArr.push(options.value);
    renderOption();
  }
}

window.correctAnswerRender = function (ans) {
  selectAnswer = ans;
  correctAnswer.innerHTML = selectAnswer;
}

window.addQuestion = function () {
  if(question.value == ''){
    swal({
      title: 'Validation!',
      text: 'Question are Required!',
      icon: 'warning',
      button: 'Ok'
    })
  }
  else if (correctAnswer.innerHTML == '') {
    swal({
      title: 'Validation!',
      text: 'Correct Answer are Required!',
      icon: 'warning',
      button: 'Ok'
    })
  }
  else {
    swal({
      title: 'Success!',
      text: 'Question Added Successfully!',
      icon: 'success',
      button: 'Ok'
    }).then(function () {
      var newQuestion = {
        question: question.value,
        options: optionsArr,
        correctAnswer: selectAnswer,
      }
      if (newQuestion) {
        set(ref(database, `question/` + queid), newQuestion);
      }
      question.value = ''
      optionsrender.remove()
      correctAnswer.remove()
    })
  }
}