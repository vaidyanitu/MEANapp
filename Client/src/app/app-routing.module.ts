import {NgModule} from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from './register/register.component';
import { LoginComponent} from './login/login.component';
import { HomeComponent} from './home/home.component';

const appRoutes:Routes=[
    {path:'register',component:RegisterComponent},
    {path:'login',component:LoginComponent},
    {path:'home',component:HomeComponent},
    {path:'',component:LoginComponent}
];

@NgModule({
    imports:[
        RouterModule.forRoot(
            appRoutes
        )
    ],
    exports:[
        RouterModule
    ]
})
export class AppRoutingModule{}