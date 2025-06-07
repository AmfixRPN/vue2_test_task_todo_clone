import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

let currentToken = "f1c71c26a40b425da43255c9f6cef23f";

export default new Vuex.Store({
  state: {
    todos: [],
  },
  getters: {
    todos: (state) => state.todos,
  },
  mutations: {
    setTodos(state, payload) {
      state.todos = payload;
    },
    clearCompleted(state) {
      state.todos = state.todos.filter((item) => item.done === false);
    },
    deleteTodo(state, todo) {
      state.todos = state.todos.filter((item) => item.id !== todo.id);
    },
  },
  actions: {
    async getTodos({ commit }) {
      try {
        const res = await axios.get(
          `https://crudcrud.com/api/${currentToken}/todos`
        );
        commit("setTodos", res.data);
      } catch (error) {
        console.error("getTodo error:", error.stack);
        console.error("getTodo error:", error.name);
        console.error("getTodo error:", error.message);
        throw new Error(error);
      }
    },
    async postTodo({ dispatch }, todo) {
      try {
        await axios.post(
          `https://crudcrud.com/api/${currentToken}/todos`,
          todo
        );
        dispatch("getTodos");
      } catch (error) {
        console.error("postTodo error:", error.stack);
        console.error("postTodo error:", error.name);
        console.error("postTodo error:", error.message);
        throw new Error(error);
      }
    },
    async deleteTodo({ dispatch }, id) {
      try {
        await axios.delete(
          `https://crudcrud.com/api/${currentToken}/todos/${id}`
        );
        dispatch("getTodos");
      } catch (error) {
        console.error("deleteTodo error:", error.stack);
        console.error("deleteTodo error:", error.name);
        console.error("deleteTodo error:", error.message);
        throw new Error(error);
      }
    },
    async putTodo({ dispatch }, { todo, id }) {
      try {
        await axios.put(
          `https://crudcrud.com/api/${currentToken}/todos/${id}`,
          todo
        );
        dispatch("getTodos");
      } catch (error) {
        console.error("putTodo error:", error.stack);
        console.error("putTodo error:", error.name);
        console.error("putTodo error:", error.message);
        throw new Error(error);
      }
    },
  },
  modules: {},
});
