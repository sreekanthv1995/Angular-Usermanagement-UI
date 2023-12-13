export interface UserRegisterModel {

    id: number;
    firstName:string;
    lastName:string;
    email:string;
    password:string;
    role:string;
    token:string;
}


export interface Users {
    userList: UserRegisterModel[];
}