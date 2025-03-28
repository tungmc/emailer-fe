import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplatesComponent } from './templates/templates.component';
import { CampaignsComponent } from './campaigns/campaigns.component';
import { SequencesComponent } from './sequences/sequences.component';
import {TemplateFormComponent} from "./templates/template-form/template-form.component";

const routes: Routes = [
  {
    path: 'templates',
    component: TemplatesComponent,
    data: { title: 'Templates', reuse: true }
  },
  {
    path: 'templates/create',
    component: TemplateFormComponent,
  },
  {
    path: 'templates/edit/:id',
    component: TemplateFormComponent,
  },

  { path: 'campaigns', component: CampaignsComponent, data: { title: 'Campaigns', reuse: true } },
  { path: 'sequences', component: SequencesComponent, data: { title: 'Sequences', reuse: true } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailRoutingModule {}
