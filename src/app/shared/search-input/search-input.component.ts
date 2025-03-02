import { Component, input, output } from '@angular/core';

@Component({
  selector: 'search-input',
  imports: [],
  templateUrl: './search-input.component.html',
})
export class SearchInputComponent {
  txtPlaceholder = input.required<string>();
  btnLabel = input.required<string>();
  value = output<string>();

  onSearch(txtSearch: HTMLInputElement) {
    this.value.emit(txtSearch.value);
    txtSearch.value = '';
  }
}
