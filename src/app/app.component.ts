import { Component } from '@angular/core';
import { isDeepStrictEqual } from 'util';
import { QuizService, QuizDisplay } from './quiz.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'quiz-editor';

  quizzes: QuizDisplay[] = [];
  isEdit:boolean = false;

  constructor(private quizSvc: QuizService) {

    // Fetch quizzes here ! ! !
    this.quizzes = this.quizSvc.fetchQuizzes();
  }

  selectedQuiz: QuizDisplay = undefined;

  setSelectedQuiz(quizToSelect: QuizDisplay) {
    this.selectedQuiz = quizToSelect;
    document.querySelector("#")
  }

  addNewQuiz() {
    this.quizzes = [...this.quizzes, {name:`New Quiz ${this.quizzes.length+1}`, numberOfQuestions:0}]
    this.selectedQuiz = this.quizzes[this.quizzes.length-1];
    
  }
}

