import { environment } from './../../../environments/environment';
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
  @Input() story: Story;
  blankImage = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";

  constructor(
    private hackerNewsAPI: HackerNewsApiService,
    private http: HttpClient,
    public darkMode: DarkModeService
  ) { }

  ngOnInit(): void {
    if (this.storyId && !this.story) {
      this.hackerNewsAPI.getStory(this.storyId)
        .subscribe(async story => {
          this.story = story;
          if (this.story && this.story.url && this.story.title) {
            const metadata = await this.getURLMetadata(this.story.url, this.story.title);
            this.story = {
              ...this.story,
              ...metadata,
              hostname: new URL(this.story.url).hostname
            };
          } else if (this.story) {
            this.story.image = "https://jayclouse.com/wp-content/uploads/2019/06/hacker_news-1000x525-1.jpg";
          }
        });
    }
  }

  async getURLMetadata(url: string, title: string): Promise<{ image: string, publisher: string, logo: string }> {
    const baseUrl = environment.production ? "http://arcane-forest-01377.herokuapp.com/" : "http://localhost/";
    return await this.http.get<{ image: string, publisher: string, logo: string }>(baseUrl + "get-metadata?url=" + url + "&title=" + title).toPromise();
  }
}
