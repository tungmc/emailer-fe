import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubscriberComponent } from './subscriber/subscriber.component';
import { TagComponent } from './tag/tag.component';
import { ImportComponent } from './import/import.component';

const routes: Routes = [
  { path: '', redirectTo: 'subscriber', pathMatch: 'full' },
  { path: 'subscriber', component: SubscriberComponent, data: { title: 'Subscribers', reuse: true } },
  { path: 'tag', component: TagComponent, data: { title: 'Tags', reuse: true } },
  { path: 'import', component: ImportComponent, data: { title: 'Import Subscriber', reuse: true } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubscribersRoutingModule {}
