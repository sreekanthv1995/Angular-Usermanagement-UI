import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { HomeComponent } from './component/home/home.component';
import { FooterComponent } from './component/footer/footer.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginEffects } from './shared/store/login/login.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { LoadingSpinnerComponent } from './shared/component/loading-spinner/loading-spinner.component';
import { appReducer } from './shared/app.state';
import { UsersComponent } from './component/users/users.component';
import { AdminHomeComponent } from './component/admin-home/admin-home.component';
import { UserListEffect } from './shared/store/user-list/userList.effects';
import {  EditUserComponent } from './component/edit-user/edit-user.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthTokenInterceptor } from './service/authToken.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    FooterComponent,
    LoadingSpinnerComponent,
    UsersComponent,
    AdminHomeComponent,
    EditUserComponent,
  ],
  imports: [
    BrowserModule,
    MatDialogModule,
    AppRoutingModule,
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot([LoginEffects,UserListEffect]),
    BrowserAnimationsModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25, logOnly: false,
    }),
    MaterialModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    provideClientHydration(),
    {provide:HTTP_INTERCEPTORS,useClass:AuthTokenInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
