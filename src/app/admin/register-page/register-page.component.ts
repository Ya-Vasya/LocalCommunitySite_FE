import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/components/interfaces';
import { AuthenticationService } from '../shared/services/authentication.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {


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

    this.auth.register(user).subscribe(() => {
      this.form.reset()
      this.router.navigate(['/admin', 'users'])
    })
  }


}
