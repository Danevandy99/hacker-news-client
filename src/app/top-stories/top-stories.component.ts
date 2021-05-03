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
  storyIds$: Observable<number[]>;

  constructor(
    private hackerNewsAPI: HackerNewsApiService
  ) {
    this.storyIds$ = this.hackerNewsAPI.getTopStoriesIds(0, 25);
  }

  ngOnInit(): void {
  }

}
