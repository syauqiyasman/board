import React, { useContext } from 'react'
import { ColorContext } from '../App'
import styles from './ColorButton.module.css'

type ColorButtonProps = {
  color: string
  setBrushColor: React.Dispatch<React.SetStateAction<string>>
  setIsEraser: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ColorButton({ color, setBrushColor, setIsEraser }: ColorButtonProps) {
  const brushColor = useContext(ColorContext)
  const keyDownHandler = (e: { code: string }) => {
    if (e.code === 'Enter' || e.code === 'Space') {
      setBrushColor(color)
      setIsEraser(false)
    }
  }
  return (
    <div
      className={styles.colorButtonOuter}
      style={{ backgroundColor: brushColor === color ? '#dadce0' : '' }}
      onClick={() => {
        setBrushColor(color)
        setIsEraser(false)
      }}
      onKeyDown={keyDownHandler}
      tabIndex={0}
      role="button"
    >
      <div
        className={styles.colorButtonInner}
        style={{ backgroundColor: color }}
      />
    </div>
  )
}
