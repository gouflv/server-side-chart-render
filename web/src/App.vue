<template>
  <div class="app">
    <ChartView :data="data" />
  </div>
</template>

<script setup>
import ChartView from "./ChartRender.vue";
import { reactive } from "vue";
import { computed } from "@vue/reactivity";

const query = new URLSearchParams(location.search);

const form = reactive({
  nameField: query.get("nameField") || "name",
  valueField: query.get("valueField") || "value",
  jsonData:
    query.get("data") ||
    '[{"name":"A","value":60},{"name":"B","value":70},{"name":"C","value":30},{"name":"D","value":40},{"name":"E","value":50}]',
});

const data = computed(() => {
  return JSON.parse(form.jsonData);
});

query.append("data", form.jsonData);
query.append("nameField", form.nameField);
query.append("valueField", form.valueField);
console.log(query.toString());
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.app {
  padding: 16px;
}
</style>
