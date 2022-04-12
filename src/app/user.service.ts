import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
	providedIn: 'root'
})
export class UserService {

	private users: User[] = [];

	public readonly ROOT_URL = 'http://localhost:3000';

	constructor(private readonly http: HttpClient) {

	}

	public getUsers(): Observable<User[]> { // Promise => ca un fel de promisiune
		return this.http.get<User[]>(this.ROOT_URL + "/user");
	}

	// public deleteUser(user: User): void {
	// 	let index: number = this.users.indexOf(user);
	// 	this.users.splice(index, 1);
	// }

	public deleteUser(user: User): Observable<User> {
		console.log(user.id);
		return this.http.delete<User>(`${this.ROOT_URL}/user/${user.id}`);
	}

	public addUser(user: User): void {
		this.users.push(user);
	}

	public save(editedUser: User): void {
		const foundUser: User | undefined = this.users.find((user) => user.id === editedUser.id);
		if (foundUser) {
			const index = this.users.indexOf(foundUser);
			if (index >= 0) {
				this.users.splice(index, 1, editedUser);
			}
		}
	}
}