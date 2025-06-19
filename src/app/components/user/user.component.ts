import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { SharingDataService } from '../../services/sharing-data.service';

@Component({
  selector: 'user',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {

  users: User[] = [];
  title: string = 'Listado de usuarios';

  constructor(
    private sharingData: SharingDataService,
    private service: UserService,
    private router: Router,
    private route: ActivatedRoute) {
    if (this.router.getCurrentNavigation()?.extras.state) {
      this.users = this.router.getCurrentNavigation()?.extras.state!['users'];
    }

  }
  ngOnInit(): void {
    if (this.users == undefined || this.users == null || this.users.length == 0) {
      console.log('consulta findAll')
      //this.service.findAll().subscribe(users => this.users= users);  
      this.route.paramMap.subscribe(params => {
        const page = +(params.get('page') || '0');
         console.log(page)
         this.service.findAllPageable(page).subscribe(pageable =>{
            this.users = pageable.content as User[]
             this.sharingData.pageUsersEventEmitter.emit(this.users);
          });
      })
    }
  }

  onRemoveUSer(id: number): void {
    this.sharingData.idUserEventEmitter.emit(id);
  }
  onSelectedUser(user: User): void {
    this.router.navigate(['/users/edit', user.id]);
  }

}
