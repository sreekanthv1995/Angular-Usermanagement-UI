import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../shared/app.state';
import { User } from '../../model/userModel';
import {
  getUser,
  getUserById,
} from '../../shared/store/user-list/userList.selector';
import {
  loadUsers,
  updateUser,
} from '../../shared/store/user-list/userList.action';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MasterService } from '../../service/master.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css',
})
export class EditUserComponent implements OnInit {
  editUserData!: User;
  editData!: User;
  // editForm!: FormGroup;
  editUserId: number = 0;

  constructor(
    private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private dialogRef: MatDialogRef<EditUserComponent>,
    private builder: FormBuilder,
    private service: MasterService
  ) {}

  ngOnInit(): void {
    this.editUserId = this.data.id;
    this.store.select(getUserById(this.editUserId)).subscribe((data) => {
      this.editData = data;
      this.editForm.setValue({
        // id:this.editData.id,
        firstName: this.editData.firstName,
        lastName: this.editData.lastName,
        email: this.editData.email,
        // role:this.editData.role
      });
    });
  }

  editForm = this.builder.group({
    // id:this.builder.control(0),
    firstName: this.builder.control('', Validators.required),
    lastName: this.builder.control('', Validators.required),
    email: this.builder.control('', Validators.required),
    // role:this.builder.control('')
  });

  editUser() {
    if (this.editForm.valid) {
      const user: User = {
        id: this.data.id,
        firstName: this.editForm.value.firstName as string,
        lastName: this.editForm.value.lastName as string,
        email: this.editForm.value.email as string,
        role: this.data.role,
      };
      // user.id = this.editForm.value.id as number
      this.store.dispatch(updateUser({ user }));
      this.ClosePopup();
    }
  }

  ClosePopup() {
    this.dialogRef.close();
  }
}
