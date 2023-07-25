import { onMounted, onUnmounted } from 'vue'
import _ from 'lodash'

/**
 * 大屏适配
 * @param {Object} options 设计稿的尺寸数据
 *  targetX 设计稿的宽度
 *  targetY 设计稿的高度
 *  targetRatio 设计稿的宽高比
 */
export default function useScalePage(options) {
  const resizeFunc = _.throttle(function () {
    // 动态缩放网页尺寸
    triggerScale()
  }, 100)

  // 在挂载时，添加事件监听
  onMounted(() => {
    triggerScale()
    // 在窗口尺寸发生变化时，自动缩放页面尺寸
    window.addEventListener('resize', resizeFunc)
  })

  // 在卸载时，移除事件监听
  onUnmounted(() => {
    window.removeEventListener('resize', resizeFunc)
  })

  // 大屏的适配
  function triggerScale() {
    // 设计稿:  1920 * 1080
    // 目标适配:  1920 * 1080   3840 * 2160 ( 2 * 2 ) ;  7680 * 2160( 4 * 2)

    // 1.设计稿的尺寸
    let targetX = options.targetX || 1920
    let targetY = options.targetY || 1080
    let targetRatio = options.targetRatio || 16 / 9 // 宽高比率

    // 2.拿到当前设备(浏览器)的宽度 html/body
    let currentX = document.documentElement.clientWidth || document.body.clientWidth
    let currentY = document.documentElement.clientHeight || document.body.clientHeight
    //  1920 * 1080  -> 3840 * 2160

    // 3.计算缩放比例
    let scaleRatio = currentX / targetX // 参照宽度进行缩放 ( 默认情况 )
    let currentRatio = currentX / currentY // 宽高比率

    // 超宽屏：宽高比 > 16/9
    // 设置 body 元素的宽高为设计稿的宽高，然后等比例缩放高度到屏幕的视口高度
    // 显示效果就是页面和视口高度一致，水平居中显示
    if (currentRatio > targetRatio) {
      // 4.开始缩放网页：宽高比 <= 16/9
      scaleRatio = currentY / targetY // 参照高度进行缩放
      document.body.style = `width:${targetX}px; height:${targetY}px;transform: scale(${scaleRatio}) translateX(-50%); left: 50%`
    } else {
      // 4.开始缩放网页：宽高比 <= 16/9
      // 设置 body 元素的宽高为设计稿的宽高，然后等比例缩放宽度到屏幕的视口宽度，高度自适应
      document.body.style = `width:${targetX}px; height:${targetY}px; transform: scale(${scaleRatio})`
    }
  }
}
