import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserService } from "../../services/user.service";
import { catchError, EMPTY, exhaustMap, map, of, switchMap, tap } from "rxjs";
import { add, addSuccess, findAll, findAllPageable, load, remove, removeSuccess, setErrors, setPaginator, update, updateSuccess } from "./users.actions";
import { User } from "../../models/user";
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
                    catchError((error) => of(error))
                )
            )

        )

    );
            addUser$ = createEffect(() =>
            this.actions$.pipe(
                ofType(add),
                exhaustMap(action =>
                this.service.create(action.userNew).pipe(
                    map(userNew => addSuccess({ userNew })),
                    catchError(err => {
                    if (err.status === 400 && err.error) {
                        // Si el backend manda un objeto tipo { campo: mensaje }, lo pasamos directo
                        return of(setErrors({ userForm: action.userNew, errors: err.error }));
                    }
                    return of(
                        setErrors({
                        userForm: action.userNew,
                        errors: { general: 'Error desconocido del servidor' }
                        })
                    );
                    })
                )
                )
            )
            );

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

    removeSuccessUser$ = createEffect(() => this.actions$.pipe(
        ofType(removeSuccess),
        tap(() => {
            this.router.navigate(['/users']);

            Swal.fire({
                title: "Eliminado",
                text: "El usuario se ha eliminado correctamente",
                width: 600,
                padding: "3em",
                color: "#716add",
                background: "#fff", backdrop: `
                            rgba(0,0,123,0.4)
                            url("assets/img/SadNyan.webp")
                            left top
                            no-repeat
                          `
            });
        })
    ), { dispatch: false })

        updateUser$ = createEffect(() =>
            this.actions$.pipe(
                ofType(update),
                exhaustMap(action =>
                this.service.update(action.userUpdated).pipe(
                    map(userUpdated => updateSuccess({ userUpdated })),
                    catchError(error => {
                    if (error.status === 400 && error.error) {
                        // Si error.error es un objeto con campos de error
                        // o si tiene un mensaje genérico en error.error.message
                        const errors =
                        typeof error.error === 'object'
                            ? error.error
                            : { general: error.error.message || 'Error desconocido' };

                        return of(setErrors({ userForm: action.userUpdated, errors }));
                    }
                    // Para otros errores, podrías manejarlo distinto o lanzar un error genérico
                    return of(setErrors({ userForm: action.userUpdated, errors: { general: 'Error desconocido' } }));
                    })
                )
                )
            )
            );

    removeUser$ = createEffect(
        () => this.actions$.pipe(
            ofType(remove),
            exhaustMap(action => this.service.remove(action.id)
                .pipe(
                    map(() => removeSuccess({ id: action.id }))
                )
            )
        )
    );


    constructor(private actions$: Actions,
        private service: UserService,
        private router: Router) { }

}






/*
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


*/ 