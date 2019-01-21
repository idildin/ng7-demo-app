import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  AccessDeniedComponent,
  IndexComponent,
  NotFoundComponent
} from './pages';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
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
