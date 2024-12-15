import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  UserDTO,
  LoginDTO,
} from '@group-chat/shared-data/lib/users-control/index';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { MultiSelectInterface } from '@ui-components';
import { User } from '../shared';

@Injectable()
export class UserFrontendService {
  private readonly apiUrl = environment.APIKeys.BACKEND_API;

  constructor(private http: HttpClient) {
    console.log(this.apiUrl);
  }

  public createUser(user: UserDTO): Observable<{ user: User; userId: number }> {
    return this.http.post<{ user: User; userId: number }>(
      `${this.apiUrl}/users/register`,
      user,
      { withCredentials: true }
    );
  }

  public checkLogin(
    loginUser: LoginDTO
  ): Observable<{ user: User; token: string }> {
    return this.http.post<{ user: User; token: string }>(
      `${this.apiUrl}/users/login`,
      loginUser,
      { withCredentials: true }
    );
  }

  public isAuthenticated(): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/users/isAuthenticated`, {
      withCredentials: true,
    });
  }

  public logOut(): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/users/logout`, null, {
      withCredentials: true,
    });
  }

  public getAllUsers(): Observable<UserDTO[]> {
    return this.http.get<UserDTO[]>(`${this.apiUrl}/users`);
  }
  public getAllUsersBesideConnected(): Observable<MultiSelectInterface[]> {
    return this.http.get<MultiSelectInterface[]>(
      `${this.apiUrl}/users/getUsers`,
      { withCredentials: true }
    );
  }
  public getUserName(): Observable<{ username: string }> {
    return this.http.get<{ username: string }>(
      `${this.apiUrl}/users/getUserName`,
      {
        withCredentials: true,
      }
    );
  }

  // public getSearchedUsers(
  //   filter: string,
  //   userId?: number
  // ): Observable<MultiSelectInterface[]> {
  //   let params = new HttpParams().set('filter', filter);

  //   if (userId) params = params.set('userId', userId);
  //   else params = params.set('userId', 0);

  //   return this.http.get<MultiSelectInterface[]>(
  //     `${this.apiUrl}/users/searchedUsers`,
  //     {
  //       params,
  //     }
  //   );
  // }
}
