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
    } else {
      alert("Input field cannot be empty.");
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
                        <span class="decorative-text" onclick="deleteItem(this)">Delete</span>
                        <span class="decorative-text" onclick="deleteItem(this)">Undo</span>
                    </div>
                `;
    todoListContainer.appendChild(li);
  }

  function saveTodoToLocalStorage(todo) {
    savedTodos.push(todo);
    localStorage.setItem("todos", JSON.stringify(savedTodos));
  }
});

function deleteItem(el) {
  const item = el.closest("li");
  const todoText = item.firstChild.textContent.trim();
  let savedTodos = JSON.parse(localStorage.getItem("todos")) || [];

  savedTodos = savedTodos.filter((todo) => todo !== todoText);
  localStorage.setItem("todos", JSON.stringify(savedTodos));

  el.parentNode.parentNode.remove();
}
