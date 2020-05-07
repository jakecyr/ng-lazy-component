import { NgModule } from '@angular/core';
import { AngularLazyComponentComponent } from './angular-lazy-component.component';
import { PluginDirective } from './plugin.directive';

@NgModule({
    declarations: [
        AngularLazyComponentComponent,
        PluginDirective,
    ],
    exports: [
        AngularLazyComponentComponent,
    ]
})
export class NgLazyComponentModule { }
