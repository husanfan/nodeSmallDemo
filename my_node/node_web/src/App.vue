<template>
  <div id="app">
    <div>
      <img src="./assets/logo.png">
    </div>
    <div>
      输入id:
      <input type="text" v-model="userId">
      <button @click="getAddress">获取用户名</button>
    </div>
    <h2>用户名:{{userName}}</h2>
    <div class="chart" ref="chart"></div>
  </div>
</template>

<script>
import axios from "axios";
const Qs = require("qs");

//  设置默认请求头
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
//  设置请求超时之前的毫秒数
axios.defaults.timeout = 60000;
//  请求拦截器
// download url
const downloadUrl = url => {
  let iframe = document.createElement("iframe");
  iframe.style.display = "none";
  iframe.src = url;
  iframe.onload = function() {
    document.body.removeChild(iframe);
  };
  document.body.appendChild(iframe);
};
axios.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  data => {
    return data;
  },
  error => {
    return Promise.reject(error);
  }
);

// 引入基本模板
let echarts = require("echarts/lib/echarts");
// 引入折线图组件
require("echarts/lib/chart/line");
// 引入提示框和title组件，图例
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
require("echarts/lib/component/legend");
require("echarts/lib/component/legendScroll"); // 图例滚动
// Vue.prototype.$echarts = echarts;

export default {
  name: "app",
  data() {
    return {
      userName: "",
      chartOption: {
        title: {
          text: "未来一周气温变化",
          subtext: "纯属虚构"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          selectedMode: "single",
          data: ["订单数", "总金额"]
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: [
              "2018-1-1",
              "2018-1-2",
              "2018-1-3",
              "2018-1-4",
              "2018-1-5",
              "2018-1-6",
              "2018-1-7"
            ]
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "订单数",
            axisLabel: {
              formatter: "{value}个"
            }
          },
          {
            type: "value",
            name: "总金额",
            axisLabel: {
              formatter: "{value}元"
            }
          }
        ],
        series: [
          {
            name: "订单数",
            type: "line",
            data: [11, 11, 15, 13, 12, 13, 10]
          },
          {
            name: "总金额",
            type: "line",
            yAxisIndex: 1,
            data: [10000, 11000, 20000, 15000, 16000, 12000, 9000]
          }
        ]
      },
      userId: ""
    };
  },
  methods: {
    getAddress() {
      if(!this.userId){
        alert("请输入id");
        return;
      }
      axios
        .get("http://localhost:3000?id=" + this.userId)
        .then(res => {
          console.log(res);
          this.userName = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    drawChart() {
      // 绘制图表
      console.log(this.$refs.chart);
      let chart = echarts.init(this.$refs.chart);
      chart.setOption(this.chartOption);
    }
  },
  mounted() {
    this.drawChart();
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.chart {
  width: 1000px;
  height: 500px;
  margin: 0 auto;
}

h2 {
  text-align: left;
  width: 300px;
  margin: 20px auto;
}
</style>
