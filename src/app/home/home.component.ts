import { Component,OnInit} from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public users: User[] = [];
  public editDialogVisible: boolean = false;
  public userInEdit?: User;
  public dialogType: "Add" | "Edit" = "Add";
  public emptyObj: User = {
    id: -1,
    lastName: '',
    firstName: '',
    email: '',
    userName: ''
  };
  
  constructor(private readonly userService: UserService) { }
 

  async ngOnInit(): Promise <void>  {
    console.log('START');
    this.users = await this.userService.getUsers();
    console.log('STOP');
  };

  handleDelete(user: User){
    this.userService.deleteUser(user);
  }

  showAddDialog(){
    this.dialogType = "Add";
    this.userInEdit = {...this.emptyObj};
    this.editDialogVisible = true;
  }

  showEditDialog(user: User){
    this.dialogType = "Edit";
    this.userInEdit = {...user};
    this.editDialogVisible = true;
  }
  
  handleAdd(addedUser: User): void {
    this.userService.addUser(addedUser);
    this.editDialogVisible = false;
  }

  handleEdit(editedUser: User) {
    this.userService.save(editedUser);
    this.editDialogVisible = false;
  }
  
  handleDialogCloseRequest(){
    this.editDialogVisible = false;
  }
}
