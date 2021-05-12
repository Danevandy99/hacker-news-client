import { Component, Input, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { HackerNewsApiService } from 'src/app/shared/service/hacker-news-api.service';

@Component({
  selector: 'app-story-list',
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.scss']
})
export class StoryListComponent implements OnInit, OnChanges {

  @Input() storyIds: number[];
  @Input() detached: boolean;
  sliceSize = 10;

  constructor(
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.storyIds) {
      this.sliceSize = 10;
    }
  }

  onScroll() {
    if (this.sliceSize < this.storyIds.length) this.sliceSize += 10;
  }

}
