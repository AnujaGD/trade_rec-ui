import { Component, OnInit } from '@angular/core';
import { stock } from '../stock';
import { FetchDataService } from './fetch-data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private fetchService: FetchDataService) { }

  stocks: any;
  marketCap: any;
  loading: boolean | undefined;
  saved: boolean = false;
  searchedStocks: stock[] = [];
  stckArray: stock[] = [];
  ngOnInit(): void {
  }

  callFun(marketCap: any) {
    // this.stocks=null;
    this.marketCap = marketCap;
    console.log(this.marketCap);
    this.loading = true;
    var len = 0;
    this.fetchService.getQuoteByMarketCap(marketCap).subscribe(
      (response) => {
        console.log(response);
        this.stocks = response;
        this.loading = false;
        // console.log(this.stocks);
        for (var s in this.stocks) {
          len++;
        }
        console.log(len);
        for (var i = 0; i < len; i++) {
          this.stckArray[i] = new stock(this.stocks[i].stockName, this.stocks[i].stockSymbol, this.stocks[i].marketCap, this.stocks[i].currentPrice, this.stocks[i].marketOpenPrice);
        }
        console.log(this.stckArray[0]);
      }
    )
 
  

    


  }

  getRecommendations(marketCap: any) {
    this.loading = true;

    this.fetchService.getRecommendations(marketCap).subscribe(
      (response) => {
        this.stocks = response;
        this.loading = false;

      }
    )
  }

  saveStock(s: stock) {

    this.saved = true;

  }

  searchFilter(e: any) {
    this.search(e.target.value);
    console.log("here");
  }

  search(data: any) {
    var k = 0;
    this.searchedStocks=[];
    // console.log(this.stckArray);
    for (var i = 0; i < this.stckArray.length; i++) {
      // console.log(this.stckArray[i].stockName);
      if (this.stckArray[i].stockName.toLowerCase().startsWith(data)) {
        this.searchedStocks[k] = this.stckArray[i];
        k++;
      }
    }

    console.log(data);
    // console.log(this.searchedStocks);
    
    if(this.searchedStocks.length!=0)
    {
      this.stocks=this.searchedStocks;
    }
    else
    {
      console.log("fhd");
      this.stocks=[];
      
    }
    
    

  }
}
