import { createReducer, on } from '@ngrx/store';
import { initialState } from './login.state';
import { autoLogout, loginSuccess, registerUserSuccess} from './login.action';

 const _loginReducer = createReducer(
  initialState,
  on(loginSuccess, (state, action) => {
    return {
      ...state,
      user: action.user,
    };
  }),
  on(registerUserSuccess,(state,action)=> {
    return {
      ...state,
      user: action.registerInput,
    };
  }),
  on(autoLogout,(state)=>{
    return {
      ...state,
      user: null,
    }
  }));

export function LoginReducer(state: any, action: any) {
  return _loginReducer(state, action);
}
