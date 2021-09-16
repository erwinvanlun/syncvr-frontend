import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { SignupSuccessComponent } from '@auth/components/signup-success/signup-success.component';

const authRoutes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'signup/success', component: SignupSuccessComponent },
];

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
