import styles from './ColorButton.module.css'

type ColorButtonProps = {
  color: string
  brushColor: string
  setBrushColor: React.Dispatch<React.SetStateAction<string>>
}

export default function ColorButton({ color, brushColor, setBrushColor }: ColorButtonProps) {
  const keyDownHandler = (e: { code: string }) => {
    if (e.code === 'Enter' || e.code === 'Space') {
      setBrushColor(color)
    }
  }
  return (
    <div
      className={styles.colorButtonOuter}
      style={{ backgroundColor: brushColor === color ? '#dadce0' : '' }}
      onClick={() => setBrushColor(color)}
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
