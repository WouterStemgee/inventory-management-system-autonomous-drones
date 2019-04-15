import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {
  }

  getNewMap(): Promise<any> {
    return this.http.get<any>('../assets/data/new_map.json').toPromise();
  }

  getNewDrone(): Promise<any> {
    return this.http.get<any>('../assets/data/drone.json').toPromise();
  }
}
