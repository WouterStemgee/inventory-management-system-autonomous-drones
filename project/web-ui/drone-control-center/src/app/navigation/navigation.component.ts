import {Component, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {DroneSimulatorService} from '../drone-simulator/presenter/drone-simulator.service';
import {map} from 'rxjs/operators';
import {SharedService} from '../shared.service';
import {AuthenticationService} from '../authentication.service';
import {environment} from '../../environments/environment';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  page;
  environment = environment;

  constructor(public auth: AuthenticationService, private breakpointObserver: BreakpointObserver, public simulator: DroneSimulatorService, private shared: SharedService) {
  }

  registerEvents() {
    if (this.shared.isHandset$) {
      window.addEventListener('resize', this.resize, false);
      window.addEventListener('load', this.resize, false);
      window.removeEventListener('resize', this.reset, false);
      window.removeEventListener('load', this.reset, false);
    } else {
      window.removeEventListener('resize', this.resize, false);
      window.removeEventListener('load', this.resize, false);
      window.addEventListener('resize', this.reset, false);
      window.addEventListener('load', this.reset, false);
    }
  }

  resize() {
    const width = window.innerWidth;
    const canvas = document.getElementById('simulator') as HTMLCanvasElement;
    if (canvas) {
      const ratio = canvas.height / canvas.width;
      const height = width * ratio;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
    }
  }

  reset() {
    const canvas = document.getElementById('simulator') as HTMLCanvasElement;
    if (canvas) {
      canvas.style.width = '800px';
      canvas.style.height = '600px';
    }
  }

  ngOnInit(): void {
    this.shared.onNavigateEvent.subscribe((page) => {
      this.page = page;
    });
    this.isHandset$.subscribe((value) => {
      this.shared.isHandset$ = value;
      this.registerEvents();
    });
  }
}
