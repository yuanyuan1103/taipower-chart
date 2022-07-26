<template>
  <VueApexCharts
    v-if="!isLoading"
    type="line"
    width="100%"
    :options="chartOptions"
    :series="series"
  />
  <div v-else class="container">資料未抓到 請重新整理頁面</div>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";

export default {
  components: {
    VueApexCharts,
  },
  data() {
    return {
      api: "https://script.google.com/macros/s/AKfycbwQUMHFzgMkQMOjJHDj9286__c_ViUqQQX3Xg2yctKJHyHC9yrh-TGjujQtOYA5bp5KCA/exec",
      isLoading: true,
      date: [],
      peak_loading: [],
      reserve_capacity: [],
      reserve_rate: [],

      chartOptions: {
        chart: {
          height: 350,
          zoom: { enabled: false },
        },
        title: {
          text: "Taipower-chart",
        },
        tooltip: {
          x: {
            show: false,
            // formatter: (val, opts) =>
            //   opts.w.globals.lastXAxis.categories[opts.dataPointIndex],
          },
        },
        xaxis: {
          type: "category",
          categories: ["2022/01/01", "2022/01/02", "2022/01/03"],
          labels: {
            // formatter: (val) => {
            //   const date = new Date(val);
            //   return date.getDate() === 1
            //     ? `${date.getFullYear()}年${date.getMonth() + 1}月`
            //     : val;
            // },
            rotate: -10,
          },
          // tooltip: {
          //   formatter: function (val, opts) {
          //     console.log(val);
          //   },
          // },
        },
        yaxis: [
          {
            seriesName: "瞬時尖峰負載",
            //seriesName: "peak_loading",
            max: 4800,
            min: 0,
            axisBorder: { show: true },
            title: { text: "萬瓩" },
            labels: { formatter: (val) => val },
          },
          {
            seriesName: "瞬時尖峰負載",
            // seriesName: "peak_loading",
            show: false,
          },
          {
            seriesName: "備轉容量率",
            // seriesName: "reserve_rate",
            opposite: true,
            max: 30,
            min: 0,
            axisBorder: { show: true },
            title: { text: "備轉率" },
            labels: { formatter: (val) => `${val}%` },
          },
        ],
      },
      series: [
        {
          name: "瞬時尖峰負載",
          // name: "peak_loading",
          type: "line",
          data: [2566.1, 2591.5, 2997.6],
        },
        {
          name: "備轉容量",
          // name: "reserve_capacity",
          type: "column",
          data: [334.5, 364.1, 318.4],
        },
        {
          name: "備轉容量率",
          // name: "reserve_rate",
          type: "area",
          data: [13.04, 14.05, 10.62],
        },
      ],
    };
  },
  methods: {
    updateChart() {
      //將日期傳給X軸
      this.chartOptions = {
        ...this.chartOptions,
        xaxis: { ...this.chartOptions.xaxis, categories: this.date },
      };

      // console.log("config", {
      //   ...this.chartOptions,
      //   xaxis: { ...this.chartOptions.xaxis, categories: this.date },
      // });

      //將三種資料分別傳入Y軸
      this.series = this.series.map((item) => ({
        ...item,
        data: this[item.name],
      }));
    },
    getTaipower() {
      this.$http
        .get(this.api)
        .then((resp) => {
          if (resp.data?.status !== "success") throw Error(resp.data?.message);

          const data = resp.data?.data;

          this.date = data.map((item) => item.date);
          this.peak_loading = data.map((item) => item.peak_loading);
          this.瞬時尖峰負載 = data.map((item) => item.peak_loading);
          this.備轉容量 = data.map((item) => item.reserve_capacity);
          this.備轉容量率 = data.map((item) => item.reserve_rate);

          this.updateChart();

          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err?.message);
        });
    },
  },
  mounted() {
    this.getTaipower();
    // this.isLoading = false;
  },
};
</script>
