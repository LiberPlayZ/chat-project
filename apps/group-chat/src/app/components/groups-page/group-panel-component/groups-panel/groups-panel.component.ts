import { Component, Input, OnInit } from '@angular/core';
import { GroupsComponentStore } from '../group-component-store/group-component-store.service';
import { Observable } from 'rxjs';
import { GroupDto } from '@group-chat/shared-data';
import { SocketIoService } from 'apps/group-chat/src/app/socket-io-endpoint/socket.service';
import { SharedDataService } from 'apps/group-chat/src/app/shared';
import { ToastService, ToastSeverity } from '@ui-components';

@Component({
  selector: 'groups-panel',
  templateUrl: './groups-panel.component.html',
})
export class GroupsPanelComponent implements OnInit {
  constructor(
    private readonly groupStore: GroupsComponentStore,
    private socketService: SocketIoService,
    private sharedService: SharedDataService,
    private toastService: ToastService
  ) {}
  groups?: Observable<GroupDto[]>;

  ngOnInit(): void {
    //TODO: unsub after once
    this.socketService.listenForMessages((data) => {
      this.toastService.showToast(
        ToastSeverity.INFO,
        'You receive a new message! ',
        `Received from ${data.groupName}`
      );
      this.sharedService.selectData(data.message, 'newMessages');
    });
    this.socketService.listenForTyping(
      (data: { sender: string; groupId: number }) => {
        this.sharedService.selectData(data, 'OnTyping');
      }
    );
    this.socketService.listenForUpdateInGroupUsers((groupName: string) => {
      this.loadGroups();
      this.toastService.showToast(
        ToastSeverity.Success,
        'You add to new group! ',
        `Welcome to ${groupName}`,
        5000
      );
    });
    this.loadGroups();
  }

  loadGroups() {
    this.groupStore.loadGroups();
    this.groups = this.groupStore.groups$;

    this.groups.forEach((groups$) => {
      groups$.forEach((group) => {
        this.socketService.joinGroup(String(group.id));
      });
    });
  }

  LeaveGroupHandle(event: number) {
    console.log('hello from father', event);
    this.groupStore.leaveGroupUpdate(event);
  }
}
