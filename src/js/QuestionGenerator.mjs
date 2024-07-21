import MathApi from "./MathApi.mjs";
import TriviaApi from "./TriviaApi.mjs";
import { getTiemeLimit } from "./utils";

export default class QuestionGenerator {
  constructor( ) {
   
  }

  generateRandomNumber(level) {
    switch (level) {
      case "easy":
        return Math.floor(Math.random() * 10) + 1;
      case "medium":
        return Math.floor(Math.random() * 50) + 1;
      case "hard":
        return Math.floor(Math.random() * 100) + 1;
      default:
        throw new Error("Invalid level");
    }
  }

  generateExpression(operand1, operand2, operator) {
    switch (operator) {
      case "sum":
        return `${operand1} + ${operand2}`;
      case "sub":
        return `${operand1} - ${operand2}`;
      case "mul":
        return `${operand1} * ${operand2}`;
      case "div":
        return `${operand1} / ${operand2}`;
      default:
        throw new Error("Invalid operator");
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

  generateAlternatives(level, correctAnswer, correctIndex) {
    let myArray = Array(4).fill(null);
    myArray[correctIndex] = correctAnswer;
    let existingNumbers = new Set([999]); // Crear un Set con el número correcto
     existingNumbers.add(correctAnswer);

   // console.log(`existingNumbers${existingNumbers}`);

    for (let x = 0; x < 4; x++) {
      if (x !== correctIndex) {
        let candidate;
        do {
          candidate = this.generateRandomNumber(level);
 //          console.log(`in do existingNumbers${existingNumbers}`);
        } while (existingNumbers.has(candidate)); // Repetir mientras el candidato ya exista

  //      console.log(`escojido --> candidate${candidate}`);

        myArray[x] = candidate;
        existingNumbers.add(candidate); // Añadir el candidato al Set
      }
    }

    return myArray;
  }

  generateAlternativesTrivia( correctAnswer, incorrectAnswers){
    let myReturn = [correctAnswer, ...incorrectAnswers];      
    return  myReturn.sort(() => Math.random() - 0.5);
  }

  generateCorrectAnswerIndex( correctAnswer, answers)
  {
    return  answers.indexOf(correctAnswer);
  }
  

  async generateMathQuestion(mathApi,level, operator, myid) {
    const operand1 = this.generateRandomNumber(level);
    const operand2 = this.generateRandomNumber(level);
    const expression = this.generateExpression(operand1, operand2, operator);

    const correctAnswer = await mathApi.evaluateExpression(expression);
    const correctIndex = Math.floor(Math.random() * 4);
    const answers = this.generateAlternatives(
      level,
      correctAnswer,
      correctIndex
    );

    return {
      id: myid,
      question: `What is ${expression}?`,
      answers: answers.map((answer) => answer.toString()),
      correctAnswer: correctIndex,
      difficulty: level,
      category: "math",
      tag: [operand1, operator, operand2],
      timeLimit: getTiemeLimit(level),
    };
  }



  async generateTriviaQuestion(triviaApi,level, operator, myid) {

  
    const data_trivia = triviaApi.getData(myid);
    console.log(`data_trivia:${data_trivia}`);

    /*category:this.data[myId].category,
    question:this.data[myId].question,
    correctAnswer: this[myId].data.correctAnswer,
    incorrectAnswers: this[myId].data.incorrectAnswer */
    const correctAnswer  =  data_trivia.correctAnswer;
    const answers = this.generateAlternativesTrivia( 
      correctAnswer,
      data_trivia.incorrectAnswers
    );
    const correctIndex =  this.generateCorrectAnswerIndex( correctAnswer , answers );


    return {
      id: myid,
      question: data_trivia.question ,
      answers: answers.map((answer) => answer.toString()),
      correctAnswer: correctIndex,
      difficulty: level,
      category: data_trivia.category ,
      tag: data_trivia.tags ,
      timeLimit: getTiemeLimit(level),
    };
  }


  async generateQuestions(level, operator, count = 10) {
    const questions = [];

  //   console.log(`operator:${operator} `);


    if(operator==='tri'){
      
      const triviaApi = await TriviaApi.initialize(level);

      console.log(`triviaApi:${triviaApi}`);
      for (let i = 0; i < count; i++) {
        const question = await this.generateTriviaQuestion(  triviaApi ,level, operator, i);
  
        //  console.log(`${question.id} ${question.answers} ${question.timeLimit}`);
        questions.push(question);
      } 
    }else{

    //  this.mathApi = mathApi;
     const mathApi = new MathApi();
      for (let i = 0; i < count; i++) {
        const question = await this.generateMathQuestion(  mathApi ,level, operator, i);
  
        //  console.log(`${question.id} ${question.answers} ${question.timeLimit}`);
        questions.push(question);
      }
  
    }
   
    //  console.log(`generateMathQuestion:${questions} `);

    return questions;
  }
}
