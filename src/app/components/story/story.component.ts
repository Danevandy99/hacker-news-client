import { DarkModeService } from './../../shared/service/dark-mode.service';
import { HttpClient } from '@angular/common/http';
import { HackerNewsApiService } from './../../shared/service/hacker-news-api.service';
import { Observable } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { Story } from 'src/app/shared/models/story';
import { map, publishReplay, refCount, share, shareReplay, tap } from 'rxjs/operators';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class StoryComponent implements OnInit {
  @Input() storyId: number;
  story: Story;
  blankImage = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";

  constructor(
    private hackerNewsAPI: HackerNewsApiService,
    private http: HttpClient,
    public darkMode: DarkModeService
  ) { }

  ngOnInit(): void {
    if (this.storyId) {
      this.hackerNewsAPI.getStory(this.storyId)
        .subscribe(async story => {
          this.story = story;
          this.story.image = await this.getURLImage(this.story.url, this.story.title);
        });
    }
  }

  async getURLImage(url: string, title: string): Promise<string> {
    return await this.http.get<string>("http://localhost:3000/?url=" + url + "&title=" + title).toPromise();
  }
}
