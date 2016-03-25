import { Component, EventEmitter } from 'angular2/core';
import { Keg } from './keg.model';

@Component({
  selector: 'new-keg',
  outputs: ['onSubmitNewKeg'],
  template: `
    <div class="keg-form">
      <h3>Create Keg:</h3>
      <input placeholder="Name" class="col-sm-8 input-lg" #name>
      <input placeholder="Brand" class="col-sm-8" #brand>
      <input placeholder="Price" class="col-sm-8" #price>
      <input placeholder="Alcohol Content (%)" class="col-sm-8" "alcoholContent">
      <button (click)="addKeg(name, brand, price, alcoholContent)" class="btn-success btn-lg add-button">Add</button>
    </div>
  `
})

export class NewKegComponent {
  public onSubmitNewKeg: EventEmitter<String>;
  constructor(){
    this.onSubmitNewKeg = new EventEmitter();
  }
  addKeg(name: HTMLInputElement, brand: HTMLInputElement, price: HTMLInputElement, alcoholContent: HTMLInputElement){
    this.onSubmitNewKeg.emit({
      "name": name.value,
      "brand": brand.value,
      "price": parseInt(price.value),
      "alcoholContent": parseInt(alcoholContent.value) / 100,
    });

    name.value = "";
    brand.value = "";
    price.value = "";
    alcoholContent.value = "";
  }
}
