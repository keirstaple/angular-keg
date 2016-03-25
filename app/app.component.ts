import { Component, EventEmitter } from 'angular2/core';
import { KegListComponent } from './keg-list.component';
import { Keg } from './keg.model';


@Component ({
    selector: 'my-app',
    directives: [KegListComponent],
  template: `
    <div class="container">
      <h1>Keg List</h1>
      <keg-list
        [kegList]="kegs"
        (onKegSelect)="kegWasSelected($event)">
      </keg-list>
    </div>
  `
})

export class AppComponent {
  public kegs: Keg[]; // Task[] (or Array<Task>) identifies tasks as an array of Task objects. Notice below that tasks is an array of new Task objects. Refer to tasks with this.
  constructor(){
    this.kegs = [
      new Keg('dead guy ale', 'rogue ales', 5.00, 0.06, 0),
      new Keg('mirror pond', 'deschuttes', 6.00, 0.056, 1),
      new Keg('corona light', 'corona', 3.00, 0.05, 2)
    ];
  }
  kegWasSelected(clickedKeg: Keg): void {
    console.log('PARENT', clickedKeg);
  }
}
