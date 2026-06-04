import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrandSquareComponent } from './brand-square.component';
import { provideCreamyKitResources } from '../../core/resources';

describe('BrandSquareComponent', () => {
  let fixture: ComponentFixture<BrandSquareComponent>;
  let component: BrandSquareComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrandSquareComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BrandSquareComponent);
    component = fixture.componentInstance;
  });

  it('cria o componente', () => {
    fixture.componentRef.setInput('brandName', 'visa');
    expect(component).toBeTruthy();
  });

  it('monta a URL square com o tamanho default (medium)', () => {
    fixture.componentRef.setInput('brandName', 'visa');
    expect(component.brandUrl()).toContain('/visa_square_medium.svg');
  });

  it('reflete o size no nome do arquivo', () => {
    fixture.componentRef.setInput('brandName', 'visa');
    fixture.componentRef.setInput('size', 'large');
    expect(component.brandUrl()).toContain('/visa_square_large.svg');
  });

  it('slugifica nomes com espaços', () => {
    fixture.componentRef.setInput('brandName', 'Banco Inter');
    expect(component.brandUrl()).toContain('/banco_inter_square_medium.svg');
  });

  it('usa a base URL configurada via provideCreamyKitResources', async () => {
    TestBed.resetTestingModule();
    await TestBed.configureTestingModule({
      imports: [BrandSquareComponent],
      providers: [provideCreamyKitResources({ brandsBaseUrl: '/assets/brands' })],
    }).compileComponents();

    const f = TestBed.createComponent(BrandSquareComponent);
    f.componentRef.setInput('brandName', 'visa');
    expect(f.componentInstance.brandUrl()).toBe('/assets/brands/visa_square_medium.svg');
  });
});
