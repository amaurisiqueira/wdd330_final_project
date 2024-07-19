// src/Quiz.js
export default class Quiz {
    constructor(questions, alias) {
      this.questions = questions;
      this.currentQuestionIndex = 0;
      this.score = 0;
      this.alias = alias;

   
    
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
           
              <div class="answerDiv">
                ${question.answers.map((answer, index) => `
                  <button class="answer answerLabel" data-index="${index}">${answer}</button>
                   `).join('')}
              </div>

          </div>
        `;
          container.querySelectorAll('.answer').forEach(
            button => {
            button.addEventListener('click', (e) => this.handleAnswer(e));
            }
          );
      } else {
            console.log('Call End Game');
            this.showResults(container);
      }
    }
  
    handleAnswer(event) {
      const selectedAnswerIndex = parseInt(event.target.dataset.index, 10);
      const correctAnswerIndex = this.questions[this.currentQuestionIndex].correctAnswer;
      const quizContainer = document.querySelector('main');

      quizContainer.classList.remove('correct-answer', 'incorrect-answer');
      if (selectedAnswerIndex === correctAnswerIndex) {
         this.score++;
         quizContainer.classList.add('correct-answer');

      } else {
        quizContainer.classList.add('incorrect-answer');
      }

      
      document.querySelector('#currentScore').innerHTML= `${this.score}`;
 
      //this.currentQuestionIndex++;
      //this.renderQuestion(quizContainer);
      setTimeout(() => {
        this.currentQuestionIndex++;
        this.renderQuestion(quizContainer);
      }, 2000);

    }
  
    showResults(container) {
      container.innerHTML = `
        <div>
          <h2>Your Score: ${this.score}</h2>
        </div>
      `;
    }
  }

// Initialize the Quiz
// const quiz = new Quiz();