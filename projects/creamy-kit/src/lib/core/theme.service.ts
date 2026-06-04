import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private static initialized = false;

  constructor() {
    this.injectTheme();
  }

  private injectTheme(): void {
    if (ThemeService.initialized) {
      return;
    }

    if (document.getElementById('creamy-theme')) {
      ThemeService.initialized = true;
      return;
    }

    const style = document.createElement('style');
    style.id = 'creamy-theme';

    style.textContent = `
      :root {
        --primary-base: #128cfe;
        --primary-variant: #00bfff;
        --primary-contrast: #f9f9fa;

        --secondary-base: #ed339c;
        --secondary-variant: #022f5e;

        --background-base: #f9f9fa;
        --background-variant: #f2f2f4;
        --background-variant-2: #e8e8ea;
        --background-primary: #128cfe;
        --background-secondary: #00bfff;

        --white: #ffffff;
        --black: #000000;

        --neutral-base: #484848;
        --neutral-variant: #000000;

        --disabled-base: #d2d2d2;
        --disabled-variant: #7a7a7a;

        --feedbacks-information: #054d99;

        --feedbacks-success: #8ed1a0;
        --feedbacks-success-variant: #6eaa7f;
        --feedbacks-success-variant-2: #42704f;
        --feedbacks-success-contrast: #ffffff;

        --feedbacks-error: #da270f;
        --feedbacks-error-contrast: #ffffff;

        --feedbacks-alert: #fbd3af;
        --feedbacks-alert-variant: #f58122;
        --feedbacks-alert-variant-2: #ca5f08;
        --feedbacks-alert-contrast: #2b2b2b;

        --feedbacks-neutral: #a6a6a6;
        --feedbacks-neutral-contrast: #ffffff;

        --feedbacks-contrast: #f9f9fa;

        --text-heading: #2b2b2b;
        --text-heading-2: #484848;
        --text-body: #000000;
        --text-body-2: #7a7a7a;
        --text-highlight: #022f5e;
        --text-link: #054d99;

        --border-soft: #e8e8ea;
        --border-medium: #d2d2d2;
        --border-strong: #a6a6a6;
      }
    `;

    document.head.appendChild(style);

    ThemeService.initialized = true;
  }
}
