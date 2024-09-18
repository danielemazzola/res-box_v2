export const canvas_index = () => {
  const canvas = document.querySelector('canvas')
  if (canvas) {
    canvas.style.zIndex = '9999'
    canvas.style.position = 'fixed'
  }
}