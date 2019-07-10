import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { Store, StoreModule } from '@ngrx/store';
import { metaReducers, reducers } from '../../../reducers';
import { MaterialModule } from '../../../../material/material.module';
import { SubplantComponent } from './subplant.component';

describe('SubplantComponent', () => {
    let component: SubplantComponent;
    let fixture: ComponentFixture<SubplantComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ SubplantComponent ],
            imports: [
                HttpClientModule,
                StoreModule.forRoot(reducers, { metaReducers }),
                MaterialModule
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SubplantComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    // TODO bugfixing
       xit('should create', () => {
            expect(component).toBeTruthy();
        });
});
