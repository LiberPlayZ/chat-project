import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { UserFrontendService } from 'apps/group-chat/src/app/api-endpoint/user-frontend.service';
import {
  MultiSelectInterface,
  ToastService,
  ToastSeverity,
} from '@ui-components';


export interface UsersStateStore {
  users: MultiSelectInterface[];
  isLoading: boolean;
}

@Injectable()
export class AddGroupComponentStore extends ComponentStore<UsersStateStore> {
  constructor(
    private usersService: UserFrontendService,
    private toastService: ToastService,
  ) {
    super({
      users: [],
      isLoading: false,
    });
  }
  // selectors for all attributes .

  private readonly users$ = this.select((state) => state.users);

  private readonly isLoading$ = this.select((state) => state.isLoading);


  public vm$ = this.select({
    users: this.users$,
    isLoading: this.isLoading$,
  });

  // updaters for all attributes .

  readonly setUsers = this.updater((state, users: MultiSelectInterface[]) => ({
    ...state,
    users: users,
  }));

  // effects

  loadUsers = this.effect((trigger) =>
    trigger.pipe(
      switchMap(() =>
        this.usersService.getAllUsersBesideConnected().pipe(
          tap({
            next: (users) =>
              this.patchState({
                users,
                isLoading: false,
              }),
            error: () => this.patchState({ users:[],isLoading: false }),
          })
        )
      )
    )
  );

  
}
