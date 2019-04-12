import {Component} from '@angular/core';
import {AuthenticationService, TokenPayload} from '../authentication.service';
import {Router} from '@angular/router';
import {DroneSimulatorService} from '../drone-simulator/presenter/drone-simulator.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials: TokenPayload = {
    email: '',
    password: ''
  };

  constructor(private auth: AuthenticationService, private router: Router, public simulator: DroneSimulatorService) {
    if (auth.isLoggedIn()) {
      this.router.navigateByUrl('/dashboard');
    }
  }

  login() {
    if (this.credentials.email === '' || this.credentials.password === '') {
      this.simulator.onAlertEvent.emit({
        title: 'Login',
        message: 'Please fill in all the fields before submitting.',
        type: 'error'
      });
    } else {
      this.auth.login(this.credentials).subscribe(() => {
        this.router.navigateByUrl('/dashboard');
        this.simulator.onAlertEvent.emit({
          title: 'Login',
          message: 'Welcome ' + this.auth.getUserDetails().name + '!',
          type: 'success'
        });
      }, (err) => {
        console.error(err);
        this.simulator.onAlertEvent.emit({
          title: 'Login',
          message: 'Login failed.',
          type: 'error'
        });
      });
    }
  }
}
