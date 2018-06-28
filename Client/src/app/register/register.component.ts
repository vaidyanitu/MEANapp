import { Component, OnInit } from '@angular/core';
import { Http,Headers, Response } from '@angular/http';
import { FormGroup, FormBuilder,Validators} from '@angular/forms';
import { AppConfig} from '../appconfig';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
Email:string;
Password:string;
ConfirmPassword:string;
configUrl:string;
RegisterForm:FormGroup;
  constructor(private http:Http,private fb:FormBuilder,
   private config:AppConfig,private toastr:ToastrService) {
    this.RegisterForm=this.fb.group({
      Email:['',[Validators.required,Validators.email]],
      Password:['',Validators.required],
      ConfirmPassword:['',Validators.required]
    });
    this.configUrl=config.configUrl;
   }

  ngOnInit() {
  }

  onRegister(formvalue:Object){
    debugger;
    // console.log(formvalue);
    let theaders = new Headers({'Content-Type': 'application/json'});
    this.Email=this.RegisterForm.get("Email").value;
    this.Password=this.RegisterForm.get("Password").value;
    this.ConfirmPassword=this.RegisterForm.get("ConfirmPassword").value;
    if(this.Password!=this.ConfirmPassword){
      this.toastr.error('Passwords do not match','Error');
    }
    else{
    var temp=JSON.stringify({"email":this.Email,"password":this.Password});
    this.http.post('http://localhost:3000/user/signup',
                    JSON.stringify({email:this.Email,password:this.Password}),
                     {headers:theaders})    
    .subscribe((res:Response)=>{
      console.log(res);
      console.log("data= "+res.text());
      this.toastr.success('Registration Successful!','Success');
      }
    ,err=>(console.log('Error: '+err)));
    }
  }

}
