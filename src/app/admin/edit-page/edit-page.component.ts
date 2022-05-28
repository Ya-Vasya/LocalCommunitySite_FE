import { DatePipe } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import moment from 'moment';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';
import { Subscription, switchMap } from 'rxjs';
import { Post } from 'src/app/shared/components/interfaces';
import { DataService } from 'src/app/shared/data.service';
import { PostsService } from 'src/app/shared/post.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss'],
  providers: [
    {provide: DatePipe}
  ],
})
export class EditPageComponent implements OnInit, OnDestroy {

  @Input() editable: boolean = true;
  form: FormGroup
  modules = {}
  post: Post
  submitted: boolean = false

  uSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private postService: PostsService,
    public dataService: DataService,
    private datepipe: DatePipe,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initQuillModules()
    this.route.params.pipe(
      switchMap((params: Params) => {
        return this.postService.getById(params['id'])
      })
    ).subscribe((post: Post) => {
      this.post = post;
      this.form = new FormGroup({
        title: new FormControl(post.title ,Validators.required),
        body: new FormControl(post.body, Validators.required),
        status: new FormControl(post.status, Validators.required),
        date: new FormControl(post.createdAt, Validators.required),
      })
    })
  }

  ngOnDestroy(): void {
    if(this.uSub) {
      this.uSub.unsubscribe()
    }
  }

  submit()
  {
    if(this.form.invalid)
    {
      return
    }


    this.uSub = this.postService.update(
    {
      id: this.post.id,
      title: this.form.value.title,
      body: this.form.value.body,
      createdAt: this.datepipe.transform(this.form.value.date, 'yyyy-MM-dd'),
      status: this.form.value.status
    }).subscribe(() => {
      this.submitted = true;
      this.router.navigate(['/admin', 'dashboard'])
    })
  }

  onSelectionChanged({value}: any) {
    console.log(value);
    if(value === 2) {
      this.form.get('date').setValue(moment())
      this.editable = false
    } else {
      this.editable = true
    }
  }

  private initQuillModules()
  {
    this.modules = {
      blotFormatter: {
        // empty object for default behaviour.
      },
      'toolbar': {
        container: [
          ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
          ['blockquote', 'code-block'],

          [{ 'header': 1 }, { 'header': 2 }],               // custom button values
          [{ 'list': 'ordered' }, { 'list': 'bullet' }],
          [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
          [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
          [{ 'direction': 'rtl' }],                         // text direction

          [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

          [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
          [{ 'font': [] }],
          [{ 'align': [] }],

          ['clean'],                                         // remove formatting button

          ['link', 'image', 'video'],                         // link and image, video
        ],
        handlers: {},

      }
    }
  }

  blured = false
  focused = false

  created(event: any) {
    // tslint:disable-next-line:no-console
    console.log('editor-created', event)
  }

  changedEditor(event: EditorChangeContent | EditorChangeSelection) {
    // tslint:disable-next-line:no-console
    console.log('editor-change', event)
  }

  focus($event: any) {
    // tslint:disable-next-line:no-console
    console.log('focus', $event)
    this.focused = true
    this.blured = false
  }

  blur($event: any) {
    // tslint:disable-next-line:no-console
    console.log('blur', $event)
    this.focused = false
    this.blured = true
  }
}
