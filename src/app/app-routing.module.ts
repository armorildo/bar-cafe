import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//app routing
const routes: Routes = [
  //if path empty, redirect to menu
  {
    path: '',
    redirectTo: 'menu',
    pathMatch: 'full'
  },
  {
    path: 'menu',
    loadChildren: () =>
      import('./menu/menu.module').then((m) => m.MenuModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
