<script>
import ModalForm from "@/components/ModalForm.vue";

export default {
  name: "TodoItem",
  components: { ModalForm },
  data() {
    return {
      editingTodo: null,
    };
  },
  props: {
    todo: {
      type: Object,
      required: true,
    },
  },
  // computed: {
  //   todos() {
  //     return this.$store.getters.todos;
  //   },
  // },
  methods: {
    deleteTodo(todo) {
      this.$store.dispatch("deleteTodo", todo._id);
    },
    openEdit(todo) {
      this.editingTodo = { ...todo };
    },
    editTodo(updatedTodo) {
      this.$store.dispatch("putTodo", updatedTodo);
    },
    switchDone(todo) {
      todo.done = !todo.done;
      this.$store.dispatch("putTodo", todo);
    },
  },
};
</script>

<template>
  <div>
    <div class="todoItem">
      <section class="TodoItemSection">
        <span class="TodoItemSpan">{{ todo.name }}</span>
        <button @click="switchDone(todo)" :class="{ 'btn-green': todo.done }">
          {{ todo.done ? "Done" : "Not done" }}
        </button>
        <span class="TodoItemSpan"
          >Created: {{ todo.date }} (Europe/Moscow/UTC+3)</span
        >
      </section>

      <button @click="deleteTodo(todo)" class="del-btn">Delete todo</button>
      <button @click="openEdit(todo)" class="edit-btn">Edit todo</button>
    </div>

    <ModalForm
      :visible="editingTodo"
      :mode="'edit'"
      :initialTodo="editingTodo"
      @submit="editTodo"
      @close="editingTodo = null"
    />
  </div>
</template>

<style>
.TodoItemSpan {
  margin: 2%;
}
.TodoItemSection {
  margin: 3% 0 1% 0;
}
.edit-btn {
  background-color: cyan;
  border-radius: 15%;
  margin: 0 1%;
  padding: 1%;
}
.del-btn {
  background-color: indianred;
  border-radius: 15%;
  margin: 0 1%;
  padding: 1%;
}
.btn-green {
  background-color: lightgreen;
  border-radius: 10%;
  padding: 1%;
}
.todoItem {
  background-color: bisque;
  border: solid cornflowerblue;
  padding-bottom: 1%;
  margin: 1%;
  width: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}
</style>
