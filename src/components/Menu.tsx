import ColorButton from './ColorButton'
import styles from './Menu.module.css'

type MenuProps = {
  setBrushColor: React.Dispatch<React.SetStateAction<string>>
  brushColor: string
  clearDrawing: React.MouseEventHandler<HTMLDivElement> | any
  setIsEraser: React.Dispatch<React.SetStateAction<boolean>>
  isEraser: boolean
}

export default function Menu({ setBrushColor, brushColor, clearDrawing, setIsEraser, isEraser }: MenuProps) {
  const clearDrawingKeyDownHandler = (e: { code: string }) => {
    if (e.code === 'Enter' || e.code === 'Space') {
      clearDrawing()
    }
  }
  const eraserKeyDownHandler = (e: { code: string }) => {
    if (e.code === 'Enter' || e.code === 'Space') {
      setIsEraser(true)
      setBrushColor('')
    }
  }
  return (
    <div className={styles.menu}>
      <div className={styles.actionTop}>
        <div
          className={styles.iconButtonOuter}
          role="button"
          title="Eraser"
          onClick={() => {
            setIsEraser(true)
            setBrushColor('')
          }}
          onKeyDown={eraserKeyDownHandler}
          style={{ backgroundColor: isEraser ? '#dadce0' : '' }}
          tabIndex={0}
        >
          <div className={styles.iconButtonInner}>
            <svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.36052 0.72921C8.55578 0.533948 8.87236 0.533948 9.06763 0.72921L14.2708 5.93235C14.466 6.12761 14.466 6.4442 14.2708 6.63946L8.95513 11.9551L7.3466 13.5636C6.76081 14.1494 5.81106 14.1494 5.22528 13.5636L1.43635 9.7747C0.850563 9.18891 0.850563 8.23917 1.43635 7.65338L3.04488 6.04485L8.36052 0.72921ZM8.71407 1.78987L4.10554 6.3984L8.60157 10.8944L13.2101 6.28591L8.71407 1.78987ZM7.89447 11.6015L3.39843 7.10551L2.14346 8.36049C1.94819 8.55575 1.94819 8.87233 2.14346 9.06759L5.93238 12.8565C6.12765 13.0518 6.44423 13.0518 6.63949 12.8565L7.89447 11.6015Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd">
              </path>
            </svg>
          </div>
        </div>
      </div>
      <div className={styles.colorPicker}>
        <ColorButton
          setBrushColor={setBrushColor}
          brushColor={brushColor}
          setIsEraser={setIsEraser}
          color="#fff"
        />
        <ColorButton
          setBrushColor={setBrushColor}
          brushColor={brushColor}
          setIsEraser={setIsEraser}
          color="#000"
        />
        <ColorButton
          setBrushColor={setBrushColor}
          brushColor={brushColor}
          setIsEraser={setIsEraser}
          color="blue"
        />
        <ColorButton
          setBrushColor={setBrushColor}
          brushColor={brushColor}
          setIsEraser={setIsEraser}
          color="green"
        />
        <ColorButton
          setBrushColor={setBrushColor}
          brushColor={brushColor}
          setIsEraser={setIsEraser}
          color="yellow"
        />
        <ColorButton
          setBrushColor={setBrushColor}
          brushColor={brushColor}
          setIsEraser={setIsEraser}
          color="red"
        />
      </div>
      <div className={styles.action}>
        <div className={styles.iconButtonOuter} role="button" title="Clear" onClick={clearDrawing} onKeyDown={clearDrawingKeyDownHandler} tabIndex={0}>
          <div className={styles.iconButtonInner}>
            <svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd">
              </path>
            </svg>
          </div>
        </div>
      </div>
    </div >
  )
}
