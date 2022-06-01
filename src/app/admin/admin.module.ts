import { CommonModule } from "@angular/common";
import { NgModule, Provider } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { CreatePageComponent } from './create-page/create-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthenticationService } from "./shared/services/authentication.service";
import { SharedModule } from "../shared/components/shared.module";
import { AuthGuard } from "./shared/services/auth.guard";
import { MaterialModule } from "../material.module";
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpErrorInterceptor } from "../shared/error.interceptor";
import { UsersPageComponent } from "./users-page/users-page.component";
import { RegisterPageComponent } from './register-page/register-page.component';

const ERROR_INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: HttpErrorInterceptor
}

const customNotifierOptions: NotifierOptions = {
    position: {
          horizontal: {
              position: 'left',
              distance: 12
          },
          vertical: {
              position: 'bottom',
              distance: 12,
              gap: 10
          }
      },
    theme: 'material',
    behaviour: {
      autoHide: 5000,
      onClick: 'hide',
      onMouseover: 'pauseAutoHide',
      showDismissButton: true,
      stacking: 4
    },
    animations: {
      enabled: true,
      show: {
        preset: 'slide',
        speed: 300,
        easing: 'ease'
      },
      hide: {
        preset: 'fade',
        speed: 300,
        easing: 'ease',
        offset: 50
      },
      shift: {
        speed: 300,
        easing: 'ease'
      },
      overlap: 150
    }
  };

@NgModule({
    imports: [
        MaterialModule,
        NotifierModule.withConfig(customNotifierOptions),
        CommonModule,
        FormsModule,
        SharedModule,
        ReactiveFormsModule,
        RouterModule.forChild([
               {path: '', redirectTo: '/admin/login', pathMatch: 'full'}, 
               {path: 'login', component: LoginPageComponent },
               {path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthGuard]},
               {path: 'create-post', component: CreatePageComponent, canActivate: [AuthGuard]},
               {path: 'post/:id/edit', component: EditPageComponent, canActivate: [AuthGuard]},
               {path: 'users', component: UsersPageComponent, canActivate: [AuthGuard]},
               {path: 'create-user', component: RegisterPageComponent, canActivate: [AuthGuard]}
        ])
    ],
    exports: [RouterModule],
    declarations: [
      AdminLayoutComponent,
      LoginPageComponent,
      DashboardPageComponent,
      CreatePageComponent,
      EditPageComponent,
      UsersPageComponent,
      RegisterPageComponent
    ],
    providers: [
        SharedModule,
        AuthGuard,
        AuthenticationService
    ]
})
export class AdminModule {

}