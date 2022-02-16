import { InjectionToken } from '@angular/core';
import { AppConfig } from './common/interfaces/interfaces';

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');
