import { Routes } from '@angular/router';
import { authGuard } from './core/guard/auth.guard';

export const routes: Routes = [
    {
        path: '', canActivate: [authGuard], loadComponent: ()=> import('./layouts/blank-layout/blank-layout.component').then((m)=> m.BlankLayoutComponent),
        children: [
            {path: '', redirectTo: 'home', pathMatch: 'full'},
            {path: 'home', loadComponent: ()=> import('./components/home/home.component').then((m)=> m.HomeComponent), title: 'Home'},
            {path: 'cart', loadComponent: ()=> import('./components/cart/cart.component').then((m)=> m.CartComponent), title: 'Cart'},
            {path: 'products', loadComponent: ()=> import('./components/products/products.component').then((m)=> m.ProductsComponent), title: 'Products'},
            {path: 'details/:id', loadComponent: ()=> import('./components/details/details.component').then((m)=> m.DetailsComponent), title: 'Details'},
            {path: 'payment/:id', loadComponent: ()=> import('./components/payment/payment.component').then((m)=> m.PaymentComponent), title: 'Payment'},
            {path: 'brands', loadComponent: ()=> import('./components/brands/brands.component').then((m)=> m.BrandsComponent), title: 'Brands'},
            {path: 'categories', loadComponent: ()=> import('./components/categories/categories.component').then((m)=> m.CategoriesComponent), title: 'Categories'},
            {path: 'allorders', loadComponent: ()=> import('./components/allorders/allorders.component').then((m)=> m.AllordersComponent), title: 'All Orders'},
        ]
    },
    {
        path: '', loadComponent: ()=> import('./layouts/auth-layout/auth-layout.component').then((m)=> m.AuthLayoutComponent),
        children: [
            {path: '', redirectTo: 'login', pathMatch: 'full'},
            {path: 'login', loadComponent: ()=> import('./components/login/login.component').then((m)=> m.LoginComponent), title: 'Login'},
            {path: 'register', loadComponent: ()=> import('./components/register/register.component').then((m)=> m.RegisterComponent), title: 'Register'},
            {path: 'forgotPassword', loadComponent: ()=> import('./components/forgot-password/forgot-password.component').then((m)=> m.ForgotPasswordComponent), title: 'Forgot Password'},
        ]
    },
    {path: '**', loadComponent: ()=> import('./components/notfound/notfound.component').then((m)=> m.NotfoundComponent), title: 'Not Found :('}
];
