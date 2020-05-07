import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NgLazyComponentModule } from 'projects/ng-lazy-component/src/public-api';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        NgLazyComponentModule,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
