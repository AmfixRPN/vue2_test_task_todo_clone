<script>
export default {
  name: "TodoItem"
};
</script>

<template>
  <div>
    <div v-for="todo in store.todos">
      {{ todo }}
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>