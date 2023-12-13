import { createAction, props } from "@ngrx/store";
import { UserRegisterModel } from "../../../model/register.model";
import { User } from "../../../model/userModel";

export const LOAD_USERS = '[user page] load users';
export const LOAD_USERS_SUCCESS = '[user page] load users success';
export const ADD_USER = '[user page] add users';
export const ADD_USER_SUCCESS = '[user page] add user success';
export const UPDATE_USER = '[user page] update user';
export const UPDATE_USER_SUCCESS = '[user page] update user';
export const DELETE_USER = '[user page] delete user';
export const DELETE_USER_SUCCESS = '[user page] delete user success';



export const loadUsers = createAction(LOAD_USERS);
export const loadUsersSuccess = createAction(LOAD_USERS_SUCCESS,props<{users: User[]}>());

export const addUser = createAction(ADD_USER,props<{user: User}>());
export const addUserSuccess = createAction(ADD_USER_SUCCESS,props<{user: User}>());

export const updateUser = createAction(UPDATE_USER,props<{user:User}>());
export const updateUsersuccess = createAction(UPDATE_USER_SUCCESS,props<{user:User}>());

export const deleteUser = createAction(DELETE_USER,props<{id:number}>());

export const deleteUserSuccess = createAction(DELETE_USER_SUCCESS,props<{id:number}>());


