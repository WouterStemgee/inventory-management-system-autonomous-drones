import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {
  }

  getAllMaps() {
    return new Promise((resolve, reject) => {
      this.http.get(environment.baseAPIUrl + 'api/maps').subscribe(
        res => {
          resolve(res);
        });
    });
  }

  getMap(id) {
    return new Promise((resolve, reject) => {
      this.http.get(environment.baseAPIUrl + 'api/maps/' + id).subscribe(
        res => {
          resolve(res);
        });
    });
  }
}
