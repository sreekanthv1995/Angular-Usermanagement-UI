import { User } from "./userModel";

export interface AuthResponseData {

    token: string;
    refreshToken: string;
    user: User



}