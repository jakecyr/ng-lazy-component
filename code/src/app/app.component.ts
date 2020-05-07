import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { AngularLazyComponentComponent } from 'projects/ng-lazy-component/src/public-api';
import { TodoListComponent } from './components/todo-list/todo-list.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

    @ViewChild('lazy') ngLazyComponent: AngularLazyComponentComponent;

    show = true;

    componentLoader = () => import('./components/todo-list/todo-list.component');

    componentName = 'TodoListComponent';

    inputs = {
        listName: 'My Todo List',
        todos: [
            'Do homework',
            'Walk the dog',
            'Work',
            'Repeat',
        ]
    };

    ngAfterViewInit() {
        this.ngLazyComponent.getComponentRef<TodoListComponent>().subscribe((component) => {
            if (component) {
                component.todoRemoved.subscribe((todoRemoved) => {
                    console.log('Todo removed in todo component', todoRemoved);
                });
            }
        });
    }
    updateTodos() {
        this.inputs = {
            listName: 'My Updated List',
            todos: [
                'Repeat',
            ]
        };
    }
}
