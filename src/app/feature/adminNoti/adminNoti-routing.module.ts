import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminNotiComponent } from './adminNoti.component';





const routes: Routes = [
  { path: '', component: AdminNotiComponent },
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminManageUser { }
