import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserFrontendService } from '../../../api-endpoint/user-frontend.service';
import {
  authenticating,
  logOut,
  loggedIn,
  loggingIn,
  loggingOut,
  notRegister,
  register,
  registering,
} from './login.actions';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { InputKey, ToastService, ToastSeverity } from '@ui-components';
import { Router } from '@angular/router';

@Injectable()
export class LoginEffect {
  constructor(
    private actions: Actions,
    private service: UserFrontendService,
    private toastService: ToastService,
    private router: Router
  ) {}

  CheckLogin = createEffect(() =>
    this.actions.pipe(
      ofType(loggingIn),
      exhaustMap((action) => {
        return this.service.checkLogin(action.LoginUser).pipe(
          map((data) => {
            this.toastService.showToast(
              ToastSeverity.Success,
              'Success',
              'Login successfully'
            );
            setTimeout(() => {
              this.router.navigate(['/groups']);
            }, 500);

            let user = {
              [InputKey.UserName]: data.user.username,
            };
            return loggedIn({ LoginUser: user });
          }),
          catchError((error) => {
            this.toastService.showToast(
              ToastSeverity.ERROR,
              'Error',
              `${error['error']['message']}`
            );
            return of(logOut());
          })
        );
      })
    )
  );

  Register = createEffect(() =>
    this.actions.pipe(
      ofType(registering),
      exhaustMap((action) => {
        return this.service.createUser(action.user).pipe(
          map((data) => {
            this.toastService.showToast(
              ToastSeverity.Success,
              'Success',
              'User created successfully'
            );
            return register();
          }),
          catchError((error) => {
            this.toastService.showToast(
              ToastSeverity.ERROR,
              'Error',
              `${error['error']['message']}`
            );
            return of(notRegister());
          })
        );
      })
    )
  );

  LogOut = createEffect(() =>
    this.actions.pipe(
      ofType(loggingOut),
      exhaustMap((action) => {
        return this.service.logOut().pipe(
          map((data) => {
            this.router.navigate(['/login']);

            return logOut();
          })
        );
      })
    )
  );

  NotRegister = createEffect(
    () =>
      this.actions.pipe(
        ofType(notRegister),
        tap(() => {
          this.router.navigate(['/register']);
        })
      ),
    { dispatch: false }
  );
  authenticating = createEffect(() =>
    this.actions.pipe(
      ofType(authenticating),
      exhaustMap(() => {
        return this.service.getUserName().pipe(
          map((data) => {
            let user = {
              [InputKey.UserName]: data.username,
            };

            this.router.navigate(['/groups']);

            return loggedIn({ LoginUser: user });
          }),
          catchError((error) => {
            return of(logOut());
          })
        );
      })
    )
  );
}
