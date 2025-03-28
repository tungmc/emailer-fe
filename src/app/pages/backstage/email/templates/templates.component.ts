import { Component, OnInit } from '@angular/core';
import { EmailTemplateService, EmailTemplateDTO } from '../../email/data/email-template.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.less']
})
export class TemplatesComponent implements OnInit {
  templates: EmailTemplateDTO[] = [];
  selectedStatus: 'all' | 'active' | 'inactive' = 'all';
  loading = false;

  constructor(
    private templateService: EmailTemplateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchTemplates();
  }

  fetchTemplates(): void {
    this.loading = true;
    const filter = this.selectedStatus === 'all' ? undefined : this.selectedStatus;
    this.templateService.getAll(filter).subscribe(data => {
      this.templates = data;
      this.loading = false;
    });
  }

  onStatusChange(): void {
    this.fetchTemplates();
  }

  onAdd(): void {
    this.router.navigate(['/templates/create']);
  }

  onEdit(id: number): void {
    this.router.navigate(['/templates/edit', id]);
  }

  onDelete(id: number): void {
    if (confirm('Bạn có chắc chắn muốn xoá template này?')) {
      this.templateService.delete(id).subscribe(() => this.fetchTemplates());
    }
  }
}
