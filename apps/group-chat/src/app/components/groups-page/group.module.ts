import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { GroupsPageComponent } from './groups-page.component';
import { NavBarModule } from '../navbar/navbar.module';
import { GroupsPanelComponent } from './group-panel-component/groups-panel/groups-panel.component';
import { PanelModule } from 'primeng/panel';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';
import { GroupTemplate } from './group-panel-component/groups-panel/group-template/group-template.component';
import { ChatModule } from './chat-panel/chat.module';
import { GroupFrontendService } from '../../api-endpoint/group-frontend.service';
import { GroupComponentStoreModule } from './group-panel-component/group-component-store/groups-component-store.module';
import { SocketIoService } from '../../socket-io-endpoint/socket.service';
import { BadgeModule } from 'primeng/badge';
import { ToastModule } from 'primeng/toast';
import { UiComponentsModule } from '@ui-components';
@NgModule({
  declarations: [GroupsPageComponent, GroupsPanelComponent, GroupTemplate],
  imports: [
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    RouterModule,
    NavBarModule,
    PanelModule,
    AvatarModule,
    MenuModule,
    ChatModule,
    GroupComponentStoreModule,
    BadgeModule,
    ToastModule,
    UiComponentsModule,
  ],
  providers: [GroupFrontendService, SocketIoService],
})
export class GroupsPageModule {}
