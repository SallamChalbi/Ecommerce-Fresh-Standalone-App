import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'productdetails/:id',
    renderMode: RenderMode.Server
  },
  {
    path: 'payment/:id',
    renderMode: RenderMode.Server
  },
  {
    path: 'categorydetails/:id',
    renderMode: RenderMode.Server
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
