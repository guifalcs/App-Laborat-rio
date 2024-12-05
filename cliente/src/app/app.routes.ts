import { Routes } from '@angular/router';
import { HomeModulosComponent } from './paginas/home-modulos/home-modulos.component';
import { MarComponent } from './paginas/modulos/mar/mar.component';

export const routes: Routes = [
  {path: '', component: HomeModulosComponent},
  {path: 'mar', component: MarComponent},
];
