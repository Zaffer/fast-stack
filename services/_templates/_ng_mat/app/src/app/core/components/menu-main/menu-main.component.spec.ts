import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuMainComponent } from './menu-main.component';

describe('MenuComponent', () => {
  let component: MenuMainComponent;
  let fixture: ComponentFixture<MenuMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuMainComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MenuMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
