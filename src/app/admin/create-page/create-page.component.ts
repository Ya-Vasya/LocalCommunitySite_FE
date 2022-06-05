import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Post, PostStatus, Section } from 'src/app/shared/components/interfaces';
import { DataService } from 'src/app/shared/data.service';
import moment from 'moment';
import { PostsService } from 'src/app/shared/post.service';
import { DatePipe } from '@angular/common'

import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill'

import Quill from 'quill'
import BlotFormatter from 'quill-blot-formatter';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';

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
    { provide: DatePipe }
  ],
})
export class CreatePageComponent implements OnInit {

  @Input() editable: boolean = true;

  statuses: PostStatus[] = this.shared.SHARED_STATUSES;
  sections: Section[] = this.shared.SHARED_SECTIONS;

  todayDate: Date = new Date();
  form: FormGroup = new FormGroup({});
  title: FormControl;
  body: FormControl;
  status: FormControl;
  date: FormControl;
  time: FormControl;
  image: FormControl;
  section: FormControl;

  imageBase: any;

  modules = {}

  constructor(
    private shared: DataService,
    private postsService: PostsService,
    private datepipe: DatePipe) {
  }

  ngOnInit(): void {
    this.createFormControls();
    this.createForm();

    this.initQuillModules();
  }

  createFormControls() {
    this.title = new FormControl(null, Validators.required);
    this.body = new FormControl(null, Validators.required);
    this.status = new FormControl(null, Validators.required);
    this.date = new FormControl(moment(), Validators.required);
    this.time = new FormControl(null);
    this.image = new FormControl(null, Validators.required);
    this.section = new FormControl(null, Validators.required);
  }

  createForm() {
    this.form = new FormGroup({
      title: this.title,
      body: this.body,
      status: this.status,
      date: this.date,
      time: this.time,
      image: this.image,
      section: this.section
    });
  }

  submit() {
    if (this.form.invalid) {
      return
    }
    
    const post: Post = {
      title: this.title.value,
      body: this.body.value,
      image: this.imageBase,
      createdAt: this.datepipe.transform(this.form.value.date, 'yyyy-MM-dd'),
      status: this.status.value,
      section: this.section.value
    }
    console.log(post)
    this.postsService.create(post).subscribe(() => {
      this.form.reset()
      //this.router.navigate(['/admin', 'dashboard'])
    })
  }

  onSelectionChanged({ value }: any) {
    if (value === 2) {
      this.date.setValue(moment())
      this.editable = false
    } else {
      this.editable = true
    }
  }

  onFileSelected(event: any) {
    var self = this;

    let file = event.target.files[0];
    let fileReader = new FileReader();

    fileReader.onload = function (ev) {
      self.imageBase = this.result?.toString();
    }

    fileReader.readAsDataURL(file);
  }

  private initQuillModules() {
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
