import { Component, OnInit } from '@angular/core';
import { MasterService } from '../../service/master.service';
import { User } from '../../model/userModel';
import { Store } from '@ngrx/store';
import { AppState } from '../../shared/app.state';
import { deleteUser, loadUsers } from '../../shared/store/user-list/userList.action';
import { getUsers } from '../../shared/store/user-list/userList.selector';
import { MatDialog } from '@angular/material/dialog';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { Observable, catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css',
})
export class AdminHomeComponent implements OnInit {

  users: User[] = [];
  user$!:Observable<any>;

  constructor(
    private service: MasterService,
    private store: Store<AppState>,
    private dialog:MatDialog
  ) {
    this.user$ = this.store.select(getUsers);
    this.user$.subscribe((users)=>{
      this.users = users;
    })
  }

  ngOnInit(): void {
    this.store.dispatch(loadUsers());
    
    
  
    }

  OpenPopup(id:number){
    this.dialog.open(EditUserComponent,{
      width:'40%',
      data:{
        id:id
      }
        
      
    })
  }

  EditUser(id:number){
    this.OpenPopup(id);
    
  }

  RemoveUser(id:number){

    if(confirm('Are you sure want to delete this Blog?')){
      this.store.dispatch(deleteUser({id}))
    }


  }
  // deleteUser(user:User){
  //   const userId = user.id;
  //   this.service.deleteUser(userId)
  //   .subscribe(
  //     (response)=>{
  //       console.log("success",response)
        
  //     },
  //     (error)=>{
  //       console.log("erro",error);
  //     }
  //   )
  // }
  // deleteUser(user: User) {
  //   const userId = user.id;
  //   this.service.deleteUser(userId)
  //     .pipe(
  //       tap((response) => console.log("success", response)),
  //       catchError((error) => {
  //         console.log("error", error);
  //         return of(null); // Handle error and return an observable (optional)
  //       })
  //     )
  //     .subscribe();
  // }

  deleteUser(id:number){
    this.service.deleteUser(id).subscribe(data=>{
      console.log(data);
      this.store.dispatch(loadUsers());

    })
  }
  

 


}

