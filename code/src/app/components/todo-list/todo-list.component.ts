import { Component, NgModule, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-todo-list',
    templateUrl: './todo-list.component.html',
    styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnChanges {

    listName: string;
    todos: string[] = [];

    ngOnChanges(changes: SimpleChanges) {
        if (changes.listName) {
            this.listName = changes.listName.currentValue;
        }

        if (changes.todos) {
            this.todos = changes.todos.currentValue;
        }
    }
}

@NgModule({
    declarations: [TodoListComponent],
    imports: [CommonModule],
})
export class TodoListModule { }