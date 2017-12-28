import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DmmComponent} from './dmm/dmm.component';
import {AboutComponent} from './about/about.component';
const routes: Routes = [{
  path: 'dmm',
  component: DmmComponent
},
{
  path: 'about',
  component: AboutComponent
},
{
  path: 'dmm',
  component: DmmComponent
},
{
  path: '',
  redirectTo: 'dmm', pathMatch: 'full' 
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
