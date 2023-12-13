import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserListState } from "./userList.state";
import { User } from "../../../model/userModel";

export const USER_STATE_NAME = 'userList';

export const getUserState = createFeatureSelector<UserListState> (USER_STATE_NAME);

export const getUsers = createSelector(getUserState,(state)=> state.users);

// export const getUserById = createSelector(getUserState,(state:any,props:any)=> {
//     return state.users[props.id] ? state.users[props.id]: null;
// })

export const getUserById =(userId:number)=> createSelector(getUserState,(state)=>{
    return state.users.find((user:User)=>user.id === userId) as User;
});

export const getUser =(user:User)=> createSelector(getUserState,(state)=>{
    return state.users;
});