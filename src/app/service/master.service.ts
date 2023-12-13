import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRegisterModel } from '../model/register.model';
import { Observable, tap } from 'rxjs';
import { AuthResponseData } from '../model/authResposeData';
import { EditDto, User } from '../model/userModel';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  users: any;
  constructor(private http: HttpClient) {}

  registerUser(registerInput: UserRegisterModel): Observable<any> {
    return this.http.post<AuthResponseData>(
      'auth/signup',
      registerInput
    );
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<AuthResponseData>(
      'auth/signIn',
      { email, password }
    ).pipe(tap(response => {
      const user = response?.user;
    }));
  }


  getAllUsers(): Observable<any> {
    return this.http.get<User[]>('auth/users');
  }
  
  

  // formateUser(data: AuthResponseData){
  //   const user = data.user.email
  //   return user;
  // }

getErrorMessage(message: string) {
  switch (message) {
    case 'CONFLICT':
      return 'Email is already in use';
    case 'INVALID_PASSWORD':
      return 'Invalid Email or Password';
    default:
      return 'Unknown Error Occurred. Please try again';
  }
}


  setTokenInLocalStorage(token: string) {
    localStorage.setItem('token', token);
  }

  getTokenFromLocalStorage() {
    const token = localStorage.getItem('token');
    return token;
  }

  setUserInLocalStorage (user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  setRefreshToken(token:string){
    localStorage.setItem('refreshToken',token);
  }
  getRefreshToken(token:string){
    localStorage.getItem('refreshToken');
  }

  refreshToken(): Observable<any> {
    const refreshTokenRequest = {
      token: localStorage.getItem('refreshToken')
    };

    return this.http.post<any>('auth/refresh', refreshTokenRequest);
  }

 
  getUser(){
    const user1 = localStorage.getItem('user');
    return user1;
  }
 

  logout(){
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  }


  // editUser(id:number, user:any): Observable<any>{
  //   const url = `edit-user/${id}`;
  //   return this.http.put<User>(url,user);

  // }

//   editUser(id: number, user: any): Observable<any> {
//     const url = `edit-user/${id}`;
//     return this.http.put<any>(url, user);
// }

deleteUser(userId:number):Observable<any>{
  const url = `auth/delete-user/${userId}`;
  return this.http.delete(url);
}

// deleteBlog(blogId: number) {
//   return this.http.delete(' http://localhost:3000/Blogs/' + blogId);
// }
// }


  handleError(handleError: any): import("rxjs").OperatorFunction<Object, any> {
    throw new Error('Method not implemented.');
  }

  editUser(userId:number,updateUser:any):Observable<any>{
    const url = `auth/edit-user/${userId}`;
    console.log(userId,updateUser,'hfgchfdfgdgfd')
    return this.http.put(url,updateUser);
  }



}
  