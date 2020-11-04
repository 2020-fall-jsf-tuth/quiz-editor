import { Component } from '@angular/core';
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
    this.quizzes = this.quizSvc.fetchQuizzes();
  }

  //Don't show quiz information unless a user selects the quiz
  selectedQuiz: QuizDisplay = undefined;

  //Show quiz object information when user clicks on quiz
  setSelectedQuiz(quizToSelect: QuizDisplay) {
    this.selectedQuiz = quizToSelect;
  }

  addQuiz() {
    //Creating a new quiz object
    const newQuiz = {
      name: "Untitled Quiz",
      numberOfQuestions: 0
    };

    //Take current quiz list objects and spread in all current 
    //quiz list and add the newly created quiz
    this.quizzes = [
      ...this.quizzes,
      newQuiz
    ];

    //Make new quiz the selected quiz to edit by calling setSelectedQuiz(send it new quiz)
    this.setSelectedQuiz(newQuiz);
  }

}
