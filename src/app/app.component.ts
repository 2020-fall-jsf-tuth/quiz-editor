import { Component, ViewChild } from '@angular/core';
import { QuizService, QuizDisplay } from './quiz.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'quiz-editor';

  quizzes: QuizDisplay[] = [];

  constructor(private quizSvc: QuizService) {

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

}
