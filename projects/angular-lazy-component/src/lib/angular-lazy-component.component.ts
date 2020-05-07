import { Component, Input, ViewChild, ComponentFactoryResolver, AfterViewInit, ComponentRef } from '@angular/core';
import { PluginDirective } from './plugin.directive';

@Component({
    selector: 'lib-angular-lazy-component',
    templateUrl: 'angular-lazy-component.component.html',
    styles: []
})
export class AngularLazyComponentComponent implements AfterViewInit {

    @ViewChild(PluginDirective) pluginHost: PluginDirective;

    @Input() componentName: string;
    @Input() componentLoader: () => Promise<any>;

    componentReference: ComponentRef<unknown>;

    constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

    ngAfterViewInit() {
        this.generatePlugin();
    }
    async generatePlugin() {
        const response = await this.componentLoader();
        const componentRef = response[this.componentName];
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentRef);
        const viewContainerRef = this.pluginHost.viewContainerRef;

        viewContainerRef.clear();
        this.componentReference = viewContainerRef.createComponent(componentFactory);
    }
}
