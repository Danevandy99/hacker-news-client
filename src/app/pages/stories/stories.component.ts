import { HackerNewsApiService } from './../../shared/service/hacker-news-api.service';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss'],
  host: {
    class: 'flex-1'
  }
})
export class StoriesComponent implements OnInit {

  storyIds: number[];
  detached: boolean = false;
  sliceSize = 10;

  constructor(
    private hnAPI: HackerNewsApiService
  ) {
    this.hnAPI.getTopStoriesIds().subscribe(ids => this.storyIds = ids);
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.storyIds) {
      this.sliceSize = 10;
    }
  }

  onAttach() {
    this.detached = false;
  }

  onDetach() {
    this.detached = true;
  }

  onScroll() {
    if (this.sliceSize < this.storyIds.length && !this.detached) this.sliceSize += 10;
  }

}
