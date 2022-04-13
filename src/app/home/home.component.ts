import { Component, OnInit} from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	public userCount: number = 0;
	public users: User[] = [];
	public editDialogVisible: boolean = false;
	public userInEdit?: User;
	public dialogType: "Add" | "Edit" = "Add";
	public defaultUser: User = {
		id: 0,
		lastName: '',
		firstName: '',
		email: '',
		userName: ''
	};

	constructor(private readonly userService: UserService) { }

	public ngOnInit() {
		this.loadUsers();
	}

	private loadUsers(): void {
		this.userService.getUsers().subscribe(
			(value: User[]) => {
				this.users = value;
			},
			(error: any) => console.log("ERROR preparePosts")
		);
	}

	public handleDelete(user: User) {
		this.userService.deleteUser(user).subscribe(
			(user: User) => this.loadUsers(),
			(error: any) => console.log("ERROR deleteUser")
		)
		console.log(this.loadUsers());
	}

	public showAddDialog() {
		this.dialogType = "Add";
		this.userInEdit = { ...this.defaultUser };
		this.userCount++;
		this.userInEdit.id = this.userCount;
		this.editDialogVisible = true;
	}

	public showEditDialog(user: User) {
		this.dialogType = "Edit";
		this.userInEdit = { ...user };
		this.editDialogVisible = true;
	}

	public handleAdd(addedUser: User): void {
		this.userService.addUser(addedUser).subscribe(
			(user: User) => this.loadUsers(),
			(error: any) => console.log('ERROR AddUser')
		);
		this.editDialogVisible = false;
	}

	public handleEdit(editedUser: User) {
		this.userService.edit(editedUser).subscribe(
			(user: User) => this.loadUsers(),
			(error: any) => console.log(error)
			);
		this.editDialogVisible = false;
	}

	public handleDialogCloseRequest() {
		this.editDialogVisible = false;
	}
}
