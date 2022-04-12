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

	public constructor(private readonly userService: UserService) { }

	ngOnInit() {
		this.preparePosts();
	}

	private preparePosts(): void {
		this.userService.getUsers().subscribe(
			(value: User[]) => {
				this.users = value;
			},
			(error: any) => console.log("ERROR preparePosts")
		);
	}

	handleDelete(user: User) {
		this.userService.deleteUser(user).subscribe(
			(user: User) => this.preparePosts()
		)

	}

	showAddDialog() {
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

	handleAdd(addedUser: User): void {
		this.userService.addUser(addedUser);
		this.editDialogVisible = false;
	}

	handleEdit(editedUser: User) {
		this.userService.save(editedUser);
		this.editDialogVisible = false;
	}

	handleDialogCloseRequest() {
		this.editDialogVisible = false;
	}
}
