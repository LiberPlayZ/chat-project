import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ToastSeverity } from '../models/enums/severity.enum';

@Injectable()
export class ToastService {
  constructor(private messageService: MessageService) {}

  showToast(
    severity: ToastSeverity,
    summary: string,
    detail: string,
    life: number = 3000,
    closable: boolean = true
  ) {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
      life: life,
      closable: closable,
    });
  }
}
