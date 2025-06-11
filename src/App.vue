<template>
  <div id="app">
    <main>
      <nav>
        <div class="nav-bar">
          <button @click="showCreateModal = true" class="btn-green">
            Create todo
          </button>
          <span class="nav-title">Todo list</span>
          <button @click="clearCompletedMutation" class="del-btn">
            Clear completed todos
          </button>
        </div>

        <input
          v-model="search"
          placeholder="Search by name"
          class="searchInput"
        />
      </nav>

      <div class="main-content">
        <div v-if="!search">
          <TodoItem v-for="todo in todos" :key="todo._id" :todo="todo" />
        </div>

        <div v-else>
          <TodoItem v-for="todo in foundTodos" :key="todo._id" :todo="todo" />
          <!--          <div v-for="todo in foundTodos" :key="todo._id">-->
          <!--            {{ todo.name }}-->
          <!--          </div>-->
        </div>
      </div>

      <!-- <aside>
        <button @click="showCreateModal = true">Create todo</button>
        <button @click="clearCompletedMutation">Clear completed todos</button>
      </aside> -->

      <ModalForm
        :visible="showCreateModal"
        @submit="createTodo"
        @close="showCreateModal = false"
      />
    </main>
  </div>
</template>

<script>
import TodoItem from "@/components/TodoItem.vue";
import ModalForm from "@/components/ModalForm.vue";

import debounce from "lodash.debounce";

export default {
  name: "App",
  components: { ModalForm, TodoItem },
  data() {
    return {
      showCreateModal: false,
      search: "",
      debouncedSearchItem: "",
    };
  },
  created() {
    this.$store.dispatch("getTodos");
  },
  computed: {
    todos() {
      return this.$store.getters.todos;
    },
    // clearCompletedComputed() {
    //   return this.$store.getters.todos.filter((item) => item.done === false)
    // }
    foundTodos() {
      return this.$store.getters.todos.filter((item) =>
        item.name.toLowerCase().includes(this.debouncedSearchItem.toLowerCase())
      );
    },
  },
  methods: {
    // toClearCompleted() {
    //   return this.clearCompletedComputed;
    // }
    clearCompletedMutation() {
      this.$store.dispatch("clearCompleted");
    },
    createTodo(todo) {
      this.$store.dispatch("postTodo", todo);
    },
  },
  watch: {
    search: {
      handler: debounce(function (val) {
        this.debouncedSearchItem = val;
      }, 250),
      immediate: true,
    },
  },
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.nav-bar {
  position: relative;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
}

.nav-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-weight: bold;
}
.searchInput {
  text-align: center;
}
</style>
