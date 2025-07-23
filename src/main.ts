import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withInMemoryScrolling, InMemoryScrollingOptions } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { provideToastr } from 'ngx-toastr';

const scrollConfig: InMemoryScrollingOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled', // Optional: Enables scrolling to anchors
};

const inMemoryScrollingFeature = withInMemoryScrolling(scrollConfig);

bootstrapApplication(AppComponent,  {
  providers: [
    provideRouter( routes, inMemoryScrollingFeature),
    provideHttpClient(),
    importProvidersFrom(BrowserAnimationsModule),
    provideToastr()
  ]
})
  .catch((err) => console.error(err));
