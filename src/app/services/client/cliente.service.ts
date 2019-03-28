import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private baseUrlServer = 'http://172.104.211.233/ettcurumaniServe/public/api';

  constructor(public http: HttpClient) {}

  signup($data) {
    return this.http.post(`${this.baseUrlServer}/signup`, $data, {headers: {'Content-Type': 'application/json'}});
  }

  login($data) {
    return this.http.post(`${this.baseUrlServer}/login`, $data, {headers: {'Content-Type': 'application/json'}});
  }
}
