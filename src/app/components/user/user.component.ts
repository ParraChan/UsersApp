import { Component} from '@angular/core';
import { User } from '../../models/user';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { SharingDataService } from '../../services/sharing-data.service';

@Component({
  selector: 'user',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './user.component.html'
})
export class UserComponent {

  users: User[]=[];
  title : string = 'Listado de usuarios';
 
   constructor(
    private sharingData: SharingDataService,
    private service: UserService ,
    private router: Router){
      if(this.router.getCurrentNavigation()?.extras.state){
        this.users= this.router.getCurrentNavigation()?.extras.state!['users'];
      }else{
        this.service.findAll().subscribe(users => this.users= users)
      }
   }

  onRemoveUSer(id: number):void{
       this.sharingData.idUserEventEmitter.emit(id);
  }
  onSelectedUser(user: User):void{
    this.sharingData.selectedUserEventEmitter.emit(user);
  }

}
