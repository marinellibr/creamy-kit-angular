import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadcrumbComponent, BreadcrumbItemClick } from './breadcrumb.component';

describe('BreadcrumbComponent', () => {
  let component: BreadcrumbComponent;
  let fixture: ComponentFixture<BreadcrumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreadcrumbComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('items computed', () => {
    it('splits path into segments', () => {
      fixture.componentRef.setInput('path', 'Início/Produtos/Tênis');
      fixture.detectChanges();
      const items = (component as unknown as { items: () => string[] }).items();
      expect(items).toEqual(['Início', 'Produtos', 'Tênis']);
    });

    it('filters out empty segments', () => {
      fixture.componentRef.setInput('path', '/Início//Produtos/');
      fixture.detectChanges();
      const items = (component as unknown as { items: () => string[] }).items();
      expect(items).toEqual(['Início', 'Produtos']);
    });

    it('trims whitespace from segments', () => {
      fixture.componentRef.setInput('path', ' Início / Produtos ');
      fixture.detectChanges();
      const items = (component as unknown as { items: () => string[] }).items();
      expect(items).toEqual(['Início', 'Produtos']);
    });

    it('returns empty array for empty path', () => {
      fixture.componentRef.setInput('path', '');
      fixture.detectChanges();
      const items = (component as unknown as { items: () => string[] }).items();
      expect(items).toEqual([]);
    });
  });

  describe('template rendering', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('path', 'Início/Produtos/Tênis');
      fixture.detectChanges();
    });

    it('renders a button for each breadcrumb item', () => {
      const buttons: NodeListOf<HTMLButtonElement> =
        fixture.nativeElement.querySelectorAll('button.breadcrumb__item');
      expect(buttons.length).toBe(3);
    });

    it('renders item labels in buttons', () => {
      const buttons: NodeListOf<HTMLButtonElement> =
        fixture.nativeElement.querySelectorAll('button.breadcrumb__item');
      expect(buttons[0].textContent?.trim()).toBe('Início');
      expect(buttons[1].textContent?.trim()).toBe('Produtos');
      expect(buttons[2].textContent?.trim()).toBe('Tênis');
    });

    it('renders separators between items', () => {
      const seps: NodeListOf<HTMLElement> =
        fixture.nativeElement.querySelectorAll('.breadcrumb__sep');
      expect(seps.length).toBe(2);
    });
  });

  describe('onItemClick', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('path', 'Início/Produtos/Tênis');
      fixture.detectChanges();
    });

    it('emits correct event when clicking index 1', () => {
      let emitted: BreadcrumbItemClick | undefined;
      component.itemClick.subscribe((e) => (emitted = e));

      (component as unknown as { onItemClick: (i: number) => void }).onItemClick(1);

      expect(emitted).toEqual({
        index: 1,
        label: 'Produtos',
        path: 'Início/Produtos',
      });
    });

    it('emits correct event when clicking index 0', () => {
      let emitted: BreadcrumbItemClick | undefined;
      component.itemClick.subscribe((e) => (emitted = e));

      (component as unknown as { onItemClick: (i: number) => void }).onItemClick(0);

      expect(emitted).toEqual({
        index: 0,
        label: 'Início',
        path: 'Início',
      });
    });

    it('emits itemClick when a button is clicked', () => {
      let emitted: BreadcrumbItemClick | undefined;
      component.itemClick.subscribe((e) => (emitted = e));

      const buttons: NodeListOf<HTMLButtonElement> =
        fixture.nativeElement.querySelectorAll('button.breadcrumb__item');
      buttons[1].click();
      fixture.detectChanges();

      expect(emitted).toBeDefined();
      expect(emitted!.label).toBe('Produtos');
    });
  });
});
