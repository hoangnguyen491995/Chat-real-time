import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './core-ocb/layout/main/main.component';
import { RouteEnum } from './core-ocb/enums/route.enum';
import { DefaultComponent } from './core-ocb/layout/default/default.component';
import { NoHeaderComponent } from './core-ocb/layout/noHeader/noHeader.component';

import { AuthGuard } from './service/authorization/auth.guard';

const routes: Routes = [
  {
    path: RouteEnum.About,
    component: DefaultComponent,
    loadChildren: () => import('./feature/about/about.module').then((m) => m.AboutModule),
    canActivate: [AuthGuard], 
  },
  {
    path: RouteEnum.Home,
    component: DefaultComponent,
    loadChildren: () => import('./feature/home/home.module').then((m) => m.HomeModule),
    canActivate: [AuthGuard]
  },
  {
    path: RouteEnum.Login,
    component: NoHeaderComponent,
    loadChildren: () => import('./feature/login/login.module').then((m) => m.LoginModule),
    canActivate: [AuthGuard]
  },
  {
    path: RouteEnum.Register,
    component: NoHeaderComponent,
    loadChildren: () => import('./feature/register/register.module').then((m) => m.RegisterModule),
    canActivate: [AuthGuard]
  },
  {
    path: RouteEnum.ManageUserAdmin,
    component: MainComponent,
    loadChildren: () => import('./feature/adminManageUser/adminManageUser.module').then((m) => m.AdminManageUserModule),
    canActivate: [AuthGuard]
  },
  {
    path: RouteEnum.NotificationAdmin,
    component: MainComponent,
    loadChildren: () => import('./feature/adminNoti/adminNoti.module').then((m) => m.AdminNotiModule),
    canActivate: [AuthGuard]
  },
  {
    path: `${RouteEnum.ProfileUser}/:id`,
    component: DefaultComponent,
    loadChildren: () => import('./feature/profile/profile.module').then((m) => m.ProfileModule),
    // canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
  })],
  exports: [RouterModule]
})

export class AppRoutingModule { }







