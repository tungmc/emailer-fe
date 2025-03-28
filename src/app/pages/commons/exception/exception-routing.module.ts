import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Exception404Component } from './404/404.component';
import { Exception500Component } from './500/500.component';
import { Exception403Component } from './403/403.component';


const routes: Routes = [
  { path: '403', component: Exception403Component, data: { title: '403 - forbidden error!'} },
  { path: '404', component: Exception404Component, data: { title: '404 - Not found error!'} },
  { path: '500', component: Exception500Component, data: { title: '500 - Internal error!'} },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class ExceptionRoutingModule { }
