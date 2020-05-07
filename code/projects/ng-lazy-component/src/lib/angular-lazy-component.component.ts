import { Component, Input, ViewChild, ComponentFactoryResolver, AfterViewInit, SimpleChange, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { PluginDirective } from './plugin.directive';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
    selector: 'ng-lazy-component',
    templateUrl: 'angular-lazy-component.component.html',
    styles: []
})
export class AngularLazyComponentComponent implements AfterViewInit, OnChanges, OnDestroy {

    @ViewChild(PluginDirective) pluginHost: PluginDirective;
    @Input() className: string;
    @Input() inputs: { [index: string]: any };
    @Input() loader: () => Promise<any>;

    private instance = new BehaviorSubject<any>(null);
    private viewContainerRef: any;

    constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.inputs && this.inputs && this.instance.value) {
            const instance = this.instance.value;
            const newChanges = {};

            for (const key in this.inputs) {
                const value = this.inputs[key];
                instance[key] = value;
                newChanges[key] = new SimpleChange(undefined, value, true);
            }

            if (instance.ngOnChanges) {
                instance.ngOnChanges(newChanges);
            }
        }
    }
    ngOnDestroy() {
        if (this.viewContainerRef) {
            this.viewContainerRef.clear();
        }
    }
    ngAfterViewInit() {
        this.generatePlugin();
    }
    getComponentRef<ComponentType>(): Observable<ComponentType | null> {
        return this.instance.asObservable();
    }
    private async generatePlugin() {
        const response = await this.loader();
        const componentRef = response[this.className];
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentRef);
        this.viewContainerRef = this.pluginHost.viewContainerRef;

        this.viewContainerRef.clear();
        const componentReference = this.viewContainerRef.createComponent(componentFactory);
        const instance = componentReference.instance as any;

        if (this.inputs && instance.ngOnChanges) {
            const changes = {};

            for (const key in this.inputs) {
                const value = this.inputs[key];
                instance[key] = value;
                changes[key] = new SimpleChange(undefined, value, true);
            }

            instance.ngOnChanges(changes);
        }

        this.instance.next(instance);
    }
}
