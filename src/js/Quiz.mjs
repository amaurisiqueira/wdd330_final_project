import { getTiemeLimit } from "./utils.js";
// src/Quiz.js
export default class Quiz {
  constructor(questions, alias , level) {
      this.questions = questions;
      this.currentQuestionIndex = 0;
      this.score = 0;
      this.alias = alias;
      this.level = level;
      this.timer = null;
  }

  renderQuestion(container) {
      if (this.currentQuestionIndex < this.questions.length) {
          const question = this.questions[this.currentQuestionIndex];
          container.innerHTML = `
              <div class="questionForm">
                  <h2>${this.alias}</h2>
                  <div class="questionDiv">
                      ${question.question}
                  </div>
                  <div id="popup" class="popup hidden">
                      <div class="popup-content">
                          <p>Correct answer?</p>
                          <button id="confirmButton">Yes</button>
                          <button id="cancelButton">No</button>
                      </div>
                  </div>
                  <div class="answerDiv">
                      ${question.answers.map((answer, index) => `
                          <button class="answer answerLabel" data-index="${index}">${answer}</button>
                      `).join('')}
                  </div>  
                  <div id="timer">Time left: <span id="timeLeft"></span> seconds</div>                
              </div>
          `;
          container.querySelectorAll('.answer').forEach(
              button => {
                  button.addEventListener('click', (e) => this.handleAnswer(e));
              }
          );

          this.startTimerLeft(container);
      } else {
          console.log('Call End Game');
          this.showResults(container);
      }
  }

  startTimerLeft(container) {
      console.log(`this.level:${this.level}`)
      let timeLeft = getTiemeLimit(this.level); // Set the time limit for each question
      const timeDisplay = container.querySelector('#timeLeft');
      this.timer = setInterval(() => {
          if (timeLeft > 0) {
              timeLeft--;
              timeDisplay.textContent = timeLeft;
          } else {
              clearInterval(this.timer);
              this.handleTimeout();
          }
      }, 1000);
  }

  handleTimeout() {
      const quizContainer = document.querySelector('main');
      quizContainer.classList.remove('correct-answer', 'incorrect-answer');
      quizContainer.classList.add('incorrect-answer');
      this.currentQuestionIndex++;
      setTimeout(() => {
          this.renderQuestion(quizContainer);
      }, 2000);
  }

  handleAnswer(event) {
      console.log('handleAnswer called');
      clearInterval(this.timer); // Stop the timer when an answer is clicked

      const selectedAnswerIndex = parseInt(event.target.dataset.index, 10);
      const correctAnswerIndex = this.questions[this.currentQuestionIndex].correctAnswer;
      const quizContainer = document.querySelector('main');

      // Mostrar el popup
      const popup = document.getElementById('popup');
      popup.classList.remove('hidden');

      // Obtener los botones del popup
      const confirmButton = document.getElementById('confirmButton');
      const cancelButton = document.getElementById('cancelButton');

      // Manejar el botón de confirmación
      confirmButton.onclick = () => {
          popup.classList.add('hidden');

          quizContainer.classList.remove('correct-answer', 'incorrect-answer');
          if (selectedAnswerIndex === correctAnswerIndex) {
              this.score++;
              quizContainer.classList.add('correct-answer');
          } else {
              quizContainer.classList.add('incorrect-answer');
          }

          document.querySelector('#currentScore').innerHTML = `${this.score}`;

          setTimeout(() => {
              this.currentQuestionIndex++;
              this.renderQuestion(quizContainer);
          }, 2000);
      };

      // Manejar el botón de cancelación
      cancelButton.onclick = () => {
          popup.classList.add('hidden');
      };
  }

  showResults(container) {
      container.innerHTML = `
          <div>
              <h2>Your Score: ${this.score}</h2>
          </div>
      `;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const popup = document.getElementById('popup');
  if(popup != null) popup.classList.add('hidden');
});
