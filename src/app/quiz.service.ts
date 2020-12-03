import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface QuizDisplay {
  name: string;
  questions: QuestionDisplay[];
  markedForDelete: boolean;
  newlyAdded: boolean;
  naiveChecksum: string;
}

export interface QuestionDisplay {
  name: string;
}

export interface QuirkyShapeForSavingEditedQuizzes {
  quiz: string;
  questions: { question: string; }[];
}

export interface QuirkyShapeForSavingNewQuizzes {
  quizName: string;
  quizQuestions: string[];
}

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private builtInAngularHttpClient: HttpClient) { }

  fetchQuizzes(): Observable<any> {
    return this.builtInAngularHttpClient.get("https://modern-js.azurewebsites.net/api/HttpTriggerJS1?code=8XD3vN3ehHLdZacBQJQhgUnNst9202gdd5VM3kWCytDkz2nXhia6kA==&name=Harry%20Potter");
  }

  getMagicNumber(callerWantsThisToSucceed: boolean): Promise<number> {
    return new Promise<number>(
      (resolve, reject) => {

        // Long running operation here.

        return callerWantsThisToSucceed ? resolve(42) : reject("Failed ! ! !");
      }
    );
  }

  saveQuizzes(
    changedQuizzes: QuirkyShapeForSavingEditedQuizzes[]
    , newQuizzes: QuirkyShapeForSavingNewQuizzes[] = []
  ) {

    let h = new HttpHeaders({
      'Content-Type': 'application/json'
      , 'X-Sas-Token': 'sig=K2WE6NQPtyoV6ke5hwPEaEaW52fgvyFWUeCEdPJls1s'
    });

    //console.log(h);

    return this.builtInAngularHttpClient.post(
      'https://modern-js.azurewebsites.net/save-quizzes-proxy'
      , JSON.stringify(
        {
          "changedQuizzes": changedQuizzes
          , "newQuizzes": newQuizzes
        }
      )
      , {
        headers: h
      }
    );
  }
}

