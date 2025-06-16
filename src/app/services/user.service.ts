import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: User[] = [{
    id: 1,
    name: 'Maria',
    lastname: 'Lopez',
    email: 'mari.doe@example.com',
    username: 'mcdl1997',
    password: '123456'
},
{
    id: 2,
    name: 'Maria',
    lastname: 'Lopez',
    email: 'mari.doe@example.com',
    username: 'mcdl1997',
    password: '123456'

},
{
    id: 3,
    name: 'Maria',
    lastname: 'Lopez',
    email: 'mari.doe@example.com',
    username: 'mcdl1997',
    password: '123456'

}
];

  constructor() { }

  findAll(): Observable<User[]>{
    return of(this.users);
  }
}
