import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes} from "./app/app.routes"
import { AppModule } from './app/app.module';


bootstrapApplication(AppComponent, appConfig) 
  .catch((err) => console.error(err));