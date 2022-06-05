import { NgModule } from '@angular/core';
import { PreloadAllModules, PreloadingStrategy, RouterModule, Routes } from '@angular/router';
import { AdminModule } from './admin/admin.module';
import { DashboardPageComponent } from './admin/dashboard-page/dashboard-page.component';
import { FeedbackPageComponent } from './feedback-page/feedback-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PostPageComponent } from './post-page/post-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'news', component: HomePageComponent },
  { path: 'announcements', component: HomePageComponent },
  { path: 'post/:id', component: PostPageComponent},
  { path: 'feedback', component: FeedbackPageComponent },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
