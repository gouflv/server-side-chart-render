<template>
  <div ref="chartEl" style="width: 500px; height: 500px"></div>
</template>

<script setup>
import { Radar } from "@antv/g2plot";
import { defineProps, onMounted, ref } from "vue";

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
  nameField: {
    type: String,
    default: "name",
  },
  valueField: {
    type: String,
    default: "value",
  },
});

const chartEl = ref();

function render() {
  const { data, nameField, valueField } = props;
  const chart = new Radar(chartEl.value, {
    data: data,
    xField: nameField,
    yField: valueField,
    meta: {
      value: {
        min: 0,
        max: Math.max(...data.map((d) => d[valueField])),
      },
    },
    xAxis: {
      line: null,
      tickLine: null,
    },
    yAxis: {
      grid: {
        line: {
          type: "line",
        },
        alternateColor: "rgba(0, 0, 0, 0.04)",
      },
    },
    area: {},
    animation: false,
    tooltip: false,
  });
  chart.render();
}

onMounted(render);
</script>
