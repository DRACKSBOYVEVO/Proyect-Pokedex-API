import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

//Nuestra aplicación tiene 2 pantallas, la lista inicial de Pokémon y una vista detallada. 
const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    //Ahora podemos acceder a la primera página en /home y navegar a cualquier página de detalles llamando a home/:index
    path: 'home/:index', //detalles
    loadChildren: () => import('./detalles/detalles.module').then( m => m.DetallesPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
