import { useEffect, useRef, useState } from 'react'
import styles from './App.module.css'
import Menu from './components/Menu'

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null!)
  const ctxRef = useRef<any>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [brushColor, setBrushColor] = useState('#000')
  const [canvasSize] = useState({
    height: window.innerHeight,
    witdh: window.innerWidth
  })

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
  const startCursorDrawing = (e: { pageX: number, pageY: number }) => {
    if (ctxRef.current) {
      ctxRef.current.beginPath()
      ctxRef.current.moveTo(
        e.pageX,
        e.pageY
      )
      setIsDrawing(true)
    }
  }

  const cursorDrawing = (e: { pageX: number, pageY: number }) => {
    if (!isDrawing) {
      return
    }
    if (ctxRef.current) {
      ctxRef.current.lineTo(
        e.pageX,
        e.pageY
      )
      ctxRef.current.stroke()
    }
  }

  // Touchscreen Drawing
  const startTouchDrawing = (e: any) => {
    if (ctxRef.current) {
      ctxRef.current.beginPath()
      ctxRef.current.moveTo(
        e.touches[0].pageX,
        e.touches[0].pageY
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
        e.touches[0].pageX,
        e.touches[0].pageY
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
        ref={canvasRef}
        onMouseDown={startCursorDrawing}
        onMouseMove={cursorDrawing}
        onMouseUp={endDrawing}
        onTouchStart={startTouchDrawing}
        onTouchMove={touchDrawing}
        onTouchEnd={endDrawing}
        className={styles.canvas}
        height={canvasSize.height}
        width={canvasSize.witdh}
      />
    </>
  )
}

export default App
