import { NgModule } from '@angular/core';
import { InputControlComponent } from './components/input-control/input-control.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputService } from './components/input-control/services/input.service';
import { ToastService } from './components';
import { MessageService } from 'primeng/api';
import { MultiSelectComponent } from './components/input-control/multi-select-control';
import { MultiSelectModule } from 'primeng/multiselect';
import { ToastModule } from 'primeng/toast';
@NgModule({
  declarations: [InputControlComponent, MultiSelectComponent],
  imports: [
    ButtonModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    MultiSelectModule,
    ToastModule,
  ],
  providers: [InputService, MessageService, ToastService],
  exports: [InputControlComponent, MultiSelectComponent],
})
export class UiComponentsModule {}
