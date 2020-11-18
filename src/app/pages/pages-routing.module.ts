import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { HomeComponent } from '@pages/home/home.component';
import { LoginComponent } from '@pages/login/login.component';
import { RegisterComponent } from '@pages/register/register.component';

import { AuthGuard } from '@guards/auth.guard'

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
