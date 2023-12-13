import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatDialogModule } from "@angular/material/dialog";





@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports:[
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule
  ]
})
export class MaterialModule { }
