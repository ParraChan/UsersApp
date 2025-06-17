import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../models/user';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'user',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './user.component.html'
})
export class UserComponent {

  users: User[]=[];
  title : string = 'Listado de usuarios';
   idUserEventEmitter = new EventEmitter();
   selectedUserEventEmitter = new EventEmitter();
   constructor(private router: Router){
    this.users= this.router.getCurrentNavigation()?.extras.state!['users'];
   }

  onRemoveUSer(id: number):void{
       this.idUserEventEmitter.emit(id);
  }
  onSelectedUser(user: User):void{
    this.selectedUserEventEmitter.emit(user);
  }

}
