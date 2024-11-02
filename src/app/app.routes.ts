import { Routes } from '@angular/router';
import { loginGuard } from './guards/login.guard';
import { homeGuard } from './guards/home.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage),
    canActivate: [loginGuard]
  },
  {
    path:'correo',
    loadComponent: () => import('./pages/correo/correo.page').then( m => m.CorreoPage),
  },
  {
    path: 'pregunta',
    loadComponent:() => import('./pages/pregunta/pregunta.page').then( m => m.PreguntaPage),
  },
  {
    path: 'correcto',
    loadComponent:() => import('./pages/correcto/correcto.page').then( m => m.CorrectoPage),
  },
  {
    path: 'incorrecto',
    loadComponent:() => import('./pages/incorrecto/incorrecto.page').then( m => m.IncorrectoPage),
  },
  {
    path: 'theme',
    loadComponent: () => import('./pages/theme/theme.page').then( m => m.ThemePage)
  }, 
  {
    path: 'miruta',
    loadComponent: () => import('./pages/miruta/miruta.page').then( m => m.MirutaPage)
  },
  {
    path: 'map',
    loadComponent: () => import('./pages/map/map.page').then( m => m.MapPage),
  },
  {
    path: 'inicio',
    loadComponent: ()  => import('./pages/inicio/inicio.page').then( m => m.InicioPage),
  },
];
