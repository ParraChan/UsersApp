import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';
import { Router, RouterOutlet } from '@angular/router';
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
  ) {
  }

  ngOnInit(): void {
    this.service.findAll().subscribe(users => this.users = users);
    this.addUser();
    this.removeUser();
  }

  addUser() {
    this.sharingData.newUserEmitter.subscribe(user => {
      if (user.id > 0) {
        this.users = this.users.map(u => (u.id == user.id) ? { ...user } : u)
      } else {
        this.users = [... this.users, { ...user, id: new Date().getTime() }];
      }
      this.router.navigate(['/users'], { state: { users: this.users } });
      Swal.fire({
        title: "Guardado",
        text: "El usuario se ha guardado correctamente",
        width: 600,
        padding: "3em",
        color: "#716add",
        background: "#fff", backdrop: `
      rgba(0,0,123,0.4)
      url("#")
      left top
      no-repeat
    `
      });
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
          this.users = this.users.filter(user =>
            user.id != id);
          this.router.navigate(['/users/create'], { skipLocationChange: true }).then(() => {
            this.router.navigate(['/users'], { state: { users: this.users } });
          })
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
