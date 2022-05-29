import { NgModule } from "@angular/core";
import {HttpClientModule} from '@angular/common/http';
import { QuillModule } from "ngx-quill";
import { CommentTreeComponent } from './comment-tree/comment-tree.component';
import { BrowserModule } from "@angular/platform-browser";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
    imports: [
        HttpClientModule,
        BrowserModule,
        ReactiveFormsModule,
        QuillModule.forRoot()],
    exports: [
        HttpClientModule,
        CommentTreeComponent,
        QuillModule],
    declarations: [
        CommentTreeComponent
  ]
})
export class SharedModule {

}