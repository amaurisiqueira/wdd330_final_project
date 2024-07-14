// main.js
import { loadHeaderFooter } from "./utils.js";

export default class MathGame {
    constructor() {
      this.alias = '';
      this.operator = '';
      this.level = '';
      this.max1 = 10;
      this.max2 = 10;
    }
  
    setAlias(alias) {
      this.alias = alias;
    }
  
    setOperator(operator) {
      this.operator = operator;
    }
  
    setLevel(level) {
      this.level = level;
    }
  
    setMaxNumbers(max1, max2) {
      this.max1 = max1;
      this.max2 = max2;
    }
  
    startGame() {
      // Construct the game interface template
      const gameTemplate = `
        <h1>Math Game</h1>
        <div class="config-game">
         
          <form id="gameForm">
           <h2>Your Name:</h2>
              <input type="text" id="alias" name="alias" value="${this.alias}" required> 
           
           
           <h2>Your Operator:</h2>
            <div class="operationSelector">
                      
 
            <label class="operationLabels" title="Add Operator">
                            <input type="radio" id="sum" name="operator" value="sum" ${this.operator === 'sum' ? 'checked' : ''} required class="operationRadio">
                            <img src="public/images/plusIcon-green-100.webp" alt="Addition Icon" class="operationImage checked">
                            <img src="public/images/plusIcon-100.webp" alt="Addition Icon" class="operationImage">
            </label>
                  

            <label class="operationLabels" title="Subtract Operator">
                <input type="radio" id="sub" name="operator" value="sub" ${this.operator === 'sub' ? 'checked' : ''} required class="operationRadio">
                            <img src="public/images/minusIcon-green-100.webp" alt="Subtraction Icon" class="operationImage checked">
                            <img src="public/images/minusIcon-100.webp" alt="Subtraction Icon" class="operationImage">
            </label>                          
                          
            <label class="operationLabels" title="Multiply Operator">
                <input type="radio" id="mul" name="operator" value="mul"  ${this.operator === 'mul' ? 'checked' : ''} required
                          class="operationRadio">
                        <img src="public/images/multiplyIcon-green-100.webp" alt="Multiplication Icon"  class="operationImage checked">

                        <img src="public/images/multiplyIcon-100.webp" alt="Multiplication Icon" class="operationImage">
            </label>

            <label class="operationLabels" title="Divide Operator">
                <input type="radio" id="divide" name="operator" value="div"  ${this.operator === 'div' ? 'checked' : ''} required
                          class="operationRadio">
                        <img src="public/images/divideIcon-green-100.webp" alt="Division Icon" class="operationImage checked">

                        <img src="public/images/divideIcon-100.webp" alt="Division Icon" class="operationImage">
            </label>              
            
            </div>
            <div class="levelSelector">
             <h2>Your Game Mode:</h2>
              
             <label class="levelLabels">
                <input type="radio" id="easy" name="level" value="easy" ${this.level === 'easy' ? 'checked' : ''} required>Easy
              </label> 
              
              <label class="levelLabels">
                <input type="radio" id="medium" name="level" value="medium" ${this.level === 'medium' ? 'checked' : ''} required>Medium
              </label>

              <label class="levelLabels">
                <input type="radio" id="hard" name="level" value="hard" ${this.level === 'hard' ? 'checked' : ''} required>Hard
              </label>

            </div>
              <input class="submitBtn" id="startGame" type="submit" value="START GAME">
          </form>
        </div>
      `;
  
      // Set the main content to the generated game template
      document.querySelector('main').innerHTML = gameTemplate;
  
      // Add event listener for form submission
      document.getElementById('gameForm').addEventListener('submit', this.handleFormSubmit.bind(this));
    }
  
    handleFormSubmit(event) {
      event.preventDefault();
      const alias = document.getElementById('alias').value;
      const operator = document.querySelector('input[name="operator"]:checked').value;
      const level = document.querySelector('input[name="level"]:checked').value;
     //  const max1 = parseInt(document.getElementById('max1').value);
     // const max2 = parseInt(document.getElementById('max2').value);
  
      this.setAlias(alias);
      this.setOperator(operator);
      this.setLevel(level);
     // this.setMaxNumbers(max1, max2);
  
      // Start the game with updated settings
      this.startGame();
    }
  }
  
  // Global instance of MathGame
  const game = new MathGame();
  
  // Initialize the game
  game.startGame();
  loadHeaderFooter();
  