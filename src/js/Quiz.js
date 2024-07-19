// Global instance of MathGame
import QuestionGenerator from './QuestionGenerator.mjs';
import Quiz from "./Quiz.mjs";
import MathApi from './MathApi.mjs';
import { loadHeaderFooter } from "./utils.js";


async function startQuiz() {

  const mathApi = new MathApi();
  const questionGenerator = new QuestionGenerator(mathApi);
  
  let alias =''; 
  let operator='';
  let level='';

   // Recuperar datos de localStorage
   const savedGame = localStorage.getItem('mathGame');
   if (savedGame) {
     const gameData = JSON.parse(savedGame);
     console.log(gameData);

     console.log(gameData.alias);

       alias = gameData.alias;
       operator = gameData.operator;
       level = gameData.level;
       console.log(`startQuiz level:${level}`);
   } else {
       console.error('No localStorage data');
   }


   

  try {
    const questions = await questionGenerator.generateQuestions(level,operator);

    console.log(`before Quiz level:${level}`);
    const quiz = new Quiz(questions,alias , level);
    
    const quizContainer = document.querySelector('main');
    quiz.renderQuestion(quizContainer);

    loadHeaderFooter();
  } catch (error) {
    console.error('Failed to start quiz:', error);
  }
}

 
document.addEventListener('DOMContentLoaded', async () => {
  await startQuiz();
});

 
