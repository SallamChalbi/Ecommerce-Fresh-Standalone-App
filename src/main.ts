import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withInMemoryScrolling, InMemoryScrollingOptions } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { provideToastr } from 'ngx-toastr';
import { myHttpInterceptor } from './app/core/interceptor/my-http.interceptor';
import { NgxSpinnerModule } from "ngx-spinner";
import { loadingInterceptor } from './app/core/interceptor/loading.interceptor.js';

const scrollConfig: InMemoryScrollingOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled', // Optional: Enables scrolling to anchors
};

const inMemoryScrollingFeature = withInMemoryScrolling(scrollConfig);

bootstrapApplication(AppComponent,  {
  providers: [
    provideRouter( routes, inMemoryScrollingFeature),
    provideHttpClient(withInterceptors([myHttpInterceptor, loadingInterceptor])),
    importProvidersFrom(BrowserAnimationsModule, NgxSpinnerModule),
    provideToastr()
  ]
})
  .catch((err) => console.error(err));
