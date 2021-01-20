import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { Component, ElementRef, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import {
  MatAutocompleteSelectedEvent,
  MatChipInputEvent
} from "@angular/material";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";

/**
 * @title Chips Autocomplete
 */
@Component({
  selector: "chips-autocomplete-example",
  templateUrl: "chips-autocomplete-example.html",
  styleUrls: ["chips-autocomplete-example.css"]
})
export class ChipsAutocompleteExample {
  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = false;

  separatorKeysCodes = [ENTER, COMMA];

  fruitCtrl = new FormControl();

  filteredFruits: Observable<any[]>;

  fruits = ["Lemon"];

  allFruits = ["Apple", "Lemon", "Lime", "Orange", "Strawberry"];

  @ViewChild("fruitInput") fruitInput: ElementRef;

  constructor() {
    // this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
    //   startWith(null),
    //   map((fruit: string | null) =>
    //     fruit ? this.filter(fruit) : this.allFruits.slice()
    //   )
    // );
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || "").trim()) {
      this.fruits.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = "";
    }

    this.fruitCtrl.setValue(null);
  }

  remove(fruit: any): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }

    let index2 = this.fruits.indexOf(fruit);
    if (index >= 0) {
      this.allFruits.push(fruit);
    }
  }
  getOption(product) {
    return product;
  }

  filter(name: string) {
    return this.allFruits.filter(
      fruit => fruit.toLowerCase().indexOf(name.toLowerCase()) === 0
    );
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = "";
    this.fruitCtrl.setValue(null);
    this.allFruits = this.allFruits.filter(b => b != event.option.viewValue);
  }
}

/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
