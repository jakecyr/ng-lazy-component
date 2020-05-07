import { Component } from '@angular/core';
import { LazyComponentOutput } from 'projects/ng-lazy-component/src/public-api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    subscribeUntil = new Subject();
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

    updateTodos() {
        this.inputs = { listName: 'My Updated List', todos: ['Repeat'] };
    }
    outputEvent(event: LazyComponentOutput) {
        this.subscribeUntil.next(true);
        this.subscribeUntil.complete();

        this.subscribeUntil = new Subject();

        event.todoRemoved
            .pipe(takeUntil(this.subscribeUntil))
            .subscribe((removalEvent) => console.log('REMOVED', removalEvent));
    }
}
