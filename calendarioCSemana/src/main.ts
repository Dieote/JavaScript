import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './appCalendario/app.config';
import { AppCalendario } from './appCalendario/appCalendario';

bootstrapApplication(AppCalendario, appConfig)
  .catch((err) => console.error(err));
