import { RoutingHistoryService } from './../shared/service/routing-history.service';
import { Observable } from 'rxjs';
import { ApplicationRef, ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Event, Router, RoutesRecognized, NavigationEnd } from '@angular/router';
import { filter, first, map, pairwise, take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.scss']
})
export class DiscussionComponent implements OnInit {
  discussionId: number;
  previousPage: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private routeHistory: RoutingHistoryService
  ) {
  }

  ngOnInit(): void {
    this.previousPage = this.routeHistory.getPreviousUrl();
  }

  ngOnChanges() {

  }

}
