import todoStore from "../store/todo.store";
import html from "./app.html?raw";
import { renderTodos, renderPending } from "./usecases";
import { Filters } from "../store/todo.store";

const ElementIDs = {
  ClearCompletedButton: ".clear-completed",
  TodoList: ".todo-list",
  NewTodoInput: "#new-todo-input",
  TodoFilters: ".filtro",
  PendingCountLabel: "#pending-count",
};
/**
 *
 * @param {String} elementId
 */
export const App = (elementId) => {
  const displayTodo = () => {
    const todos = todoStore.getTodo(todoStore.getCurrentFilter());
    renderTodos(ElementIDs.TodoList, todos);
    console.log(todos);
    updatePendingCount();
  };

  const updatePendingCount = () => {
    renderPending(ElementIDs.PendingCountLabel);
  };
  //Cuando la funcion App() se llama
  (() => {
    const app = document.createElement("div");
    app.innerHTML = html;
    document.querySelector(elementId).append(app);
    displayTodo();
  })();

  //Referencias HTML
  const newDescriptionInput = document.querySelector(ElementIDs.NewTodoInput);

  const todoListUL = document.querySelector(ElementIDs.TodoList);

  const clearCompletedButton = document.querySelector(
    ElementIDs.ClearCompletedButton
  );

  const filterLIs = document.querySelectorAll(ElementIDs.TodoFilters);

  //Listeners
  /**
   * Verifica las pulsaciones en el teclado
   */
  newDescriptionInput.addEventListener("keyup", (event) => {
    if (event.keyCode !== 13) return;
    if (event.target.value.trim().lenght === 0) return;
    todoStore.addTodo(event.target.value);
    displayTodo();
    event.target.value = "";
  });

  /**
   * Actualiza una tarea terminada
   */
  todoListUL.addEventListener("click", (event) => {
    const element = event.target.closest("[data-id]"); // busca al elemento mas cercano que tenga el data-id
    todoStore.toggleTodo(element.getAttribute("data-id"));
    displayTodo();
  });

  /**
   * Elimina una tarea de la lista
   */
  todoListUL.addEventListener("click", (event) => {
    const isDestroyElement = event.target.className === "destroy";
    const element = event.target.closest("[data-id]"); // busca al elemento mas cercano que tenga el data-id

    if (!element || !isDestroyElement) return;
    todoStore.delecteTodo(element.getAttribute("data-id"));
    displayTodo();
  });

  clearCompletedButton.addEventListener("click", () => {
    todoStore.delecteCompleted();
    displayTodo();
  });

  filterLIs.forEach((element) => {
    element.addEventListener("click", (element) => {
      filterLIs.forEach((el) => el.classList.remove("selected"));
      element.target.classList.add("selected");

      switch (element.target.text) {
        case "Todos":
          todoStore.setFilter(Filters.All);
          break;
        case "Pendientes":
          todoStore.setFilter(Filters.Pending);
          break;
        case "Completados":
          todoStore.setFilter(Filters.Completed);
          break;
      }

      displayTodo();
    });
  });
};
