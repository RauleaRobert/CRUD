import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription} from 'rxjs';
import { User } from './user';

@Injectable({
	providedIn: 'root'
})
export class UserService {

	private users: User[] = [];

	public numberOfAllUsersFromDatabase: number = 0;

	public readonly ROOT_URL = 'http://localhost:3000';

	constructor(private readonly http: HttpClient) { }

	public getNrOfUsers():Observable<number> {
		return this.http.get<number>(`${this.ROOT_URL + '/user/userNumber'}`);
	}

	public getUsers(rows: number, page: number): Observable<User[]> {
		let params = new HttpParams().set('rowPerPage',`${rows}`).set('page',`${page}`);
		return this.http.get<User[]>(this.ROOT_URL + "/user",{params});
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