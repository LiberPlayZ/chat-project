import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthComponentModule } from './components/auth/auth-component.module';
import { StoreModule } from '@ngrx/store';
import {
  isLoggingInFeature,
  isLoggingInReducer,
} from './shared/ngrx_store/login_state/login.state';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { LoginEffect } from './shared/ngrx_store/login_state/login.effects';
import { GroupsPageModule } from './components/groups-page/group.module';
import { NavBarModule } from './components/navbar/navbar.module';
import { SharedDataModule } from './shared/sharedData.module';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    AuthComponentModule,
    GroupsPageModule,
    NavBarModule,
    SharedDataModule,
    StoreModule.forRoot({ isLoggingIn: isLoggingInReducer }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    StoreModule.forFeature(isLoggingInFeature),
    EffectsModule.forRoot([LoginEffect]),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
