import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrandHorizontalComponent } from './brand-horizontal.component';
import { provideCreamyKitResources } from '../../core/resources';

describe('BrandHorizontalComponent', () => {
  let fixture: ComponentFixture<BrandHorizontalComponent>;
  let component: BrandHorizontalComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrandHorizontalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BrandHorizontalComponent);
    component = fixture.componentInstance;
  });

  it('cria o componente', () => {
    fixture.componentRef.setInput('brandName', 'visa');
    expect(component).toBeTruthy();
  });

  it('monta a URL horizontal com o tamanho default (medium)', () => {
    fixture.componentRef.setInput('brandName', 'visa');
    expect(component.brandUrl()).toContain('/visa_horizontal_medium.svg');
  });

  it('reflete o size no nome do arquivo', () => {
    fixture.componentRef.setInput('brandName', 'visa');
    fixture.componentRef.setInput('size', 'small');
    expect(component.brandUrl()).toContain('/visa_horizontal_small.svg');
  });

  it('usa a base URL configurada via provideCreamyKitResources', async () => {
    TestBed.resetTestingModule();
    await TestBed.configureTestingModule({
      imports: [BrandHorizontalComponent],
      providers: [provideCreamyKitResources({ brandsBaseUrl: '/cdn/brands' })],
    }).compileComponents();

    const f = TestBed.createComponent(BrandHorizontalComponent);
    f.componentRef.setInput('brandName', 'visa');
    expect(f.componentInstance.brandUrl()).toBe('/cdn/brands/visa_horizontal_medium.svg');
  });
});
