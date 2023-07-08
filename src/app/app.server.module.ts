import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import NodeCache from 'node-cache';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
  ], providers: [NodeCache],
  bootstrap: [AppComponent],
})
export class AppServerModule { }

