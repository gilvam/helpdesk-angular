import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ModuleWithProviders } from '@angular/core';
import { LoginComponent } from './components/security/login/login.component';

export const ROUTES: Routes = [
	{path: '', component: HomeComponent},
	{path: 'login', component: LoginComponent}
];

export const routes: ModuleWithProviders = RouterModule.forRoot(ROUTES);
