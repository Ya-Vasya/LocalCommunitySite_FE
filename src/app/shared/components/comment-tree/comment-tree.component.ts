import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PostPageComponent } from 'src/app/post-page/post-page.component';
import { CommentService } from '../../comment.service';
import { CommentDto } from '../interfaces';

@Component({
  selector: 'app-comment-tree',
  templateUrl: './comment-tree.component.html',
  styleUrls: ['./comment-tree.component.scss']
})
export class CommentTreeComponent implements OnInit {
  @Input()
  comments: CommentDto[] = [];
  @Input()
  postId: number;

  // @ViewChild(PostPageComponent) postPageComponent: PostPageComponent

  showReply: boolean = false;

  form: FormGroup;
  text: FormControl;

  constructor(private commentService: CommentService){}

  ngOnInit(){
    console.log(this.comments);

    this.text = new FormControl();

    this.form = new FormGroup({
      text: this.text
    })
  }

  createReply(commentId: number){
    let reply = {
      text: this.text.value,
      postId: this.postId,
      parentCommentId: commentId
    };

    this.commentService.createComment(reply).subscribe(res =>{
      this.form.reset();

      // this.postPageComponent.ngOnInit();
      window.location.reload();
    });
  }

  toggleReplyForm(comment: CommentDto){
    comment.showReply = !comment.showReply;
    // this.showReply = !this.showReply;
    this.form.reset();
  }

}
