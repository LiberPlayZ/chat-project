import { Injectable } from '@angular/core';
import { UserFrontendService } from '../../api-endpoint/user-frontend.service';
import { CanActivate, Router } from '@angular/router';
import { Observable, catchError, map } from 'rxjs';
import { error } from 'console';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private userService: UserFrontendService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    console.log('enter guard');

    return this.userService.isAuthenticated().pipe(
      map((isAuthenticated) => {
        if (isAuthenticated) {
          
          return true;
        } else {
        
        
          this.router.navigate(['/login']);
          return false;
        }
      }),
      catchError((error) => {
        console.error('error in authGuard', error);
        this.router.navigate(['/login']);
        return [false];
      })
    );
  }
}
