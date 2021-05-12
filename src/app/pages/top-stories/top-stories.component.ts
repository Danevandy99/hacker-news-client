import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HackerNewsApiService } from '../../shared/service/hacker-news-api.service';

@Component({
  selector: 'app-top-stories',
  templateUrl: './top-stories.component.html',
  styleUrls: ['./top-stories.component.scss'],
  host: {
    class:'flex-1'
  }
})
export class TopStoriesComponent implements OnInit {
  storyIds$: Observable<number[]> = this.hackerNewsAPI.getTopStoriesIds();
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
