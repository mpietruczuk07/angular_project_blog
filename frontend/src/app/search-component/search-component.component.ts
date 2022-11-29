import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-component',
  templateUrl: './search-component.component.html',
  styleUrls: ['./search-component.component.css']
})
export class SearchComponentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { }

  enteredSearchValue: string = '';

  @Output()
  searchedTextChanged: EventEmitter<string> = new EventEmitter<string>();

  onSearchedTextChanged() {
    this.searchedTextChanged.emit(this.enteredSearchValue);
  }
}
