import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule} from '@angular/forms';
import { HttpModule} from '@angular/http';

import{CommonModule} from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';

import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import {AppConfig} from './appconfig';
import {AppRoutingModule} from './app-routing.module';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,    
    ReactiveFormsModule,
    HttpModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AppRoutingModule    
  ],
  providers: [AppConfig],
  bootstrap: [AppComponent]
})
export class AppModule { }
