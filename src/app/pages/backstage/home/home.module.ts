import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgZorroAntdModule } from '../../../ng-zorro-antd.module';
import { ComponentCoreModule } from 'src/app/components/component-core.module';
import { HomeRoutingModule } from './home-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ComponentCoreModule,
    NgZorroAntdModule
  ]
})
export class HomeModule { }
