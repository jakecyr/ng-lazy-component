import { NgModule } from '@angular/core';
import { AngularLazyComponentComponent } from './angular-lazy-component.component';
import { PluginDirective } from './plugin.directive';

@NgModule({
    declarations: [
        AngularLazyComponentComponent,
        PluginDirective,
    ],
    imports: [
    ],
    exports: [AngularLazyComponentComponent]
})
export class AngularLazyComponentModule { }
