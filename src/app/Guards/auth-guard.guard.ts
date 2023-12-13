import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "../shared/app.state";

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  constructor(private router: Router, private store: Store<AppState>) {}

  canActivate() {
    // const user: User | undefined = this.store.select(getUser).getValue();

    // if (user && user.role === 'ADMIN') {
    //   return true;
    // }

    if(localStorage.getItem('token')){
      return true;
    }
    // this.router.navigate(['']);
    return false;
  }
}
