import { NgCacheRouteReuseModule, NgCacheRouteReuseService } from 'ng-cache-route-reuse';
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
  detached = false;
  sliceSize = 10;

  constructor(
    private hnAPI: HackerNewsApiService,
    private cacheRouteReuseService: NgCacheRouteReuseService
  ) { }

  ngOnInit(): void {
    this.hnAPI.getTopStoriesIds().subscribe(ids => this.storyIds = ids);

    this.cacheRouteReuseService
      .onAttach(StoriesComponent)
      .subscribe((component) => {
        this.detached = false;
      });

    this.cacheRouteReuseService
      .onDetach(StoriesComponent)
      .subscribe((component) => {
        this.detached = true;
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.storyIds) {
      this.sliceSize = 10;
    }
  }

  onScroll() {
    if (this.sliceSize < this.storyIds.length && !this.detached) this.sliceSize += 10;
  }

}
