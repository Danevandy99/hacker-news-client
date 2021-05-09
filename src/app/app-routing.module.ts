import { DiscussionComponent } from './discussion/discussion.component';
import { JobStoriesComponent } from './job-stories/job-stories.component';
import { ShowStoriesComponent } from './show-stories/show-stories.component';
import { AskStoriesComponent } from './ask-stories/ask-stories.component';
import { BestStoriesComponent } from './best-stories/best-stories.component';
import { NewStoriesComponent } from './new-stories/new-stories.component';
import { TopStoriesComponent } from './top-stories/top-stories.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/top-stories', pathMatch: 'full' },
  { path: 'top-stories', component: TopStoriesComponent },
  { path: 'new-stories', component: NewStoriesComponent },
  { path: 'best-stories', component: BestStoriesComponent },
  { path: 'ask-stories', component: AskStoriesComponent },
  { path: 'show-stories', component: ShowStoriesComponent },
  { path: 'job-stories', component: JobStoriesComponent },
  { path: 'discussion/:id', component: DiscussionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    relativeLinkResolution: 'legacy',
    scrollPositionRestoration: 'top'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
