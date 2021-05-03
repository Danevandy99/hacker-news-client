import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Story } from '../models/story';

@Injectable({
  providedIn: 'root'
})
export class HackerNewsApiService {

  baseUrl = "https://hacker-news.firebaseio.com/v0/";

  constructor(
    private http: HttpClient
  ) { }

  getTopStoriesIds(page: number, pageSize: number): Observable<number[]> {
    return this.http.get<number[]>(this.baseUrl + "topstories.json").pipe(delay(2000));
  }

  getStory(storyId: number): Observable<Story> {
    return this.http.get<Story>(this.baseUrl + "/item/" + storyId + ".json");
  }
}
