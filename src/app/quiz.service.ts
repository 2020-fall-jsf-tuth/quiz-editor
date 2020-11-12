import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface QuizDisplay {
  name: string;
  questions: QuestionDisplay[];
  markedForDelete: boolean;
}

export interface QuestionDisplay {
  name: string;
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
        callerWantsThisToSucceed ? resolve(42) : reject("failed");
        
      }
    );
  }

}
