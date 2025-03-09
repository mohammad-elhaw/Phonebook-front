import { ContactForCreate, ContactForUpdate } from './../../models/contact.model';
import { Component, OnInit } from '@angular/core';
import { Contact, ContactParameters } from '../../models/contact.model';
import { ContactService } from '../../services/contact.service';
import { ContactListComponent } from '../contact-list/contact-list.component';
import { ContactFormComponent } from '../contact-form/contact-form.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-phonebook',
  standalone: true,
  imports: [ContactListComponent, ContactFormComponent, FormsModule, HttpClientModule],
  templateUrl: './phonebook.component.html',
  styleUrl: './phonebook.component.scss'
})
export class PhonebookComponent implements OnInit{
  contacts: Contact[] = [];
  selectedContact: Contact | null = null;
  searchTerm = '';
  
  // Pagination
  currentPage = 1;
  pageSize = 10;
  totalPages = 0;
  totalItems = 0;
  
  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts(): void {
    const params: ContactParameters = {
      pageNumber: this.currentPage,
      pageSize: this.pageSize,
      searchTerm: this.searchTerm 
    };

    this.contactService.getContacts(params).subscribe({
      next: (data) => {
        this.contacts = data || [];
        console.log(this.contactService.metaData);
        if (this.contactService.metaData) {
          this.totalPages = this.contactService.metaData.TotalPages;
          console.log(this.totalPages);
          this.totalItems = this.contactService.metaData.TotalCount;
        }
      },
      error: (error) => console.error('Error fetching contacts', error)
    });
  }

  onContactFormSubmit(contactData: ContactForCreate | ContactForUpdate): void {
    if (this.selectedContact) {
      this.contactService.updateContact(this.selectedContact.id, contactData as ContactForUpdate).subscribe({
        next: () => {
          this.cancelEdit();
          this.loadContacts();
        },
        error: (error) => console.error('Error updating contact', error)
      });
    } else {
      this.contactService.createContact(contactData as ContactForCreate).subscribe({
        next: () => {
          this.loadContacts();
        },
        error: (error) => console.error('Error creating contact', error)
      });
    }
  }

  onEdit(contact: Contact): void {
    this.selectedContact = contact;
  }

  cancelEdit(): void {
    this.selectedContact = null;
  }

  onDelete(id: string): void {
    if (confirm('Are you sure you want to delete this contact?')) {
      this.contactService.deleteContact(id).subscribe({
        next: () => {
          this.loadContacts();
          if (this.selectedContact && this.selectedContact.id === id) {
            this.cancelEdit();
          }
        },
        error: (error) => console.error('Error deleting contact', error)
      });
    }
  }

  onSearch(): void {
    this.currentPage = 1;
    this.loadContacts();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadContacts();
  }
}
