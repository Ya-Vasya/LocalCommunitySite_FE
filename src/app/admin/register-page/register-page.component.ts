import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl, Form, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/components/interfaces';
import { AuthenticationService } from '../shared/services/authentication.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  passwordText: boolean;
  confirmPasswordText: boolean;

  email: FormControl;
  password: FormControl;
  confirmPassword: FormControl;

  form: FormGroup = new FormGroup({});

  @Input() notEqual: boolean = false;

  constructor(
    public auth: AuthenticationService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.createFormControls();
    this.createFormGroup();
  }

  createFormControls(){
    this.email = new FormControl(null, 
      [
        Validators.email,
        Validators.required
      ])
    this.password = new FormControl(null, 
      [
        Validators.required, 
        Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")
      ]);
    this.confirmPassword = new FormControl(null, 
      [
        Validators.required
      ])
  }

  createFormGroup() {
    this.form = this.formBuilder.group({
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword
    }, { validator: this.comparePasswords })
  }

  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => { 
    let pass = group.get('password').value;
    let confirmPass = group.get('approvePassword').value
  
    debugger;
    return pass === confirmPass ? null : { notEqual: true }
  }

  submit()
  {
    if (this.form?.invalid)
    {
      return
    }

    debugger;

    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password
    }

    this.auth.register(user).subscribe(() => {
      this.form.reset()
      this.router.navigate(['/admin', 'users'])
    })
  }

  togglePasswordTextType() {
    this.passwordText = !this.passwordText;
  }

  toggleConfirmPasswordTextType() {
    this.confirmPasswordText = !this.confirmPasswordText;
  }

  comparePasswords(fb: AbstractControl) {
    let confirmPswrdCtrl = fb.get('confirmPassword');

    if (confirmPswrdCtrl != null) {
      if (confirmPswrdCtrl.errors == null || 'passwordMissmatch' in confirmPswrdCtrl.errors) {
        if ((fb.get('password')?.value != confirmPswrdCtrl.value))
          confirmPswrdCtrl.setErrors({ passwordMissmatch: true });
        else
          confirmPswrdCtrl.setErrors(null);
      }
    }
  }


}
