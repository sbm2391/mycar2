import { Routes } from '@angular/router'
import { AppComponent } from '../app.component';
import { AuthLoginComponent } from '../auth-login/auth-login.component';
import { AuthSignupComponent } from '../auth-signup/auth-signup.component';
import { MyPrivatePageComponent } from '../my-private-page/my-private-page.component';
import { HomeComponent } from '../home/home.component';

export const routes:Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full' },
    {path: 'logout', redirectTo: 'home', pathMatch: 'full' },
    {path: 'home' , component: HomeComponent},
    {path:"signin" , component:AuthLoginComponent},
    {path:"signup" , component:AuthSignupComponent},
    {path:"private", component:MyPrivatePageComponent}
]