// Seleção de elementos
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");
const todoList = document.querySelector("#todo-list");
const searchinput = document.querySelector("#search-input");
const eraseBtn = document.querySelector("#erase-button");
const filterBtn = document.querySelector("#filter-select");

let oldInputValue; //armazenar o título antigo

// Funções
const saveToDo = (text) => {
    // Criar elemento
    const todo = document.createElement("div");
    const todoTitle = document.createElement("h3");
    const doneBtn = document.createElement("button");
    const editBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");

    // Adicionar classe
    todo.classList.add("todo");
    doneBtn.classList.add("finish-todo");
    editBtn.classList.add("edit-todo");
    deleteBtn.classList.add("remove-todo");

    // Adicionar elementos 
    todoTitle.textContent = text;
    doneBtn.innerHTML = "<i class='fa-solid fa-check'></i>"
    editBtn.innerHTML = "<i class='fa-solid fa-pen'></i>"
    deleteBtn.innerHTML = "<i class='fa-solid fa-xmark'></i>"

    // Adicionar elementos dentro da Div
    todo.appendChild(todoTitle);
    todo.appendChild(doneBtn);
    todo.appendChild(editBtn);
    todo.appendChild(deleteBtn);

    // Adicionar Div dentro do To-do list
    todoList.appendChild(todo);

    todoInput.value = ''; 
    todoInput.focus();
}

const toggleForms = () => {
    editForm.classList.toggle("hide");
    todoForm.classList.toggle("hide");
    todoList.classList.toggle("hide");
}

const updateTodo = (text) => {
    const todos = document.querySelectorAll(".todo"); // seleciona todos os todo

    todos.forEach((todo) => {
        let todoTitle = todo.querySelector("h3"); // pega apenas o h3

        if(todoTitle.innerText === oldInputValue) { // se o texto do h3 for igual ao texto que está salvo na memória, entao edita
            todoTitle.innerText = text;
        }
    })
}

const getSearchTodos = (search) => {
    const todos = document.querySelectorAll(".todo"); // seleciona todos os todo

    todos.forEach((todo) => {
        let todoTitle  = todo.querySelector("h3").innerHTML.toLowerCase(); // pega o valor do h3 e passar para letras minúsculas
        const normalizedSearch = search.toLowerCase();

        todo.style.display = 'flex';

        if(!todoTitle.includes(normalizedSearch)) {
            todo.style.display = 'none';
        }
    })
}

const filterTodos = (filterValue) => {
    const todos = document.querySelectorAll(".todo");

    switch(filterValue) {
        case "all":
            todos.forEach((todo) => {
                todo.style.display = "flex";
            });
            break;
        case "done":
            todos.forEach((todo) => {
                todo.classList.contains("done") ? todo.style.display = "flex" : todo.style.display = "none";
            })
            break;
        case "todo":
            todos.forEach((todo) => {
                !todo.classList.contains("done") ? todo.style.display = "flex" : todo.style.display = "none";
            })
            break;
        default:
            break;
    }
}

// Eventos
todoForm.addEventListener("submit", (e) => {
    e.preventDefault(); // evita o envio do formulário
    const inputValue = todoInput.value;

    if(inputValue) {
        // save to-do
        saveToDo(inputValue);
    }
    
})

document.addEventListener("click", (e) => {
    const targetEl = e.target;
    const parentEl = targetEl.closest("div");
    let todoTitle;

    if(parentEl && parentEl.querySelector("h3")) {
        todoTitle = parentEl.querySelector("h3").innerText;
    }

    // verifica se contem uma classe chamada "finish-todo"
    if(targetEl.classList.contains("finish-todo")) {
        parentEl.classList.toggle("done") 
    }

    if(targetEl.classList.contains("remove-todo")) {
        parentEl.remove();
    }

    if(targetEl.classList.contains("edit-todo")) {
        toggleForms();

        editInput.value = todoTitle; // mudar o valor do input
        oldInputValue = todoTitle; // salva o valor na memória
    }
})

cancelEditBtn.addEventListener("click", (e) => {
    e.preventDefault();

    toggleForms();
})

editForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const editInputValue = editInput.value;

    if(editInputValue) {
        updateTodo(editInputValue);
    }

    toggleForms()
})

searchinput.addEventListener("keyup", (e) => {
    const search = e.target.value;

    getSearchTodos(search);
})

eraseBtn.addEventListener("click", (e) => {
    e.preventDefault();

    searchinput.value = "";
    searchinput.dispatchEvent(new Event("keyup"));
})

filterBtn.addEventListener("change", (e) => {
    const filterValue = e.target.value;

    filterTodos(filterValue);
})