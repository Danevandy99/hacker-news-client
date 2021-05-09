import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Location} from '@angular/common';

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
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: { id: number }) => {
      this.discussionId = +params.id;
    })
  }

}
