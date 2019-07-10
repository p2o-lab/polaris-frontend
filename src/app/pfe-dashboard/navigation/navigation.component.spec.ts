import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { Store, StoreModule } from '@ngrx/store';
import { metaReducers, reducers } from '../../reducers';
import { MaterialModule } from '../../../material/material.module';
import { NavigationComponent } from './navigation.component';
import { NavbarComponent } from './navbar/navbar.component';
import {AppModule} from '../../app.module';
import {SubplantComponent} from './subplant/subplant.component';
import {ModuleComponent} from './module/module.component';
import {ShopfloorComponent} from './shopfloor/shopfloor.component';

describe('NavigationComponent', () => {
    let component: NavigationComponent;
    let fixture: ComponentFixture<NavigationComponent>;
    let store;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ NavigationComponent, NavbarComponent, SubplantComponent, ModuleComponent, ShopfloorComponent ],
            imports: [
                HttpClientModule,
                StoreModule.forRoot(reducers, { metaReducers }),
                MaterialModule,
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(NavigationComponent);
        component = fixture.componentInstance;
        store = store = fixture.debugElement.injector.get(Store);

        fixture.detectChanges();
    });

    // TODO bugfixing
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('expect store to be defined', async(() => {
        expect(store).toBeTruthy();
    }));
});
