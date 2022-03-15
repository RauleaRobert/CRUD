import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public users: User[] = [];
  
  constructor(private readonly userService: UserService) { }

  async ngOnInit(): Promise <void>  {
    console.log('START');
    this.users = await this.userService.getUsers();
    console.log('STOP');
    
  };

  handleDelete(user: User){
    this.userService.deleteUser(user);
  }
}
