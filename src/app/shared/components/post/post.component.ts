import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Post } from '../interfaces';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() post: Post

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    // this.post.image = this.sanitizer.bypassSecurityTrustHtml(`url(${this.post.image})`).toString();
  }

}
