import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { Store, StoreModule } from '@ngrx/store';
import { metaReducers, reducers } from '../../../reducers';
import { MaterialModule } from '../../../../material/material.module';
import {NavbarComponent} from './navbar.component';

describe('NavbarComponent', () => {
    let component: NavbarComponent;
    let fixture: ComponentFixture<NavbarComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ NavbarComponent ],
            imports: [
                HttpClientModule,
                StoreModule.forRoot(reducers, { metaReducers }),
                MaterialModule
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(NavbarComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    // TODO bugfixing
        xit('should create', () => {
            expect(component).toBeTruthy();
        });
});
