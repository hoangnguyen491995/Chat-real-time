import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { appSlice } from 'src/redux/app.slice';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClientModule } from '@angular/common/http';
import { CoreOcbModule } from './core-ocb/core-ocb.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MatBadgeModule } from '@angular/material/badge';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [ 
    AppComponent 
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    TransferHttpCacheModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot({ app: appSlice.reducer }),
    StoreDevtoolsModule.instrument(), CoreOcbModule,
    SweetAlert2Module,
    BrowserAnimationsModule,
    DateInputsModule,
    MdbDropdownModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

