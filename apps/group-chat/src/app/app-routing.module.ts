import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupsPageComponent } from './components/groups-page/groups-page.component';
import { LoginComponent } from './components/auth/login-component/login.component';
import { RegisterComponent } from './components/auth/register-component/register.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared/guards/authentication.guard';
const routes: Routes = [
  { path: 'groups', component: GroupsPageComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
