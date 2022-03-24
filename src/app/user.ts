export class User {
    id?: number;
    lastName: string;
    firstName: string;
    email: string;
    userName: string;

    constructor(user?: any){
        this.id = user.id,
        this.lastName = user.LastName,
        this.firstName = user.FirstName,
        this.email = user.email,
        this.userName = user.userName
    }
}
