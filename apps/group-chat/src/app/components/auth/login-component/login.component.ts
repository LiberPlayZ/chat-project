import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  InputService,
  InputControl,
  InputKey,
  ToastService,
  ToastSeverity,
} from '@ui-components';
import { LoginDTO } from '@group-chat/shared-data/lib/users-control/index';
import { environment } from 'apps/group-chat/src/environments/environment';
import {
  LoggingState,
  isLoggingInFeature,
} from '../../../shared/ngrx_store/login_state/login.state';
import { Store } from '@ngrx/store';
import {
  authenticating,
  loggingIn,
} from '../../../shared/ngrx_store/login_state/login.actions';
import { Observable } from 'rxjs';
import { IsLoggingIn } from '../../../shared/enums/isLogging.enum';
import { LoginUser } from '../../../shared/models/login_user.interface';
@Component({
  selector: 'login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public loginInputs: InputControl[];
  loadingState!: Observable<IsLoggingIn>;

  constructor(
    private inputService: InputService,
    private toastService: ToastService,
    private store: Store<LoggingState>
  ) {
    this.loginForm = new FormGroup({});
    this.loginInputs = [];
  }

  ngOnInit(): void {
    this.store.dispatch(authenticating());
    this.loadingState = this.store.select(isLoggingInFeature.selectIsLoggingIn);
    this.loginInputs = this.inputService.getItemsByKeys([
      InputKey.Email,
      InputKey.Password,
    ]);
  }

  onSubmit() {
    console.log(environment);
    console.log(this.loginForm.value);

    if (this.loginForm.invalid) {
      this.toastService.showToast(
        ToastSeverity.ERROR,
        'Error',
        ' Form  Invalid'
      );
      return;
    } else {
      const loginUser: LoginDTO = this.loginForm.value;
      this.store.dispatch(loggingIn({ LoginUser: loginUser as LoginUser }));
    }
  }
}
