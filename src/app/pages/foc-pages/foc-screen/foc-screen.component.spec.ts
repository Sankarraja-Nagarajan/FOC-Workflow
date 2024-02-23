import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FOCScreenComponent } from './foc-screen.component';

describe('FOCScreenComponent', () => {
  let component: FOCScreenComponent;
  let fixture: ComponentFixture<FOCScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FOCScreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FOCScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
