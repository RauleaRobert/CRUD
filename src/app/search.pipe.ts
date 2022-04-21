import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

 transform(user: any[], searchText: string): any[] {
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