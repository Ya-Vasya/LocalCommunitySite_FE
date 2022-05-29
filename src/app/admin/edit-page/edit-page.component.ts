import { DatePipe } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import moment from 'moment';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';
import { Subscription, switchMap } from 'rxjs';
import { Post, PostStatus } from 'src/app/shared/components/interfaces';
import { DataService } from 'src/app/shared/data.service';
import { PostsService } from 'src/app/shared/post.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss'],
  providers: [
    { provide: DatePipe }
  ],
})
export class EditPageComponent implements OnInit, OnDestroy {

  @Input() editable: boolean = true;
  form: FormGroup
  title: FormControl;
  body: FormControl;
  status: FormControl;
  date: FormControl;
  time: FormControl;
  image: FormControl;

  statuses: PostStatus[] = this.dataService.SHARED_STATUSES;

  imageBase: any;
  imageExists: boolean = true;

  todayDate: Date = new Date();

  modules = {}
  post: Post
  submitted: boolean = false

  selectedStatusId: number;

  uSub: Subscription;

  hasChange: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private postService: PostsService,
    public dataService: DataService,
    private datepipe: DatePipe,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    this.initQuillModules()
    
    let id = this.route.snapshot.paramMap.get('id');
    console.log(id);

    this.postService.getById(new Number(id))
      .subscribe((post: Post) => {
        this.post = post;

        this.selectedStatusId = this.dataService.getPostStatusId(post.status);
        
        this.createFormControls(post);
        this.createForm();

        if (this.post.image == undefined || this.post.image == null) {
          this.imageExists = false;
        }
        this.onCreateGroupFormValueChange();
      });
  }

  createFormControls(post: Post) {
    this.title = new FormControl(post.title, Validators.required);
    this.body = new FormControl(post.body, Validators.required);
    this.status = new FormControl(this.selectedStatusId, Validators.required);
    this.date = new FormControl(post.createdAt, Validators.required);
    this.image = new FormControl(post.image, Validators.required);
  }

  createForm() {
    this.form = new FormGroup({
      title: this.title,
      body: this.body,
      status: this.status,
      date: this.date,
      image: this.image
    });
  }

  onCreateGroupFormValueChange() {
    const initialValue = this.form.value
    this.form.valueChanges.subscribe(value => {
      debugger;
      this.hasChange = Object.keys(initialValue).some(key => this.form.value[key] != initialValue[key])
    });
  }

  onFileSelected(event: any) {
    var self = this;

    let file = event.target.files[0];
    let fileReader = new FileReader();


    fileReader.onload = function (ev) {
      debugger;
      self.imageBase = this.result?.toString();
    }

    fileReader.readAsDataURL(file);
  }

  ngOnDestroy(): void {
    if (this.uSub) {
      this.uSub.unsubscribe()
    }
  }

  onImageDelete() {
    this.post.image = null;

    this.postService.update(this.post).subscribe();
  }

  submit() {
    if (this.form.invalid) {
      return
    }


    this.uSub = this.postService.update(
      {
        id: this.post.id,
        title: this.form.value.title,
        body: this.form.value.body,
        image: this.imageBase,
        createdAt: this.datepipe.transform(this.form.value.date, 'yyyy-MM-dd'),
        status: this.form.value.status
      }).subscribe(() => {
        this.submitted = true;
        this.router.navigate(['/admin', 'dashboard'])
      })
  }

  onSelectionChanged({ value }: any) {
    console.log(value);
    if (value === 2) {
      this.form.get('date').setValue(moment())
      this.editable = false
    } else {
      this.editable = true
    }
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
