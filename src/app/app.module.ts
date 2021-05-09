import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { StoryComponent } from './components/story/story.component';
import { SafePipe } from './shared/pipes/safe.pipe';
import { TimeagoModule } from 'ngx-timeago';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { TopStoriesComponent } from './top-stories/top-stories.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NewStoriesComponent } from './new-stories/new-stories.component';
import { BestStoriesComponent } from './best-stories/best-stories.component';
import { AskStoriesComponent } from './ask-stories/ask-stories.component';
import { ShowStoriesComponent } from './show-stories/show-stories.component';
import { JobStoriesComponent } from './job-stories/job-stories.component';
import { StoryListComponent } from './components/story-list/story-list.component';


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
    StoryListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TimeagoModule.forRoot(),
    InfiniteScrollModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
