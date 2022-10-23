import './styles.css';

// Write your JavaScript here.
// Elements
const input = document.querySelector("#input");
const submit = document.querySelector('#submit');
const todoListContainer = document.querySelector('.todo-list-container');

// Listeners
input.addEventListener('input', handleInput);
submit.addEventListener('click', handleSubmit);
todoListContainer.addEventListener('click', handleClickTodoList);

// Handlers
function handleInput(evt) {
    if (!evt || !evt.target) return;
    input.value = evt.target.value;
}

function handleSubmit(evt) {
    if (!input.value || !evt || !evt.target) return;
    const li = document.createElement('li');
    li.innerHTML = `<span>${input.value}</span><button>Delete</button>`;
    todoListContainer.appendChild(li);
    input.value = '';
}

function handleClickTodoList(evt) {
    if (!evt || !evt.target || !evt.target.matches("button")) return;
    const todoList = evt.target.parentElement;
    if (todoList) todoList.remove();
}
