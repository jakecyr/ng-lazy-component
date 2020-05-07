[![npm version](https://badge.fury.io/js/ng-lazy-component.svg)](https://badge.fury.io/js/ng-lazy-component)

# Ng Lazy Component

Simple wrapper for Angular 9 lazy component loading using `import`.

## How to use

1. Install the lib `npm install ng-lazy-component`
2. Import the `NgLazyComponentModule` from the lib into your module where you want to lazy load a component
3. Use the `ng-lazy-component` in your template:

    ```html
    <ng-lazy-component
        [loader]="componentLoader"
        [className]="componentName"
        [inputs]="inputs">
    </ng-lazy-component>
    ```

    Where the inputs are the following:

    ```typescript
    className: string;
    inputs: { [index: string]: any };
    loader: () => Promise<any>;
    ```

    Example:

    ```typescript
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
    ```

    This will load the component 'lazily' when the template is rendered.
    