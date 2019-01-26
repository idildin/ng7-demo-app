import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  AccessDeniedComponent, AdminComponent, DashboardComponent,
  IndexComponent,
  NotFoundComponent
} from './pages';
import { AuthGuard, RoleGuard } from './guards';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [RoleGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'access-denied',
    component: AccessDeniedComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
