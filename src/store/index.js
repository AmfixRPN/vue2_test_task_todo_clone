import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

let currentToken = "65d1c0947b52452086e21fb391c92af6";

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
      state.todos = state.todos.filter((item) => !item.done);
    },
    deleteTodo(state, id) {
      state.todos = state.todos.filter((item) => item._id !== id);
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
    async deleteTodo({ commit }, id) {
      try {
        await axios.delete(
          `https://crudcrud.com/api/${currentToken}/todos/${id}`
        );
        commit("deleteTodo", id);
      } catch (error) {
        console.error("deleteTodo error:", error.stack);
        console.error("deleteTodo error:", error.name);
        console.error("deleteTodo error:", error.message);
        throw new Error(error);
      }
    },
    async putTodo({ dispatch }, updatedTodo) {
      try {
        const { _id, ...todoWithoutId } = updatedTodo;
        await axios.put(
          `https://crudcrud.com/api/${currentToken}/todos/${_id}`,
          todoWithoutId
        );
        dispatch("getTodos");
      } catch (error) {
        console.error("putTodo error:", error.stack);
        console.error("putTodo error:", error.name);
        console.error("putTodo error:", error.message);
        throw new Error(error);
      }
    },
    async clearCompleted({ state, commit }) {
      const completedTodos = state.todos.filter((item) => item.done);
      try {
        await Promise.all(
          completedTodos.map((todo) =>
            axios.delete(
              `https://crudcrud.com/api/${currentToken}/todos/${todo._id}`
            )
          )
        );
        commit("clearCompleted");
      } catch (error) {
        console.error("clearCompleted error:", error.stack);
        console.error("clearCompleted error:", error.name);
        console.error("clearCompleted error:", error.message);
        throw new Error(error);
      }
    },
  },
  modules: {},
});
