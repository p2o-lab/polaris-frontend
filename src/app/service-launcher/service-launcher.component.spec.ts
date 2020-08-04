import {DragDropModule} from '@angular/cdk/drag-drop';
import {HttpClientModule } from '@angular/common/http';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MatOption} from '@angular/material/core';
import {MatDivider} from '@angular/material/divider';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatSelect} from '@angular/material/select';
import {MatTabGroup} from '@angular/material/tabs';
import {ServiceLauncherComponent} from './service-launcher.component';
import {ServiceSettingsComponent} from './service-settings/service-settings.component';
import {ServicelauncherButtonComponent} from './servicelauncher-button/servicelauncher-button.component';

describe('ServiceLauncherComponent', () => {
    let component: ServiceLauncherComponent ;
    let fixture: ComponentFixture<ServiceLauncherComponent >;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ ServiceLauncherComponent, ServicelauncherButtonComponent, ServiceSettingsComponent,
                MatFormField, MatSelect, MatOption, MatDivider, MatLabel, MatTabGroup],
            imports: [
                HttpClientModule,
                DragDropModule,
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ServiceLauncherComponent );
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    xit('should create', () => {
        expect(component).toBeTruthy();
    });
});
