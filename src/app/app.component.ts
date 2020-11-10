import { Component, ViewChild, OnInit } from '@angular/core';
import { QuizService, QuizDisplay } from './quiz.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'quiz-editor';

  quizzes: QuizDisplay[] = [];

  constructor(private quizSvc: QuizService) { }

  ngOnInit() {
    this.loadQuizzes();
  }

  private loadQuizzes() {
        // Fetch quizzes here ! ! !
        this.quizSvc
        .fetchQuizzes()
        .subscribe(
          (data) => {
            console.log(data);
            this.quizzes = (data as any).map(x => ({
              name: x.name
              , questions: x.questions
            }));
            this.errorLoadingQuizzes = false;
          }
          , (err) => {
            console.error(err);
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
}
