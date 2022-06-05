import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Pagination, Post } from '../shared/components/interfaces';
import { DataService } from '../shared/data.service';
import { PostsService } from '../shared/post.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  providers: [
    { provide: DatePipe }
  ],
})
export class HomePageComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  totalLength: number;

  section: number;

  constructor(
    private postService: PostsService,
    private dataService: DataService,
    private router: Router,
    private datepipe: DatePipe
  ) {
  }


  posts$: Observable<Pagination<Post>>;

  ngOnInit(): void {   
  }

  loadPosts(){
    console.log(this.router.url);
    const home = "/";
    const active = 2;
    let offset = this.paginator.pageIndex;
    var today = new Date();

    if (this.router.url == home)
      this.posts$ = this.postService.getQuery(
        { 
          offset: offset, 
          limit: this.paginator.pageSize, 
          status: active, 
          startDate: null, 
          endDate: this.datepipe.transform(today, 'yyyy-MM-dd'), 
          section: null 
        })
        .pipe(
          tap(res => {
            this.totalLength = res.totalLenght
            console.log(res);
          })
        )
    else {
      this.section = this.dataService.getSectionId(this.router.url);
      this.posts$ = this.postService.getQuery(
        { 
          offset: offset, 
          limit: this.paginator.pageSize, 
          status: active, 
          section: this.section, 
          startDate: null, 
          endDate: this.datepipe.transform(today, 'yyyy-MM-dd'),
        })
        .pipe(
          tap(res => this.totalLength = res.totalLenght)
        )
    }
  }

  ngAfterViewInit(): void {
    this.loadPosts(); 

    this.paginator.page
    .pipe(
      tap(() => this.loadPosts())
    )
    .subscribe();
  }

}
