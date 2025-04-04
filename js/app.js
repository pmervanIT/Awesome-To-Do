// app.js - Initialize and start the application

document.addEventListener('DOMContentLoaded', () => {
    const storage = new TodoStorage();
    const view = new TodoView();
    const controller = new TodoController(storage, view);
});