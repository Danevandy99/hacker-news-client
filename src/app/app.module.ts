import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { StoryComponent } from './components/story/story.component';
import { SafePipe } from './shared/pipes/safe.pipe';
import { TimeagoModule } from 'ngx-timeago';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { StoryListComponent } from './components/story-list/story-list.component';
import { DiscussionComponent } from './pages/discussion/discussion.component';
import { CommentComponent } from './components/comment/comment.component';
import { StoriesComponent } from './pages/stories/stories.component';
import { NgCacheRouteReuseModule } from 'ng-cache-route-reuse';

@NgModule({
  declarations: [
    AppComponent,
    StoryComponent,
    SafePipe,
    SidebarComponent,
    StoryListComponent,
    DiscussionComponent,
    CommentComponent,
    StoriesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TimeagoModule.forRoot(),
    InfiniteScrollModule,
    NgCacheRouteReuseModule
  ],
  providers: [
    // {
    //   provide: RouteReuseStrategy,
    //   useClass: CustomReuseStrategy
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
