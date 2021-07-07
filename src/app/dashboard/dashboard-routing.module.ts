import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth-guard';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { DashboardComponent } from './dashboard.component';


const routes: Routes = [
  {
    path: 'dashboard', canActivate: [AuthGuard], component: DashboardComponent,
  },
  { path: 'page-not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/page-not-found' }
];


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }