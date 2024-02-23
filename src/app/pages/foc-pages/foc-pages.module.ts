import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FOCScreenComponent } from './foc-screen/foc-screen.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule} from '@angular/material/paginator';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatIconModule } from '@angular/material/icon';
import {MatSortModule} from '@angular/material/sort';
import {MatMenuModule} from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { AuthGuard } from '../../../Guards/auth.guard';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TrackingDialogComponent } from './tracking-dialog/tracking-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';


const routes : Routes = [
  {
    path :'foc-screen',
    component : FOCScreenComponent,
    canActivate : [AuthGuard]
  },
  {
    path : 'dashboard',
    component : DashboardComponent,
    canActivate : [AuthGuard]
  },
  {
    path : 'tracking-dialog',
    component : TrackingDialogComponent
  }
]

@NgModule({
  declarations: [
    FOCScreenComponent,
    DashboardComponent,
    TrackingDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule, 
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatSortModule,
    MatMenuModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
  ]
})
export class FOCPagesModule { }
