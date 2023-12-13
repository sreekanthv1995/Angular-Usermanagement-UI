import { Component } from '@angular/core';
import { UserDataService } from '../../service/user-data.service';
import { User } from '../../model/userModel';
import { Store } from '@ngrx/store';
import { AppState } from '../../shared/app.state';
import { loadUsers } from '../../shared/store/user-list/userList.action';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {

  users: User[] = [];

  constructor(private userDataService: UserDataService,private store: Store<AppState>) {}

  ngOnInit(): void {
    this.userDataService.usersData$.subscribe((users) => {
      this.users = users;
    });

    this.store.dispatch(loadUsers())
  }

}
