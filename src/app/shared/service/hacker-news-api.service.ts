import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Comment } from '../models/comment';
import { Story } from '../models/story';

@Injectable({
  providedIn: 'root'
})
export class HackerNewsApiService {

  baseUrl = "https://hacker-news.firebaseio.com/v0/";

  constructor(
    private http: HttpClient
  ) { }

  getTopStoriesIds(): Observable<number[]> {
    return this.http.get<number[]>(this.baseUrl + "topstories.json");
  }

  getNewStoriesIds(): Observable<number[]> {
    return this.http.get<number[]>(this.baseUrl + "newstories.json");
  }

  getBestStoriesIds(): Observable<number[]> {
    return this.http.get<number[]>(this.baseUrl + "beststories.json");
  }

  getAskStoriesIds(): Observable<number[]> {
    return this.http.get<number[]>(this.baseUrl + "askstories.json");
  }

  getShowStoriesIds(): Observable<number[]> {
    return this.http.get<number[]>(this.baseUrl + "showstories.json");
  }

  getJobStoriesIds(): Observable<number[]> {
    return this.http.get<number[]>(this.baseUrl + "jobstories.json");
  }

  getStory(storyId: number): Observable<Story> {
    return this.http.get<Story>(this.baseUrl + "/item/" + storyId + ".json");
  }

  getComment(commentId: number): Observable<Comment> {
    return this.http.get<Comment>(this.baseUrl + "/item/" + commentId + ".json");
  }
}
