import { Component, EventEmitter, Output } from '@angular/core';
import { SharedDataService } from 'apps/group-chat/src/app/shared';

@Component({
  selector: 'message-input',
  templateUrl: './message-input.component.html',
})
export class MessageInputComponent {
  @Output() messageSent = new EventEmitter<string>();
  @Output() isTyping = new EventEmitter<void>();

  message: string = '';
  constructor(private sharedService: SharedDataService) {}

  sendMessage() {
    if (this.message.trim()) {
      this.messageSent.emit(this.message);
      this.message = '';
    }
  }
  OnTyping() {
    this.isTyping.emit();
  }
}
