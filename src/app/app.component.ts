import { Component } from '@angular/core';
import { PhonebookComponent } from "./components/phonebook/phonebook.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PhonebookComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'phonebook';
}
