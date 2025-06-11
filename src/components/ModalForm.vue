<script>
export default {
  name: "ModalForm",
  props: {
    visible: Boolean,
    mode: {
      type: String,
      default: "create",
    },
    initialTodo: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      form: {
        // id: "",
        name: "",
        date: "",
        done: false,
      },
    };
  },
  watch: {
    initialTodo: {
      handler(todo) {
        this.form.name = todo.name || "";
        this.form._id = todo._id || undefined;
        // this.form.date = todo.date || "";
      },
      immediate: true,
    },
  },
  methods: {
    submit() {
      if (!this.form.name.trim()) return alert("Fill the name");
      const { formatted } = this.currentDate();
      // this.form.id = now.getTime();
      this.form.date = formatted;
      this.$emit("submit", { ...this.form });
      this.close();
      if (this.mode === "create") this.form.name = "";
      console.log(this.form);
    },
    close() {
      this.$emit("close");
    },
    currentDate() {
      const now = new Date();
      const formatted = new Intl.DateTimeFormat("ru-RU", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "Europe/Moscow",
      }).format(now);

      return { now, formatted };
    },
  },
  // computed: {
  //  currentDate() {
  //    return new Date();
  //  },
  // },
};
</script>

<template>
  <div>
    <section v-show="visible" class="modal-overlay" @click.self="close">
      <div class="modal-content">
        <button @click="close">x</button>

        <form @submit.prevent="submit">
          <input v-model="form.name" placeholder="Text" required />
          <!-- <input
            v-model="form.date"
            type="date"
            value=currentDate
            required
          /> -->
          <button type="submit">
            {{ mode === "edit" ? "Save" : "Create" }}
          </button>
        </form>
      </div>
    </section>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  min-width: 300px;
}
</style>
