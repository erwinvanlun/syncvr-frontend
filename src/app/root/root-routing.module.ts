import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'auth', loadChildren:  () => import('@auth/auth.module').then(m => m.FxgAuthModule)},
  { path: 'welcome', component: WelcomeComponent},
  { path: '',   redirectTo: '/auth/signup', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,   {anchorScrolling:  'enabled'})],
  exports: [RouterModule]
})
export class RootRoutingModule { }
