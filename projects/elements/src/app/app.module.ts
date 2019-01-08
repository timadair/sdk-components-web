import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import {
  SenzingSdkModule,
  SzSearchComponent,
  SzSearchResultsComponent,
  SzEntityDetailComponent,
  SzRestConfiguration,
  SzPoweredByComponent,
  SzConfigurationAboutComponent,
  SzConfigurationComponent
} from '@senzing/sdk-components-ng';

export function szConfigInjector(): SzRestConfiguration {
  return new SzRestConfiguration({
    basePath: "/api/",
    portNum: 22080,
    withCredentials: false
  });
}

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    /** inject default config otherwise will throw static injector error */
    SenzingSdkModule.forRoot( szConfigInjector )
  ],
  providers: []
})
export class AppModule {

  constructor(private injector: Injector) {
    // search box
    const el1 = createCustomElement(SzSearchComponent, { injector });
    customElements.define('sz-search', el1);
    // search results list
    const el2 = createCustomElement(SzSearchResultsComponent, { injector });
    customElements.define('sz-search-results', el2);
    // entity detail
    const el3 = createCustomElement(SzEntityDetailComponent, { injector });
    customElements.define('sz-entity-detail', el3);
    // configuration injector
    const el4 = createCustomElement(SzConfigurationComponent, { injector });
    customElements.define('sz-configuration', el4);
    // configuration summary
    const el5 = createCustomElement(SzConfigurationAboutComponent, { injector });
    customElements.define('sz-configuration-about', el5);
    // powered by tag
    const el6 = createCustomElement(SzPoweredByComponent, { injector });
    customElements.define('sz-powered-by', el6);
  }
  ngDoBootstrap() {}

}
