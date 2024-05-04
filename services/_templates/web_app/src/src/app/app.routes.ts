import { Routes } from '@angular/router';

export const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'home',
  //   pathMatch: 'full',
  // },
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'chat',
    loadComponent: () =>
      import('./features/chat/chat.page').then((m) => m.ChatPage),
  },
  {
    path: '**',
    redirectTo: '',
  }
];
