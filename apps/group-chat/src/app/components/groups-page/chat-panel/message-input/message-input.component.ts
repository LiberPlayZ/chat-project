import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'message-input',
  templateUrl: './message-input.component.html',
})
export class MessageInputComponent {
  @Output() messageSent = new EventEmitter<{ message: string, image?: string}>();
  @Output() isTyping = new EventEmitter<void>();

  message: string = '';

  selectedImage: string | null = null;

  onFileSelect(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result as string;

      };
      reader.readAsDataURL(file);
    }
  }


  sendMessage() {
    if (this.message.trim()) {
      if (this.selectedImage !== null) {
        this.messageSent.emit({ message: this.message, image: this.selectedImage.split(',')[1] });
      }
      else {
        this.messageSent.emit({ message: this.message });

      }
      this.message = '';
    }
  }
  OnTyping() {
    this.isTyping.emit();
  }
}
