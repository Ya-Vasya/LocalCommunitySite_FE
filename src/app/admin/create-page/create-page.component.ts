import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Post, PostStatus } from 'src/app/shared/components/interfaces';
import { DataService } from 'src/app/shared/data.service';
import moment from 'moment';
import { PostsService } from 'src/app/shared/post.service';
import { DatePipe } from '@angular/common'

import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill'

import Quill from 'quill'
import BlotFormatter from 'quill-blot-formatter';
import { Router } from '@angular/router';
import { AlertService } from '../shared/services/alert.service';

Quill.register('modules/blotFormatter', BlotFormatter);

export const MY_FORMATS = {
  parse: {
    dateInput: 'L',
  },
  display: {
    dateInput: 'DD-MM-yyyy',
    monthYearLabel: 'yyyy',
    dateA11yLabel: 'L',
    monthYearA11yLabel: 'yyyy',
  },
};

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss'],
  providers: [
    {provide: DatePipe}
  ],
})
export class CreatePageComponent implements OnInit {

  @Input() editable: boolean = true;

  statuses: PostStatus[] = this.shared.SHARED_STATUSES;
  todayDate:Date = new Date();
  form: FormGroup = new FormGroup({});
  modules = {}

  constructor(
    private shared: DataService,
    private postsService: PostsService,
    private datepipe: DatePipe,
    private router: Router,
    private alertService: AlertService) {
      this.initQuillModules()
     }

  ngOnInit(): void {
    this.form = new FormGroup(
      {
        title: new FormControl(null, Validators.required),
        body: new FormControl(null, Validators.required),
        status: new FormControl(0, Validators.required),
        date: new FormControl(moment(), Validators.required),
        time: new FormControl(null)
      })
  }

  submit() {
    if (this.form.invalid) {
      return
    }

    const post: Post = {
      title: this.form.value.title,
      body: this.form.value.body,
      createdAt: this.datepipe.transform(this.form.value.date, 'yyyy-MM-dd'),
      status: this.form.value.status
    }
    console.log(post)
    this.postsService.create(post).subscribe(() =>
    {
      this.alertService.success('Пост успішно створено')
      this.form.reset()
      //this.router.navigate(['/admin', 'dashboard'])
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
