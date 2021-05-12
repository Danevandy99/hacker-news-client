import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestStoriesComponent } from './best-stories.component';

describe('BestStoriesComponent', () => {
  let component: BestStoriesComponent;
  let fixture: ComponentFixture<BestStoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BestStoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BestStoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
