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

  ngOnInit(): void {
    this.users = this.userService.getUsers();
  };

  handleDelete(user: User){
    this.userService.deleteUser(user);
  }
}
