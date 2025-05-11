<template>
  <div id="app">
    <main>
      <TodoItem />
    </main>
  </div>
</template>

<script>

import TodoItem from "@/components/TodoItem.vue";

export default {
  name: "App",
  components: { TodoItem },
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
