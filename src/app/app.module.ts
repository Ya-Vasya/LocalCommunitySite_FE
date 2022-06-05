import { NgModule, Provider } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomePageComponent } from './home-page/home-page.component';
import { PostPageComponent } from './post-page/post-page.component';
import { PostComponent } from './shared/components/post/post.component';
import { SharedModule } from './shared/components/shared.module';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataService } from './shared/data.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './shared/auth.interceptor';
import { AuthenticationService } from './admin/shared/services/authentication.service';
import { FeedbackPageComponent } from './feedback-page/feedback-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommentTreeComponent } from './comment-tree/comment-tree.component';
import { HttpErrorInterceptor } from './shared/error.interceptor';

const AUTH_INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor
}

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    PostPageComponent,
    PostComponent,
    FeedbackPageComponent,
    CommentTreeComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    NgbModule,
    SharedModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [DataService, AUTH_INTERCEPTOR_PROVIDER, AuthenticationService],
  bootstrap: [AppComponent],
  exports: [MaterialModule]
})
export class AppModule { }
