import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  InputService,
  InputControl,
  ToastService,
  ToastSeverity,
  InputKey,
} from '@ui-components';
import { UserDTO } from '@group-chat/shared-data/lib/users-control/index';
import {
  LoggingState,
  isLoggingInFeature,
} from '../../../shared/ngrx_store/login_state/login.state';
import { Store } from '@ngrx/store';
import { IsLoggingIn } from '../../../shared/enums/isLogging.enum';
import { Observable } from 'rxjs';
import { registering } from '../../../shared/ngrx_store/login_state/login.actions';
@Component({
  selector: 'register-component',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;
  public registerInputs: InputControl[];
  loadingState!: Observable<IsLoggingIn>;

  constructor(
    private inputService: InputService,
    private toastService: ToastService,
    private store: Store<LoggingState>
  ) {
    this.registerForm = new FormGroup({});
    this.registerInputs = [];
  }

  ngOnInit(): void {
    this.registerInputs = this.inputService.getItemsByKeys([
      InputKey.UserName,
      InputKey.Name,
      InputKey.IdNumber,
      InputKey.Age,
      InputKey.Email,
      InputKey.Password,
    ]);
    this.loadingState = this.store.select(isLoggingInFeature.selectIsLoggingIn);
    this.store.select(isLoggingInFeature.selectUser);
  }

  onSubmit() {
    console.log(this.registerForm.value);
    if (this.registerForm.invalid) {
      this.toastService.showToast(ToastSeverity.ERROR, 'Error', 'Form Invalid');
      return;
    } else {
      const user: UserDTO = this.registerForm.value;
      this.store.dispatch(registering({ user: user as UserDTO }));
    }
  }
}
