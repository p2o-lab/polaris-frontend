import { async, ComponentFixture, TestBed } from '@angular/core/testing';


import {HttpClientModule} from '@angular/common/http';
import {Store, StoreModule} from '@ngrx/store';
import {metaReducers, reducers} from '../../../reducers';
import { MaterialModule } from '../../../../material/material.module';
import {ServicelauncherButtonComponent} from './servicelauncher-button.component';

describe('ServicelauncherButtonComponent', () => {
    let component: ServicelauncherButtonComponent;
    let fixture: ComponentFixture<ServicelauncherButtonComponent>;
    let store;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ ServicelauncherButtonComponent ],
            imports: [
                HttpClientModule,
                StoreModule.forRoot(reducers, { metaReducers }),
                MaterialModule
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ServicelauncherButtonComponent);
        component = fixture.componentInstance;
        store = store = fixture.debugElement.injector.get(Store);

        fixture.detectChanges();
    });

    // TODO bugfix
    xit('should create', () => {
        expect(component).toBeTruthy();
    });
    xit('expect store to be defined', async(() => {
        expect(store).toBeTruthy();
    }));
});
