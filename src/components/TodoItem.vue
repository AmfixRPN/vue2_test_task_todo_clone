<script>
import store from "@/store/index";

export default {
  name: "TodoItem",
  beforeMount() {
    store.actions.getTodos.dispatch();
  }
};
</script>

<template>
  <div>
    <div v-for="todo in store.todos">
      <span>{{ todo.id }}</span>
      <span>{{ todo.name }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>