import { Router } from '@angular/router';
import { environment } from './../../../environments/environment';
import { DarkModeService } from './../../shared/service/dark-mode.service';
import { HttpClient } from '@angular/common/http';
import { HackerNewsApiService } from './../../shared/service/hacker-news-api.service';
import { Component, Input, OnInit } from '@angular/core';
import { Story } from 'src/app/shared/models/story';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class StoryComponent implements OnInit {
  @Input() storyId: number;
  @Input() story: Story;
  @Input() showText: boolean = false;
  blankImage = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";

  constructor(
    private hackerNewsAPI: HackerNewsApiService,
    private http: HttpClient,
    public darkMode: DarkModeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.storyId && !this.story) {
      this.hackerNewsAPI.getStory(this.storyId)
        .subscribe(async story => {
          this.story = story;
          if (this.story && this.story.url && this.story.title) {
            const image = await this.getURLMetadata(this.story.url, this.story.title);
            this.story = {
              ...this.story,
              metadata: {
                image,
                logo: `https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${this.story.url}&size=64`,
              },
              hostname: new URL(this.story.url).hostname
            };
          } else if (this.story) {
            this.story.metadata = { image: "./favicon.ico" };
          }
        });
    }
  }

  goToURL(story: Story) {
    if (story.url) {
      window.open(story.url);
    } else {
      this.router.navigate(['/discussion', story.id], { queryParams: { story: JSON.stringify(story) }});
    }
  }

  async getURLMetadata(url: string, title: string): Promise<string> {
    const baseUrl = environment.production ? "https://hacker-news-og-scraper.azurewebsites.net/api/og_scraper/" : "http://localhost:7071/api/og_scraper/";
    return (await this.http.get<{ image: string }>(baseUrl + "?url=" + url + "&title=" + title).toPromise()).image;
  }
}
