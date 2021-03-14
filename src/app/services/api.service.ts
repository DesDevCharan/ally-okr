import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GET_OKRS } from '../constant/urls';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getOKR(): Observable<any> {
    return this.http.get(GET_OKRS);
  }
}
