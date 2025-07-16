import { Routes } from '@angular/router';
import { authGuard } from './core/guard/auth.guard.js';

export const routes: Routes = [
    {
        path: '', canActivate: [authGuard], loadComponent: ()=> import('./layouts/blank-layout/blank-layout.component.js').then((m)=> m.BlankLayoutComponent),
        children: [
            {path: '', redirectTo: 'home', pathMatch: 'full'},
            {path: 'home', loadComponent: ()=> import('./components/home/home.component.js').then((m)=> m.HomeComponent), title: 'Home'},
            {path: 'cart', loadComponent: ()=> import('./components/cart/cart.component.js').then((m)=> m.CartComponent), title: 'Cart'},
            {path: 'products', loadComponent: ()=> import('./components/products/products.component.js').then((m)=> m.ProductsComponent), title: 'Products'},
            {path: 'brands', loadComponent: ()=> import('./components/brands/brands.component.js').then((m)=> m.BrandsComponent), title: 'Brands'},
            {path: 'categories', loadComponent: ()=> import('./components/categories/categories.component.js').then((m)=> m.CategoriesComponent), title: 'Categories'},
        ]
    },
    {
        path: '', loadComponent: ()=> import('./layouts/auth-layout/auth-layout.component.js').then((m)=> m.AuthLayoutComponent),
        children: [
            {path: '', redirectTo: 'login', pathMatch: 'full'},
            {path: 'login', loadComponent: ()=> import('./components/login/login.component.js').then((m)=> m.LoginComponent), title: 'Login'},
            {path: 'register', loadComponent: ()=> import('./components/register/register.component.js').then((m)=> m.RegisterComponent), title: 'Register'},
        ]
    },
    {path: '**', loadComponent: ()=> import('./components/notfound/notfound.component.js').then((m)=> m.NotfoundComponent), title: 'Not Found :('}
];
