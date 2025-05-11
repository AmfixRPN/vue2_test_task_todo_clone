import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

let currentToken = "c9897ed2e7854ab78caa429e13b85289";

export default new Vuex.Store({
  state: {
    todos: [],
  },
  getters: {},
  mutations: {},
  actions: {
    getTodos: () => {
      try {
        axios.get(`https://crudcrud.com/api/${currentToken}/todos`)
          .then((data) => {
            this.state.todos = data;
          });
      } catch (error) {
        console.log("Error", error.stack);
        console.log("Error", error.name);
        console.log("Error", error.message);
        throw new Error(error);
      }
    },
    postTodo: (todo) => {
      axios.post(`https://crudcrud.com/api/${currentToken}/todos`, todo);
    },
    deleteTodo: (id) => {
      axios.delete(`https://crudcrud.com/api/${currentToken}/todos/${id}`);
    },
    putTodo: (todo, id) => {
      axios.put(`https://crudcrud.com/api/${currentToken}/todos/${id}`, todo);
    },
  },
  modules: {},
});
