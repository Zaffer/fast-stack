import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: '/dash', pathMatch: 'full' },
    { path: 'form', loadComponent: () => import('./features/form/form.component').then(m => m.FormComponent) },
    { path: 'dash', loadComponent: () => import('./features/dash/dash.component').then(m => m.DashComponent) },
    { path: 'table', loadComponent: () => import('./features/table/table.component').then(m => m.TableComponent) },
    { path: 'tree', loadComponent: () => import('./features/tree/tree.component').then(m => m.TreeComponent) },
    { path: 'drag-drop', loadComponent: () => import('./features/drag-drop/drag-drop.component').then(m => m.DragDropComponent) },

    
];
