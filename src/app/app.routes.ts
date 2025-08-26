import { Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { AccesoriosComponent } from './page/accesorios/accesorios.component';
import { ModelosComponent } from './page/modelos/modelos.component';
import { KcadizComponent } from './page/kcadiz/kcadiz.component';
import { KsevillaComponent } from './page/ksevilla/ksevilla.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'accesorios', component: AccesoriosComponent },
  { path: 'modelos', component: ModelosComponent },
  { path: 'kcadiz', component: KcadizComponent },
  { path: 'ksevilla', component: KsevillaComponent },
  { path: '**', redirectTo: '' }
];
