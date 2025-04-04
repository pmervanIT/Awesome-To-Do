// models.js - Data models for the todo application

class Todo {
    constructor(id, text, completed = false) {
        this.id = id;
        this.text = text;
        this.completed = completed;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    toggle() {
        this.completed = !this.completed;
        this.updatedAt = new Date();
        return this;
    }

    update(text) {
        this.text = text;
        this.updatedAt = new Date();
        return this;
    }
}