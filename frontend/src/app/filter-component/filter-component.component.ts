import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Categories } from '../classes/categories-mock';

@Component({
  selector: 'app-filter-component',
  templateUrl: './filter-component.component.html',
  styleUrls: ['./filter-component.component.css']
})
export class FilterComponentComponent implements OnInit {

  optionsList = Categories;

  constructor() { }

  ngOnInit(): void {
  }

  chosenCategory: string = '';

  @Output()
  chosenCategoryChanged: EventEmitter<string> = new EventEmitter<string>();

  onChosenCategoryChanged() {
    this.chosenCategoryChanged.emit(this.chosenCategory);
  }
}
