import { HackerNewsApiService } from './../../shared/service/hacker-news-api.service';
import { Observable } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { Story } from 'src/app/shared/models/story';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class StoryComponent implements OnInit {
  @Input() storyId: number;
  story$: Observable<Story>

  constructor(
    private hackerNewsAPI: HackerNewsApiService
  ) { }

  ngOnInit(): void {
    this.story$ = this.hackerNewsAPI.getStory(this.storyId);
  }

}
