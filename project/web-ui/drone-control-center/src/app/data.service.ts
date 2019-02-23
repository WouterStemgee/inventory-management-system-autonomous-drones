import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {
  }

  getAllMaps(): Promise<any[]> {
    return this.http.get<any[]>(environment.baseAPIUrl + 'assets/data/maps.json').toPromise();
  }
}
