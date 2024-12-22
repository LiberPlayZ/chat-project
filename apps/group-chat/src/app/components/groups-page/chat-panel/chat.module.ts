import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AvatarModule } from 'primeng/avatar';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { ChatPanelComponent } from './chat-panel.component';
import { MessageInputComponent } from './message-input/message-input.component';
import { SocketIoService } from '../../../socket-io-endpoint/socket.service';
import { MessageTemplateComponent } from './message-template/message-template.component';
import { ChatComponentStoreModule } from './chat-component-store/chat-component-store.module';
import { ChatFrontendService } from '../../../api-endpoint/chat-frontend.service';
@NgModule({
  declarations: [
    ChatPanelComponent,
    MessageInputComponent,
    MessageTemplateComponent,
  ],
  imports: [
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    AvatarModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    ChatComponentStoreModule,
  ],
  providers: [SocketIoService, ChatFrontendService],
  exports: [ChatPanelComponent],
})
export class ChatModule { }
