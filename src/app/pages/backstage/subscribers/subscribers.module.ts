import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzMessageModule } from 'ng-zorro-antd/message';

import { TagComponent } from './tag/tag.component';

@NgModule({
  declarations: [TagComponent],
  imports: [
    CommonModule,
    FormsModule,           // 👈 BẮT BUỘC cho [(ngModel)]
    NzInputModule,         // 👈 BẮT BUỘC cho nz-input
    NzModalModule,
    NzTableModule,
    NzButtonModule,
    NzCardModule,
    NzMessageModule
  ]
})
export class SubscribersModule {}
