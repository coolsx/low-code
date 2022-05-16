import { defineComponent, inject, onMounted } from "vue"
import "./index.less"
import { components } from "../../config"
import { IPreview, IState } from "../../types"
export default defineComponent({
  setup() {
    const state = inject<IState>("state")
    let curComponent: IPreview = null //记录一下当前点击的组件

    /**
     * 进入canvas 改变指针样式
     * @param e
     */
    function dragenter(e: DragEvent) {
      e.dataTransfer.dropEffect = "move"
    }

    /**
     * 移动 必须组织默认行为
     * @param e
     */
    function dragover(e: DragEvent) {
      e.preventDefault()
    }

    /**
     * 离开canvas 改变指针样式
     * @param e
     */
    function dragleave(e: DragEvent) {
      e.dataTransfer.dropEffect = "none"
    }

    /**
     * 松手 往state里面push进去新拖拽的组件
     * @param e
     */
    function drop(e: DragEvent) {
      state.blocks.push({
        left: e.offsetX,
        top: e.offsetY,
        zIndex: 1,
        key: curComponent.key,
        alignCenter: true,
        focus:false
      })
      curComponent = null
    }
    //拖拽组件
    function dragStart(e: DragEvent, component: IPreview): void {
      const midWrapCanvas = document.querySelector(
        ".midWrapCanvas"
      ) as HTMLElement
      midWrapCanvas.addEventListener("dragenter", dragenter)
      midWrapCanvas.addEventListener("dragover", dragover)
      midWrapCanvas.addEventListener("dragleave", dragleave)
      midWrapCanvas.addEventListener("drop", drop)
      curComponent = component
    }
    //拖拽组件结束 取消监听
    function drangend() {
      const midWrapCanvas = document.querySelector(
        ".midWrapCanvas"
      ) as HTMLElement
      midWrapCanvas.removeEventListener("dragenter", dragenter)
      midWrapCanvas.removeEventListener("dragover", dragover)
      midWrapCanvas.removeEventListener("dragleave", dragleave)
      midWrapCanvas.removeEventListener("drop", drop)
    }

    return () => {
      return (
        <div class='leftWrap'>
          <h2>组件总览</h2>
          <ul>
            {components.map(component => (
              <li
                draggable
                onDragstart={e => dragStart(e, component)}
                onDragend={drangend}>
                <a-card style='width: 250px'>
                  <a-card-meta title={component.label} />
                  <div style='margin-top:20px'>{component.preview()}</div>
                </a-card>
              </li>
            ))}
          </ul>
        </div>
      )
    }
  },
})
