import { StoriesComponent } from './pages/stories/stories.component';
import { DiscussionComponent } from './pages/discussion/discussion.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/stories/top', pathMatch: 'full' },
  { path: 'discussion/:id', component: DiscussionComponent, data: { reuse: true } },
  { path: 'stories/:category', component: StoriesComponent, data: { reuse: true } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    enableTracing: false,
    onSameUrlNavigation: 'reload',
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
