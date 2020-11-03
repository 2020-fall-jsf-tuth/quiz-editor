import { Injectable } from '@angular/core';
export interface QuizDisplay{
  name:string;
  numberOfQuestion: number;
}
@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor() { }

  fetchQuizzes():QuizDisplay[] {
    return [
      {
        name:'Quiz 1',
        numberOfQuestion: 5
      },
      {
        name:'Quiz 2',
        numberOfQuestion: 0
      },
      {
        name:'Quiz 3',
        numberOfQuestion: 10
      }
    ];
  }

}
