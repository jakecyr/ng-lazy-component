import { Component, Input, ViewChild, ComponentFactoryResolver, AfterViewInit, ComponentRef, Type, SimpleChange } from '@angular/core';
import { PluginDirective } from './plugin.directive';

@Component({
    selector: 'ng-lazy-component',
    templateUrl: 'angular-lazy-component.component.html',
    styles: []
})
export class AngularLazyComponentComponent implements AfterViewInit {

    @ViewChild(PluginDirective) pluginHost: PluginDirective;
    @Input() className: string;
    @Input() inputs: { [index: string]: any };
    @Input() loader: () => Promise<any>;

    componentReference: ComponentRef<unknown>;

    constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

    ngAfterViewInit() {
        this.generatePlugin();
    }
    getComponentRef() {
        return this.componentReference;
    }
    private async generatePlugin() {
        const response = await this.loader();
        const componentRef = response[this.className];
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentRef);
        const viewContainerRef = this.pluginHost.viewContainerRef;

        viewContainerRef.clear();
        this.componentReference = viewContainerRef.createComponent(componentFactory);
        const instance = this.componentReference.instance as any;

        if (this.inputs && instance.ngOnChanges) {
            const changes = {};

            for (const key in this.inputs) {
                const value = this.inputs[key];
                instance[key] = value;
                changes[key] = new SimpleChange(undefined, value, true);
            }

            instance.ngOnChanges(changes);
        }
    }
}
