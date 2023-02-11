import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { ActivityComponent } from './features/activity/activity.component';


const routes: Routes = [
  { path: '', redirectTo: '/activity', pathMatch: 'full' },
  {
    path: 'activity', component: ActivityComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'access',
    loadChildren: () => import('./features/access/access.module').then(m => m.AccessModule)
    // canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '/activity', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
