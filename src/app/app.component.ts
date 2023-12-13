import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from './shared/app.state';
import { getErrorMessage, getLoading } from './shared/shared.selector';
import { autoLogin } from './shared/store/login/login.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'user-management-new';
  showLoading!:Observable<boolean>;
  showErrorMessage!: Observable<string>;

  constructor(private store: Store<AppState>){}


  ngOnInit(): void {
    this.showLoading = this.store.select(getLoading);
    this.showErrorMessage = this.store.select(getErrorMessage);
    this.store.dispatch(autoLogin())
      
  }
}
