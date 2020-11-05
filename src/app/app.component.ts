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
        }
        , (err) => {
          console.error(err);
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
      , numberOfQuestions: 0
    };

    this.quizzes = [
      ...this.quizzes
      , newQuiz
    ];

    this.setSelectedQuiz(newQuiz);
  }

  @ViewChild('myInputForAutoFocus') 
  autoFocusInput: any;

}
