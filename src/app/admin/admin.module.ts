import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
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
import { AlertService } from "./shared/services/alert.service";
import { AlertComponent } from "./shared/components/alert/alert.component";

@NgModule({
    imports: [
        MaterialModule,
        CommonModule,
        FormsModule,
        SharedModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            { path: '', component: AdminLayoutComponent, children: [
               {path: '', redirectTo: '/admin/login', pathMatch: 'full'}, 
               {path: 'login', component: LoginPageComponent },
               {path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthGuard]},
               {path: 'create', component: CreatePageComponent, canActivate: [AuthGuard]},
               {path: 'post/:id/edit', component: EditPageComponent, canActivate: [AuthGuard]} 
            ]}
        ])
    ],
    exports: [RouterModule],
    declarations: [
      AdminLayoutComponent,
      LoginPageComponent,
      DashboardPageComponent,
      CreatePageComponent,
      EditPageComponent,
      AlertComponent
    ],
    providers: [
        SharedModule,
        AuthGuard,
        AuthenticationService,
        AlertService
    ]
})
export class AdminModule {

}