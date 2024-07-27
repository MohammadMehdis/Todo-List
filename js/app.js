// document.addEventListener("DOMContentLoaded", () => {
//   const todoInput = document.getElementById("todo-input");
//   const todoListContainer = document.getElementById("todo-list");
//   const todoForm = document.getElementById("todo-form");

//   let savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
//   savedTodos.forEach((todo) => addTodoToDOM(todo));

//   todoForm.addEventListener("submit", (event) => {
//     event.preventDefault();
//     const newTodo = todoInput.value.trim();

//     if (newTodo) {
//       addTodoToDOM(newTodo);
//       saveTodoToLocalStorage(newTodo);
//       todoInput.value = "";
//     }
//   });

//   function addTodoToDOM(todo) {
//     const li = document.createElement("li");
//     li.classList.add("todo-item");
//     li.innerHTML = `
//             ${todo}
//             <div class="buttons">
//                 <span class="decorative-text">Delete</span>
//                 <span class="decorative-text">Undo</span>
//             </div>
//         `;
//     todoListContainer.appendChild(li);
//   }

//   function saveTodoToLocalStorage(todo) {
//     savedTodos.push(todo);
//     localStorage.setItem("todos", JSON.stringify(savedTodos));
//   }
// });
document.addEventListener("DOMContentLoaded", () => {
  const todoInput = document.getElementById("todo-input");
  const todoListContainer = document.getElementById("todo-list");
  const todoForm = document.getElementById("todo-form");

  let savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  savedTodos.forEach((todo) => addTodoToDOM(todo));

  todoForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const newTodo = todoInput.value.trim();

    if (newTodo) {
      addTodoToDOM(newTodo);
      saveTodoToLocalStorage(newTodo);
      todoInput.value = "";
    }
  });

  todoInput.addEventListener("input", () => {
    todoInput.classList.add("gradient-text");
  });

  function addTodoToDOM(todo) {
    const li = document.createElement("li");
    li.classList.add("todo-item", "gradient-text");
    li.innerHTML = `
            ${todo}
            <div class="buttons">
                <span class="decorative-text">Delete</span>
                <span class="decorative-text">Undo</span>
            </div>
        `;
    todoListContainer.appendChild(li);
  }

  function saveTodoToLocalStorage(todo) {
    savedTodos.push(todo);
    localStorage.setItem("todos", JSON.stringify(savedTodos));
  }
});
