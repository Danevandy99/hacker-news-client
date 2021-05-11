import { DarkModeService } from './../../shared/service/dark-mode.service';
import { HackerNewsApiService } from 'src/app/shared/service/hacker-news-api.service';
import { Component, Input, OnInit } from '@angular/core';
import { Comment } from 'src/app/shared/models/comment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() commentId: number;
  @Input() comment: Comment;

  constructor(
    private hnAPI: HackerNewsApiService,
    public darkMode: DarkModeService
  ) { }

  ngOnInit(): void {
    if (this.commentId && !this.comment) {
      this.hnAPI.getComment(this.commentId)
        .subscribe(comment => this.comment = comment);
    }
  }

}
