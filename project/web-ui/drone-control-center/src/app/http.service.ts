import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  maps;

  constructor(private http: HttpClient) {
  }

  getAllMaps() {
    return new Promise<any[]>((resolve, reject) => {
      if (this.maps === undefined) {
        this.http.get(environment.baseAPIUrl + 'api/maps').subscribe(
          res => {
            this.maps = res;
            resolve(this.maps);
          });
      } else {
        resolve(this.maps);
      }
    });
  }

  getMap(id) {
    return new Promise((resolve, reject) => {
      if (this.maps.length === undefined) {
        this.http.get(environment.baseAPIUrl + 'api/maps/' + id).subscribe(
          res => {
            this.maps = res;
            resolve(res);
          });
      } else {
        resolve(this.maps[id]);
      }
    });
  }
}
