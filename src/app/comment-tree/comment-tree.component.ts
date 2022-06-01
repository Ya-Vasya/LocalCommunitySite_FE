import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { CommentService } from '../shared/comment.service';
import { CommentDto } from '../shared/components/interfaces';

@Component({
  selector: 'app-comment-tree',
  templateUrl: './comment-tree.component.html',
  styleUrls: ['./comment-tree.component.scss']
})
export class CommentTreeComponent implements OnInit, OnDestroy {
  @Input()
  comments: CommentDto[] = [];
  @Input()
  postId: number;
  replySub: Subscription;

  showReply: boolean = false;

  form: FormGroup;
  text: FormControl;

  private readonly destroy$ = new Subject();

  constructor(private commentService: CommentService){}

  ngOnInit(){
    this.text = new FormControl();

    this.form = new FormGroup({
      text: this.text
    })
  }

  createReply(comment: CommentDto){
    let reply = {
      text: this.text.value,
      postId: this.postId,
      parentCommentId: comment.id
    };

    this.replySub = this.commentService.createComment(reply).pipe(takeUntil(this.destroy$))
    .subscribe(res =>{
      var newComment: CommentDto = {
        text: this.text.value,
        id: Number(res),
        isEdited: 'false',
        isDeleted: 'false',
        showReply: false,
        createdAt: '',
        postId: this.postId,
        parrentCommentId: comment.id,
        userId: null,
        replies: []
      };

      console.log(newComment)
      comment.replies.push(newComment)
      comment.showReply = !comment.showReply;
      this.form.reset();
    });
  }

  toggleReplyForm(comment: CommentDto){
    comment.showReply = !comment.showReply;
    // this.showReply = !this.showReply;
    this.form.reset();
  }

  ngOnDestroy() {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

}
