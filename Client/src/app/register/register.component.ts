import { Component, OnInit } from '@angular/core';
import { Http,Headers, Response } from '@angular/http';
import { FormGroup,FormControl, FormBuilder,Validators} from '@angular/forms';
import { AppConfig} from '../appconfig';


@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
Email:string;
Password:string;
configUrl:string;
RegisterForm:FormGroup;
  constructor(private http:Http,private fb:FormBuilder,
   private config:AppConfig) {
    this.RegisterForm=this.fb.group({
      Email:['',Validators.required],
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
    var temp=JSON.stringify({"email":this.Email,"password":this.Password});
    this.http.post('http://localhost:3000/user/signup',
                    JSON.stringify({email:this.Email,password:this.Password}),
                     {headers:theaders})    
    .subscribe((res:Response)=>{
      console.log(res);
      console.log("data= "+res.text());
      }
    ,err=>(console.log('Error: '+err)));
  }

}
