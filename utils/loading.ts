import { Toast } from 'antd-mobile'

const loadingQueue: (() => void)[] = []
const openLoading = () => {
  const { close } = Toast.show({
    icon: 'loading',
    content: '加载中…',
    duration: 0,
  })
  loadingQueue.push(close)
}

const closeLoading = () => {
  if (loadingQueue.length > 0) {
    const close = loadingQueue.shift()
    close?.()
  }
}

export { openLoading, closeLoading }