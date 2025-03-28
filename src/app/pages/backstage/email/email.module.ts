import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuillModule } from 'ngx-quill';
import { ReactiveFormsModule } from '@angular/forms';

import { EmailRoutingModule } from './email-routing.module';
import { TemplatesComponent } from './templates/templates.component';
import { CampaignsComponent } from './campaigns/campaigns.component';
import { SequencesComponent } from './sequences/sequences.component';
import {TemplateFormComponent} from "./templates/template-form/template-form.component";


@NgModule({
  declarations: [
    TemplatesComponent,
    CampaignsComponent,
    SequencesComponent,
    TemplateFormComponent
  ],
  imports: [
    CommonModule,
    QuillModule,
    ReactiveFormsModule,
    EmailRoutingModule
  ]
})
export class EmailModule { }
