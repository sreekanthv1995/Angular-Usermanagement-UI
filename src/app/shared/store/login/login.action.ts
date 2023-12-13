import { createAction, props } from '@ngrx/store';
import { UserRegisterModel } from '../../../model/register.model';
import { User } from '../../../model/userModel';

export const LOGIN_START = '[Login] login start';
export const LOGIN_SUCCESS = '[Login] login success';
export const LOGIN_FAIL = '[Login] login fail';

export const REGISTER_USER = '[Login] register user';
export const REGISTER_USER_SUCCESS = '[Login] register user success';
export const AUTO_LODIN_ACTION = '[login] auto login';
export const LOGOUT_ACTION = '[login] logout';
export const SET_USER = '[login] Set User';

export const registerUser = createAction(REGISTER_USER,props<{registerInput:UserRegisterModel}>());
export const registerUserSuccess = createAction(REGISTER_USER_SUCCESS,props<{registerInput:UserRegisterModel}>());




export const loginStart = createAction(
  LOGIN_START,
  props<{ email: string; password: string }>()
);
export const loginSuccess = createAction(
  LOGIN_SUCCESS,
  props<{user: User,redirect: boolean}>()
);

export const autoLogin = createAction(AUTO_LODIN_ACTION);
export const autoLogout = createAction(LOGOUT_ACTION);

