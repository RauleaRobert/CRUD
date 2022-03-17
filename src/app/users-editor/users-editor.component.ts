import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, FormBuilder} from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-users-editor',
  templateUrl: './users-editor.component.html',
  styleUrls: ['./users-editor.component.css']
})
export class UsersEditorComponent{

  @Output() visibleRequest = new EventEmitter <boolean> ();

    // userDetailsForm = this.fb.group({  --> Please ignore for moment this changes 
    //   lastName: [''],
    //   firstName: [''],
    //   userName: [''],
    //   email: ['']

    // });
  
  constructor(private readonly userService: UserService, private fb: FormBuilder) { }

   
   lastName= new FormControl('');
   firstname= new FormControl('');
   username= new FormControl('');
   email= new FormControl('');

   closeDialog(){
     this.visibleRequest.emit(false);
   }
}
