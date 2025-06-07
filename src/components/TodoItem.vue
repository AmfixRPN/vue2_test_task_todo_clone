<script>
export default {
  name: "TodoItem",
  data() {
    return {
      showEditModal: false,
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
      this.$store.commit("deleteTodo", todo);
    },
  },
};
</script>

<template>
  <div>
    <section>
      <span>{{ todo.name }}</span>
      <span>{{ todo.done ? "Done" : "Not done" }}</span>
      <span>Created: {{ todo.date }}</span>
    </section>

    <button @click="deleteTodo(todo)">Delete todo</button>
    <button @click="showEditModal = true">Edit todo</button>
  </div>
</template>

<style scoped lang="scss"></style>
