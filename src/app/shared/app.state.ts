import { SharedReducer } from "./shared.reducer";
import { SHARED_STATE_NAME } from "./shared.selector";
import { SharedState } from "./shared.state";
import { LoginReducer } from "./store/login/login.reducer";
import { LOGIN_STATE_NAME } from "./store/login/login.selector";
import { LoginState } from "./store/login/login.state";
import { UserListReducer } from "./store/user-list/userList.reducer";
import { USER_STATE_NAME } from "./store/user-list/userList.selector";
import { UserListState } from "./store/user-list/userList.state";

export interface AppState {
    [SHARED_STATE_NAME]: SharedState;
    [LOGIN_STATE_NAME]: LoginState;
    [USER_STATE_NAME]: UserListState;
    user:UserListState;
}

export const appReducer = {
    [SHARED_STATE_NAME]: SharedReducer,
    [LOGIN_STATE_NAME]: LoginReducer,
    [USER_STATE_NAME]: UserListReducer,
    user:UserListReducer,
}