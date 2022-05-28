import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FeedbackRequest } from '../shared/components/interfaces';
import { FeedbackService } from '../shared/feedback.service';

@Component({
  selector: 'app-feedback-page',
  templateUrl: './feedback-page.component.html',
  styleUrls: ['./feedback-page.component.scss']
})
export class FeedbackPageComponent implements OnInit {

  form: FormGroup = new FormGroup({});

  constructor(private service: FeedbackService) { }

  ngOnInit(): void {
    this.form = new FormGroup(
      {
        name: new FormControl(null, Validators.required),
        email: new FormControl(null, [Validators.required, Validators.email]),
        phoneNumber: new FormControl(null, [Validators.required]),
        text: new FormControl(null, Validators.required)
      })
  }

  submit() {
    if (this.form.invalid) {
      return
    }

    const request: FeedbackRequest = {
      name: this.form.value.name,
      email: this.form.value.email,
      phoneNumber: this.form.value.phoneNumber,
      text: this.form.value.text
    }
    
    this.service.create(request).subscribe(() =>
    {
      //this.alertService.success('Пост успішно створено')
      this.form.reset()
      //this.router.navigate(['/admin', 'dashboard'])
    })
  }

}
