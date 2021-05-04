import { Component, OnInit } from '@angular/core';
import { HackerNewsApiService } from '../shared/service/hacker-news-api.service';

@Component({
  selector: 'app-job-stories',
  templateUrl: './job-stories.component.html',
  styleUrls: ['./job-stories.component.scss'],
  host: {
    class:'flex-1'
  }
})
export class JobStoriesComponent implements OnInit {

  storyIds$ = this.hackerNewsAPI.getTopStoriesIds();

  constructor(
    private hackerNewsAPI: HackerNewsApiService
  ) {
  }

  ngOnInit(): void {
  }

}
