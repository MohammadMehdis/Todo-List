document.addEventListener("DOMContentLoaded", function () {
  const todoInput = document.getElementById("todo-input");
  const todoListContainer = document.getElementById("todo-list");
  const todoForm = document.getElementById("todo-form");
  const todoDoneCount = document.querySelector(".container-text .left span");
  const todoOnProgressCount = document.querySelector(
    ".container-text .right span"
  );

  let savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  savedTodos.forEach(function (todo) {
    addTodoToDOM(todo.text, todo.isSaved);
  });

  updateCounts();

  todoForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const newTodo = todoInput.value.trim();

    if (newTodo) {
      addTodoToDOM(newTodo, false);
      saveTodoToLocalStorage(newTodo, false);
      updateCounts();
      todoInput.value = "";
    } else {
      alert(`hello 🤗
Please do not leave it blank😤
Please note that you cannot add an empty task to the task list. Submitting the form without entering text will register the list of contentless tasks that can be managed and sorted tasks. To improve the experience and maintain data quality, be sure to enter a valid title for each new task. It helps you manage your to-do list automatically and efficiently.`);
    }
  });

  todoInput.addEventListener("input", function () {
    todoInput.classList.add("gradient-text");
  });

  function createTodoItem(text, isSaved) {
    return { text, isSaved };
  }

  function addTodoToDOM(todoText, isSaved) {
    const todoItem = createTodoItem(todoText, isSaved);
    const li = document.createElement("li");
    li.classList.add("todo-item", "gradient-text");
    if (todoItem.isSaved) {
      li.classList.add("save-style");
    }
    li.innerHTML = `
                    ${todoItem.text}
                    <div class="buttons">
                        <span class="decorative-text delete-btn">Delete</span>
                        <span class="decorative-text save-btn">Save</span>
                    </div>
                `;
    todoListContainer.appendChild(li);

    li.querySelector(".delete-btn").addEventListener("click", function () {
      deleteItem(li, todoItem.text);
      updateCounts();
    });

    li.querySelector(".save-btn").addEventListener("click", function () {
      toggleSaveItem(li, todoItem.text);
      updateCounts();
    });
  }

  function saveTodoToLocalStorage(todoText, isSaved) {
    savedTodos.push(createTodoItem(todoText, isSaved));
    localStorage.setItem("todos", JSON.stringify(savedTodos));
  }

  function deleteItem(item, todoText) {
    savedTodos = savedTodos.filter(function (todo) {
      return todo.text !== todoText;
    });
    localStorage.setItem("todos", JSON.stringify(savedTodos));
    item.remove();
  }

  function toggleSaveItem(item, todoText) {
    let isSaved = item.classList.toggle("save-style");
    savedTodos = savedTodos.map(function (todo) {
      if (todo.text === todoText) {
        todo.isSaved = isSaved;
      }
      return todo;
    });
    localStorage.setItem("todos", JSON.stringify(savedTodos));
  }

  function updateCounts() {
    const allTodos = document.querySelectorAll(".todo-item").length;
    const unsavedTodos = document.querySelectorAll(
      ".todo-item:not(.save-style)"
    ).length;
    const doneTodos = allTodos - unsavedTodos;
    todoDoneCount.textContent = `Todo Done : ${doneTodos}`;
    todoOnProgressCount.textContent = `Todo On Progress : ${unsavedTodos}`;
  }
});
