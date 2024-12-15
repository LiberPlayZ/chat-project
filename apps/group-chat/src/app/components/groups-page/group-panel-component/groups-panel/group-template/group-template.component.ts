import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { GroupsComponentStore } from '../../group-component-store/group-component-store.service';
import { SharedDataService } from 'apps/group-chat/src/app/shared';
@Component({
  selector: 'group-custom-template',
  templateUrl: './group-template.component.html',
})
export class GroupTemplate implements OnInit {
  @Input() group_name!: string;
  @Input() group_description!: string;
  @Input() group_id?: number;
  @Input() notification: number = 0;
  @Output() leaveGroupEvent = new EventEmitter<number>();
  items: MenuItem[] | undefined;
  public groupStore!: GroupsComponentStore;
  constructor(
    groupStore: GroupsComponentStore,
    private sharedService: SharedDataService
  ) {
    this.groupStore = groupStore;
  }
  //   currentUser!: Observable<User | null>;

  //   constructor(private store: Store<{ isLoggingIn: LoggingState }>) {}

  ngOnInit(): void {
    this.items = [
      {
        label: 'Options',
        items: [
          {
            label: 'Edit',
            icon: 'pi pi-file-edit',
            command: () => {},
          },
          {
            label: 'Leave',
            icon: 'pi pi-times',
            command: () => {
              this.leaveGroupEvent.emit(this.group_id);
            },
          },
        ],
      },
    ];
  }
  OnGroupNameClick() {
    if (this.group_id)
      this.sharedService.selectData(
        {
          id: this.group_id,
          name: this.group_name,
        },
        'OnGroupNameClick'
      );
  }
}
