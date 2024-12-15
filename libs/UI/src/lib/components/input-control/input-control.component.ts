import { Component, Input, OnInit, inject } from '@angular/core';
import {
  ControlContainer,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'input-control-component',
  templateUrl: './input-control.component.html',
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true }),
    },
  ],
})
export class InputControlComponent implements OnInit {
  @Input() controlKey: string = '';
  @Input() label?: string = '';
  @Input() type?: string = '';
  @Input() validators?: Validators[] = [];
  parentContainer = inject(ControlContainer);

  get parentFormGroup() {
    return this.parentContainer.control as FormGroup;
  }

  ngOnInit() {
    this.parentFormGroup.addControl(
      this.controlKey,
      new FormControl('', this.validators as Validators)
    );
  }

  ngOnDestroy() {}
}
