import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserRegisterModel } from '../../model/register.model';
import { Store } from '@ngrx/store';
import { MasterService } from '../../service/master.service';
import { Router } from '@angular/router';
import { LoginState } from '../../shared/store/login/login.state';
import { setLoadingSpinner } from '../../shared/shared.action';
import { registerUser } from '../../shared/store/login/login.action';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit{

  registerForm!: FormGroup;

  constructor(private service: MasterService, private builder: FormBuilder,private router:Router,private store: Store<LoginState>){}

  ngOnInit(): void {
    this.registerForm = this.builder.group({
  
      firstName:this.builder.control('',Validators.required),
      lastName:this.builder.control('',Validators.required),
      email:this.builder.control('',Validators.required),
      password:this.builder.control('',Validators.required)
    })
  }

  register(){

    // this.service.registerUser(this.registerForm.value).subscribe(
    //   (response)=>{
    //     if(response!=null){
    //       this.router.navigateByUrl("/login")
    //     }
    //   }
    // )

    if(!this.registerForm.valid){return;}

    const registerInput : UserRegisterModel = {
      firstName: this.registerForm.value.firstName,
      lastName: this.registerForm.value.lastName,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      id: 0,
      role: '',
      token: ''
    }
    
    this.store.dispatch(setLoadingSpinner({status: true}))
    this.store.dispatch(registerUser({ registerInput }))
  
  }



}


