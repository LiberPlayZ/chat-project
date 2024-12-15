import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  InputControl,
  InputKey,
  InputService,
  MultiSelectInterface,
} from '@ui-components';
import { GroupDto } from '@group-chat/shared-data/lib/group-chat-control/models/dtos/index';
import { GroupsComponentStore } from '../group-panel-component/group-component-store/group-component-store.service';
import { AddGroupComponentStore } from './add-group-component-store/add-group-component-store.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'add-group-dialog',
  templateUrl: './add-group.dialog.component.html',
})
export class AddGroupDialogComponent implements OnInit {
  @Input() visible: boolean = false;
  @Output() dialogCLose = new EventEmitter<void>();
  private currentOffset = 0;
  private currentFilter = '';
  public addGroupForm: FormGroup;
  addGroupInputs!: InputControl[];
  constructor(
    private inputService: InputService,
    private groupsStore: GroupsComponentStore,
    private addGroupComponentStore: AddGroupComponentStore
  ) {
    this.addGroupForm = new FormGroup({});
  }

  public vm$ = this.addGroupComponentStore.vm$;
  ngOnInit(): void {
    this.addGroupInputs = this.inputService.getItemsByKeys([
      InputKey.Name,
      InputKey.Description,
    ]);
    this.addGroupComponentStore.loadUsers();
  }

  onCreate() {
    console.log(this.addGroupForm.value);

    if (this.addGroupForm.valid) {
      let newGroup: GroupDto = this.addGroupForm.value;
      this.groupsStore.updateGroups(newGroup);
      this.visible = false;
      this.addGroupForm.reset();
    }
  }

  OnDialogHide() {
    this.dialogCLose.emit();
  }

  preventScrolling(event: Event) {
    event.preventDefault();
  }
}
