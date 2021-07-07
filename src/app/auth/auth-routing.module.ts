import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: 'signin', component: SignInComponent },
      { path: 'signup', component: SignUpComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'reset-pasword', component: ResetPasswordComponent },
      { path: '', redirectTo: '/auth/signin', pathMatch: 'full' },
    ]
  }
];


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule { }