import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AppSettings } from './app.settings';
import { QueryParams } from './classes/queryParams';

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
   * @param  {string} url
   * @returns Observable
   */
  public get(url: string, queryParams?: QueryParams): Observable<any> {
    const queryString = queryParams ? this.toQueryString(queryParams) : '';

    return this.http.get(this.settings.apiUrl + url + queryString);
  }

  /**
   * Converts any object to query string
   * 
   * @param  {object} input
   * @returns string
   */
  private toQueryString(input: object): string {
      return `?${
        Object.keys(input)
        .filter(key => Boolean(input[key]) || input[key] === 0)
        .map(key => [].concat(input[key]).map(val =>`${key}=${encodeURIComponent(val)}`).join('&'))
        .join('&')
      }`.trim();
  }
}
