import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    componentLoader = () => import('./components/todo-list/todo-list.component');
    componentName = 'TodoListComponent';
}
