import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {

  @Output() searchTermChange = new EventEmitter<string>();
  searchTerm: string = '';

  onSearchChange() {
    this.searchTermChange.emit(this.searchTerm);
  }

}
