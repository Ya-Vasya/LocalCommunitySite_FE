import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  constructor(
    private router: Router,
    public authServise: AuthenticationService) { }

  ngOnInit(): void {
  }

  logout(event: Event){
    event.preventDefault()
    this.authServise.logout()
    this.router.navigate(['/admin', 'login'])
  }
}
