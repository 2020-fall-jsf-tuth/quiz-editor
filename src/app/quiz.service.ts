import { Injectable } from '@angular/core';

export interface QuizDisplay {
  name: string;
  numberOfQuestions: number;
}

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor() { }

  fetchQuizzes(): QuizDisplay[] {

    return [
      {
        name: 'Quiz 1'
        , numberOfQuestions: 5
      }
      , {
        name: 'Quiz 2'
        , numberOfQuestions: 1  
      }
      , {
        name: 'Quiz 3'
        , numberOfQuestions: 10
      }
    ];

  }

}
