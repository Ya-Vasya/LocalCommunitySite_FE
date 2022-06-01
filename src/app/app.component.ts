import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './admin/shared/services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  
  constructor(
    public authServise: AuthenticationService,
    private router: Router) {
  }

  logout(event: Event){
    event.preventDefault()
    this.authServise.logout()
    this.router.navigate(['/admin', 'login'])
  }
}
