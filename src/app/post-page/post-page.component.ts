import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { CommentService } from '../shared/comment.service';
import { Post, CommentDto, CommentRequest} from '../shared/components/interfaces';
import { PostsService } from '../shared/post.service';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {
  comments: CommentDto[];

  constructor(
    private route: ActivatedRoute,
    private postService: PostsService,
    private commentService: CommentService,
    private cdr: ChangeDetectorRef) { }

  post$: Observable<Post>;

  form: FormGroup;
  text: FormControl;
  postId: number;

  ngOnInit(): void {
    this.postId = Number(this.route.snapshot.paramMap.get('id'));

    this.post$ = this.route.params.pipe(
      switchMap((params: Params) => {
        return this.postService.getById(params['id'])
      }));

    this.refreshComments();

    this.text = new FormControl();

    this.form = new FormGroup({
      text: this.text
    })
  }

  refreshComments() {

    this.commentService.getCommentsByPostId(this.postId).subscribe(res => {
      this.comments = res;
    })
  }

  createComment(){
    let comment = {
      text: this.text.value,
      postId: this.postId
    }

    this.commentService.createComment(comment).subscribe(res =>{
      this.form.reset();
      
      this.cdr.detectChanges();

      this.refreshComments();
    }
    );
  }

}
