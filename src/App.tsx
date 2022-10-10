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

  // Cursor Drawing
  const startCursorDrawing = (e: { clientX: number, clientY: number }) => {
    if (ctxRef.current) {
      ctxRef.current.beginPath()
      ctxRef.current.moveTo(
        e.clientX,
        e.clientY
      )
      setIsDrawing(true)
    }
  }

  const cursorDrawing = (e: { clientX: number, clientY: number }) => {
    if (!isDrawing) {
      return
    }
    if (ctxRef.current) {
      ctxRef.current.lineTo(
        e.clientX,
        e.clientY
      )
      ctxRef.current.stroke()
    }
  }

  // Touchscreen Drawing
  const startTouchDrawing = (e: any) => {
    if (ctxRef.current) {
      ctxRef.current.beginPath()
      ctxRef.current.moveTo(
        e.touches[0].clientX,
        e.touches[0].clientY
      )
      setIsDrawing(true)
    }
  }

  const touchDrawing = (e: any) => {
    if (!isDrawing) {
      return
    }
    if (ctxRef.current) {
      ctxRef.current.lineTo(
        e.touches[0].clientX,
        e.touches[0].clientY
      )
      ctxRef.current.stroke()
    }
  }

  // End Drawing
  const endDrawing = () => {
    if (ctxRef.current) {
      ctxRef.current.closePath()
      setIsDrawing(false)
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
        onMouseDown={startCursorDrawing}
        onMouseMove={cursorDrawing}
        onMouseUp={endDrawing}
        onTouchStart={startTouchDrawing}
        onTouchMove={touchDrawing}
        onTouchEnd={endDrawing}
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
      />
    </>
  )
}

export default App
