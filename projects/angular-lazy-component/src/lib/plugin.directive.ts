import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[lazyPlugin]'
})
export class PluginDirective {
    constructor(public viewContainerRef: ViewContainerRef) { }
}
