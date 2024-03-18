import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsComponent } from './apps.component';

describe('AppsComponent', () => {
  let component: AppsComponent;
  let fixture: ComponentFixture<AppsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppsComponent]
    });
    fixture = TestBed.createComponent(AppsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
