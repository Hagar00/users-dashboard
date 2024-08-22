import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

export const routes: Routes = [
  { path: 'users', component: HomeComponent },
  { path: 'users/:id', component: UserDetailComponent },
  { path: '', redirectTo: '/users', pathMatch: 'full' },
];
