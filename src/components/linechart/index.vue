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
      myChart: null // 图表绑定
    };
  },
  watch: {
    $route: {
      handler: function() {
        this.clearChart();
        this.initChart(this.id, this.chartData);
      }
    },
    chartData: {
      handler: function(n) {
        if (n) {
          this.initChart(this.id, this.chartData);
          this.chart.changeData(n);
          this.chart.repaint();
          return;
        }
        this.chart.clear();
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
      this.chart.source(
        data,
        this.xUnit
          ? {
              date: {
                range: [0, 1],
                type: "timeCat",
                tickCount: 4
              }
            }
          : {}
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
        showCrosshairs: true,
        showItemMarker: true,
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
        .color("medalType", function() {
          return color;
        });
      this.chart.render();
    },
    clearChart() {
      if (this.myChart) this.myChart.clear();
    }
  },
  beforeDestroy() {
    this.clearChart();
  }
};
</script>

<style lang="scss" scoped>
.chart {
  margin: 0 auto;
  width: 100% !important;
  height: 350px !important;
}
</style>