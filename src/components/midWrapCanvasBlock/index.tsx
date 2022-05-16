import { computed, defineComponent, inject, onMounted, PropType, reactive, ref } from "vue"
import "./index.less"
import { IBlock, IState, IDragStartState, ILine } from "../../types"
import { componentMap } from "../../config"
export default defineComponent({
  props: {
    block: Object as PropType<IBlock>,
    index: Number,
    onUpdateMakeline: Function,
  },
  setup(props,{emit}) {
    const state = inject<IState>("state")
    //算出此block的渲染样式
    const blockStyles = computed(() => {
      return {
        top: `${props.block.top}px`,
        left: `${props.block.left}px`,
        zIndex: props.block.zIndex,
      }
    })

    //第一次拖拽到canvas区域后，将组件放置到鼠标中间
    const blckRef = ref<HTMLElement>(null)
    onMounted(() => {
      let { offsetWidth, offsetHeight } = blckRef.value
      props.block.width = offsetWidth
      props.block.height = offsetHeight
      if (props.block.alignCenter) {
        props.block.top = props.block.top - offsetHeight / 2
        props.block.left = props.block.left - offsetWidth / 2
        props.block.alignCenter = false
      }
    })

    //获取选中与没选中的block
    const focusData = computed(() => {
      let focusList: IBlock[] = []
      let unfocusList: IBlock[] = []
      state.blocks.forEach(block => {
        if (block.focus) {
          focusList.push(block)
        } else {
          unfocusList.push(block)
        }
      })
      return {
        focusList,
        unfocusList,
      }
    })

    //记录点击的时候鼠标位置信息
    let dragState: IDragStartState = {
      startX: 0,
      startY: 0,
      startPos: [],
    }
    //按下鼠标 拖动
    function blockMousedown(e: MouseEvent) {
      e.preventDefault()
      e.stopPropagation()
      // 点击shift可以连续选中
      if (!e.shiftKey) {
        state.blocks.forEach(block => {
          block.focus = false
        })
      }
      if (!props.block.focus) {
        state.blocks[props.index].focus = true
      }
      //点击以后监听鼠标移动事件
      mousedown(e)
    }

    function mousedown(e: MouseEvent) {
      const { width: bWidth, height: bHeight, left: bLeft, top: bTop } = props.block //拖拽的最后一个block
      dragState = {
        startX: e.clientX,
        startY: e.clientY,
        startLeft: bLeft,
        startTop: bTop,
        startPos: focusData.value.focusList.map(({ top, left }) => ({ top, left })),
        lines: (() => {
          const { unfocusList } = focusData.value
          let lines: ILine = { x: [], y: [] }
          // 把整个容器的宽高加进去 也做辅助线处理
          const referList = [...unfocusList,{
            left:0,
            top:0,
            width:state.canvas.width,
            height:state.canvas.height
          }]
          referList.forEach(block => {
            const { width, height, top, left } = block
            //先存横辅助线
            lines.y.push({ showTop: top, top: top }) //顶对顶对齐
            lines.y.push({ showTop: top, top: top - bHeight }) //顶对底对齐
            lines.y.push({ showTop: top + height / 2, top: top + height / 2 - bHeight / 2 }) //中间对中间
            lines.y.push({ showTop: top + height, top: top + height }) //底对顶对齐
            lines.y.push({ showTop: top + height, top: top + height - bHeight }) //底对底对齐
            //再存纵向辅助线
            lines.x.push({ showLeft: left, left: left }) //左对左对齐
            lines.x.push({ showLeft: left + width, left: left + width }) //右对左对齐
            lines.x.push({ showLeft: left + width / 2, left: left + width / 2 - bWidth / 2 }) //中间对中间
            lines.x.push({ showLeft: left + width, left: left + width - bWidth }) //右对右
            lines.x.push({ showLeft: left, left: left - bWidth }) //左对右
          })

          return lines
        })(),
      }
      document.addEventListener("mousemove", mousemove)
      document.addEventListener("mouseup", mouseup)
    }

    function mousemove(e: MouseEvent) {
      let durX = e.clientX - dragState.startX
      let durY = e.clientY - dragState.startY
      let curLeft = e.clientX - dragState.startX + dragState.startLeft
      let curTop = e.clientY - dragState.startY + dragState.startTop

      //计算当前block最新的left top与lines的10条线对比
      //先计算横线 距离参照物元素还有5像素 就显示这根线
      let y: number
      for (let i = 0; i < dragState.lines.y.length; i++) {
        const { top, showTop } = dragState.lines.y[i] //获取每一根线
        if (Math.abs(top - curTop) < 5) {
          //如果小于5像素 就说明接近了
          durY = top - dragState.startTop //使得拖动的block快速吸到横向辅助线上
          y = showTop
          break
        }
      }
      //再计算纵线 距离参照物元素还有5像素 就显示这根线
      let x: number
      for (let i = 0; i < dragState.lines.x.length; i++) {
        const { left, showLeft } = dragState.lines.x[i] //获取每一根线
        if (Math.abs(left - curLeft) < 5) {
          //如果小于5像素 就说明接近了
          durX = left - dragState.startLeft //使得拖动的block快速吸到横向辅助线上
          x = showLeft
          break
        }
      }
      emit('updateMakeline',x,y)
      
      //拖动全部已选中的
      focusData.value.focusList.forEach((block, index) => {
        block.top = dragState.startPos[index].top + durY
        block.left = dragState.startPos[index].left + durX
      })
    }

    function mouseup() {
      document.removeEventListener("mousemove", mousemove)
      document.removeEventListener("mouseup", mouseup)
      emit('updateMakeline',null,null)
    }

    return () => {
      return (
        <div class='midWrapCanvasBlock' style={blockStyles.value} ref={blckRef} onMousedown={e => blockMousedown(e)}>
          <div class={props.block.focus ? "focus" : ""} style='border:2px solid transparent'>
            {componentMap[props.block.key].render()}
          </div>
        </div>
      )
    }
  },
})
