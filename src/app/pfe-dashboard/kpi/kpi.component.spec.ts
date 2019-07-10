import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { KpiComponent } from './kpi.component';
import { reducers, metaReducers } from '../../reducers';
import { HttpClientModule } from '@angular/common/http';

describe('KpiComponent', () => {
  let component: KpiComponent;
  let fixture: ComponentFixture<KpiComponent>;
  let store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ KpiComponent ],
      imports: [
          HttpClientModule,
          StoreModule.forRoot(reducers, { metaReducers })
      ]
    })
    .compileComponents();
  });

  beforeEach( async(() => {
    fixture = TestBed.createComponent(KpiComponent);
    component = fixture.componentInstance;
    store = fixture.debugElement.injector.get(Store);

    fixture.detectChanges();
  }));

  it('should create', async(() => {
    expect(component).toBeTruthy();
  }));

  it('expect store to be defined', async(() => {
    expect(store).toBeTruthy();
  }));

  it('should create datasets correctly', async(() => {
    const node = { kpi: [1, 2, 3, 4, 5]};
    const label = 'test';
    const borderColors = ['#123456', '#abcdef'];

    const dataset = component.createNewDataset(node, label, borderColors);

    expect(dataset.label).toBe(label);
    expect(dataset.data).toBe(node);
    expect(dataset.borderColor).toBe(borderColors);

  }));
});
