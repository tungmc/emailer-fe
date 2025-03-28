import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListSearchComponent } from './list/list-search/list-search.component';
import { BasicListComponent } from './list/basic-list/basic-list.component';
import { ChartPipeComponent } from './chart/chart-pipe/chart-pipe.component';
import { NzDemoLayoutSideComponent } from './layout/layout-side.component';
import { LayoutContentComponent } from './layout/layout-content/layout-content.component';


const routes: Routes = [
  { path: 'list/list-search', component: ListSearchComponent, data: { title: 'Query List', reuse: true } },
  { path: 'list/basic-list', component: BasicListComponent, data: { title: 'Standard List', reuse: true } },
  { path: 'chart/chart-pipe', component: ChartPipeComponent, data: { title: 'Pie Chart', reuse: true } },
  { path: 'layout', component: NzDemoLayoutSideComponent, data: { title: 'Layout', reuse: true } },
  { path: 'layout/layout-content', component: LayoutContentComponent, data: { title: 'Default Layout', reuse: true } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ExamplesRoutingModule { }
