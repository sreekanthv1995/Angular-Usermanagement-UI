import { createReducer, on } from '@ngrx/store';
import { initialState } from './userList.state';
import {
  addUserSuccess,
  deleteUser,
  loadUsersSuccess,
  updateUser,
  updateUsersuccess,
} from './userList.action';
import { User } from '../../../model/userModel';

const _userListReducer = createReducer(
  initialState,
  on(loadUsersSuccess, (state, action) => {
    return {
      ...state,

      users: action.users,
    };
  }),
  on(addUserSuccess, (state, action) => {
    const _user = { ...action.user };
    const updateUser = state.users.map(user=>{
      return user.id === _user.id?_user:user;
    })

    return {
      ...state,
      users: [...state.users],
    };
  }),
//   on(updateUsersuccess, (state, action) => {
//     const updateUser = state.users.map((user) => {
//       return action.user.id === user.id ? action.user : user;
//     });
//     return {
//       ...state,
//       users: updateUser,
//     };
//   })
on(updateUser,(state,action)=>{
    const _user = {...action.user}
    const updateUser = state.users.map(user => {
        return _user.id === user.id?_user:user;
    })
    return{
        ...state,
        users:updateUser
    }
}),
on(deleteUser,(state,action)=>{
  const updateUser = state.users.filter((data:User) => {
      return data.id !== action.id
  });
  return{
      ...state,
      users:updateUser
  }
})
);

export function UserListReducer(state: any, action: any) {
  return _userListReducer(state, action);
}
