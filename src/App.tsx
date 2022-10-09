import { useEffect, useRef, useState } from 'react'
import styles from './App.module.css'
import Menu from './components/Menu'

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null!)
  const ctxRef = useRef<any>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [brushColor, setBrushColor] = useState('#000')

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx: any = canvas.getContext('2d')
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.strokeStyle = brushColor
    ctx.globalAlpha = 1
    ctx.lineWidth = 2.5
    ctxRef.current = ctx
  }, [brushColor])

  // Start drawing
  const startDrawing = (e: { nativeEvent: { offsetX: number; offsetY: number } }) => {
    if (ctxRef.current) {
      ctxRef.current.beginPath()
      ctxRef.current.moveTo(
        e.nativeEvent.offsetX,
        e.nativeEvent.offsetY
      )
      setIsDrawing(true)
    }
  }

  // End drawing
  const endDrawing = () => {
    if (ctxRef.current) {
      ctxRef.current.closePath()
      setIsDrawing(false)
    }
  }

  const draw = (e: { nativeEvent: { offsetX: number; offsetY: number } }) => {
    if (!isDrawing) {
      return
    }
    if (ctxRef.current) {
      ctxRef.current.lineTo(
        e.nativeEvent.offsetX,
        e.nativeEvent.offsetY
      )
      ctxRef.current.stroke()
    }
  }

  // Clear Drawing 
  const clearDrawing = () => {
    if (ctxRef.current) {
      ctxRef.current.clearRect(0, 0, ctxRef.current.canvas.width, ctxRef.current.canvas.height)
      ctxRef.current.closePath()
      setIsDrawing(false)
    }
  }
  return (
    <>
      <Menu
        brushColor={brushColor}
        setBrushColor={setBrushColor}
        clearDrawing={clearDrawing}
      />
      <canvas
        className={styles.canvas}
        onMouseDown={startDrawing}
        onMouseUp={endDrawing}
        onMouseMove={draw}
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
      />
    </>
  )
}

export default App
