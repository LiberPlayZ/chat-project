import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { PopMenuComponent } from './popUp-menu/menu.component';
import { AvatarModule } from 'primeng/avatar';
import { RippleModule } from 'primeng/ripple';
import { UserTemplateComponent } from './popUp-menu/custom-user-template/user-template.component';
import { AddGroupModule } from '../groups-page/add-group-dialog/add-group.module';
import { AddGroupComponentStoreModule } from '../groups-page/add-group-dialog/add-group-component-store/add-group-component-store.module';
import { InputSwitchModule } from 'primeng/inputswitch';
@NgModule({
  declarations: [PopMenuComponent, UserTemplateComponent],
  imports: [
    ButtonModule,
    MenuModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CommonModule,
    RouterModule,
    AvatarModule,
    RippleModule,
    AddGroupModule,
    AddGroupComponentStoreModule,
    InputSwitchModule,
  ],
  providers: [],
  exports: [PopMenuComponent],
})
export class NavBarModule {}
