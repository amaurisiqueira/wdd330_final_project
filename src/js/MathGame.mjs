// main.js

import { getTiemeLimit } from "./utils.js";
import { toCapital } from "./utils.js";

export default class MathGame {
    constructor() {
      this.alias = '';
      this.operator = '';
      this.level = '';
 
    }
  
    setAlias(alias) {
      this.alias = alias;
    }
  
    getAlias() {
      return this.alias;
    }

    setOperator(operator) {
      this.operator = operator;
    }
  
    setLevel(level) {
      this.level = level;
    }
   
    startGame() {
      // Construct the game interface template
      const gameTemplate = `
        <h1>Math Game</h1>
        <div class="config-game">
         
          <form action="quiz" method="GET" id="gameForm">
           <h2>Your Name:</h2>
              <input type="text" id="alias" name="alias" value="${this.alias}" required> 
           
           
           <h2>Your Operator:</h2>
            <div class="operationSelector">
                      
 
            <label class="operationLabels" title="Add Operator">
                            <input type="radio" id="sum" name="operator" value="sum" ${this.operator === 'sum' ? 'checked' : ''} required class="operationRadio">
                            <img src="/images/plusIcon-green-100.webp" alt="Addition Icon" class="operationImage checked">
                            <img src="/images/plusIcon-100.webp" alt="Addition Icon" class="operationImage">
            </label>
                  

            <label class="operationLabels" title="Subtract Operator">
                <input type="radio" id="sub" name="operator" value="sub" ${this.operator === 'sub' ? 'checked' : ''} required class="operationRadio">
                            <img src="/images/minusIcon-green-100.webp" alt="Subtraction Icon" class="operationImage checked">
                            <img src="/images/minusIcon-100.webp" alt="Subtraction Icon" class="operationImage">
            </label>                          
                          
            <label class="operationLabels" title="Multiply Operator">
                <input type="radio" id="mul" name="operator" value="mul"  ${this.operator === 'mul' ? 'checked' : ''} required
                          class="operationRadio">
                        <img src="/images/multiplyIcon-green-100.webp" alt="Multiplication Icon"  class="operationImage checked">

                        <img src="/images/multiplyIcon-100.webp" alt="Multiplication Icon" class="operationImage">
            </label>

            <label class="operationLabels" title="Divide Operator">
                <input type="radio" id="divide" name="operator" value="div"  ${this.operator === 'div' ? 'checked' : ''} required
                          class="operationRadio">
                        <img src="/images/divideIcon-green-100.webp" alt="Division Icon" class="operationImage checked">

                        <img src="/images/divideIcon-100.webp" alt="Division Icon" class="operationImage">
            </label>              
            
            <label class="operationLabels" title="Trivia Operator">
                <input type="radio" id="trivia" name="operator" value="tri"  ${this.operator === 'tri' ? 'checked' : ''} required
                          class="operationRadio">
                        <img src="/images/inteligencia_verde.webp" alt="Trivia Icon" class="operationImage checked">

                        <img src="/images/inteligencia_roja.webp" alt="Trivia Icon" class="operationImage">
            </label>      

            </div>
            <div class="levelSelector">
                        <h2>Your Game Mode:</h2>
                        <label class="levelLabels"  id="labelEasy" >
                            <input type="radio" id="easy" name="level" value="easy" ${this.level === 'easy' ? 'checked' : ''} required>Easy (${getTiemeLimit('easy')} sec) 
                        </label> 
                        <label class="levelLabels" id="labelMedium">
                            <input type="radio" id="medium" name="level" value="medium" ${this.level === 'medium' ? 'checked' : ''} required>Medium (${getTiemeLimit('medium')} sec)
                        </label>
                        <label class="levelLabels" id="labelHard">
                            <input type="radio" id="hard" name="level" value="hard" ${this.level === 'hard' ? 'checked' : ''} required>Hard (${getTiemeLimit('hard')} sec) 
                        </label>
              </div>

              <input class="submitBtn" id="startGame" type="submit" value="START GAME">
          </form>
        </div>
      `;
  
      // Set the main content to the generated game template
      document.querySelector('main').innerHTML = gameTemplate;
      document.getElementById('easy').checked = true;

      //const operatorRadios = document.querySelectorAll('input[name="operator"]');
      document.querySelectorAll('input[name="operator"]').forEach(radio => {
          radio.addEventListener('change',
            
            (event) => this.updateLevelLabels(event));
      } );

  
      // Add event listener for form submission
      document.getElementById('gameForm').addEventListener('submit', this.handleFormSubmit.bind(this));
    }
  

    updateLevelLabels(event) {

      const mandatory =  event.target.value;
 
      const easyLabel = document.querySelector('#labelEasy');      
      const mediumLabel = document.querySelector('#labelMedium');
      const hardLabel = document.querySelector('#labelHard');

     ////   console.log(`easyLabel : ${easyLabel}     getTiemeLimit('easy' ,mandatory ):${getTiemeLimit('easy' ,mandatory )}`);
  
      easyLabel.innerHTML = `<input type="radio" id="easy" name="level" value="easy" ${this.level === 'easy' ? 'checked' : ''} required>Easy (${getTiemeLimit('easy', mandatory)} sec)`;
      mediumLabel.innerHTML = `<input type="radio" id="medium" name="level" value="medium" ${this.level === 'medium' ? 'checked' : ''} required>Medium (${getTiemeLimit('medium', mandatory)} sec)`;
      hardLabel.innerHTML = `<input type="radio" id="hard" name="level" value="hard" ${this.level === 'hard' ? 'checked' : ''} required>Hard (${getTiemeLimit('hard', mandatory)} sec)`;



  }

    handleFormSubmit(event) {
      event.preventDefault();
      const alias = toCapital( document.getElementById('alias').value );
      const operator = document.querySelector('input[name="operator"]:checked').value;
      const level = document.querySelector('input[name="level"]:checked').value;
      
  
      this.setAlias(alias);
      this.setOperator(operator);
      this.setLevel(level);
   
       // Almacenar datos en localStorage
     localStorage.setItem('mathGame', JSON.stringify(this));
     // Redirect to quiz page
     window.location.href = 'quiz/index.html';

     
    }
  }
  
  // Global instance of MathGame
  const game = new MathGame();
  
  // Initialize the game
  game.startGame();

  