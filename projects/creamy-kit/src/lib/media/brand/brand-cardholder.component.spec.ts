import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrandCardholderComponent } from './brand-cardholder.component';
import { provideCreamyKitResources } from '../../core/resources';

describe('BrandCardholderComponent', () => {
  let fixture: ComponentFixture<BrandCardholderComponent>;
  let component: BrandCardholderComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrandCardholderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BrandCardholderComponent);
    component = fixture.componentInstance;
  });

  it('cria o componente', () => {
    fixture.componentRef.setInput('brandName', 'visa');
    expect(component).toBeTruthy();
  });

  it('monta a URL cardholder (sem variação de tamanho)', () => {
    fixture.componentRef.setInput('brandName', 'visa');
    expect(component.brandUrl()).toContain('/visa_cardholder.svg');
  });

  it('slugifica nomes com espaços', () => {
    fixture.componentRef.setInput('brandName', 'Banco Inter');
    expect(component.brandUrl()).toContain('/banco_inter_cardholder.svg');
  });

  it('usa a base URL configurada via provideCreamyKitResources', async () => {
    TestBed.resetTestingModule();
    await TestBed.configureTestingModule({
      imports: [BrandCardholderComponent],
      providers: [provideCreamyKitResources({ brandsBaseUrl: '/cdn/brands' })],
    }).compileComponents();

    const f = TestBed.createComponent(BrandCardholderComponent);
    f.componentRef.setInput('brandName', 'visa');
    expect(f.componentInstance.brandUrl()).toBe('/cdn/brands/visa_cardholder.svg');
  });
});
