import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiResponse } from 'src/app/models/core/ApiResponse';

@Injectable({
  providedIn: 'root'
})
export class BaseApiService {
  private readonly baseUrl = environment.baseUrl;

  constructor(protected http: HttpClient) {}

  protected get<T>(endpoint: string): Observable<T> {
    return this.http.get<ApiResponse<T>>(this.buildUrl(endpoint)).pipe(
      map(this.handleApiResponse),
      catchError(this.handleError)
    );
  }

  protected post<T>(endpoint: string, body: any): Observable<T> {
    return this.http.post<ApiResponse<T>>(this.buildUrl(endpoint), body).pipe(
      map(this.handleApiResponse),
      catchError(this.handleError)
    );
  }

  public buildUrl(endpoint: string): string {
    return `${this.baseUrl.replace(/\/$/, '')}/${endpoint.replace(/^\//, '')}`;
  }

  private handleApiResponse<T>(res: ApiResponse<T>): T {
    if (!res.success) {
      throw new Error(res.message);
    }
    return res.data;
  }

  private handleError(error: HttpErrorResponse) {
    const msg = error.error?.message || 'Lỗi khi gọi API';
    return throwError(() => new Error(msg));
  }
}
