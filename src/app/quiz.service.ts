import { Injectable } from '@angular/core';

export interface QuizDisplay {
  name: string
  , numberOfQuiestions: number;
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
  , numberOfQuiestions: 5
},
{
  name: 'Quiz 2'
  , numberOfQuiestions: 0
},
{
  name: 'Quiz 1'
  , numberOfQuiestions: 10
}
  ];

}

}
