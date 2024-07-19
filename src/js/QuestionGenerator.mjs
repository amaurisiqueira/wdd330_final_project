import MathApi from './MathApi.mjs';
import { getTiemeLimit } from './utils';

export default class QuestionGenerator {
  constructor(mathApi) {
    this.mathApi = mathApi;
  }
 

  generateRandomNumber(level) {
    switch(level) {
      case 'easy':
        return Math.floor(Math.random() * 10) + 1;
      case 'medium':
        return Math.floor(Math.random() * 50) + 1;
      case 'hard':
        return Math.floor(Math.random() * 100) + 1;
      default:
        throw new Error('Invalid level');
    }
  }

  generateExpression(operand1, operand2, operator) {
    switch(operator) {
      case 'sum':
        return `${operand1} + ${operand2}`;
      case 'sub':
        return `${operand1} - ${operand2}`;
      case 'mul':
        return `${operand1} * ${operand2}`;
      case 'div':
        return `${operand1} / ${operand2}`;
      default:
        throw new Error('Invalid operator');
    }
  }


  /*
 {
    "id": 1,
    "question": "¿Cuánto es 2+3*sqrt(4)?",
    "answers": ["10", "11", "12", "13"],
    "correctAnswer": 1,
    "difficulty": "medium",
    "category": "math",
    "tags": ["algebra", "sqrt"],
    "timeLimit": 30
  },
  */
  async generateQuestion(level, operator , myid ) {
    const operand1 = this.generateRandomNumber(level);
    const operand2 = this.generateRandomNumber(level);
    const expression = this.generateExpression(operand1, operand2, operator);

    
    const correctAnswer = await this.mathApi.evaluateExpression(expression);
    const correctIndex = Math.floor(Math.random() * 4);
    const answers = Array(4).fill(null).map((_, index) => index === correctIndex ? correctAnswer : this.generateRandomNumber(level));

    return {
      id: myid,
      question: `What is ${expression}?`,
      answers: answers.map(answer => answer.toString()),
      correctAnswer: correctIndex ,
      difficulty:level ,
      category: 'math',
      tag:[operand1, operator,operand2] ,
      timeLimit: getTiemeLimit(level) ,
    };
  }

  async generateQuestions(level, operator, count = 10) {
    const questions = [];
    for (let i = 0; i < count; i++) {

      const question = await this.generateQuestion(level, operator ,i);
      questions.push(question);
    }

    console.log(`generateQuestions:${questions} `);

    return questions;
  }
}
