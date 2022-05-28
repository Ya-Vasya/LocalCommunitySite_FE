import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Post } from '../shared/components/interfaces';
import { PostsService } from '../shared/post.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(private postService: PostsService) {
   }

  posts$: Observable<Post[]>;

  ngOnInit(): void {
    this.posts$ = this.postService.getAll()
  }

}
