import { Component, NgModule, OnChanges, SimpleChanges, OnDestroy, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-todo-list',
    templateUrl: './todo-list.component.html',
    styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnChanges, OnDestroy {

    @Output() todoRemoved = new EventEmitter<string>();

    listName: string;
    todos: string[] = [];

    ngOnChanges(changes: SimpleChanges) {
        if (changes.listName) {
            console.log('list name changed')
        }

        if (changes.todos) {
            console.log('todo changed')
        }
    }
    ngOnDestroy() {
        console.log('Cleaning up todo component');
    }
    removeTodo(index: number) {
        this.todoRemoved.emit(this.todos[index]);
        this.todos.splice(index, 1);
    }
}

@NgModule({
    declarations: [TodoListComponent],
    imports: [CommonModule],
})
export class TodoListModule { }