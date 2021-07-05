import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { throwError } from 'rxjs';

export class TCRUDServices {

  httpClient: HttpClient;

  constructor(
    http: HttpClient,
  ) {
    this.httpClient = http;
  }

  /**
   * Post's wrapper
   * @param url URL value
   * @param body Form body
   * @param headers Headers
   * @returns httpResponse
   */
  postWrapper(url: string, body: any, headers?: HttpHeaders) {
    const opt = { headers };

    return this.httpClient.post<any>(url, body, opt)
      .pipe(map(res => {
        return this.httpResponse(res);
      }));
  }

  /**
   * Put's wrapper
   * @param url URL value
   * @param body Form body
   * @param headers Headers
   * @returns httpResponse
   */
  putWrapper(url: string, body: any, headers?: HttpHeaders) {
    const opt = { headers };

    return this.httpClient.put<any>(url, body, opt)
      .pipe(map(res => {
        return this.httpResponse(res);
      }));
  }

  /**
   * Get's wrapper
   * @param url URL value
   * @param params Query Params <optional>
   * @param headers Headers <o>ptional>
   */
  getWrapper(url: string, params?: HttpParams, headers?: HttpHeaders) {
    const opt = { headers, params };
    return this.httpClient.get<any>(url, opt)
      .pipe(map(res => {
        return this.httpResponse(res);
      }));
  }

  /**
   * Delete's wrapper
   * @param url URL value
   * @param params Query Params <optional>
   * @param headers Headers <o>ptional>
   */
  deleteWrapper(url: string, params?: HttpParams, headers?: HttpHeaders) {
    const opt = { headers, params };
    return this.httpClient.delete<any>(url, opt)
      .pipe(map(res => {
        return this.httpResponse(res);
      }));
  }

  /**
   * handles the response of server
   * @param res HTTP Response
   */
  private httpResponse(res: any) {
    if (res.status === 'success' || res.status === 'conflict' || res.status === 'failed' || res.status === 'error') {
      return res;
    } else {
      if (res.value.status === 'success') {
        return res;
      }
      return throwError(res);
    }
  }
}
