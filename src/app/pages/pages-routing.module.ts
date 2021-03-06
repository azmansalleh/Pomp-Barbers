import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { HomeComponent } from '@pages/home/home.component';
import { LoginComponent } from '@pages/login/login.component';
import { RegisterComponent } from '@pages/register/register.component';
import { AdminComponent } from '@pages/admin/admin.component';


import { AuthGuard } from '@guards/auth.guard'
import { AdminGuard } from '@guards/admin.guard'
import { UserGuard } from '@guards/user.guard'


const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'home',
      canActivate: [AuthGuard],
      component: HomeComponent
    },
    {
      path: 'admin',
      canActivate: [AuthGuard, AdminGuard],
      component: AdminComponent
    },
    {
      path: 'login',
      component: LoginComponent
    },
    {
      path: 'register',
      component: RegisterComponent
    },
    {
      path: '',
      redirectTo: 'login',
      pathMatch: 'full'
    },
    { path: '', redirectTo: 'login', pathMatch: 'full'},
    { path: '**', redirectTo: 'login'}
  ]

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule { }
