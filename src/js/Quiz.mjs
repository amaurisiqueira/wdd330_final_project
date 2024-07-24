import { getTiemeLimit } from "./utils.js";

// src/Quiz.js
export default class Quiz {
  constructor(questions, alias) {
    this.questions = questions;
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.alias = alias;
    this.timer = null;
    this.selectedAnswerIndex = null;
     
    this.textBack=null;

 

  }

  renderQuestion(container) {
    if (this.currentQuestionIndex < this.questions.length) {
      const question = this.questions[this.currentQuestionIndex];

    //   console.log(`question.alias:${this.alias}`);
      container.innerHTML = `
        <div class="questionForm">
            <div class="questionId">0</div>
            <h2>${this.alias}</h2>
            <div class="questionDiv">
            ${question.question}
            </div>
            <div id="popup" class="popup hidden">
                <div class="popup-card">
                    <div class="popup-card-front popup-content">
                        <p>${this.alias}</p>

                        <p>Correct answer for  ${question.tag[1]} of ${question.tag[0]} and ${question.tag[2]}?</p>
                       <div class="button-container">
                           <button id="confirmButton">Yes</button>
                           <button id="cancelButton">No</button>
                        </div>
                    </div>
                    <div class="popup-card-back popup-content">
                        
                        <p> getAnswerToCard(): ${this.textBack}</p>
                    </div>
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
      

      container.querySelector('.questionId').innerHTML = `#${question.id + 1}`;
      container.querySelectorAll('.answer').forEach(
        button => {
    
          button.addEventListener('click', (e) =>this.handleAnswer(e));
          button.addEventListener('mouseover', () => {      
              button.classList.add('active');
            ////   console.log(` button.classList.add('active');`);
          });
           button.addEventListener('mouseout', () => {
            button.classList.remove('active');  
            // console.log(`button.classList.remove('active');`);
            
        }); 
        }   
      );
     

     


     

      this.startTimerLeft(container);
    } else {
    //   console.log('Call End Game');
      this.showResults(container);
    }
  }

  startTimerLeft(container) {
    let timeLeft = this.questions[this.currentQuestionIndex].timeLimit; // Set the time limit for each question
  //   console.log(`this.questions[this.currentQuestionIndex].timeLimit: ${this.questions[this.currentQuestionIndex].timeLimit}`);
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
    this.triggerAnimation(quizContainer, 'incorrect-answer').then(() => {
      this.currentQuestionIndex++;
      this.renderQuestion(quizContainer);
    });
  }


  // Método para mostrar el popup
  showPopup(value) {
    const popup = document.getElementById('popup');
    popup.classList.remove('hidden');
 
  //   console.log(`value:${value}`);

    if(value !==null){
        
        if(value === true)
          
            this.textBack='Your answer is Correct!';
        else 
            this.textBack='Sorry, your answer is incorrect.';  
            
            const popupBackContent = document.querySelector('.popup-card-back');
        if (popupBackContent) {
        popupBackContent.innerHTML = ` <p>${this.alias}</p> <p> ${this.textBack}</p>`;
        }

    }
     
    

  }

  // Función para ocultar el popup
  hidePopup() {
    const popup = document.getElementById('popup');
    popup.classList.add('hidden'); // Oculta el popup
  }

  

 
handleAnswer(event) {
  //   console.log('handleAnswer called');
    clearInterval(this.timer); // Stop the timer when an answer is clicked

      this.selectedAnswerIndex = parseInt(event.target.dataset.index, 10);
    const correctAnswerIndex = this.questions[this.currentQuestionIndex].correctAnswer;
    const quizContainer = document.querySelector('main');

    // Mostrar el popup
    if( this.selectedAnswerIndex === correctAnswerIndex){
      //   console.log('CORRECTO!');
    
        this.showPopup(true);

    }
    else{
      //   console.log('EQUIVOCADO!');
        this.showPopup(false);
    
    }

    
    // Obtener los botones del popup
    const confirmButton = document.getElementById('confirmButton');
    const cancelButton = document.getElementById('cancelButton');
    const popupCard = document.querySelector('.popup-card');

    // Manejar el botón de confirmación
    confirmButton.onclick = () => {
        popupCard.classList.add('flip'); // Activar el efecto de flip
        setTimeout(() => {
            this.hidePopup(); // Ocultar el popup después de unos segundos
            popupCard.classList.remove('flip'); // Remover el efecto de flip
            quizContainer.classList.remove('correct-answer', 'incorrect-answer');
            let animationClass = 'incorrect-answer';

          //   console.log(`confirmButton.onclick = ()   this.selectedAnswerIndex:${ this.selectedAnswerIndex}  correctAnswerIndex:${correctAnswerIndex}    `);;

            if (this.selectedAnswerIndex === correctAnswerIndex) {
                this.score++;
                animationClass = 'correct-answer';
              //   console.log(`animationClass`);
            }else{
            //   console.log(`incorrect`);
            }

            document.querySelector('#currentScore').innerHTML = `${this.score}`;

            this.triggerAnimation(quizContainer, animationClass).then(() => {
                this.currentQuestionIndex++;
                this.renderQuestion(quizContainer);
            });
        }, 2000); // Ajusta el tiempo según lo necesario
    };

    // Manejar el botón de cancelación
    cancelButton.onclick = () => {
        this.hidePopup(); // Ocultar el popup si el usuario cancela
    };
}


  triggerAnimation(element, animationClass) {
    return new Promise((resolve) => {
      element.classList.remove('correct-answer', 'incorrect-answer');
      // Forzar reflow del DOM
      void element.offsetWidth;
      element.classList.add(animationClass);

      element.addEventListener('animationend', () => {
        element.classList.remove(animationClass);
        resolve();
      }, { once: true });
    });
  }

  showResults(container) {
    container.innerHTML = `
      <div>
        <h2>Your Score: ${this.score}</h2>

          <input class="submitBtn" id="restartGame" type="submit" value="NEW GAME ?">
      </div>
    `;

    document.getElementById('restartGame').addEventListener('click', this.handleRestart.bind(this));

  }


  handleRestart(event) {

   //clear data
   localStorage.removeItem('mathGame'); 
   window.location.href = '/index.html';

   
  }
  
}


document.addEventListener('DOMContentLoaded', () => {
  const popup = document.getElementById('popup');
  if (popup != null) popup.classList.add('hidden');


 




});

