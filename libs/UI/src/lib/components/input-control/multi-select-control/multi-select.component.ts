import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { ControlContainer, FormControl, FormGroup } from '@angular/forms';
import { MultiSelectInterface } from '../models/interfaces/multi-select-control.interface';
import { MultiSelectLazyLoadEvent } from 'primeng/multiselect';

@Component({
  selector: 'multi-select',
  templateUrl: './multi-select.component.html',
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true }),
    },
  ],
})
export class MultiSelectComponent implements OnInit {
  @Input() controlKey: string = '';
  @Input() label?: string = '';
  @Input() optionLabel?: string = '';
  @Input()  options?: MultiSelectInterface[] = [];
 

  parentContainer = inject(ControlContainer);

  get parentFormGroup() {
    return this.parentContainer.control as FormGroup;
  }
  ngOnInit(): void {
    this.parentFormGroup.addControl(
      this.controlKey,
      new FormControl<MultiSelectInterface[] | null>([])
    );
  }


}
