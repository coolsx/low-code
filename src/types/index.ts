export interface ICanvas {
  width: number
  height: number
}

export interface IBlock {
  left: number
  top: number
  key: string
  alignCenter?: boolean
  focus?: boolean
  width?: number
  height?: number
  zIndex?: number
}

//整体描述
export interface IState {
  canvas: ICanvas
  blocks: IBlock[]
}

//左侧组件预览
export interface IPreview {
  label: string
  key: string
  preview: () => any
  render: () => any
}

export type wh = {
  top: number
  left: number
}

export type ILine = {
  x: { showTop?: number; showLeft?: number; top?: number; left?: number }[]
  y: { showTop?: number; showLeft?: number; top?: number; left?: number }[]
}
//拖拽前对象
export interface IDragStartState {
  startX: number
  startY: number
  startLeft?:number
  startTop?:number
  startPos: wh[]
  lines?: ILine
}
