import styles from './ColorButton.module.css'

type ColorButtonProps = {
  color: string
  brushColor: string
  setBrushColor: React.Dispatch<React.SetStateAction<string>>
}

export default function ColorButton({ color, brushColor, setBrushColor }: ColorButtonProps) {
  return (
    <div className={styles.colorButtonOuter} style={{ backgroundColor: brushColor === color ? '#dadce0' : '' }}>
      <div
        tabIndex={1}
        className={styles.colorButtonInner}
        style={{ backgroundColor: color }}
        onClick={() => setBrushColor(color)}
      />
    </div>
  )
}
