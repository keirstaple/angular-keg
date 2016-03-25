import { Component, EventEmitter } from 'angular2/core';
import { KegComponent } from './keg.component';
import { Keg } from './keg.model';
import { NewKegComponent } from './new-keg.component';
import { EditKegComponent } from './edit-keg.component.ts';
import { DecreaseVolumeComponent } from './decrease-volume.component.ts';
import { LowPipe } from './low.pipe';

@Component ({
    selector: 'keg-list',
    inputs: ['kegList'],
    // outputs: ['onKegSelect'],
    pipes: [LowPipe],
    directives: [KegComponent, EditKegComponent, NewKegComponent, DecreaseVolumeComponent],
  template: `
    <select (change)="onChange($event.target.value)" class="filter">
      <option value="all">Show All</option>
      <option value="low">Show Less than 10 pints left</option>
    </select>
    <keg-display *ngFor="#theCurrentKeg of kegList | low: filterLow"
      (click)="kegClickedMethod(theCurrentKeg)"
      [class.selected]="theCurrentKeg === selectedKeg"
      [keg]="theCurrentKeg">
    </keg-display>

    <new-keg (onSubmitNewKeg)="createKeg($event)"></new-keg>

    <edit-keg *ngIf="selectedKeg" [keg]="selectedKeg">
    </edit-keg>

    <decrease-keg *ngIf="selectedKeg" [keg]="selectedKeg"></decrease-keg>
  `
  //[class.selected]="currentKeg === selectedKeg", tells Angular to either add or remove the class selected based on whether or not the condition to the right of the equals sign is true: currentKeg === selectedKeg. So, if the currentKeg displayed by the *ngFor loop is equal to the selectedKeg component property, then the <h3> is highlighted blue.
})
export class KegListComponent {
  public kegList: Keg[];
  public onKegSelect: EventEmitter<Keg>;
  public selectedKeg: Keg; //use it to keep track of which keg object was last clicked on
  public filterLow: string = "all";
  constructor(){
    this.onKegSelect = new EventEmitter();
  }
  kegClickedMethod(clickedKeg: Keg): void {
    console.log('child', clickedKeg);
    this.selectedKeg = clickedKeg;
    this.onKegSelect.emit(clickedKeg);
  }
  createKeg(description: string): void {
    this.kegList.push(
      new Keg(keg["name"], keg["brand"], keg["price"], keg["alcoholContent"], this.kegList.length)
    );
      console.log("kegList", this.kegList);
  }

  onChange(filterOption){
    this.filterLow = filterOption;
    console.log(this.filterLow);
  }
}
