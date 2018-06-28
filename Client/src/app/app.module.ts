import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule} from '@angular/forms';
import { HttpModule} from '@angular/http';

import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import {AppConfig} from './appconfig';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,    
    ReactiveFormsModule,
    HttpModule    
  ],
  providers: [AppConfig],
  bootstrap: [AppComponent]
})
export class AppModule { }
