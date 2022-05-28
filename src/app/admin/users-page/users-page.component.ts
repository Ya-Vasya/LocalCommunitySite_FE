import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription, tap } from 'rxjs';
import { Post, PostFilterRequest, UserDto } from 'src/app/shared/components/interfaces';
import { DataService } from 'src/app/shared/data.service';
import { PostsService } from 'src/app/shared/post.service';
import { AuthenticationService } from '../shared/services/authentication.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss'],
  providers: [
    {provide: DatePipe}
  ],
})
export class UsersPageComponent implements OnInit, OnDestroy {

  constructor(
    private authService: AuthenticationService,
    public dataService: DataService,
    private datepipe: DatePipe
    ) { }

  users: UserDto[] = []
  pSub: Subscription
  form: FormGroup = new FormGroup({});
  inProgress: boolean;

  ngOnInit(): void {
    this.inProgress = true;
    this.pSub = this.authService.getAll().subscribe(posts => {
      this.users = posts
      this.inProgress = false;
    })
    this.form = new FormGroup(
      {
        title: new FormControl(null),
        status: new FormControl(null),
        startDate: new FormControl(null),
        endDate: new FormControl(null)
      })
  }

  ngOnDestroy(): void {
    if(this.pSub)
    {
      this.pSub.unsubscribe()
    }
  }

  remove(email: string) {
    this.authService.remove(email)
    .subscribe(() => {
      this.users = this.users.filter(u => u.email != email)
    })
  }

  submit() {
    if (this.form.invalid) {
      return
    }

    const filterRequest: PostFilterRequest = {
      title: this.form.value.title,
      startDate: this.datepipe.transform(this.form.value.startDate, 'yyyy-MM-dd'),
      endDate: this.datepipe.transform(this.form.value.endDate, 'yyyy-MM-dd'),
      status: this.form.value.status
    }
  }

  
}
