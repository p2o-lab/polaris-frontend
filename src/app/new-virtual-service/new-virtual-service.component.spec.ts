import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewVirtualServiceComponent } from './new-virtual-service.component';

describe('NewVirtualServiceComponent', () => {
  let component: NewVirtualServiceComponent;
  let fixture: ComponentFixture<NewVirtualServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewVirtualServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewVirtualServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
