import { Routes } from '@angular/router';
import { WebComponentWrapper, WebComponentWrapperOptions } from '@angular-architects/module-federation-tools'

export const routes: Routes = [
  {
    path: 'home',
    component: WebComponentWrapper,
    data: {
      remoteEntry: 'http://localhost:3000/_next/static/chunks/remoteEntry.js',
      remoteName: 'ccd2025-home',
      exposedModule: './home',
      elementName: 'ccd2025-home',
    } as WebComponentWrapperOptions
  },
  {
    path: 'user',
    component: WebComponentWrapper,
    data: {
      remoteEntry: 'http://localhost:3001/_next/static/chunks/remoteEntry.js',
      remoteName: 'ccd2025-user',
      exposedModule: './user',
      elementName: 'ccd2025-user',
    } as WebComponentWrapperOptions
  }
];
