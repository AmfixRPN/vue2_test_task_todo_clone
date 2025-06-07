<template>
  <div id="app">
    <main>
      <span>Todo list</span>
      <TodoItem v-for="todo in todos" :key="todo.id" :todo="todo" />
      <aside>
        <button @click="showCreateModal = true">Create todo</button>
        <button @click="clearCompletedMutation">Clear completed todos</button>
      </aside>
    </main>
  </div>
</template>

<script>
import TodoItem from "@/components/TodoItem.vue";

export default {
  name: "App",
  components: { TodoItem },
  data() {
    return { showCreateModal: false };
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
  },
  methods: {
    // toClearCompleted() {
    //   return this.clearCompletedComputed;
    // }
    clearCompletedMutation() {
      this.$store.commit("clearCompleted");
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
