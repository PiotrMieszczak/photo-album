import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AppSettings } from './app.settings';
import { QueryParams } from './classes/queryParams';
import { tap, map } from 'rxjs/operators';
import { LimitedResources } from './classes/classes';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient,
    private settings: AppSettings
  ) { }

  /**
   * Send GET request
   *
   * @returns Observable
   */
  public get<T>(url: string, queryParams?: QueryParams): Observable<LimitedResources<T>> {
    const queryString = queryParams ? this.toQueryString(queryParams) : '';

    return this.http.get(this.settings.apiUrl + url + queryString, {observe: 'response'})
    .pipe(
      map(res => {
        return { items: res.body, totalCount: parseInt(res.headers.get('x-total-count'), 10) } as LimitedResources<T>;
      })
    );
  }

  /**
   * Converts any object to query string
   *
   * @returns string
   */
  private toQueryString(input: object): string {
      return `?${
        Object.keys(input)
        .filter(key => Boolean(input[key]) || input[key] === 0)
        .map(key => [].concat(input[key]).map(val => `${key}=${encodeURIComponent(val)}`).join('&'))
        .join('&')
      }`.trim();
  }
}
