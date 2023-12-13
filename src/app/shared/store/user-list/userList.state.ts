import { Users } from "../../../model/register.model";
import { User } from "../../../model/userModel";

export interface UserListState {
    users: User[];
}

export const initialState: UserListState = {
    users: [],
}

