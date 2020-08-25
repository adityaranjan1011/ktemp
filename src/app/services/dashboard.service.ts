import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  public uploadDocumentDetails = new BehaviorSubject<any>('');

  constructor(private http: HttpClient,) {
    this.getJSON().subscribe(data => {
  });
   }
  
   public getJSON(): Observable<any> {
    return this.http.get("./assets/data.json");
}
   getDataset():Observable<any>{
     return this.http.get(`https://pf-stage.koshex.com/v1/GenerateStats/`);
   }
}
