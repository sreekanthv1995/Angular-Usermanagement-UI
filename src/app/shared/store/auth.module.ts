import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { LOGIN_STATE_NAME } from "./login/login.selector";
import { LoginReducer } from "./login/login.reducer";
import { EffectsModule } from "@ngrx/effects";
import { LoginEffects } from "./login/login.effects";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "../../component/login/login.component";
import { UserListEffect } from "./user-list/userList.effects";
import { ReactiveFormsModule } from "@angular/forms";

// const routes: Routes = [
//     {
//         path: '',
//         children: [
//           { path: '', redirectTo: 'login' },
//           { path: 'login', component: LoginComponent },
//         ],
//       },
// ]

@NgModule({
    declarations:[],
    imports:[
        CommonModule,
    ReactiveFormsModule,
    ]
})
export class AuthModule {

}