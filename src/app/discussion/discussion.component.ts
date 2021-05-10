import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Event, Router, RoutesRecognized, NavigationEnd } from '@angular/router';
import {Location} from '@angular/common';
import { filter, map, pairwise, tap } from 'rxjs/operators';

@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.scss']
})
export class DiscussionComponent implements OnInit {
  discussionId: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public location: Location
  ) {

  }

  get previousRoute$(): Observable<string> {
    return this.router.events.pipe(
      filter(e => e instanceof RoutesRecognized),
      pairwise(),
      map((e: [RoutesRecognized, RoutesRecognized]) => e[0].url),
      tap(url => console.log(url))
    );
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: { id: number }) => {
      this.discussionId = +params.id;
    });
  }

}
