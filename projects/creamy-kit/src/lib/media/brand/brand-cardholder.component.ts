import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { BrandService } from './brand.service';

@Component({
  selector: 'creamy-brand-cardholder',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './brand-cardholder.component.html',
  styleUrl: './brand-cardholder.component.scss'
})
export class BrandCardholderComponent implements OnInit {
  @Input() brandName: string = '';

  svgContent: SafeHtml | null = null;
  isLoading = true;
  error: string | null = null;

  constructor(
    private brandService: BrandService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.loadBrandSvg();
  }

  ngOnChanges(): void {
    this.loadBrandSvg();
  }

  private loadBrandSvg(): void {
    if (!this.brandName) {
      this.error = 'Brand name is required';
      this.isLoading = false;
      return;
    }

    this.isLoading = true;
    this.error = null;

    this.brandService.getBrandSvg(this.brandName, 'cardholder').subscribe({
      next: (svg) => {
        this.svgContent = this.sanitizer.bypassSecurityTrustHtml(svg);
        this.isLoading = false;
      },
      error: () => {
        this.error = `Failed to load brand: ${this.brandName}`;
        this.isLoading = false;
      }
    });
  }
}
