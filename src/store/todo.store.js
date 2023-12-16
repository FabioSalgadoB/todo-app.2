import { Todo } from "../todos/models/todo.model";

export const Filters = {
  All: "all",
  Completed: "completed",
  Pending: "pending",
};

const state = {
  todos: [
    new Todo("Piedra del alama"),
    new Todo("Piedra del infinito"),
    new Todo("Piedra del tiempo"),
    new Todo("Piedra del poder"),
  ],

  filter: Filters.All,
};

const initStore = () => {
  loadStore();
  console.log(state);
  console.log("InitStore");
};

const loadStore = () => {
  if (!localStorage.getItem("state")) return;

  const { todos = [], filter = Filters.All } = JSON.parse(
    localStorage.getItem("state")
  );

  state.todos = todos;
  state.filter = filter;
};

const saveStateToLocalStorage = () => {
  localStorage.setItem("state", JSON.stringify(state)); //Serializa con String el objeto state
};
const getTodo = (filter = Filters.All) => {
  switch (filter) {
    case Filters.All:
      return [...state.todos]; // con el operador spres ... regresa un nuevo arreglo con cada uno de los valores del state

    case Filters.Completed:
      return state.todos.filter((todo) => todo.done); // todo.done esta en true

    case Filters.Pending:
      return state.todos.filter((todo) => !todo.done); // todo.done esta en false

    default:
      throw new Error(`Option ${filter} is not valid`);
  }
};

/**
 *Agrega una tarea
 * @param {String} description
 */
const addTodo = (description) => {
  if (!description) throw new Error("Description is requerid");
  state.todos.push(new Todo(description));
  saveStateToLocalStorage();
};

/**
 *Actualiza
 * @param {String} todoId
 */
const toggleTodo = (todoId) => {
  state.todos = state.todos.map((todo) => {
    if (todo.id === todoId) {
      todo.done = !todo.done;
    }
    return todo;
  });

  saveStateToLocalStorage();
};

/**
 * Elimina una tarea
 * @param {String} todoId
 */
const delecteTodo = (todoId) => {
  state.todos = state.todos.filter((todo) => todo.id !== todoId);

  saveStateToLocalStorage();
};

/**
 * Borra las tareas completadas
 * @param {}
 */
const delecteCompleted = () => {
  state.todos = state.todos.filter((todo) => !todo.done);

  saveStateToLocalStorage();
};

/**
 *
 * @param {Filters} newFilter
 */
const setFilter = (newFilter = Filters.All) => {
  state.filter = newFilter;
  saveStateToLocalStorage();
};

const getCurrentFilter = () => {
  return state.filter;
};
export default {
  addTodo,
  delecteCompleted,
  delecteTodo,
  getCurrentFilter,
  getTodo,
  initStore,
  loadStore,
  setFilter,
  toggleTodo,
};
