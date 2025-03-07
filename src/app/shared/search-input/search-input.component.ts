import {
  Component,
  effect,
  input,
  output,
  signal,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'search-input',
  imports: [],
  templateUrl: './search-input.component.html',
})
export class SearchInputComponent {
  @ViewChild('txtSearch') txtSearch!: HTMLInputElement;
  txtPlaceholder = input.required<string>();
  btnLabel = input.required<string>();
  query = output<string>();

  inputValue = signal<string>('');

  debounceEffect = effect((OnCleanup) => {
    const value = this.inputValue();

    const timeout = setTimeout(() => {
      this.query.emit(value);
      this.txtSearch.value = '';
    }, 500);

    OnCleanup(() => clearTimeout(timeout));
  });

  onSearch(txtSearch: HTMLInputElement) {
    this.query.emit(txtSearch.value);
    txtSearch.value = '';
  }
}
