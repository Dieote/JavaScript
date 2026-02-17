import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';

  //punto de entrada de la aplicación, se encarga de cargar el 
  // componente principal y la configuración de la aplicación.

bootstrapApplication(AppComponent, {//bootstrapApplication es la función que inicia la aplicación
  providers: [
    // provideHttpClient() proporciona el servicio HttpClient
    // necesario para hacer peticiones HTTP a la API
    provideHttpClient()
  ] 
}).catch((err) => console.error(err));

