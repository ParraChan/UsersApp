import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { login, loginSuccess } from "./auth.actions";
import { exhaustMap, map } from "rxjs";

export class AuthEffects {


    login$ = createEffect(() => this.actions$.pipe(
        ofType(login),
        exhaustMap(action => this.service.loginUser({ username: action.username, password: action.password })
            .pipe(
                map(response => {
                    const token = response.token;
                    const payload = this.service.getPayload(token);

                    const loginData = {
                        user: { username: payload.sub },
                        isAuth: true,
                        isAdmin: payload.isAdmin
                    };
                    this.service.token = token;
                    this.service.user = loginData;
                    return loginSuccess({ login: user });
                })

            ))
    ));
    constructor(private service: AuthService,
        private actions$: Actions,
        private router: Router
    ) { }
}