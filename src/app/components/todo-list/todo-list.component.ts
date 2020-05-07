import { Component, OnInit, NgModule } from '@angular/core';

@Component({
    selector: 'app-todo-list',
    templateUrl: './todo-list.component.html',
    styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }
}

@NgModule({
    declarations: [
        TodoListComponent,
    ],
})
export class AppModule { }