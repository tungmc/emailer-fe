import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, delay } from 'rxjs/operators';

export interface EmailTemplateDTO {
  id: number;
  name: string;
  subject: string;
  type: 'html' | 'text';
  content: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmailTemplateService {
  private templates: EmailTemplateDTO[] = [
    {
      id: 1,
      name: 'Welcome Email',
      subject: 'Chào mừng bạn đến với hệ thống!',
      type: 'html',
      content: '<h1>Xin chào {{ contact.first_name }}</h1><p>Cảm ơn bạn đã đăng ký.</p>',
      status: 'active',
      createdAt: '2025-03-26T10:00:00Z',
      updatedAt: '2025-03-26T10:00:00Z',
    },
    {
      id: 2,
      name: 'Daily Tips',
      subject: 'Mẹo mỗi ngày dành cho bạn',
      type: 'text',
      content: 'Chào {{ contact.first_name }}, hôm nay bạn đã thử làm điều mới chưa?',
      status: 'inactive',
      createdAt: '2025-03-24T08:30:00Z',
      updatedAt: '2025-03-25T09:00:00Z',
    },
    {
      id: 3,
      name: 'Subscription Expired',
      subject: 'Gói dùng thử của bạn đã hết hạn',
      type: 'html',
      content: '<p>Hi {{ contact.first_name }}, vui lòng nâng cấp để tiếp tục sử dụng dịch vụ.</p>',
      status: 'active',
      createdAt: '2025-03-20T15:00:00Z',
      updatedAt: '2025-03-21T10:00:00Z',
    }
  ];

  private templatesSubject = new BehaviorSubject<EmailTemplateDTO[]>(this.templates);

  constructor() {}

  getAll(statusFilter?: string): Observable<EmailTemplateDTO[]> {
    return this.templatesSubject.asObservable().pipe(
      map(list =>
        statusFilter ? list.filter(t => t.status === statusFilter) : list
      ),
      delay(300) // simulate API latency
    );
  }

  getTemplateById(id: number): Observable<EmailTemplateDTO | undefined> {
    return of(this.templates.find(t => t.id === id)).pipe(delay(300));
  }

  createTemplate(template: EmailTemplateDTO): Observable<void> {
    const newTemplate = {
      ...template,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.templates.unshift(newTemplate);
    this.templatesSubject.next(this.templates);
    return of(undefined).pipe(delay(300));
  }

  updateTemplate(id: number, updated: EmailTemplateDTO): Observable<void> {
    const index = this.templates.findIndex(t => t.id === id);
    if (index >= 0) {
      this.templates[index] = {
        ...updated,
        id,
        createdAt: this.templates[index].createdAt,
        updatedAt: new Date().toISOString(),
      };
      this.templatesSubject.next(this.templates);
    }
    return of(undefined).pipe(delay(300));
  }

  delete(id: number): Observable<void> {
    this.templates = this.templates.filter(t => t.id !== id);
    this.templatesSubject.next(this.templates);
    return of(undefined).pipe(delay(300));
  }
}
