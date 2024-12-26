import { Component, EventEmitter, Output } from '@angular/core';
import { ToastService, ToastSeverity } from '@ui-components';

@Component({
  selector: 'message-input',
  templateUrl: './message-input.component.html',
})
export class MessageInputComponent {
  @Output() messageSent = new EventEmitter<{ message?: string, image?: string }>();
  @Output() isTyping = new EventEmitter<void>();
  constructor(private toastService: ToastService) { }

  message: string = '';

  selectedImage: string | null = null;

  maxFileSizeMB: number = 4; // Maximum file size in MB

  onFileSelect(event: Event,): void {
    let file = (event.target as HTMLInputElement).files?.[0];

    if (file) {
      const fileSizeMB = file.size / (1024 * 1024); // Convert file size to MB

      // Validate file size
      if (fileSizeMB > this.maxFileSizeMB) {

        this.toastService.showToast(ToastSeverity.ERROR, "Error", `the file is too large , pls choose file max size is 4mb`)
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result as string;

      };
      reader.readAsDataURL(file);

    }

  }


  sendMessage() {
    if (this.message.trim() || this.selectedImage) {
      this.messageSent.emit({ message: (this.message.trim()) ? this.message : undefined, image: (this.selectedImage) ? this.selectedImage.split(',')[1] : undefined });
      this.message = '';
      this.selectedImage = null;
    }
  }
  OnTyping() {
    this.isTyping.emit();
  }
}
