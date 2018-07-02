import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AppConfig} from '../appconfig';
import {ToastrService} from 'ngx-toastr';
import { Http, Headers} from '@angular/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
LoginForm:FormGroup;
Email:string;
Password:string;
Remember:boolean;

  constructor(private http:Http,private fb:FormBuilder,
    private config:AppConfig,private toastr:ToastrService) { 
    this.LoginForm = fb.group({
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', Validators.required],
      RememberMe: [false]
    });
  }

  ngOnInit() {
  }

  OnSubmit(LoginFormValue) {
    debugger;
    // this.authService.login(LoginFormValue)
    // .map(x=>x.json())
    this.Email=this.LoginForm.get("Email").value;
    this.Password=this.LoginForm.get("Password").value;
    let theaders = new Headers({'Content-Type': 'application/json'});
    this.http.post('http://localhost:3000/user/signin',
                    JSON.stringify({email:this.Email,password:this.Password}),
                     {headers:theaders})   
    .subscribe((x) => {
      console.log(x);
      x=x.json();
      if (LoginFormValue.RememberMe == true) {
        localStorage.setItem('currentUser', JSON.stringify(x));
        localStorage.setItem('loggedIn', 'true');
      }
      else {
        sessionStorage.setItem('currentUser', JSON.stringify(x));
        sessionStorage.setItem('loggedIn', 'true');
      }
      // this.curUser.updateUser();
      // this.router.navigate(["home"]);
      this.toastr.success("Logged in Successfully","Success");
    },
      err => {
        console.log(err);
        this.toastr.error(err._body, 'Error');        
        //this.alert.setmessage(err._body,"Error");
      })
  }

  setRemember() {
    debugger;
    this.Remember=!this.Remember
    this.LoginForm.patchValue({ RememberMe: this.Remember });
  }
   

}
