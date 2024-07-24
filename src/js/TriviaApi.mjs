export default class TriviaApi {

    //--science,history&difficulty=easy'
 
    constructor(level,data) {
        this.baseURL = `https://the-trivia-api.com/api/questions?limit=15&categories=arts_and_literature,history,society_and_culture,science,geography,general_knowledge&difficulty=${level}`;
        this.data = data;
        
  
    }
 
    static async initialize(level) {

                 this.baseURL = `https://the-trivia-api.com/api/questions?limit=15&categories=arts_and_literature,history,society_and_culture,science,geography,general_knowledge&difficulty=${level}`;
    
      
               const data = await TriviaApi.receiveData();
             //   console.log(`initialize this.data:${  data}`); 
        return new TriviaApi(level, data);
    }



    getData(myId){

        // console.log(`getData this.data:${this.data}`);
        return {
            category:this.data[myId].category,
            question:this.data[myId].question,
            correctAnswer: this.data[myId].correctAnswer,
            incorrectAnswers: this.data[myId].incorrectAnswers,
            tags: this.data[myId].tags
        };
    
    }

    static getRandomQuestions(questions, numberOfQuestions) {
        for (let i = questions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [questions[i], questions[j]] = [questions[j], questions[i]];
        }
        return questions.slice(0, numberOfQuestions);
    }
    static async receiveData() {
        try {
          //   console.log(`this.baseURL :${this.baseURL }`);

            const response = await fetch(this.baseURL );
          //   console.log(`Trivia response:${JSON.stringify( response)} `)  

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const received = await response.json();
          //   console.log('Received data:', received); //   datos recibidos en JSON
 
 
            this.data = this.getRandomQuestions(received, 10);  

            

            //   console.log(`static async receiveData() : ${ this.data}`);
           // console.log(`Trivia data stored in this.data: ${JSON.stringify(this.data)}`); //   almacenados en this.data
       
             return this.data;  
        } catch (error) {
            //   console.error('There was a problem with the fetch operation:', error);
            throw error;
        }
    }
}
