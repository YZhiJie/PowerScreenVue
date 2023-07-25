<template>
  <main class="screen-bg">
    <div class="header"></div>

    <div class="left-top">
      <pie-echarts :echarts-data="chargingPile" />
    </div>
    <div class="left-bottom">
      <line-echarts :echarts-data="processMonitoring" />
    </div>

    <div class="right-top">
      <right-top-panel :panelItems="chargingTop4" :percentage="percentage" />
    </div>
    <div class="right-center">
      <bar-echarts :echarts-data="chargingStatistics" />
    </div>
    <div class="right-bottom">
      <right-bottom-svg :dots="exceptionMonitoring" />
    </div>

    <div class="center-top">
      <center-svg />
    </div>
    <div class="center-bottom">
      <bottom-panel :panel-items="dataAnalysis" />
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import PieEcharts from '@/components/pie-echarts.vue'
import LineEcharts from '@/components/line-echarts.vue'
import BarEcharts from '@/components/bar-echarts.vue'

import RightBottomSvg from '@/components/right-bottom-svg.vue'
import RightTopPanel from '@/components/right-top-panel.vue'

import CenterSvg from '@/components/center-svg.vue'
import BottomPanel from '@/components/bottom-panel.vue'

import {
  chargingPileData,
  processMonitoringData,
  chargingStatisticsData,
  exceptionMonitoringData,
  dataAnalysisData,
  chargingTop4Data,
} from './config/home-data'

import { getPowerScreenData } from '../services'

// 充电桩饱和数据
const chargingPile = ref(chargingPileData)
// 流程监控
const processMonitoring = ref(processMonitoringData)
// 充电桩数据分析
const chargingStatistics = ref(chargingStatisticsData)
// 异常监控数据
const exceptionMonitoring = ref(exceptionMonitoringData)
// 充电桩 Top4 占比数据
const chargingTop4 = ref(chargingTop4Data)
const percentage = ref(0)

// 数据分析
const dataAnalysis = ref(dataAnalysisData)

getPowerScreenData().then((res) => {
  chargingPile.value = res.data.chargingPile.data
  processMonitoring.value = res.data.processMonitoring.data
  chargingStatistics.value = res.data.chargingStatistics.data
  exceptionMonitoring.value = res.data.exceptionMonitoring.data
  dataAnalysis.value = res.data.dataAnalysis.data
  chargingTop4.value = res.data.chargingTop4.data
  percentage.value = res.data.chargingTop4.totalPercentage
})
</script>

<style scoped>
.screen-bg {
  /* 定位 */
  position: absolute;
  width: 100%;
  height: 100%;
  /* 背景 */
  background-color: #070a3c;
  background-image: url(@/assets/images/bg.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.header {
  /* 定位 */
  position: absolute;
  top: 21px;
  /* 绝对定位元素宽高占满父元素 + margin: auto 默认值 */
  left: 0;
  right: 0;

  height: 59px;

  background-image: url(@/assets/images/bg_header.svg);
  background-repeat: no-repeat;
  /* background-size: 100% 100%; */
}

.left-top {
  /* 定位 */
  position: absolute;
  top: 116px;
  left: 16px;
  width: 536px;
  height: 443px;

  background-image: url(@/assets/images/bg_left-top.svg);
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.left-bottom {
  /* 定位 */
  position: absolute;
  bottom: 49px;
  left: 16px;
  width: 536px;
  height: 443px;

  background-image: url(@/assets/images/bg_left-bottom.svg);
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.right-top {
  position: absolute;
  right: 17px;
  top: 96px;
  width: 519px;
  height: 327px;

  background-image: url(../assets/images/bg_right_top.svg);
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.right-center {
  position: absolute;
  right: 17px;
  top: 443px;
  width: 519px;
  height: 327px;

  background-image: url(../assets/images/bg_right_center.svg);
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.right-bottom {
  position: absolute;
  right: 17px;
  bottom: 49px;
  width: 519px;
  height: 242px;

  display: flex;
  justify-content: center;
  align-items: center;

  background-image: url(../assets/images/bg_right_bottom.svg);
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.center-top {
  position: absolute;
  right: 540px;
  bottom: 272px;
  width: 823px;
  height: 710px;
  box-sizing: border-box;
  padding-left: 15px;

  /* border: 5px solid pink; */
}

.center-bottom {
  position: absolute;
  right: 540px;
  bottom: 49px;
  width: 823px;
  height: 209px;

  background-image: url(../assets/images/bg_bottom.svg);
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
</style>
