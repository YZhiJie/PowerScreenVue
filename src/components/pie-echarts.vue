<template>
  <!-- echarts 容器 -->
  <div ref="divRef" class="home" :style="{ width: width, height: height }"></div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import useEchart from '@/hooks/useEchart'

const props = defineProps({
  width: {
    type: String,
    default: '100%',
  },
  height: {
    type: String,
    default: '100%',
  },
  echartsData: {
    type: Array,
    default: () => [],
  },
})

// 监听 echartsData 的变化
watch(
  () => props.echartsData,
  (newV, oldV) => {
    setupEchart(newV) // 数据变化时自动执行
  }
)

const divRef = ref(null)
let myChart = null
onMounted(() => {
  setupEchart(props.echartsData) // 首次加载时执行一次
})

function setupEchart(echartsData = []) {
  // https://echarts.apache.org/zh/api.html#echarts.init
  if (!myChart) {
    myChart = useEchart(divRef.value)
  }
  const options = getOption(echartsData)
  myChart.setOption(options)
}

function getOption(echartDatas = []) {
  // 准备数据
  // let pieDatas = [
  //   {
  //     value: 100,
  //     name: '广州占比',
  //     percentage: '5%',
  //     color: '#34D160',
  //   },
  //   {
  //     value: 200,
  //     name: '深圳占比',
  //     percentage: '4%',
  //     color: '#027FF2',
  //   },
  //   {
  //     value: 300,
  //     name: '东莞占比',
  //     percentage: '8%',
  //     color: '#8A00E1',
  //   },
  //   {
  //     value: 400,
  //     name: '佛山占比',
  //     percentage: '10%',
  //     color: '#F19610',
  //   },
  //   {
  //     value: 500,
  //     name: '中山占比',
  //     percentage: '20%',
  //     color: '#6054FF',
  //   },
  //   {
  //     value: 600,
  //     name: '珠海占比',
  //     percentage: '40%',
  //     color: '#00C6FF',
  //   },
  // ]

  let colors = echartDatas.map((item) => {
    return item.color
  })

  let data = echartDatas.map((item) => {
    return {
      value: item.value,
      name: item.name,
    }
  })

  let total = echartDatas.reduce((a, b) => {
    return a + b.value * 1
  }, 0)

  const option = {
    color: colors,
    title: {
      text: `{nameSty| 充电桩总数}\n{number|${total}}`,
      top: '50%',
      left: '30%',
      textStyle: {
        rich: {
          nameSty: {
            fontSize: 19,
            color: 'white',
            padding: [10, 0],
          },
          number: {
            fontSize: 24,
            color: 'white',
            padding: [4, 0, 0, 20],
          },
        },
      },
    },
    legend: {
      orient: 'vertical',
      right: '10%',
      top: '18%',
      itemGap: 20,
      itemWidth: 16,
      itemHeigth: 16,
      icon: 'rect',
      formatter: function (name) {
        var currentItem = echartDatas.find((item) => item.name === name)
        return (
          '{nameSty|' +
          currentItem.name +
          '}\n' +
          '{numberSty|' +
          currentItem.value +
          '个 }' +
          '{preSty|' +
          currentItem.percentage +
          '}'
        )
      },
      textStyle: {
        rich: {
          nameSty: {
            fontSize: 12,
            color: '#FFFFFF',
            padding: [10, 14],
          },
          numberSty: {
            fontSize: 12,
            color: '#40E6ff',
            padding: [0, 0, 0, 14],
          },
          preSty: {
            fontSize: 12,
            color: '#40E6ff',
          },
        },
      },
    },
    series: [
      {
        type: 'pie',
        center: ['40%', '57%'],
        radius: ['30%', '75%'],
        label: {
          show: false,
        },
        data: data,
        roseType: 'area',
      },
    ],
  }

  return option
}
</script>

<style scoped></style>
