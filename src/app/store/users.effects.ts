import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserService } from "../services/user.service";
import { catchError, EMPTY, exhaustMap, map, of, tap } from "rxjs";
import { add, addSuccess, findAll, findAllPageable, load, setErrors, setPaginator, update, updateSuccess } from "./users.actions";
import { User } from "../models/user";
import Swal from "sweetalert2";
import { Router } from "@angular/router";

@Injectable()
export class UsersEffects {

    loadUsers$ = createEffect(
        () => this.actions$.pipe(
            ofType(load),
            exhaustMap(action => this.service.findAllPageable(action.page)
                .pipe(
                    map(pageable => {
                        const users = pageable.content as User[];
                        const paginator = pageable;

                        return findAllPageable({ users, paginator });
                    }),
                    catchError(() => EMPTY)
                )
            )

        )

    );

    addUser$ = createEffect(
        () =>this.actions$.pipe(
            ofType(add),
            exhaustMap(action => this.service.create(action.userNew)
            .pipe(
                map(userNew =>{
                    return addSuccess({ userNew })
                    })
            , catchError(error => (error.status==400)? of(setErrors({errors: error.error})) : EMPTY
                    )
                 )
            )
        )
    )

     addSuccessUser$ = createEffect(() => this.actions$.pipe(
        ofType(addSuccess),
        tap(() => {
            this.router.navigate(['/users']);

              Swal.fire({
                         title: "Usuario creado",
                         text: "El usuario se ha creado correctamente",
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
        })
    ), { dispatch: false })

    updateSuccessUser$ = createEffect(() => this.actions$.pipe(
        ofType(updateSuccess),
        tap(() => {
            this.router.navigate(['/users']);

               Swal.fire({
                          title: "Actualizado",
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
        })
    ), { dispatch: false })

    updateUser$ = createEffect(
        () => this.actions$.pipe(
            ofType(update),
            exhaustMap(action => this.service.update(action.userUpdated)
                .pipe(
                    map(userUpdated => updateSuccess({ userUpdated })),
                    catchError(error => (error.status == 400) ? of(setErrors({  errors: error.error })) : EMPTY
                    )
                )
            )
        )
    );

    
    constructor(private actions$: Actions,
        private service: UserService,
        private router: Router) { }

}