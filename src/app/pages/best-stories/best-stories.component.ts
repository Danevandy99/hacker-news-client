import { Component, OnInit } from '@angular/core';
import { HackerNewsApiService } from '../../shared/service/hacker-news-api.service';

@Component({
  selector: 'app-best-stories',
  templateUrl: './best-stories.component.html',
  styleUrls: ['./best-stories.component.scss'],
  host: {
    class:'flex-1'
  }
})
export class BestStoriesComponent implements OnInit {

  storyIds$ = this.hackerNewsAPI.getBestStoriesIds();
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