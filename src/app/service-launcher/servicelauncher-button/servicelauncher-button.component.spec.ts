import { async, ComponentFixture, TestBed } from '@angular/core/testing';


import {HttpClientModule} from '@angular/common/http';
import {metaReducers, reducers} from '../../../reducers';
import { MaterialModule } from '../../../../material/material.module';
import {ServicelauncherButtonComponent} from './servicelauncher-button.component';

describe('ServicelauncherButtonComponent', () => {
    let component: ServicelauncherButtonComponent;
    let fixture: ComponentFixture<ServicelauncherButtonComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ ServicelauncherButtonComponent ],
            imports: [
                HttpClientModule,
                MaterialModule
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ServicelauncherButtonComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    // TODO bugfix
    xit('should create', () => {
        expect(component).toBeTruthy();
    });
});
