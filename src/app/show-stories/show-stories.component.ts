import { Component, OnInit } from '@angular/core';
import { HackerNewsApiService } from '../shared/service/hacker-news-api.service';

@Component({
  selector: 'app-show-stories',
  templateUrl: './show-stories.component.html',
  styleUrls: ['./show-stories.component.scss'],
  host: {
    class:'flex-1'
  }
})
export class ShowStoriesComponent implements OnInit {

  storyIds$ = this.hackerNewsAPI.getShowStoriesIds();

  constructor(
    private hackerNewsAPI: HackerNewsApiService
  ) {
  }

  ngOnInit(): void {
  }

}
