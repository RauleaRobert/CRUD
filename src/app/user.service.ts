import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [
    {
      id: 1,
      lastName: 'Raulea',
      firstName: 'Robert',
      email: 'robert.raulea@bearingpoint.com',
      userName: 'RauleaR',
    },
    {
      id: 2,
      lastName: 'Ursu',
      firstName: 'Daniel',
      email: 'ursu.daniel@bearingpoint.com',
      userName: 'UrsuD',
    },
    {
      id: 3,
      lastName: 'Bucur',
      firstName: 'Andreea',
      email: 'bucur.andreea@bearingpoint.com',
      userName: 'BucurA',
    }
  ];

  constructor() { }

  public getUsers(): Promise<User[]> { // Promise => ca un fel de promisiune
    return new Promise(
      (resolve, reject) => {
        setTimeout(() => { resolve(this.users) }, 2000)
      }
    )
  }

  public deleteUser(user: User): void {
    let index: number = this.users.indexOf(user);
    this.users.splice(index, 1);
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
