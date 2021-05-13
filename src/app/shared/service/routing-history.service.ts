import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoutingHistoryService {
  private history = [];

  constructor(
    private router: Router
    ) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.history = [...this.history, event.urlAfterRedirects];
      });
  }

  public getHistory(): string[]
  {
    return this.history;
  }

  public getPreviousUrl(): string
  {
    console.log(this.history[this.history.length - 2] || '/');
    return this.history[this.history.length - 2] || '/';
  }
}
