// controller.js - Connect the model and view, handle business logic

class TodoController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        
        // Bind event handlers
        this.view.bindAddTodo(this.handleAddTodo.bind(this));
        this.view.bindEditTodo(this.handleEditTodo.bind(this));
        this.view.bindDeleteTodo(this.handleDeleteTodo.bind(this));
        this.view.bindToggleTodo(this.handleToggleTodo.bind(this));
        
        // Initial render
        this.onTodoListChanged(this.model.getTodos());
    }
    
    onTodoListChanged(todos) {
        this.view.renderTodos(todos);
    }
    
    handleAddTodo(text) {
        this.model.addTodo(text);
        this.onTodoListChanged(this.model.getTodos());
    }
    
    handleEditTodo(id, text) {
        this.model.updateTodo(id, text);
        this.onTodoListChanged(this.model.getTodos());
    }
    
    handleDeleteTodo(id) {
        this.model.deleteTodo(id);
        this.onTodoListChanged(this.model.getTodos());
    }
    
    handleToggleTodo(id) {
        this.model.toggleTodo(id);
        this.onTodoListChanged(this.model.getTodos());
    }
}