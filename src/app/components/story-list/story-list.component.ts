import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { HackerNewsApiService } from 'src/app/shared/service/hacker-news-api.service';

@Component({
  selector: 'app-story-list',
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.scss']
})
export class StoryListComponent implements OnInit {

  @Input() storyIds: number[];
  sliceSize = 10;

  constructor(
  ) { }

  ngOnInit(): void {
  }

  onScroll() {
    if (this.sliceSize < this.storyIds.length) this.sliceSize += 10;
  }

}
