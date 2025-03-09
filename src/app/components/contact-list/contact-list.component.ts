import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Contact } from '../../models/contact.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.scss'
})
export class ContactListComponent {
  @Input() contacts: Contact[] = [];
  @Input() currentPage: number = 1;
  @Input() pageSize: number = 10;
  @Input() totalPages: number = 0;
  @Input() totalItems: number = 0;
  
  @Output() editContact = new EventEmitter<Contact>();
  @Output() deleteContact = new EventEmitter<string>();
  @Output() pageChange = new EventEmitter<number>();
  
  onEdit(contact: Contact): void {
    this.editContact.emit(contact);
  }
  
  onDelete(id: string): void {
    this.deleteContact.emit(id);
  }
  
  onPageChange(page: number): void {
    this.pageChange.emit(page);
  }
  
  get pages(): number[] {
    return  Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  get startIndex(): number {
    return (this.currentPage - 1) * this.pageSize + 1;
  }
  
  get endIndex(): number {
    return Math.min(this.currentPage * this.pageSize, this.totalItems);
  }
}
