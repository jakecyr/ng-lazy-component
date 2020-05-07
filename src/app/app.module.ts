import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AngularLazyComponentModule } from 'projects/angular-lazy-component/src/public-api';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        AngularLazyComponentModule,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
