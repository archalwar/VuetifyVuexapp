<template>
  <v-list flat class="pt-0">
    <task v-for="task in $store.getters.taskFiltered" :key="task.id" :task="task" />
  </v-list>
</template>

<script>
export default {
  components: { task: require("@/components/Todo/Task.vue").default },
};
</script>
