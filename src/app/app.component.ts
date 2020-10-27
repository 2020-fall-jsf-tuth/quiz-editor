import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'quiz-editor';

  badger = {
    color1: 'red'
    , color2: 'white'
    , padding : '20px'
  };

  toolTip = "Go Bucky! !";
}
