import {browser, by, element} from 'protractor';
import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  /*
  General
   */
  it('Show the loaded Message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toContain('Modules');
  });
  it('should show module view component', () => {
    page.navigateTo();
    expect(element(by.tagName('app-module-view')).isPresent()).toBeTruthy();
  });
  xit('should show playlist component', () => {
    // maximize window so all elements are rendered inside
    browser.driver.manage().window().maximize();
    // get element
    page.navigateTo();
    element(by.css('[routerLink="/player"]')).click();
    expect(element(by.tagName('app-player')).isPresent()).toBeTruthy();
  });
  it('should show recipe component', () => {
    // maximize window so all elements are rendered inside
    browser.driver.manage().window().maximize();
    // get element
    page.navigateTo();
    element(by.css('[routerLink="/recipe"]')).click();
    expect(element(by.tagName('app-recipe-overview')).isPresent()).toBeTruthy();
  });
  it('should show service-launcher component', () => {
    // maximize window so all elements are rendered inside
    browser.driver.manage().window().maximize();
    // get element
    page.navigateTo();
    element(by.css('[routerLink="/servicelauncher"]')).click();
    expect(element(by.tagName('app-service-launcher')).isPresent()).toBeTruthy();
  });
  it('should show trendview component', () => {
    // maximize window so all elements are rendered inside
    browser.driver.manage().window().maximize();
    // get element
    page.navigateTo();
    element(by.css('[routerLink="/trendview"]')).click();
    expect(element(by.tagName('app-time-series-view')).isPresent()).toBeTruthy();
  });
  it('should show logs component', () => {
    // maximize window so all elements are rendered inside
    browser.driver.manage().window().maximize();
    // get element
    page.navigateTo();
    element(by.css('[routerLink="/logs"]')).click();
    expect(element(by.tagName('app-log')).isPresent()).toBeTruthy();
  });
  it('should show settings component', () => {
    // maximize window so all elements are rendered inside
    browser.driver.manage().window().maximize();
    // get element
    page.navigateTo();
    element(by.css('[routerLink="/settings"]')).click();
    expect(element(by.tagName('app-settings')).isPresent()).toBeTruthy();
  });
  it('should show about component', () => {
    // maximize window so all elements are rendered inside
    browser.driver.manage().window().maximize();
    // get element
    page.navigateTo();
    element(by.css('[routerLink="/about"]')).click();
    expect(element(by.tagName('app-about')).isPresent()).toBeTruthy();
  });
  /*
  Service-Launcher
   */
  xit('should be able to open a single service with a click', () => {
    page.navigateTo();
    // click on p2o & a module to show services
    element(by.id('p2o')).click();
    element.all(by.className('module')).first().click();
    // click on service to summon service details
    element.all(by.className('service')).first().click();
    // check if the radius is 48, what means it expanded
    expect(element.all(by.className('service')).first().getAttribute('r')).toBe('48');
  });
  xit('should be able to close a single service with a click', () => {
    page.navigateTo();
    // click on p2o & a module to show services
    element(by.id('p2o')).click();
    element.all(by.className('module')).first().click();
    // click on service to summon service details & close it again
    const service = element.all(by.className('service')).first();
    service.click();
    service.click();
    // check if the radius is 48, what means it expanded
    expect(service.getAttribute('r')).toBe('32');
  });
  xit('should be able to pin a single service via dragndrop', () => {
    page.navigateTo();
    // click on p2o & a module to show services
    element(by.id('p2o')).click();
    element.all(by.className('module')).first().click();
    // drag n drop the service to the bar -> Problem with Chrome webdriver (issue 841)
    const service = element.all(by.className('service')).first();
    const targetBar = element(by.className('section_pinned_services'));
    browser.actions().dragAndDrop(service, targetBar).perform();
    // pinbar should now contain one element
    expect(targetBar.element(by.tagName('app-servicelauncher-button')).isPresent()).toBeTruthy();
  });
  xit('should be able to pin a service via service details', () => {
    page.navigateTo();
    // click on p2o & a module to show services
    element(by.id('p2o')).click();
    element.all(by.className('module')).first().click();
    // click on service to summon service details & click on pin
    element.all(by.className('service')).first().click();
    element.all(by.className('flagPinCircle')).first().click();
    // pinbar should now contain one element
    expect(element(by.className('section_pinned_services')).element(by.tagName('app-servicelauncher-button'))
      .isPresent()).toBeTruthy();
  });
  xit('should be able to unpin a service via service details', () => {
    page.navigateTo();
    // click on p2o & a module to show services
    element(by.id('p2o')).click();
    element.all(by.className('module')).first().click();
    const targetBar = element(by.className('section_pinned_services'));
    // click on service to summon service details & click on pin
    element.all(by.className('service')).first().click();
    element.all(by.className('flagPinCircle')).first().click();
    // click on service in pinbar
    targetBar.element(by.tagName('app-servicelauncher-button')).click();
    targetBar.element(by.className('flagPinCircle')).click();
    // pinbar should now contain no elements
    expect(element(by.className('section_pinned_services')).element(by.tagName('app-servicelauncher-button'))
      .isPresent()).toBeFalsy();
  });
  xit('should be able to open service settings', () => {
    page.navigateTo();
    // click on p2o & a module to show services
    element(by.id('p2o')).click();
    element.all(by.className('module')).first().click();
    // click on service to summon service details
    element.all(by.className('service')).first().click();
    // click on service settings button
    element.all(by.className('settingsButton')).first().click();
    // check if the modal is present
    expect(element(by.tagName('mat-dialog-container')).isPresent()).toBeTruthy();
  });
  xit('should be able to close service settings', () => {
    page.navigateTo();
    // click on p2o & a module to show services
    element(by.id('p2o')).click();
    element.all(by.className('module')).first().click();
    // click on service to summon service details
    element.all(by.className('service')).first().click();
    // click on service settings button
    element.all(by.className('settingsButton')).first().click();
    // click on the close button
    element(by.tagName('mat-dialog-container')).element(by.className('close-button')).click();
    // check if the radius is 48, what means it expanded
    expect(element(by.tagName('cdk-overlay-container')).element(by.tagName('div')).isPresent()).toBeFalsy();
  });
  /*
  Ambient-Light
   */
  xit('should switch to dark theme when forced', () => {
    page.navigateTo();
    // switch to settings screen
    element(by.css('[routerLink="/settings"]')).click();
    // click on force dark theme checkbox
    element(by.name('forceDarkmode')).click();
    browser.debugger();
    // check if the theme has changed
    expect(element(by.tagName('app-root')).getAttribute('class')).toEqual('deeppurple-amber-dark');
  });
  xit('should switch back to light theme when forced', () => {
    page.navigateTo();
    // switch to settings screen
    element(by.css('[routerLink="/settings"]')).click();
    // click on force dark theme checkbox
    element(by.name('forceDarkmode')).click();
    element(by.name('forceDarkmode')).click();
    // check if the theme has changed
    expect(element(by.tagName('app-root')).getAttribute('class')).toEqual('indigo-purple');
  });
});
