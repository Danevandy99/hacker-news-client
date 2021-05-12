import { Component, OnInit } from '@angular/core';
import { HackerNewsApiService } from '../../shared/service/hacker-news-api.service';

@Component({
  selector: 'app-ask-stories',
  templateUrl: './ask-stories.component.html',
  styleUrls: ['./ask-stories.component.scss'],
  host: {
    class:'flex-1'
  }
})
export class AskStoriesComponent implements OnInit {

  storyIds$ = this.hackerNewsAPI.getAskStoriesIds();
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
