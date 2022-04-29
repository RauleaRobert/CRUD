import { Pipe, PipeTransform } from '@angular/core';
import { User } from './user';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

 transform(user: User[], searchText: string): User[] {
    if (!user) {
      return [];
    }
    if (!searchText) {
      return user;
    }
    searchText = searchText.toLocaleLowerCase();

    return user.filter(it => {
      return it.lastName.toLocaleLowerCase().includes(searchText) || 
			it.firstName.toLocaleLowerCase().includes(searchText);
    });
  }
}