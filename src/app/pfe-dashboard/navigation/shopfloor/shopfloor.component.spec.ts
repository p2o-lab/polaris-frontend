import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { Store, StoreModule } from '@ngrx/store';
import { metaReducers, reducers } from '../../../reducers';
import { MaterialModule } from '../../../../material/material.module';
import {ShopfloorComponent} from './shopfloor.component';

describe('ShopfloorComponent', () => {
    let component: ShopfloorComponent;
    let fixture: ComponentFixture<ShopfloorComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ ShopfloorComponent ],
            imports: [
                HttpClientModule,
                StoreModule.forRoot(reducers, { metaReducers }),
                MaterialModule
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ShopfloorComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    // TODO bugfixing
        xit('should create', () => {
            expect(component).toBeTruthy();
        });
});
