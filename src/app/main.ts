import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {enableProdMode} from '@angular/core';
// this is the magic wand
enableProdMode();

import { AppModule } from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule);
