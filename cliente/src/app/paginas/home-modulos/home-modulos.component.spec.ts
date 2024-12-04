import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeModulosComponent } from './home-modulos.component';

describe('HomeModulosComponent', () => {
  let component: HomeModulosComponent;
  let fixture: ComponentFixture<HomeModulosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeModulosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeModulosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
