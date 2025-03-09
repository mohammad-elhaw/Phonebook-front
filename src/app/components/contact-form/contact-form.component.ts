import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Contact, ContactForCreate, ContactForUpdate } from '../../models/contact.model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports:[FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss'
})
export class ContactFormComponent implements OnInit, OnChanges {
  @Input() contactToEdit: Contact | null = null;
  @Output() formSubmit = new EventEmitter<ContactForCreate | ContactForUpdate>();
  @Output() cancelEdit = new EventEmitter<void>();

  contactForm!:FormGroup;
  editMode = false;

  constructor(private formBuilder: FormBuilder){
    this.contactForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^01[012]\d{8}$/)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]]
    });
  }

  ngOnInit(): void {
    this.resetForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['contactToEdit'] && changes['contactToEdit'].currentValue) {
      const contact = changes['contactToEdit'].currentValue;
      this.editMode = true;
      this.contactForm.setValue({
        name: contact.name,
        phoneNumber: contact.phoneNumber,
        email: contact.email
      });
    } else if (changes['contactToEdit'] && !changes['contactToEdit'].currentValue) {
      this.resetForm();
    }
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      return;
    }
    this.formSubmit.emit(this.contactForm.value);
    this.resetForm();
  }

  onCancel(): void {
    this.cancelEdit.emit();
    this.resetForm();
  }

  resetForm(): void {
    this.editMode = false;
    this.contactForm.reset();
  }
}
