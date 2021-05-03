import { DarkModeService } from './shared/service/dark-mode.service';
import { HackerNewsApiService } from './shared/service/hacker-news-api.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    public darkMode: DarkModeService
  ) {
  }

  ngOnInit() {
  }
}
