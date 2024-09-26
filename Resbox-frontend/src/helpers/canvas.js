export const canvas_index = () => {
  const canvas = document.querySelector('canvas')
  if (canvas) {
    canvas.style.zIndex = '1001'
    //canvas.style.position = 'fixed'
  }
}