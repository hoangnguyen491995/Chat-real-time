import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminManageUserComponent } from './adminManageUser.component';





const routes: Routes = [
  { path: '', component: AdminManageUserComponent },
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminManageUser { }
