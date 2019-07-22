import { DragDropModule} from '@angular/cdk/drag-drop';
import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDivider, MatFormField, MatLabel, MatOption, MatSelect, MatSlider, MatTabGroup } from '@angular/material';
import { ServiceLauncherComponent } from './service-launcher.component';
import { ServiceSettingsComponent} from './service-settings/service-settings.component';
import { ServicelauncherButtonComponent} from './servicelauncher-button/servicelauncher-button.component';

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

    // TODO fix tests with mockup values
    xit('should create', () => {
        expect(component).toBeTruthy();
    });
});
