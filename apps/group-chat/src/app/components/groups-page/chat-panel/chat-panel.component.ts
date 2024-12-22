import {
  AfterViewChecked,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { SharedDataService } from '../../../shared';
import { MessageDto } from '@group-chat/shared-data';
import { ChatComponentStore } from './chat-component-store/chat-component-store.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'chat-panel',
  templateUrl: './chat-panel.component.html',
})
export class ChatPanelComponent {
  private selected_group_id: number | null = null;
  private typingTimeout!: any;
  messages?: Observable<MessageDto[]>;
  senderUsername?: Observable<string>;
  typingMessage: string = '';

  @ViewChild('scrollChatContainer') scrollContainer!: ElementRef;

  constructor(
    private sharedDataService: SharedDataService,
    private chatComponentStore: ChatComponentStore
  ) {
    this.sharedDataService.selectedData$.subscribe(
      (transferData: { data: any; event: string }) => {
        if (transferData) {
          if (transferData.event === 'OnGroupNameClick') {
            if (transferData.data) {
              this.loadMessages(transferData.data.id);
            }
          }
          if (transferData.event === 'newMessages') {
            const message = transferData.data as MessageDto;
            if (this.selected_group_id === message.groupId) {
              this.typingMessage = '';
              this.loadMessages(message.groupId);
            }
          }

          if (transferData.event === 'OnTyping') {
            if (transferData.data.groupId === this.selected_group_id) {
              this.typingMessage = `${transferData.data.sender} is typing...`;
              clearTimeout(this.typingTimeout);
              this.typingTimeout = setTimeout(() => {
                this.typingMessage = '';
              }, 3000);
            }
          }
        }
      }
    );
  }

  public loadMessages(groupId: number) {
    if (groupId !== this.selected_group_id) {
      this.selected_group_id = groupId;
    }

    this.chatComponentStore.loadMessages(this.selected_group_id);
    this.messages = this.chatComponentStore.messages$;
    this.senderUsername = this.chatComponentStore.senderUsername$;
    setTimeout(() => {
      this.scrollToBottom();
    }, 500);
  }

  handleMessage(data: { message: string, image?: string }) {

    let messageDto: MessageDto;
    if (this.selected_group_id) {
      messageDto = {
        text: data.message,
        username: '',
        groupId: this.selected_group_id,
        date: new Date(),
        image: data.image
      };
      this.chatComponentStore.updateMessage(messageDto);
      setTimeout(() => {
        this.scrollToBottom();
      }, 100);
    }
  }
  handleTyping() {
    if (this.selected_group_id)
      this.chatComponentStore.onTyping(this.selected_group_id);
  }

  scrollToBottom() {
    const container = this.scrollContainer.nativeElement;
    container.scrollTop = container.scrollHeight;
  }
}
