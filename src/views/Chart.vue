<template>
  <div />
</template>

<script>
export default {
  components: {
    // LineChart,
  },
  data() {
    return {
      api: "https://script.google.com/macros/s/AKfycbxiI5h8LTu5EV6iOdZ5NtJsjzjKRa0Tq75gxNVaKkH2MmMX3KWt6ErXZJigxpUu5bMM7g/exec",
      isLoading: true,
      chartdata: [],
      date: [],
      peak_loading: [],
      reserve_capacity: [],
      reserve_rate: [],
    };
  },
  methods: {
    getTaipower() {
      this.$http
        .get(this.api)
        .then((resp) => {
          if (resp.data?.status !== "success") throw Error(resp.data?.message);

          // this.chartdata = resp.data?.data;
          let data = resp.data?.data;
          // data = data.slice(0, 30);

          this.date = data.map((item) => item.date);
          this.peak_loading = data.map((item) => item.peak_loading);
          this.reserve_capacity = data.map((item) => item.reserve_capacity);
          this.reserve_rate = data.map((item) => item.reserve_rate);

          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err?.message);
        });
    },
  },
  mounted() {
    this.getTaipower();
  },
};
</script>
