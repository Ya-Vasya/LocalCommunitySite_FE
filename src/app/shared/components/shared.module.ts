import { NgModule } from "@angular/core";
import {HttpClientModule} from '@angular/common/http';
import { QuillModule } from "ngx-quill";
import { BrowserModule } from "@angular/platform-browser";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
    imports: [
        HttpClientModule,
        ReactiveFormsModule,
        QuillModule.forRoot()],
    exports: [
        HttpClientModule,
        QuillModule],
    declarations: [
  ]
})
export class SharedModule {

}