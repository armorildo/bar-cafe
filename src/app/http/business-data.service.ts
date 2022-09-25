import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { BusinessDataDTO } from '../models/business-data';
@Injectable({
  providedIn: 'root'
})
export class BusinessDataService {

  // base server url
  private static url = "https://test.dev.al";

  private static get ROUTES() {
    return {

      // Business data url
      data: this.url + '/test/',
    };
  }

  constructor(private httpClient: HttpClient) {
  }

  /**
   * Gets business data
   */
  getBusinessData(): Observable<BusinessDataDTO> {
    return this.httpClient.get<BusinessDataDTO>(BusinessDataService.ROUTES.data);
  }
}
