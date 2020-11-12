import { Component, ViewChild, OnInit } from '@angular/core';
import { QuizService, QuizDisplay } from './quiz.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'quiz-editor';

  quizzes: QuizDisplay[] = [];

  constructor(private quizSvc: QuizService) { }

  ngOnInit() {
    this.loadQuizzes();
  }

  private loadQuizzes() {

    this.loading = true;

    // Fetch quizzes here ! ! !
    this.quizSvc
      .fetchQuizzes()
      .subscribe(
        (data) => {
          console.log(data);
          this.quizzes = (data as any).map(x => ({
            name: x.name
            , questions: x.questions
            , markedForDelete: false
          }));
          
          this.loading = false;
          this.errorLoadingQuizzes = false;
        }
        , (err) => {
          console.error(err);

          this.loading = false;
          this.errorLoadingQuizzes = true;
        }
      )
    ;    
  }

  selectedQuiz: QuizDisplay = undefined;

  setSelectedQuiz(quizToSelect: QuizDisplay) {
    this.selectedQuiz = quizToSelect;

    setTimeout(
      () => {
        console.log(this.autoFocusInput);
        this.autoFocusInput.nativeElement.select();
      }
      , 30
    );
  }

  addNewQuiz() {
    const newQuiz = {
      name: "Untitled Quiz"
      , questions: []
      , markedForDelete: false
    };

    this.quizzes = [
      ...this.quizzes
      , newQuiz
    ];

    this.setSelectedQuiz(newQuiz);
  }

  @ViewChild('myInputForAutoFocus') 
  autoFocusInput: any;

  errorLoadingQuizzes = false;

  removeQuestion(questionToRemove) {
    this.selectedQuiz.questions = this.selectedQuiz.questions.filter(x => x != questionToRemove);
  }

  addNewQuestion() {
    this.selectedQuiz.questions = [
      ...this.selectedQuiz.questions
      , {
        name: "Untitled Question"
      }
    ];
  }

  loading = true;

  jsPromiseOne() {
    const n = this.quizSvc.getMagicNumber(true);
    console.log(n);

    n
    .then(
      number => {
        console.log(number);

        //Get another magic number
        const n2 = this.quizSvc.getMagicNumber(false);
        console.log(n2);
        n2
        .then(
          x => console.log(x)
          )
          .catch(
            x =>console.error(x)
          )
        ;
      }
    )
    .catch(
      err => console.error(err)
    )
    ;
  }
  async jsPromisesThree() {

   
    try {
      const n = this.quizSvc.getMagicNumber(true);
      console.log(n);//???

      const n2 = this.quizSvc.getMagicNumber(true);
      console.log(n2);//???

      //const results = Promise.all([n, n2]);

      const results = await Promise.race([n, n2]);
      console.log(results); //???
    }

      catch (err){
        console.error(err);
      }

  }
}
