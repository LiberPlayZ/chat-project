import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddGroupDialogComponent } from './add-group.dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { UiComponentsModule } from '@ui-components';
import { GroupComponentStoreModule } from '../group-panel-component/group-component-store/groups-component-store.module';
@NgModule({
  declarations: [AddGroupDialogComponent],
  imports: [
    CommonModule,
    DialogModule,
    BrowserAnimationsModule,
    ButtonModule,
    UiComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    GroupComponentStoreModule,
    
  ],
  exports: [AddGroupDialogComponent],
  providers:[]
  
})
export class AddGroupModule {}
