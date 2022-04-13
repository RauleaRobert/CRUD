import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { User } from './user';

@Injectable({
	providedIn: 'root'
})
export class UserService {

	private users: User[] = [];

	public readonly ROOT_URL = 'http://localhost:3000';

	constructor(private readonly http: HttpClient) { }

	public getUsers(): Observable<User[]> {
		return this.http.get<User[]>(this.ROOT_URL + "/user");
	}

	public deleteUser(user: User): Observable<User> {
		return this.http.delete<User>(`${this.ROOT_URL}/user/${user.id}`);
	}

	public addUser(user: User): Observable<User> {
		return this.http.post<User>(`${this.ROOT_URL}/user/create`,user);
	}

	public edit(editedUser: User): Observable<User> {
		return this.http.put<User>(`${this.ROOT_URL}/user/${editedUser.id}`,editedUser);
	}
}