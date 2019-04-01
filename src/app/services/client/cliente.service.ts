import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ClienteService {

    private baseUrlServer = 'http://3.18.245.242:3000/api/tiburon-app';

    constructor(public http: HttpClient) {
    }

    signup($data) {
        return this.http.post(`${this.baseUrlServer}/save`, $data, {headers: {'Content-Type': 'application/json'}});
    }

    login($data) {
        return this.http.post(`${this.baseUrlServer}/doLogin`, $data, {headers: {'Content-Type': 'application/json'}});
    }
}
