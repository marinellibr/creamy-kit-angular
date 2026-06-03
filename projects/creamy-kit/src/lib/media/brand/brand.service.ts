import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

type BrandType = 'square' | 'horizontal' | 'cardholder';
type BrandSize = 'small' | 'medium' | 'large';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  private readonly BRANDS_BASE_URL = 'https://raw.githubusercontent.com/marinellibr/creamy-kit-resources/main/brands';

  constructor(private http: HttpClient) {}

  getBrandSvg(brandName: string, type: BrandType, size?: BrandSize): Observable<string> {
    const fileName = this.getBrandFileName(brandName, type, size);
    const url = `${this.BRANDS_BASE_URL}/${fileName}`;

    return this.http.get(url, { responseType: 'text' });
  }

  private getBrandFileName(brandName: string, type: BrandType, size?: BrandSize): string {
    const normalizedName = brandName.toLowerCase().replace(/\s+/g, '_');

    if (type === 'cardholder') {
      return `${normalizedName}_cardholder.svg`;
    }

    const sizeStr = size || 'medium';
    return `${normalizedName}_${type}_${sizeStr}.svg`;
  }
}
