import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrandHorizontalComponent } from './brand-horizontal.component';
import { BrandService } from './brand.service';
import { of, throwError } from 'rxjs';

describe('BrandHorizontalComponent', () => {
  let component: BrandHorizontalComponent;
  let fixture: ComponentFixture<BrandHorizontalComponent>;
  let brandService: jasmine.SpyObj<BrandService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('BrandService', ['getBrandSvg']);

    await TestBed.configureTestingModule({
      imports: [BrandHorizontalComponent],
      providers: [{ provide: BrandService, useValue: spy }]
    }).compileComponents();

    brandService = TestBed.inject(BrandService) as jasmine.SpyObj<BrandService>;
    fixture = TestBed.createComponent(BrandHorizontalComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load brand SVG on init', () => {
    const mockSvg = '<svg></svg>';
    brandService.getBrandSvg.and.returnValue(of(mockSvg));

    component.brandName = 'visa';
    fixture.detectChanges();

    expect(brandService.getBrandSvg).toHaveBeenCalledWith('visa', 'horizontal', 'medium');
    expect(component.isLoading).toBeFalsy();
  });

  it('should handle different sizes', () => {
    const mockSvg = '<svg></svg>';
    brandService.getBrandSvg.and.returnValue(of(mockSvg));

    component.brandName = 'visa';
    component.size = 'large';
    fixture.detectChanges();

    expect(brandService.getBrandSvg).toHaveBeenCalledWith('visa', 'horizontal', 'large');
  });

  it('should show error when brand name is missing', () => {
    component.brandName = '';
    fixture.detectChanges();

    expect(component.error).toBe('Brand name is required');
    expect(component.isLoading).toBeFalsy();
  });

  it('should handle load errors', () => {
    brandService.getBrandSvg.and.returnValue(throwError(() => new Error('Load failed')));

    component.brandName = 'invalid';
    fixture.detectChanges();

    expect(component.error).toContain('Failed to load brand');
    expect(component.isLoading).toBeFalsy();
  });
});
