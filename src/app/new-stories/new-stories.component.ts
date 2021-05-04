import { Component, OnInit } from '@angular/core';
import { HackerNewsApiService } from '../shared/service/hacker-news-api.service';

@Component({
  selector: 'app-new-stories',
  templateUrl: './new-stories.component.html',
  styleUrls: ['./new-stories.component.scss'],
  host: {
    class:'flex-1'
  }
})
export class NewStoriesComponent implements OnInit {

  storyIds$ = this.hackerNewsAPI.getNewStoriesIds();

  constructor(
    private hackerNewsAPI: HackerNewsApiService
  ) {
  }

  ngOnInit(): void {
  }

}
