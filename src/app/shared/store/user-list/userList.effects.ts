import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MasterService } from '../../../service/master.service';
import { UserRegisterModel } from '../../../model/register.model';
import {
  deleteUser,
  deleteUserSuccess,
  loadUsers,
  loadUsersSuccess,
  updateUser,
  updateUsersuccess,
} from './userList.action';
import { catchError, exhaustMap, map, mergeMap, of, switchMap } from 'rxjs';

@Injectable()
export class UserListEffect {
  constructor(private action$: Actions, private service: MasterService) {}

  loadUser$ = createEffect(() => {
    return this.action$.pipe(
      ofType(loadUsers),
      mergeMap((action) => {
        return this.service.getAllUsers().pipe(
          map((data) => {
            const filteredUsers = data.filter((user: { role: string; }) => user.role === 'USER');
            return loadUsersSuccess({ users: filteredUsers });
          })
        );
      })
    );
  });

  _updateUser = createEffect(() =>
    this.action$.pipe(
      ofType(updateUser),
      exhaustMap((action) =>
        this.service
          .editUser(action.user.id, action.user).pipe(
            map((res)=> updateUsersuccess({user:action.user}))
            // switchMap((res) => of(updateUsersuccess({ user: action.user })))
          )
      )
    )
  );

  //   _updateUser = createEffect(() =>
  //   this.action$.pipe(
  //     ofType(updateUser),
  //     switchMap(action =>
  //       this.service.editUser(action.user.id, action.user).pipe(
  //         map(() => updateUsersuccess({ user: action.user }))

  //       )
  //     )
  //   )
  // );

  _deleteUser = createEffect(() =>
    this.action$.pipe(
      ofType(deleteUser),
      exhaustMap((action) => {
        return this.service.deleteUser(action.id).pipe(
          map(() => {
            return deleteUserSuccess({ id: action.id });
          })
        );
      })
    )
  );
}
