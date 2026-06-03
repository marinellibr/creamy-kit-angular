import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BrandService } from './brand.service';

describe('BrandService', () => {
  let service: BrandService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BrandService]
    });
    service = TestBed.inject(BrandService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should build correct square URL', (done) => {
    service.getBrandSvg('visa', 'square', 'medium').subscribe();

    const req = httpMock.expectOne(
      'https://raw.githubusercontent.com/marinellibr/creamy-kit-resources/main/brands/visa_square_medium.svg'
    );
    expect(req.request.method).toBe('GET');
    req.flush('<svg></svg>');
    done();
  });

  it('should build correct horizontal URL', (done) => {
    service.getBrandSvg('mastercard', 'horizontal', 'large').subscribe();

    const req = httpMock.expectOne(
      'https://raw.githubusercontent.com/marinellibr/creamy-kit-resources/main/brands/mastercard_horizontal_large.svg'
    );
    expect(req.request.method).toBe('GET');
    req.flush('<svg></svg>');
    done();
  });

  it('should build correct cardholder URL', (done) => {
    service.getBrandSvg('amex', 'cardholder').subscribe();

    const req = httpMock.expectOne(
      'https://raw.githubusercontent.com/marinellibr/creamy-kit-resources/main/brands/amex_cardholder.svg'
    );
    expect(req.request.method).toBe('GET');
    req.flush('<svg></svg>');
    done();
  });

  it('should default to medium size when not specified', (done) => {
    service.getBrandSvg('elo', 'square').subscribe();

    const req = httpMock.expectOne(
      'https://raw.githubusercontent.com/marinellibr/creamy-kit-resources/main/brands/elo_square_medium.svg'
    );
    expect(req.request.method).toBe('GET');
    req.flush('<svg></svg>');
    done();
  });

  it('should handle brand names with spaces', (done) => {
    service.getBrandSvg('american express', 'square', 'small').subscribe();

    const req = httpMock.expectOne(
      'https://raw.githubusercontent.com/marinellibr/creamy-kit-resources/main/brands/american_express_square_small.svg'
    );
    expect(req.request.method).toBe('GET');
    req.flush('<svg></svg>');
    done();
  });
});
