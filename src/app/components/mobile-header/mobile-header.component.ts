import { Component, OnInit } from '@angular/core';
import { DarkModeService } from 'src/app/shared/service/dark-mode.service';

@Component({
  selector: 'app-mobile-header',
  templateUrl: './mobile-header.component.html',
  styleUrls: ['./mobile-header.component.scss']
})
export class MobileHeaderComponent implements OnInit {

  constructor(
    public darkMode: DarkModeService
  ) { }

  ngOnInit(): void {
  }

}
