import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { Store, StoreModule } from '@ngrx/store';
import { metaReducers, reducers } from '../../../reducers';
import { MaterialModule } from '../../../../material/material.module';
import {ModuleComponent} from './module.component';

describe('ModuleComponent', () => {
    let component: ModuleComponent;
    let fixture: ComponentFixture<ModuleComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ ModuleComponent ],
            imports: [
                HttpClientModule,
                StoreModule.forRoot(reducers, { metaReducers }),
                MaterialModule
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ModuleComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
