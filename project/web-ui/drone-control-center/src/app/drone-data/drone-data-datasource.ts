import {DataSource} from '@angular/cdk/collections';
import {map} from 'rxjs/operators';
import {merge, Observable, of as observableOf} from 'rxjs';

export interface DroneData {
  id: number;
  name: string;
  battery: number;
  position: { x: number, y: number, z: number};
  height: number;
  speed: number;
  acceleration: number;
  pitch: number;
  roll: number;
  yaw: number;
}

export class DroneDataDataSource extends DataSource<DroneData> {

  data: DroneData[];

  constructor(simulator) {
    super();
    this.data = [simulator.drone];
  }

  connect(): Observable<DroneData[]> {
    const dataMutations = [
      observableOf(this.data)
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.data;
    }));
  }

  disconnect() {
  }
}
