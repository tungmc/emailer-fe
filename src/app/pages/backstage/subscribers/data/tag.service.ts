import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiResponse } from 'src/app/models/core/ApiResponse';
import { TagDTO } from '../tag/tag.component';

@Injectable({ providedIn: 'root' })
export class TagService {
  private readonly baseUrl = `${environment.baseUrl}/tags`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<TagDTO[]> {
    return this.http.get<ApiResponse<TagDTO[]>>(this.baseUrl).pipe(
      map(res => res.data)
    );
  }

  create(name: string): Observable<any> {
    return this.http.post<ApiResponse<any>>(this.baseUrl, { name });
  }

  update(id: number, name: string): Observable<any> {
    return this.http.put<ApiResponse<any>>(`${this.baseUrl}/${id}`, { name });
  }

  delete(id: number): Observable<any> {
    return this.http.delete<ApiResponse<any>>(`${this.baseUrl}/${id}`);
  }
}
