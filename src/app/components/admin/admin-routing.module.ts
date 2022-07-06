import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from 'src/app/auth/components/auth.guard';
import { AddArticleComponent } from './add-article/add-article.component';
import { AdminComponent } from './admin.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { EditArticleComponent } from './edit-article/edit-article.component';
import { LoginPageComponent } from './login-page/login-page.component';


const routes: Routes = [{
  path: 'admin', component: AdminComponent, children: [
    { path: '', component: ArticleListComponent , canActivate: [AdminGuard]},
    { path: 'article-list', component: ArticleListComponent, canActivate: [AdminGuard] },
    { path: 'article-list/:edit', component: ArticleListComponent , canActivate: [AdminGuard]},
    { path: 'login', component: LoginPageComponent },
    { path: '**', component: ArticleListComponent, canActivate: [AdminGuard] },

  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
