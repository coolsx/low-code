import { defineComponent } from "vue"
import "./index.less"
export default defineComponent({
  setup() {
    return () => {
      return (
        <ul class='rightWrap'>
          <li>
            <h3>容器宽度</h3>
            <div>
              <a-input-number value={1100} addon-before="+" addon-after="-" />
            </div>
          </li>
          <li>
            <h3>容器高度</h3>
            <div>
              <a-input-number value={1800} addon-before="+" addon-after="-" />
            </div>
          </li>
          <li>
            <div class='btnWrap'>
              <div><a-button type="primary">应用</a-button></div>
              <div><a-button>重置</a-button></div>
            </div>
          </li>
        </ul>
      )
    }
  },
})
