// storage.js - Handle data persistence using localStorage

class TodoStorage {
    constructor() {
        this.localStorageKey = 'todos';
    }

    getTodos() {
        const todos = JSON.parse(localStorage.getItem(this.localStorageKey) || '[]');
        return todos.map(todo => Object.assign(new Todo(todo.id, todo.text, todo.completed), {
            createdAt: new Date(todo.createdAt),
            updatedAt: new Date(todo.updatedAt)
        }));
    }

    saveTodos(todos) {
        localStorage.setItem(this.localStorageKey, JSON.stringify(todos));
    }

    addTodo(text) {
        const todos = this.getTodos();
        const newId = todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;
        const newTodo = new Todo(newId, text);
        todos.push(newTodo);
        this.saveTodos(todos);
        return newTodo;
    }

    deleteTodo(id) {
        const todos = this.getTodos();
        const filteredTodos = todos.filter(todo => todo.id !== id);
        this.saveTodos(filteredTodos);
    }

    updateTodo(id, text) {
        const todos = this.getTodos();
        const todoIndex = todos.findIndex(todo => todo.id === id);
        if (todoIndex !== -1) {
            todos[todoIndex].update(text);
            this.saveTodos(todos);
            return todos[todoIndex];
        }
        return null;
    }

    toggleTodo(id) {
        const todos = this.getTodos();
        const todoIndex = todos.findIndex(todo => todo.id === id);
        if (todoIndex !== -1) {
            todos[todoIndex].toggle();
            this.saveTodos(todos);
            return todos[todoIndex];
        }
        return null;
    }
}