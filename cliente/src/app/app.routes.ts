import { Routes } from '@angular/router';
import { HomeModulosComponent } from './paginas/home-modulos/home-modulos.component';
import { MarComponent } from './paginas/modulos/mar/mar.component';
import { MamComponent } from './paginas/modulos/mam/mam.component';

export const routes: Routes = [
  {path: '', component: HomeModulosComponent},
  {path: 'mar', component: MarComponent},
  {path: 'mam', component: MamComponent}
];
