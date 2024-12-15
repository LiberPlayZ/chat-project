import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { GroupDto } from '@group-chat/shared-data/lib/group-chat-control/models/dtos/index';
import { GroupFrontendService } from 'apps/group-chat/src/app/api-endpoint/group-frontend.service';
import { catchError, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { SocketIoService } from 'apps/group-chat/src/app/socket-io-endpoint/socket.service';
export interface GroupsStateStore {
  groups: GroupDto[];
}

@Injectable()
export class GroupsComponentStore extends ComponentStore<GroupsStateStore> {
  constructor(
    private groupService: GroupFrontendService,
    private socketService: SocketIoService
  ) {
    super({
      groups: [],
    });
  }
  // selectors for all attributes .

  readonly groups$ = this.select((state) => state.groups);

  // updaters for all attributes .

  readonly setGroups = this.updater((state, groups: GroupDto[]) => ({
    ...state,
    groups: groups || [],
  }));

  readonly addGroup = this.updater((state, newGroup: GroupDto) => ({
    ...state,
    groups: [...state.groups, newGroup],
  }));

  readonly leaveGroup = this.updater((state, groupId: number) => ({
    ...state,
    groups: state.groups.filter((group) => group.id !== groupId),
  }));

  // effects

  loadGroups = this.effect((trigger) =>
    trigger.pipe(
      switchMap(() =>
        this.groupService.getUserGroups().pipe(
          tap({
            next: (groups) =>
              this.patchState({
                groups,
              }),
            error: () => this.patchState({ groups: [] }),
          })
        )
      )
    )
  );

  updateGroups = this.effect((group$: Observable<GroupDto>) => {
    return group$.pipe(
      switchMap((group) => {
        return this.groupService.createGroup(group).pipe(
          tap((updatedGroup) => {
            this.addGroup(updatedGroup);
            if (group.users)
              this.socketService.updateInGroupUsers(group.users, group.name);
          })
        );
      })
    );
  });

  leaveGroupUpdate = this.effect((groupId$: Observable<number>) => {
    return groupId$.pipe(
      switchMap((groupId) => {
        return this.groupService.leaveGroup(groupId).pipe(
          tap((groupId) => {
            this.leaveGroup(groupId);
          })
        );
      })
    );
  });
}
