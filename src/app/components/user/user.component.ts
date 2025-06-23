import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { SharingDataService } from '../../services/sharing-data.service';
import { PaginatorComponent } from '../paginator/paginator.component';
import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import { load } from '../../store/users.actions';

@Component({
  selector: 'user',
  standalone: true,
  imports: [RouterModule, PaginatorComponent],
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {

  pageUrl: string = '/users/page';
  users: User[] = [];
  title: string = 'Listado de usuarios';
  paginator: any = {};

  constructor(
    private store: Store<{users: any}>,
    private sharingData: SharingDataService,
    private service: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService) {

      this.store.select('users').subscribe(state =>{
        this.users = state.users;
        this.paginator = state.paginator;
      })


  }
  ngOnInit(): void {
    if (this.users == undefined || this.users == null || this.users.length == 0) {
      console.log('consulta findAll')
      //this.service.findAll().subscribe(users => this.users= users);  
      this.route.paramMap.subscribe(params => {
        const page = +(params.get('page') || '0');
        console.log(page)
        this.store.dispatch(load({page}));
        /*this.service.findAllPageable(page).subscribe(pageable => {
          this.users = pageable.content as User[]
          this.paginator = pageable;
          this.sharingData.pageUsersEventEmitter.emit({ users: this.users, paginator: this.paginator });
        });*/
      })
    }
  }

  onRemoveUSer(id: number): void {
    this.sharingData.idUserEventEmitter.emit(id);
  }
  onSelectedUser(user: User): void {
    this.router.navigate(['/users/edit', user.id]);
  }

  get admin(){
    return this.authService.isAdmin();
  }

}
