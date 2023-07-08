import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreOcbComponent } from './core-ocb.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { AppRoutingModule } from '../app-routing.module';
import { MainComponent } from './layout/main/main.component';
import { DefaultComponent } from './layout/default/default.component';
import { HeaderEmployeeComponent } from './component/headerEmployee/headerEmployee.component';
import { NoHeaderComponent } from './layout/noHeader/noHeader.component';
import { IconComponent } from "../share/icon-material/Icon/Icon.component";

import { PersonComponent } from "../share/icon-material/person/person.component";
import { NotiComponent } from "../share/icon-material/noti/noti.component";
import { MessageComponent } from "../share/icon-material/message/message.component";
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule, MatIconButton} from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ListMessageComponent } from './component/listMessage/listMessage.component';
import {MatExpansionModule} from '@angular/material/expansion';





@NgModule({
    declarations: [CoreOcbComponent, HeaderComponent, FooterComponent, MainComponent, DefaultComponent, HeaderEmployeeComponent, NoHeaderComponent, ListMessageComponent  ],
    imports: [
        AppRoutingModule,
        CommonModule,
        IconComponent,
        PersonComponent,
        NotiComponent,
        MessageComponent , MatButtonModule, MatTooltipModule, MatBadgeModule, MatToolbarModule, MatButtonModule ,MatIconModule, MatMenuModule, MatExpansionModule
        
    ],
    exports: [ListMessageComponent]

})
export class CoreOcbModule { }
