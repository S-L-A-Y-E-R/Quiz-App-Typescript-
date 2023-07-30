"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let quizContainer = document.getElementById("quiz-container");
let questionCtr = document.getElementById("text-number");
let quizHeader = document.getElementById("quiz-header");
let qHeader = document.getElementById("qHeader");
let mainText = document.getElementById('text');
let answersbox = document.getElementById("answers-container");
let btn = document.querySelector("button");
let inputs = document.getElementsByTagName("input");
let timer = document.getElementById("timer");
let hoursDiv = document.createElement("div");
let minDiv = document.createElement("div");
let secDiv = document.createElement("div");
let count = 0;
let correctAnswers = 0;
let answer = "";
let rightAns = "";
let hours = 0;
let minutes = 0;
function getQuestions() {
    return __awaiter(this, void 0, void 0, function* () {
        let data = (yield fetch("./questions.json")).json();
        let questions = yield data;
        let numOfQuestions = questions.length;
        let hText = document.createTextNode(questions[count].question);
        qHeader.appendChild(hText);
        creatQuestionBox(questions[count].choices);
        rightAns = questions[count].answer;
        questionCtr.innerText = `Question NO.${count + 1} of ${numOfQuestions}`;
        let seconds = 11;
        const timerInterval = setInterval(() => {
            if (seconds > 0) {
                seconds--;
                seconds < 10 ? secDiv.innerHTML = `0${seconds}` : secDiv.innerHTML = `${seconds}`;
            }
            else {
                clearInterval(timerInterval);
                btn.click();
            }
        }, 1000);
        hours < 10 ? hoursDiv.innerHTML = `0${hours}` : hoursDiv.innerHTML = `${hours}`;
        minutes < 10 ? minDiv.innerHTML = `0${minutes}` : minDiv.innerHTML = `${minutes}`;
        timer.appendChild(hoursDiv);
        timer.appendChild(minDiv);
        timer.appendChild(secDiv);
        btn.onclick = () => {
            count++;
            if (count < numOfQuestions) {
                qHeader.innerText = "";
                answersbox.innerHTML = "";
                if (answer === rightAns)
                    correctAnswers++;
                clearInterval(timerInterval);
                getQuestions();
            }
            else {
                qHeader.remove();
                answersbox.remove();
                btn.remove();
                quizHeader.remove();
                mainText.remove();
                let result = document.createElement("div");
                result.className = "result";
                result.innerText = `You have ${correctAnswers} correct answers`;
                let tryBtn = document.createElement("button");
                tryBtn.className = "btn";
                tryBtn.innerHTML = `try again`;
                tryBtn.style.margin = "auto";
                quizContainer.style.marginTop = "150px";
                quizContainer.appendChild(result);
                quizContainer.appendChild(tryBtn);
                tryBtn.onclick = () => {
                    location.reload();
                };
            }
        };
    });
}
function creatQuestionBox(labelTxt) {
    for (let i = 1; i <= labelTxt.length; i++) {
        let divQuestion = document.createElement("div");
        let input = document.createElement("input");
        let label = document.createElement("label");
        label.setAttribute("for", `answer-${i}`);
        label.textContent = `${i}."${labelTxt[i - 1]}"`;
        input.type = "radio";
        input.setAttribute("id", `answer-${i}`);
        input.dataset.answer = labelTxt[i - 1];
        input.onclick = () => {
            answer = labelTxt[i - 1];
        };
        divQuestion.appendChild(input);
        divQuestion.appendChild(label);
        answersbox.appendChild(divQuestion);
    }
}
getQuestions();
