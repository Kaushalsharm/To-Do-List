const btn1 = document.querySelector("#btn1");
const inputValue = document.querySelector("#input");
const todoListElement = document.querySelector(".todo-list-elem");
const completedListElement = document.querySelector(".completed-list-elem");

const getTodoListFromLocal = () => {
    return JSON.parse(localStorage.getItem("youtubeTodoList")) || [];
};

const getCompletedListFromLocal = () => {
    return JSON.parse(localStorage.getItem("completedTodoList")) || [];
};

const addTodoListLocalStorage = (localTodoLists) => {
    localStorage.setItem("youtubeTodoList", JSON.stringify(localTodoLists));
};

const addCompletedListLocalStorage = (completedTodoLists) => {
    localStorage.setItem("completedTodoList", JSON.stringify(completedTodoLists));
};

let localTodoLists = getTodoListFromLocal();
let completedTodoLists = getCompletedListFromLocal();

const addTodoDynamicElement = (curElem) => {
    const divElement = document.createElement("div");
    divElement.classList.add("main_todo_div");
    divElement.innerHTML = `<li>${curElem}</li> <button class="deleteBtn">Completed</button>`;
    todoListElement.append(divElement);
};

const addCompletedDynamicElement = (curElem) => {
    const divElement = document.createElement("div");
    divElement.classList.add("main_completed_div");
    divElement.innerHTML = `<li class="completed">${curElem}</li> <button class="deleteBtn">Delete</button>`;
    completedListElement.append(divElement);
};

const addTodoList = (e) => {
    e.preventDefault();
    const todoListValue = inputValue.value.trim();

    inputValue.value = "";

    if (todoListValue !== "" && !localTodoLists.includes(todoListValue)) {
        localTodoLists.push(todoListValue);
        localTodoLists = [...new Set(localTodoLists)];
        addTodoListLocalStorage(localTodoLists);

        addTodoDynamicElement(todoListValue);
    }
};

const showTodoList = () => {
    localTodoLists.forEach((curElem) => {
        addTodoDynamicElement(curElem);
    });
    completedTodoLists.forEach((curElem) => {
        addCompletedDynamicElement(curElem);
    });
};

const removeTodoElem = (e) => {
    if (!e.target.classList.contains('deleteBtn')) return;

    const parentElem = e.target.parentElement;
    const todoListContent = parentElem.querySelector('li').innerText;

    if (parentElem.classList.contains('main_todo_div')) {
        localTodoLists = localTodoLists.filter((curTodo) => curTodo !== todoListContent);
        addTodoListLocalStorage(localTodoLists);
        completedTodoLists.push(todoListContent);
        addCompletedListLocalStorage(completedTodoLists);
        addCompletedDynamicElement(todoListContent);
    } else {
        completedTodoLists = completedTodoLists.filter((curTodo) => curTodo !== todoListContent);
        addCompletedListLocalStorage(completedTodoLists);
    }

    parentElem.remove();
};

todoListElement.addEventListener("click", (e) => {
    e.preventDefault();
    removeTodoElem(e);
});

completedListElement.addEventListener("click", (e) => {
    e.preventDefault();
    removeTodoElem(e);
});

btn1.addEventListener("click", (e) => {
    addTodoList(e);
});

showTodoList();
