import {Component} from '@angular/core';
import {AuthenticationService, TokenPayload} from '../authentication.service';
import {Router} from '@angular/router';
import {DroneSimulatorService} from '../drone-simulator/presenter/drone-simulator.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  credentials: TokenPayload = {
    email: '',
    name: '',
    password: '',
    role: ''
  };

  constructor(private auth: AuthenticationService, private router: Router, public simulator: DroneSimulatorService) {
  }

  register() {
    if (this.credentials.email === '' || this.credentials.name === '' || this.credentials.password === '' || this.credentials.role === '') {
      this.simulator.onAlertEvent.emit({
        title: 'Register',
        message: 'Please fill in all the fields before submitting.',
        type: 'error'
      });
    } else {
      this.auth.register(this.credentials).subscribe(() => {
        this.router.navigateByUrl('/');
        this.simulator.onAlertEvent.emit({
          title: 'Register',
          message: 'Successfully registered. Welcome ' + this.auth.getUserDetails().name + '!',
          type: 'success'
        });
      }, (err) => {
        console.error(err);
        this.simulator.onAlertEvent.emit({
          title: 'Register',
          message: 'An error occurred.',
          type: 'error'
        });
      });
    }
  }
}
