import { Component, Input, ViewChild, ComponentFactoryResolver, AfterViewInit, SimpleChange, OnChanges, SimpleChanges, Output, EventEmitter, ComponentRef } from '@angular/core';
import { PluginDirective } from './plugin.directive';
import { BehaviorSubject, Observable } from 'rxjs';

export interface LazyComponentOutput {
    [index: string]: Observable<any>;
}

@Component({
    selector: 'ng-lazy-component',
    templateUrl: 'angular-lazy-component.component.html',
})
export class AngularLazyComponentComponent implements AfterViewInit, OnChanges {

    @ViewChild(PluginDirective) pluginHost: PluginDirective;
    @Input() className: string;
    @Input() inputs: { [index: string]: any };
    @Input() loader: () => Promise<any>;
    @Output() componentOutput = new EventEmitter<LazyComponentOutput>();
    @Output() componentInstance = new EventEmitter<any>();

    private instance = new BehaviorSubject<any>(null);

    componentOutputMap: LazyComponentOutput = {};

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
        const viewContainerRef = this.pluginHost.viewContainerRef;

        viewContainerRef.clear();
        const componentReference: ComponentRef<unknown> = viewContainerRef.createComponent(componentFactory);
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

        this.componentInstance.emit(instance);
        this.instance.next(instance);
        this.subscribeToOutputs(instance);
    }
    private subscribeToOutputs(instance: any) {
        this.componentOutputMap = {};

        for (const prop in instance) {
            if (instance[prop] instanceof EventEmitter) {
                this.componentOutputMap[prop] = instance[prop] as Observable<any>;
            }
        }

        this.componentOutput.emit(this.componentOutputMap);
    }
}
