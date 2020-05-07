import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularLazyComponentComponent } from './angular-lazy-component.component';

describe('AngularLazyComponentComponent', () => {
  let component: AngularLazyComponentComponent;
  let fixture: ComponentFixture<AngularLazyComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularLazyComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularLazyComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
