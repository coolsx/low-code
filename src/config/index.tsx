import { IPreview } from "../types"

interface ICompMap {
  [propName: string]: IPreview
}

const components: IPreview[] = []
const componentMap: ICompMap = {}

function regeistr(v: IPreview) {
  components.push(v)
  componentMap[v.key] = v
}

regeistr({
  key: "text",
  label: "文本 text",
  preview: () => "文本组件，请拖拽到右侧区域开始搭建页面吧",
  render: () => "点击可以拖拽位置，按住shift可连续选中多个组件",
})

regeistr({
  key: "button",
  label: "button 按钮",
  preview: () => <a-button type="primary">预览按钮</a-button>,
  render: () => <a-button type="primary">渲染按钮</a-button>,
})

regeistr({
  key: "input",
  label: "input 输入框",
  preview: () => <a-input placeholder='预览输入框' />,
  render: () => <a-input placeholder='渲染输入框' />,
})

regeistr({
  key: "switch",
  label: "switch 开关",
  preview: () => <a-switch />,
  render: () => <a-switch />,
})

regeistr({
  key: "rate",
  label: "rate 评分",
  preview: () => <a-rate value={2} />,
  render: () => <a-rate  value={2}/>,
})

regeistr({
  key: "spin",
  label: "spin 加载中",
  preview: () => <a-spin tip="Loading..."/>,
  render: () => <a-spin tip="Loading..."/>,
})

regeistr({
  key: "progress",
  label: "progress 进度圈",
  preview: () => <a-progress type="circle" percent={75} />,
  render: () => <a-progress type="circle" percent={75} />,
})

export { components, componentMap }