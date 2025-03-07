import {
  Component,
  effect,
  input,
  linkedSignal,
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
  initialValue = input<string>('');
  txtPlaceholder = input.required<string>();
  btnLabel = input.required<string>();
  query = output<string>();
  inputValue = linkedSignal<string>(() => this.initialValue());

  debounceEffect = effect((OnCleanup) => {
    const value = this.inputValue();

    const timeout = setTimeout(() => {
      this.query.emit(value);
    }, 500);

    OnCleanup(() => clearTimeout(timeout));
  });

  onSearch(txtSearch: HTMLInputElement) {
    this.query.emit(txtSearch.value);
  }
}
