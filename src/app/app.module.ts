import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PhonebookComponent } from './components/phonebook/phonebook.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    // AppComponent,
    // PhonebookComponent,
    // ContactFormComponent,
    // ContactListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  // bootstrap: [AppComponent]
})
export class AppModule { }
