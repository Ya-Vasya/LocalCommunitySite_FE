import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { User } from '../../shared/components/interfaces';
import { AuthenticationService } from '../shared/services/authentication.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  form: FormGroup = new FormGroup({});

  constructor(
    public auth: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(
        null,
        [Validators.email, Validators.required]),
      password: new FormControl(
        null,
        [Validators.required, Validators.minLength(8)]
      )
    })
  }

  submit()
  {
    if (this.form?.invalid)
    {
      return
    }

    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password
    }

    this.auth.login(user).subscribe(() => {
      this.form.reset()
      this.router.navigate(['/admin', 'dashboard'])
    })
  }
}
