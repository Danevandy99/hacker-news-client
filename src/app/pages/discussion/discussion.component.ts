import { RoutingHistoryService } from '../../shared/service/routing-history.service';
import { Observable } from 'rxjs';
import { ApplicationRef, ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Event, Router, RoutesRecognized, NavigationEnd } from '@angular/router';
import { filter, first, map, pairwise, take, tap } from 'rxjs/operators';
import { Story } from '../../shared/models/story';
import { Location } from '@angular/common';

@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.scss'],
  host: {
    class:'flex-1'
  }
})
export class DiscussionComponent implements OnInit {
  discussionId: number;
  story: Story;
  previousPage: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private routeHistory: RoutingHistoryService,
    public location: Location
  ) {
  }

  ngOnInit(): void {
    this.previousPage = this.routeHistory.getPreviousUrl();

    this.route.params
      .subscribe((params: { id: number }) => {
        this.discussionId = +params.id;
      });
    this.route.queryParams
      .subscribe((params: { story: string }) => {
        this.story = JSON.parse(params.story) as Story;
      });
  }

  ngOnChanges() {

  }

}
