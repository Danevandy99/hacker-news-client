import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HackerNewsApiService } from '../shared/service/hacker-news-api.service';

@Component({
  selector: 'app-top-stories',
  templateUrl: './top-stories.component.html',
  styleUrls: ['./top-stories.component.scss'],
  host: {
    class:'flex-1'
  }
})
export class TopStoriesComponent implements OnInit {
  storyIds$ = this.hackerNewsAPI.getTopStoriesIds();

  constructor(
    private hackerNewsAPI: HackerNewsApiService
  ) {
  }

  ngOnInit(): void {
  }

}
