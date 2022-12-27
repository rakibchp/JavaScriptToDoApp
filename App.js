import { Todo } from "./Todo";

// find the element
const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector("#inputTodo");
const todoLists = document.getElementById("lists");
const messageElement = document.getElementById("message");

// showMessage
const showMessage = (text, status) => {
    messageElement.textContent = text;
    messageElement.classList.add(`bg-${status}`);
    setTimeout(() => {
        messageElement.textContent ="";
        messageElement.classList.remove(`bg-${status}`);
    }, 1000);
}

// creteTodo 
const creteTodo = (newTodo) => {
    const todoElement = document.createElement("li");
    todoElement.id = newTodo.todoId;
    todoElement.classList.add("li-style");
    todoElement.innerHTML = `
    <span> ${newTodo.todoValue} <span/>
    <span> <button class ="btn" id="deleteButton"> <i class="fa fa-trash"> </> </button><span/>
    `;
    todoLists.appendChild(todoElement);

    const deleteButton = todoElement.querySelector("#deleteButton");
    deleteButton.addEventListener("click", deleteTodo);
};

//deleteTodo
const deleteTodo = (event) => {
    const selectedTodo = event.target.parentElement.parentElement.parentElement;

    todoLists.removeChild(selectedTodo);
    showMessage("Todo is deleted", "danger");

    let todos = getTodosFromLocalStorage();
    todos = todos.filter((todo) => todo.todoId !== selectedTodo.id);
    localStorage.setItem("mytodos", JSON.stringify(todos));
};

//getTodosFromLocalStorage
const getTodosFromLocalStorage = () => {
    return localStorage.getItem("mytodos")
    ? JSON.parse(localStorage.getItem("mytodos"))
    : [];
};

// addTodo 
const addTodo = (event) => {
    event.preventDefault();
    const todoValue = todoInput.ariaValueMax;

    //unique id
    const todoId = Date.now().toString();

    const newTodo = new Todo(todoId, todoValue);

    creteTodo(newTodo);
    showMessage("Todo is added", "success");

    // add todo to locatStorage
    const todos = getTodosFromLocalStorage();
    todos.push(newTodo);
    localStorage.setItem("mytodos", JSON.stringify(todos));

    todoInput.value = "";
};


// loadTodos
const loadTodos = () => {
    const todos = getTodosFromLocalStorage();
    todos.map((todo) => creteTodo(todo));
};

// addidng listeners 
todoForm.addEventListener("submit", addTodo);
window.addEventListener("DOMContentLoaded", loadTodos);