import { Component, DoCheck, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, DoCheck {
	public pageCount: number = 5;
	public rowCountOptions: number[] = [5, 10, 15, 20, 100];
	public userCount: number = 0;
	public users: User[] = [];
	public pagesNumber: number[] = [];
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

	constructor(private readonly userService: UserService, private toastr: ToastrService) { }
	
	public ngOnInit() {
		this.loadUsers();
	}

	ngDoCheck(): void {
		this.showPages();
	}

	public showPages(): number[]{
		this.pagesNumber = [];
		for(let i = 1; i <= Math.floor(this.users.length / this.pageCount); i++){
			this.pagesNumber.push(i);
		}
		if((this.users.length % this.pageCount) !== 0 ){
			this.pagesNumber.push(this.pagesNumber.length + 1)
		}
		return this.pagesNumber
	}
	
	public changePageEvent(){
		
	}

	public pageCountFcn(n:number): void{
		this.pageCount = n;
	}

	public showSuccesToaster(message: string) {
		this.toastr.success(message, 'Succes!', {
			closeButton: false,
		});
	}

	public showErrorToaster(message: string) {
		this.toastr.error(message, 'Error!', {
			closeButton: false,
		});
	}


	private loadUsers(): void {
		this.userService.getUsers().subscribe(
			(value: User[]) => {
				this.users = value;
			},
			(error: any) => this.showErrorToaster("Error 500")
		);
	}

	public handleDelete(user: User) {
		this.userService.deleteUser(user).subscribe(
			(user: User) => {
				this.loadUsers();
				this.showSuccesToaster(`${user.firstName}` + ' ' + "was deleted")
			},
			(error: any) => this.showErrorToaster("Error 500")

		)
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
			(user: User) => {
				this.loadUsers();
				this.showSuccesToaster("Added");
			},
			(error: any) => this.showErrorToaster("Error 500")
		);
		this.editDialogVisible = false;
	}

	public handleEdit(editedUser: User) {
		this.userService.edit(editedUser).subscribe(
			(user: User) => {
				this.loadUsers();
				this.showSuccesToaster("Edited");
			},
			(error: any) => this.showErrorToaster("Error 500")
		);
		this.editDialogVisible = false;
	}

	public handleDialogCloseRequest() {
		this.editDialogVisible = false;
	}
}
