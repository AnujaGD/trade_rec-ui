import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class FetchDataService {

  constructor(private http: HttpClient) { }

  getQuoteByMarketCap(marketCap:any)
  {
    
    return this.http.get( "http://localhost:8085/getQuoteByMarketCap/"+marketCap);
  }

  getRecommendations(marketCap:any)
  {
    return this.http.get( "http://localhost:8085/getRecommendations/"+marketCap);
  }
}
