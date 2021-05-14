import { ActivatedRoute } from '@angular/router';
import { NgCacheRouteReuseModule, NgCacheRouteReuseService } from 'ng-cache-route-reuse';
import { HackerNewsApiService } from './../../shared/service/hacker-news-api.service';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { mergeMap, map } from 'rxjs/operators';
import { Meta, Title } from '@angular/platform-browser';


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
    private cacheRouteReuseService: NgCacheRouteReuseService,
    private titleService: Title,
    private metaTagService: Meta
  ) { }

  ngOnInit(): void {
    this.route.params
      .pipe(
        mergeMap((params: { category: string }) => {
          switch (params.category) {
            case "new":
              this.titleService.setTitle("Hacker News - New Stories");
              return this.hnAPI.getNewStoriesIds();
            case "best":
              this.titleService.setTitle("Hacker News - Best Stories");
              return this.hnAPI.getBestStoriesIds();
            case "ask":
              this.titleService.setTitle("Hacker News - Ask Stories");
              return this.hnAPI.getAskStoriesIds();
            case "show":
              this.titleService.setTitle("Hacker News - Show Stories");
              return this.hnAPI.getShowStoriesIds();
            case "job":
              this.titleService.setTitle("Hacker News - Job Stories");
              return this.hnAPI.getJobStoriesIds();
            case "top":
            default:
              this.titleService.setTitle("Hacker News - Top Stories");
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
