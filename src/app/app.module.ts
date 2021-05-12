import { AppRouterOutletDirective } from './app-router-outlet.directive';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { StoryComponent } from './components/story/story.component';
import { SafePipe } from './shared/pipes/safe.pipe';
import { TimeagoModule } from 'ngx-timeago';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { TopStoriesComponent } from './pages/top-stories/top-stories.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NewStoriesComponent } from './pages/new-stories/new-stories.component';
import { BestStoriesComponent } from './pages/best-stories/best-stories.component';
import { AskStoriesComponent } from './pages/ask-stories/ask-stories.component';
import { ShowStoriesComponent } from './pages/show-stories/show-stories.component';
import { JobStoriesComponent } from './pages/job-stories/job-stories.component';
import { StoryListComponent } from './components/story-list/story-list.component';
import { DiscussionComponent } from './pages/discussion/discussion.component';
import { RouteReuseStrategy } from '@angular/router';
import { CustomReuseStrategy } from './reuse-strategy';
import { CommentComponent } from './components/comment/comment.component';
import { StoriesComponent } from './pages/stories/stories.component';


@NgModule({
  declarations: [
    AppComponent,
    StoryComponent,
    SafePipe,
    TopStoriesComponent,
    SidebarComponent,
    NewStoriesComponent,
    BestStoriesComponent,
    AskStoriesComponent,
    ShowStoriesComponent,
    JobStoriesComponent,
    StoryListComponent,
    DiscussionComponent,
    CommentComponent,
    AppRouterOutletDirective,
    StoriesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TimeagoModule.forRoot(),
    InfiniteScrollModule
  ],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: CustomReuseStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
