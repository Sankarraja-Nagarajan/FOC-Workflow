import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
       {
        path : 'foc-pages',
        loadChildren : () => import ('./foc-pages/foc-pages.module').then(m => m.FOCPagesModule)
       },
       {
        path : 'authentication',
        loadChildren : () => import ('./authentication/authentication.module').then(a => a.AuthenticationModule)
       },
       {
        path : '',
        redirectTo : 'authentication',
        pathMatch : 'full'
       }

    // {
    //   path: 'dashboard',
    //   component: ECommerceComponent,
    // },
    // {
    //   path: 'iot-dashboard',
    //   component: DashboardComponent,
    // },
   
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
