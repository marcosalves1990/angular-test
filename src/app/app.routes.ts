import { Routes } from '@angular/router';
import { CrudListComponent } from './pages/crud-list/crud-list.component';
import { CrudFormComponent } from './pages/crud-form/crud-form.component';
import { CrudViewComponent } from './pages/crud-view/crud-view.component';

export const routes: Routes = [
    { path: 'crud-list', component: CrudListComponent },
    { path: 'crud-form', component: CrudFormComponent },
    { path: 'crud-form/:id', component: CrudFormComponent },
    { path: 'crud-form/view/:id', component: CrudViewComponent },
    { path: '', redirectTo: '/crud-list', pathMatch: 'full' }

];
