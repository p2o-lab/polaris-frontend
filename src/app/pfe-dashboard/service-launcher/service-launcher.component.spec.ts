import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarComponent } from '../ui/sidebar/sidebar.component';
import { HttpClientModule } from '@angular/common/http';
import { Store, StoreModule } from '@ngrx/store';
import { metaReducers, reducers } from '../../reducers';
import { MaterialModule } from '../../../material/material.module';
import { ServiceLauncherComponent } from './service-launcher.component';
import { ServicelauncherButtonComponent} from './servicelauncher-button/servicelauncher-button.component';
import { ServiceSettingsComponent} from './service-settings/service-settings.component';
import { KeysPipe } from '../../pipes/key.pipe';
import { DragDropModule} from '@angular/cdk/drag-drop';
import { MatDivider, MatFormField, MatLabel, MatOption, MatSelect, MatSlider, MatTabGroup } from '@angular/material';

describe('ServiceLauncherComponent', () => {
    let component: ServiceLauncherComponent ;
    let fixture: ComponentFixture<ServiceLauncherComponent >;
    let store;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ ServiceLauncherComponent, ServicelauncherButtonComponent, ServiceSettingsComponent,
                KeysPipe, MatFormField, MatSelect, MatOption, MatDivider, MatLabel, MatTabGroup],
            imports: [
                HttpClientModule,
                StoreModule.forRoot(reducers, { metaReducers }),
                DragDropModule,
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ServiceLauncherComponent );
        component = fixture.componentInstance;
        store = store = fixture.debugElement.injector.get(Store);

        fixture.detectChanges();
    });

    // TODO fix tests with mockup values
    xit('should create', () => {
        expect(component).toBeTruthy();
    });
    xit('expect store to be defined', async(() => {
        expect(store).toBeTruthy();
    }));
});
