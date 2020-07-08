<template>
  <div>
    <canvas class="chart" :id="id" :data="chartData"></canvas>
  </div>
</template>

<script>
const F2 = require("@antv/f2");

export default {
  props: {
    // 图表Id
    id: {
      type: String
    },
    // 图表数据
    chartData: {},
    // 横坐标值
    xUnit: {
      type: Boolean,
      default: true
    },
    // 轴标题
    itemTitle: {
      type: String
    },
    // 单位
    unit: {
      type: String
    }
  },
  data() {
    return {
      chart: null // 图表绑定
    };
  },
  watch: {
    chartData: {
      handler: function(n) {
        if (this.chart) {
          this.chart.clear();
        }
        this.initChart(this.id, this.chartData);
        this.chart.changeData(n);
      }
    }
  },
  methods: {
    initChart(id, data) {
      if (!document.getElementById(id)) return;
      this.chart = new F2.Chart({
        id,
        pixelRatio: window.devicePixelRatio
      });
      console.log("xUnit", this.xUnit);

      this.chart.source(
        data,
        this.xUnit
          ? {
              date: {
                type: "timeCat",
                range: [0, 1],
                tickCount: 3
              }
            }
          : {
              date: {
                range: [0, 1],
                tickCount: 3
              }
            }
      );
      this.chart.tooltip({
        custom: true,
        showXTip: true,
        showYTip: true,
        snap: true,
        crosshairsType: "xy",
        crosshairsStyle: {
          lineDash: [2]
        },
        // showCrosshairs: true,
        // showItemMarker: true,
        onShow: ev => {
          const items = ev.items;
          items[0].name = null;
          items[0].value =
            this.unit === "￥"
              ? `￥${items[0].value}`
              : `${items[0].value}${this.unit}`;
        }
      });
      this.chart.axis("date", {
        label: function label(text, index, total) {
          const textCfg = {};
          if (index === 0) {
            textCfg.textAlign = "left";
          } else if (index === total - 1) {
            textCfg.textAlign = "right";
          }
          return textCfg;
        }
      });
      let color;
      if (this.$store.state.app.className === "themea") {
        color = "#0082FF";
      } else {
        color = "#2accdd";
      }
      this.chart
        .line()
        .position(this.itemTitle)
        .adjust("stack")
        .color("medalType", function() {
          return color;
        });
      this.chart.render();
    },
    clearChart() {
      if (this.chart) {
        this.chart.clear();
        this.chart.destroy();
        this.chart = null;
      }
    }
  },
  beforeDestroy() {
    this.clearChart();
  }
};
</script>

<style lang="less" scoped>
.chart {
  margin: 0 auto;
  width: 100% !important;
  height: 350px !important;
}
</style>
