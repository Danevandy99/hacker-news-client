import { Component, OnInit } from '@angular/core';
import { HackerNewsApiService } from '../../shared/service/hacker-news-api.service';

@Component({
  selector: 'app-job-stories',
  templateUrl: './job-stories.component.html',
  styleUrls: ['./job-stories.component.scss'],
  host: {
    class:'flex-1'
  }
})
export class JobStoriesComponent implements OnInit {

  storyIds$ = this.hackerNewsAPI.getJobStoriesIds();
  detached = false;

  constructor(
    private hackerNewsAPI: HackerNewsApiService
  ) {

  }

  onAttach() {
    this.detached = false;
  }

  onDetach() {
    this.detached = true;
  }

  ngOnInit(): void {
  }

}
