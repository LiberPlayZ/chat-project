import { NgModule } from '@angular/core';
import { LoginComponent } from './login-component/login.component';
import { RegisterComponent } from './register-component/register.component';
import { UiComponentsModule } from '@ui-components';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { UserFrontendService } from '../../api-endpoint/user-frontend.service';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    UiComponentsModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CommonModule,
    ToastModule,
    HttpClientModule,
    RouterModule,
  ],
  providers: [UserFrontendService],
})
export class AuthComponentModule {}
