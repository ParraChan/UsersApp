import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { SharingDataService } from '../services/sharing-data.service';

@Component({
  selector: 'user-app',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './user-app.component.html',
  styleUrls: ['./user-app.component.css'],

})
export class UserAppComponent implements OnInit {

  users: User[] = [];

  constructor(
    private router: Router,
    private sharingData: SharingDataService,
    private service: UserService,
    private route: ActivatedRoute  ) {
  }

  pageUsersEvent(){
    this.sharingData.pageUsersEventEmitter.subscribe(users => {
      this.users = users;
    })
  }

  ngOnInit(): void {
   /* this.route.paramMap.subscribe(params =>{
      const page = +(params.get('page')  || '0');
      console.log(page)
       this.service.findAllPageable(page).subscribe(pageable => this.users = pageable.content as User[]);
    })*/
    this.service.findAll().subscribe(users => this.users = users);
    this.pageUsersEvent();
    this.addUser();
    this.removeUser();
    this.findUserById();
  }

  findUserById() {
    this.sharingData.findUserByIdEventEmitter.subscribe(id => {
      const user = this.users.find(user => user.id == id)

      this.sharingData.selectUserEventEmitter.emit(user);
    })

  }

  addUser() {
    this.sharingData.newUserEmitter.subscribe(user => {
      if (user.id > 0) {
        this.service.update(user).subscribe({
          next: (userUpdate) => {
            this.users = this.users.map(u => (u.id == userUpdate.id) ? { ...userUpdate } : u)
            Swal.fire({
              title: "Actualizado",
              text: "El usuario se ha guardado correctamente",
              width: 600,
              padding: "3em",
              color: "#716add",
              background: "#fff", backdrop: `
                rgba(0,0,123,0.4)
                url("assets/img/cat.gif")
                left top
                no-repeat
              `
            }); this.router.navigate(['/users'], { state: { users: this.users } });


          },
          error: (err) => {
            if (err.status == 400) {
              this.sharingData.errorsUserFormEventEmitter.emit(err.error);
            }
            //console.log(err.error)
          }
        }
        );

      } else {

        this.service.create(user).subscribe({
          next: (userNew) => {
            console.log(userNew)
            this.users = [... this.users, { ...userNew }];
            this.router.navigate(['/users'], { state: { users: this.users } });

            Swal.fire({
              title: "Creado",
              text: "El usuario se ha actualizado correctamente",
              width: 600,
              padding: "3em",
              color: "#716add",
              background: "#fff", backdrop: `
                rgba(0,0,123,0.4)
                url("assets/img/cat.gif")
                left top
                no-repeat
              `
            });
          },
          error: (err) => {
            console.log(err.status);
            if (err.status == 400) {
              this.sharingData.errorsUserFormEventEmitter.emit(err.error);
            }
          }
        });

      }
      //this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {

      // });


    })

  }
  removeUser(): void {
    this.sharingData.idUserEventEmitter.subscribe(id => {
      Swal.fire({
        title: "Estas seguro?",
        text: "nohay marcha atras",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Borrar!"
      }).then((result) => {
        if (result.isConfirmed) {
          this.service.remove(id).subscribe(() => {
            this.users = this.users.filter(user =>
              user.id != id);
            this.router.navigate(['/users/create'], { skipLocationChange: true }).then(() => {
              this.router.navigate(['/users'], { state: { users: this.users } });
            });

          });

          Swal.fire({
            title: "Eliminado!",
            text: "Usuario eliminado",
            icon: "success"
          });
        }
      });

    })

  }

}
