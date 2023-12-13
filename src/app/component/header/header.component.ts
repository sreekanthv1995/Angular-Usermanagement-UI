import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoginState } from '../../shared/store/login/login.state';
import { Observable } from 'rxjs';
import { isAuthenticated } from '../../shared/store/login/login.selector';
import { autoLogout } from '../../shared/store/login/login.action';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  isAuthenticate!:Observable<boolean>;

  constructor(private store: Store<LoginState>){}

  ngOnInit(): void {
      this.isAuthenticate = this.store.select(isAuthenticated)
  }

  onLogout(event: Event){
    event.preventDefault();
    this.store.dispatch(autoLogout());


  }

}
