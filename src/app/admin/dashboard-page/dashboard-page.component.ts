import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription, tap } from 'rxjs';
import { Post, PostFilterRequest } from 'src/app/shared/components/interfaces';
import { DataService } from 'src/app/shared/data.service';
import { PostsService } from 'src/app/shared/post.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
  providers: [
    {provide: DatePipe}
  ],
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  constructor(
    private postService: PostsService,
    public dataService: DataService,
    private datepipe: DatePipe
    ) { }

  posts: Post[] = []
  pSub: Subscription
  form: FormGroup = new FormGroup({});
  inProgress: boolean;

  postToDeleteId: number;

  ngOnInit(): void {
    this.inProgress = true;
    this.pSub = this.postService.getAll().subscribe(posts => {
      this.posts = posts
      this.inProgress = false;
      console.log(posts);
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

  remove() {
    this.postService.remove(this.postToDeleteId)
    .subscribe(() => {
      this.posts = this.posts.filter(post => post.id != this.postToDeleteId)
    })
  }

  onModalOpen(id: number){
    this.postToDeleteId = id;
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

    this.postService.getFiltered(filterRequest).subscribe((posts) =>{
      if(posts.length > 0)
      {
        this.posts = posts
      }
      else {
        this.posts = []
      }
    })
  }

}
