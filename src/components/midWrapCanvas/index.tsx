import { computed, defineComponent, inject, provide, ref, reactive } from "vue"
import "./index.less"
import { IState, IBlock } from "../../types"
import MidWrapCanvasBlock from "../midWrapCanvasBlock"

export default defineComponent({
  setup() {
    const state = inject<IState>("state")
    const styles = computed(() => {
      return {
        width: `${state.canvas.width}px`,
        height: `${state.canvas.height}px`,
      }
    })
    //辅助线 x纵向 y横向
    let makelineX = ref<number>(null)
    let makelineY = ref<number>(null)
    /**
     * 点击canvas盒子 取消选中
     */
    function clearFocus() {
      state.blocks.forEach((block: IBlock) => {
        block.focus = false
      })
    }
    function handleMakeline(x: number, y: number) {
      makelineX.value = x
      makelineY.value = y
    }
    return () => {
      return (
        <div class='midWrapCanvas'>
          <div class='mainWrapCanvasContainer' style={styles.value} onMousedown={clearFocus}>
            {state.blocks.length > 0 &&
              state.blocks.map((block, index) => (
                <MidWrapCanvasBlock block={block} index={index} onUpdateMakeline={handleMakeline} />
              ))}
            {state.blocks.length == 0 && (
              <div style="margin:20px">
                <h2 style="font:24px bold">操作区</h2>
                <p>请将左侧按钮拖拽到此区域进行操作</p>
              </div>
            )}
            {makelineX.value > 0 && <div class='makelineX' style={{ left: `${makelineX.value}px` }}></div>}
            {makelineY.value > 0 && <div class='makelineY' style={{ top: `${makelineY.value}px` }}></div>}
          </div>
        </div>
      )
    }
  },
})
