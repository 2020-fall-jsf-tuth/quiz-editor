import { Component, ViewChild, OnInit } from '@angular/core';
import { QuizService, QuizDisplay } from './quiz.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'quiz-editor';

  quizzes: QuizDisplay[] = [];

  //Constructor used for dependency injection of our quiz service
  constructor(private quizSvc: QuizService) {
  constructor(private quizSvc: QuizService) { }

  ngOnInit() {
    this.loadQuizzes();
  }

  cancelAllBatchEdits() {

    // Reload all the quizzes.
    this.loadQuizzes();

    // Make sure no quiz is currently selected.
    this.setSelectedQuiz(undefined);
  }

  private loadQuizzes() {

    this.loading = true;

    // Fetch quizzes here ! ! !
    this.quizSvc
      .fetchQuizzes()
      .subscribe(
        (data) => {
          console.log(data);
          this.quizzes = (data as any).map(x => ({
            name: x.name
            , questions: x.questions
            , markedForDelete: false
            , newlyAdded: false
            , naiveChecksum: this.generateNaiveChecksum(x)
          }));

          this.loading = false;
          this.errorLoadingQuizzes = false;
        }
        , (err) => {
          console.error(err);

          this.loading = false;
          this.errorLoadingQuizzes = true;
        }
      )
    ;
  }

  //Don't show quiz information unless a user selects the quiz
  selectedQuiz: QuizDisplay = undefined;

  //Show quiz object information when user clicks on quiz
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
      , markedForDelete: false
      , newlyAdded: true
      , naiveChecksum: ""
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

  addQuiz() {
    //Creating a new quiz object
    const newQuiz = {
      name: "Untitled Quiz",
      numberOfQuestions: 0
    };

    //spread in all current quiz list objects and add the newly created quiz
    this.quizzes = [
      ...this.quizzes,
      newQuiz
    ];

    //Make new quiz the selected quiz to edit by calling setSelectedQuiz(send it new quiz)
    this.setSelectedQuiz(newQuiz);
  }

  loading = true;

  jsPromisesOne() {

    console.log('here');

    const n = this.quizSvc.getMagicNumber(true);
    console.log(n); // ? ? ?

    // Odd looking code formatting, but I think it makes it more clear...
    n
      .then(
        number => {
          console.log(number);

          // Get another magic number...
          const n2 = this.quizSvc.getMagicNumber(false);
          console.log(n2); // ? ? ?

          n2
            .then(
              x => console.log(x)
            )
            .catch(
              x => console.error(x)
            )
          ;
        }
      )
      .catch(
        err => console.error(err)
      )
    ;
  }

  async jsPromisesTwo() {

    //
    // 'await' can't be a constant in an async method...
    // But it could if not async...
    //
    //const await = 0;

    try {
      const n = await this.quizSvc.getMagicNumber(true);
      console.log(n); // ? ? ?

      const n2 = await this.quizSvc.getMagicNumber(false);
      console.log(n2); // ? ? ?
    }

    catch (err) {
      console.error(err);
    }
  }

  async jsPromisesThree() {

    try {
      const n = this.quizSvc.getMagicNumber(true);
      console.log(n); // ? ? ?

      const n2 = this.quizSvc.getMagicNumber(true);
      console.log(n2); // ? ? ?

      // This runs code in parallel ! ! !
      const results = await Promise.all([n, n2]);
      //const results = await Promise.race([n, n2]);
      console.log(results); // ? ? ?
    }

    catch (err) {
      console.error(err);
    }
  }

  private getDeletedQuizzes(): QuizDisplay[] {
    return this.quizzes.filter(x => x.markedForDelete);
  }

  get DeletedQuizCount(): number {
    return this.getDeletedQuizzes().length;
  }

  private getAddedQuizzes(): QuizDisplay[] {
    return this.quizzes.filter(x => x.newlyAdded && !x.markedForDelete);
  }

  get AddedQuizCount(): number {
    return this.getAddedQuizzes().length;
  }

  generateNaiveChecksum(quiz: QuizDisplay): string {

    // "Quiz 1b~To be, or not to be?~Yes or no?"
    return quiz.name + quiz.questions.map(x => '~' + x.name).join('');
  }

  private getEditedQuizzes(): QuizDisplay[] {
    return this.quizzes.filter(x =>
      !x.newlyAdded
      && !x.markedForDelete
      && this.generateNaiveChecksum(x) != x.naiveChecksum
    );
  }

  get EditedQuizCount(): number {
    return this.getEditedQuizzes().length;
  }

  saveAllBatchEdits() {

    console.log(this.getEditedQuizzes());

    const changedQuizzes = this.getEditedQuizzes().map(x => ({
      quiz: x.name
      , questions: x.questions.map(y => ({ question: y.name}))
    }));

    console.log(changedQuizzes);

    const newQuizzes = [];

    this.quizSvc
      .saveQuizzes(
        changedQuizzes
        , newQuizzes
      )
      .subscribe(
        numberOfEditedQuizzesSaved => console.log(`${numberOfEditedQuizzesSaved} edited quizzes were saved to the cloud...`)
        , err => console.error(err)
      )
    ;
  }
}
