// view.js - Handle UI rendering and DOM manipulations

class TodoView {
    constructor() {
        this.todoList = document.getElementById('todo-list');
        this.todoInput = document.getElementById('todo-input');
        this.addButton = document.getElementById('add-btn');
        this.emptyState = document.getElementById('empty-state');
        
        // Modal elements
        this.addModal = document.getElementById('add-modal');
        this.addTaskPreview = document.getElementById('add-task-preview');
        this.addCancelBtn = document.getElementById('add-cancel');
        this.addConfirmBtn = document.getElementById('add-confirm');
        
        this.editModal = document.getElementById('edit-modal');
        this.editInput = document.getElementById('edit-input');
        this.editTodoId = document.getElementById('edit-todo-id');
        this.editCancelBtn = document.getElementById('edit-cancel');
        this.editConfirmBtn = document.getElementById('edit-confirm');
        
        this.deleteModal = document.getElementById('delete-modal');
        this.deleteTaskPreview = document.getElementById('delete-task-preview');
        this.deleteCancelBtn = document.getElementById('delete-cancel');
        this.deleteConfirmBtn = document.getElementById('delete-confirm');
    }

    renderTodos(todos) {
        this.todoList.innerHTML = '';
        
        if (todos.length === 0) {
            this.emptyState.style.display = 'block';
            return;
        }
        
        this.emptyState.style.display = 'none';
        
        todos.forEach(todo => {
            const todoItem = document.createElement('li');
            todoItem.classList.add('todo-item');
            todoItem.dataset.id = todo.id;
            
            if (todo.completed) {
                todoItem.classList.add('completed');
            }
            
            todoItem.innerHTML = `
                <span class="todo-text">${this.escapeHTML(todo.text)}</span>
                <div class="actions">
                    <button class="complete-btn">${todo.completed ? 'Undo' : 'Complete'}</button>
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
                </div>
            `;
            
            this.todoList.appendChild(todoItem);
        });
    }
    
    escapeHTML(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
    
    showAddModal(taskText) {
        this.addTaskPreview.textContent = taskText;
        this.addModal.classList.add('show');
    }
    
    hideAddModal() {
        this.addModal.classList.remove('show');
    }
    
    showEditModal(todoId, todoText) {
        this.editTodoId.value = todoId;
        this.editInput.value = todoText;
        this.editModal.classList.add('show');
        this.editInput.focus();
    }
    
    hideEditModal() {
        this.editModal.classList.remove('show');
    }
    
    showDeleteModal(todoId, todoText) {
        this.deleteTaskPreview.textContent = todoText;
        this.deleteTaskPreview.dataset.id = todoId;
        this.deleteModal.classList.add('show');
    }
    
    hideDeleteModal() {
        this.deleteModal.classList.remove('show');
    }
    
    clearInput() {
        this.todoInput.value = '';
        this.todoInput.focus();
    }
    
    bindAddTodo(handler) {
        this.addButton.addEventListener('click', () => {
            const text = this.todoInput.value.trim();
            if (text) {
                this.showAddModal(text);
            }
        });
        
        this.todoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const text = this.todoInput.value.trim();
                if (text) {
                    this.showAddModal(text);
                }
            }
        });
        
        this.addConfirmBtn.addEventListener('click', () => {
            const text = this.todoInput.value.trim();
            if (text) {
                handler(text);
                this.clearInput();
            }
            this.hideAddModal();
        });
        
        this.addCancelBtn.addEventListener('click', () => {
            this.hideAddModal();
        });
    }
    
    bindDeleteTodo(handler) {
        this.todoList.addEventListener('click', (e) => {
            if (e.target.classList.contains('delete-btn')) {
                const todoItem = e.target.closest('.todo-item');
                const todoId = parseInt(todoItem.dataset.id);
                const todoText = todoItem.querySelector('.todo-text').textContent;
                this.showDeleteModal(todoId, todoText);
            }
        });
        
        this.deleteConfirmBtn.addEventListener('click', () => {
            const todoId = parseInt(this.deleteTaskPreview.dataset.id);
            handler(todoId);
            this.hideDeleteModal();
        });
        
        this.deleteCancelBtn.addEventListener('click', () => {
            this.hideDeleteModal();
        });
    }
    
    bindEditTodo(handler) {
        this.todoList.addEventListener('click', (e) => {
            if (e.target.classList.contains('edit-btn')) {
                const todoItem = e.target.closest('.todo-item');
                const todoId = parseInt(todoItem.dataset.id);
                const todoText = todoItem.querySelector('.todo-text').textContent;
                this.showEditModal(todoId, todoText);
            }
        });
        
        this.editConfirmBtn.addEventListener('click', () => {
            const todoId = parseInt(this.editTodoId.value);
            const todoText = this.editInput.value.trim();
            if (todoText) {
                handler(todoId, todoText);
            }
            this.hideEditModal();
        });
        
        this.editCancelBtn.addEventListener('click', () => {
            this.hideEditModal();
        });
    }
    
    bindToggleTodo(handler) {
        this.todoList.addEventListener('click', (e) => {
            if (e.target.classList.contains('complete-btn')) {
                const todoId = parseInt(e.target.closest('.todo-item').dataset.id);
                handler(todoId);
            }
        });
    }
}