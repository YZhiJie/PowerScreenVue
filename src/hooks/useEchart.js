import * as echarts from 'echarts'
import { onUnmounted } from 'vue'

export default function useEchart(divEl) {
  // https://echarts.apache.org/zh/api.html#echarts.init
  const echartInstance = echarts.init(divEl, null, { renderer: 'svg' })

  onUnmounted(() => {
    echartInstance.dispose() // 在组件被卸载时，销毁实例
  })

  function setOption(option) {
    echartInstance.setOption(option)
  }

  function resizeEchart() {
    echartInstance.resize()
  }

  return {
    echartInstance,
    setOption,
    resizeEchart,
  }
}
