import { ActivatedRoute } from '@angular/router';
import { NgCacheRouteReuseModule, NgCacheRouteReuseService } from 'ng-cache-route-reuse';
import { HackerNewsApiService } from './../../shared/service/hacker-news-api.service';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { mergeMap } from 'rxjs/operators';

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
    private route: ActivatedRoute,
    private cacheRouteReuseService: NgCacheRouteReuseService
  ) { }

  ngOnInit(): void {
    this.route.params
      .pipe(
        mergeMap((params: { category: string }) => {
          switch (params.category) {
            case "new":
              return this.hnAPI.getNewStoriesIds();
            case "best":
              return this.hnAPI.getBestStoriesIds();
            case "ask":
              return this.hnAPI.getAskStoriesIds();
            case "show":
              return this.hnAPI.getShowStoriesIds();
            case "job":
              return this.hnAPI.getJobStoriesIds();
            case "top":
            default:
              return this.hnAPI.getTopStoriesIds();
          }
        })
      )
      .subscribe((ids: number[]) => this.storyIds = ids);

    this.cacheRouteReuseService
      .onAttach(StoriesComponent)
      .subscribe((component) => {
        this.detached = false;
        console.log("attaching")
      });

    this.cacheRouteReuseService
      .onDetach(StoriesComponent)
      .subscribe((component) => {
        this.detached = true;
        console.log("detaching")
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.storyIds) {
      this.sliceSize = 10;
    }
    console.log("changes");
  }

  onScroll() {
    if (this.sliceSize < this.storyIds.length && !this.detached) this.sliceSize += 10;
  }

}
