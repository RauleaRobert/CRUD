import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.css']
})
export class UserDialogComponent implements OnChanges {

  @Input()
  public type: "Add" | "Edit" = "Edit";

  @Input() 
  public user?: User;
  
  @Output() 
  public onCloseRequest = new EventEmitter<void>();
  
  @Output() 
  public onAdd = new EventEmitter<User>();

  @Output() 
  public onEdit = new EventEmitter<User>();
  
  public showConfirmationDialog: boolean = false;
  public userDetailsForm: FormGroup;

  constructor(private readonly userService: UserService, private fb: FormBuilder) {
    this.userDetailsForm = this.fb.group({
      lastName: ['', [Validators.required, Validators.minLength(4)]],
      firstName: ['', [Validators.required, Validators.minLength(4)]],
      userName: ['', Validators.pattern('[a-zA-Z ]*')],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.prepareForm();
  }

  prepareForm() { //Populam formularul ---> Prepare Form
    if (this.user) {
      this.lastNameFormControl?.setValue(this.user.lastName);
      this.firstNameFormControl?.setValue(this.user.firstName);
      this.userNameFormControl?.setValue(this.user.userName);
      this.emailFormControl?.setValue(this.user.email);
    }
  }
  
  get lastNameFormControl(): AbstractControl| null {
    return this.userDetailsForm.get('lastName')
  }

  get firstNameFormControl(): AbstractControl| null {
    return this.userDetailsForm.get('firstName')
  }
  
  get userNameFormControl(): AbstractControl| null {
    return this.userDetailsForm.get('userName')
  }
  
  get emailFormControl(): AbstractControl| null {
    return this.userDetailsForm.get('email')
  }

  closeDialog() {
    if (this.userDetailsForm.dirty) {
      this.showConfirmationDialog = true;
    } else {
      this.onCloseRequest.emit();
    }
  }

  handleConfirm(yes: boolean) {
    if (yes) {
      this.onCloseRequest.emit();
    } else {
      this.showConfirmationDialog = false;
    }
  }

  public onSubmit() {
    if (this.userDetailsForm.valid) {

      const userFromForm: User = {
        id: this.user?.id,
        lastName: this.lastNameFormControl?.value,
        firstName: this.firstNameFormControl?.value,
        email: this.emailFormControl?.value,
        userName: this.userNameFormControl?.value,
      }
      console.log(userFromForm.id);

      if (this.type === "Edit") {
        this.onEdit.emit(userFromForm)
      } else {
        this.onAdd.emit(userFromForm);
      }
    }
  }
}