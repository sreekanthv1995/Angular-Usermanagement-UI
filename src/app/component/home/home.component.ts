import { Component, Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../model/userModel';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../shared/app.state';
import { loginSuccess } from '../../shared/store/login/login.action';
import { getLoggedInUser } from '../../shared/store/login/login.selector';
import { MasterService } from '../../service/master.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit{

  loggedInUser$!: Observable<User | null>;

  constructor(private store: Store<AppState>,private service: MasterService){
  }

  // loggedInUser$ = this.store.pipe(select(getLoggedInUser));

  ngOnInit(): void {
    this.loggedInUser$ = this.store.select(getLoggedInUser)
    }

    

    
   
    
  }

 