import { createFeatureSelector, createSelector } from "@ngrx/store"
import { LoginState } from "./login.state"

export const LOGIN_STATE_NAME = 'auth'

const getLoginState = createFeatureSelector<LoginState>(LOGIN_STATE_NAME);

export const  isAuthenticated = createSelector(getLoginState,(state)=>{
    return state.user ? true : false;
});

export const getToken = createSelector(getLoginState,(state)=>{
    return state.userResponse ? state.userResponse.token: null;
})

export const getLoggedInUser = createSelector(getLoginState,(state)=>state.user);