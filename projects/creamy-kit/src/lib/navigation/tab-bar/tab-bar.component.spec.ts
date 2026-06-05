import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CREAMY_KIT_RESOURCES } from '../../core/resources';
import { TabBarComponent } from './tab-bar.component';
import { TabBarItemComponent } from './tab-bar-item.component';

const TEST_RESOURCES = {
  provide: CREAMY_KIT_RESOURCES,
  useValue: { iconsBaseUrl: '/test-icons', brandsBaseUrl: '/test-brands' },
};

@Component({
  template: `
    <creamy-kit-tab-bar>
      <creamy-kit-tab-bar-item icon="home_base" value="home" label="Home" />
      <creamy-kit-tab-bar-item icon="user_base" value="profile" label="Profile" />
    </creamy-kit-tab-bar>
  `,
  imports: [TabBarComponent, TabBarItemComponent],
  standalone: true,
})
class TestHostComponent {}

describe('TabBarComponent', () => {
  let hostFixture: ComponentFixture<TestHostComponent>;
  let tabBar: TabBarComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [TEST_RESOURCES],
    }).compileComponents();

    hostFixture = TestBed.createComponent(TestHostComponent);
    hostFixture.detectChanges();

    tabBar = hostFixture.debugElement.children[0].componentInstance as TabBarComponent;
  });

  it('should create', () => {
    expect(tabBar).toBeTruthy();
  });

  it('writeValue sets the value signal', () => {
    tabBar.writeValue('home');
    hostFixture.detectChanges();
    expect((tabBar as unknown as { value: () => string | null }).value()).toBe('home');
  });

  it('writeValue with null clears the value signal', () => {
    tabBar.writeValue('home');
    tabBar.writeValue(null);
    hostFixture.detectChanges();
    expect((tabBar as unknown as { value: () => string | null }).value()).toBeNull();
  });

  it('select(item) updates value and calls onChange', () => {
    let emittedValue: string | null = null;
    tabBar.registerOnChange((v: string | null) => {
      emittedValue = v;
    });

    const items = (tabBar as unknown as { items: () => TabBarItemComponent[] }).items();
    tabBar.select(items[0]);
    hostFixture.detectChanges();

    expect((tabBar as unknown as { value: () => string | null }).value()).toBe('home');
    expect(emittedValue).toBe('home');
  });

  it('select(item) does nothing when disabled', () => {
    tabBar.registerOnChange(() => {});
    tabBar.setDisabledState(true);
    hostFixture.detectChanges();

    const items = (tabBar as unknown as { items: () => TabBarItemComponent[] }).items();
    tabBar.select(items[1]);
    hostFixture.detectChanges();

    expect((tabBar as unknown as { value: () => string | null }).value()).toBeNull();
  });

  it('sets data-disabled="" on host when disabled via form', () => {
    tabBar.setDisabledState(true);
    hostFixture.detectChanges();
    const hostEl: HTMLElement = hostFixture.nativeElement.querySelector('creamy-kit-tab-bar');
    expect(hostEl.getAttribute('data-disabled')).toBe('');
  });

  it('removes data-disabled from host when not disabled', () => {
    tabBar.setDisabledState(false);
    hostFixture.detectChanges();
    const hostEl: HTMLElement = hostFixture.nativeElement.querySelector('creamy-kit-tab-bar');
    expect(hostEl.getAttribute('data-disabled')).toBeNull();
  });

  it('syncs TabBarItem selected state via effect', () => {
    tabBar.writeValue('profile');
    hostFixture.detectChanges();

    const items = (tabBar as unknown as { items: () => TabBarItemComponent[] }).items();
    expect(items[0].selected()).toBe(false);
    expect(items[1].selected()).toBe(true);
  });
});
