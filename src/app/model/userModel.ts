// export class User {

//   constructor(
//     email: string,
//     role: string,
//     token: string,
//     refreshToken: string
//   ) {}
// }


export interface User{

    id: number,
    firstName: string,
    lastName: string,
    // password: string,
    email: string,
    role: string,
    // token: string;
    

}


export interface EditDto {

    firstName: string,
    lastName: string,
    // password: string,
    email: string,

}
