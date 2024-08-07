class TodoApp {
  constructor() {
    this.todoInput = document.getElementById("todo-input");
    this.todoListContainer = document.getElementById("todo-list");
    this.todoForm = document.getElementById("todo-form");
    this.todoDoneCount = document.querySelector(".container-text .left span");
    this.todoOnProgressCount = document.querySelector(
      ".container-text .right span"
    );
    this.savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    this.savedTodos.forEach((todo) =>
      this.addTodoToDOM(todo.text, todo.isSaved)
    );
    this.updateCounts();
    this.todoForm.addEventListener("submit", (event) =>
      this.handleFormSubmit(event)
    );
    this.todoInput.addEventListener("input", () =>
      this.todoInput.classList.add("gradient-text")
    );
  }

  handleFormSubmit(event) {
    event.preventDefault();
    const newTodo = this.todoInput.value.trim();

    if (newTodo) {
      this.addTodoToDOM(newTodo, false);
      this.saveTodoToLocalStorage(newTodo, false);
      this.updateCounts();
      this.todoInput.value = "";
    } else {
      alert(`
hello 🤗
Please do not leave it blank😤
Please note that you cannot add an empty task to the task list...`);
    }
  }

  createTodoItem(text, isSaved) {
    return { text, isSaved };
  }

  addTodoToDOM(todoText, isSaved) {
    const todoItem = this.createTodoItem(todoText, isSaved);
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
    this.todoListContainer.appendChild(li);

    li.querySelector(".delete-btn").addEventListener("click", () => {
      this.deleteItem(li, todoItem.text);
      this.updateCounts();
    });

    li.querySelector(".save-btn").addEventListener("click", () => {
      this.toggleSaveItem(li, todoItem.text);
      this.updateCounts();
    });
  }

  saveTodoToLocalStorage(todoText, isSaved) {
    this.savedTodos.push(this.createTodoItem(todoText, isSaved));
    localStorage.setItem("todos", JSON.stringify(this.savedTodos));
  }

  deleteItem(item, todoText) {
    this.savedTodos = this.savedTodos.filter((todo) => todo.text !== todoText);
    localStorage.setItem("todos", JSON.stringify(this.savedTodos));
    item.remove();
  }

  toggleSaveItem(item, todoText) {
    let isSaved = item.classList.toggle("save-style");
    this.savedTodos = this.savedTodos.map((todo) => {
      if (todo.text === todoText) {
        todo.isSaved = isSaved;
      }
      return todo;
    });
    localStorage.setItem("todos", JSON.stringify(this.savedTodos));
  }

  updateCounts() {
    const allTodos = document.querySelectorAll(".todo-item").length;
    const unsavedTodos = document.querySelectorAll(
      ".todo-item:not(.save-style)"
    ).length;
    const doneTodos = allTodos - unsavedTodos;
    this.todoDoneCount.textContent = `Todo Done : ${doneTodos}`;
    this.todoOnProgressCount.textContent = `Todo On Progress : ${unsavedTodos}`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new TodoApp();
});
