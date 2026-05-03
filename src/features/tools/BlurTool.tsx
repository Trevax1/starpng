import { useState, useRef, useEffect, type MouseEvent as RMouseEvent } from 'react'
import { Download, RotateCcw } from 'lucide-react'
import { ToolLayout } from '@/components/layout/ToolLayout'
import { ImageDropzone } from '@/components/shared/ImageDropzone'
import { loadImage, canvasToBlob, downloadBlob } from '@/lib/canvas'

type Mode = 'blur' | 'pixelate'

export function BlurTool() {
  const [img, setImg] = useState<HTMLImageElement | null>(null)
  const [mode, setMode] = useState<Mode>('blur')
  const [intensity, setIntensity] = useState(12)
  const [brushSize, setBrushSize] = useState(40)
  const [painting, setPainting] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const maskRef = useRef<HTMLCanvasElement>(document.createElement('canvas'))

  useEffect(() => {
    if (!img || !canvasRef.current) return
    const c = canvasRef.current
    c.width = img.naturalWidth; c.height = img.naturalHeight
    maskRef.current.width = img.naturalWidth; maskRef.current.height = img.naturalHeight
    redraw()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [img])

  const redraw = () => {
    if (!img || !canvasRef.current) return
    const c = canvasRef.current
    const ctx = c.getContext('2d')!
    ctx.clearRect(0, 0, c.width, c.height)
    ctx.drawImage(img, 0, 0)

    const mCtx = maskRef.current.getContext('2d')!
    const maskData = mCtx.getImageData(0, 0, c.width, c.height)

    for (let y = 0; y < c.height; y++) {
      for (let x = 0; x < c.width; x++) {
        const idx = (y * c.width + x) * 4
        if (maskData.data[idx + 3] > 0) {
          if (mode === 'blur') {
            applyBlurAt(ctx, x, y, intensity)
          } else {
            applyPixelateAt(ctx, img, x, y, intensity)
          }
        }
      }
    }
  }

  const applyBlurAt = (ctx: CanvasRenderingContext2D, x: number, y: number, radius: number) => {
    if (!img) return
    const r = Math.round(radius)
    const sx = Math.max(0, x - r), sy = Math.max(0, y - r)
    const sw = Math.min(r * 2, ctx.canvas.width - sx)
    const sh = Math.min(r * 2, ctx.canvas.height - sy)
    if (sw <= 0 || sh <= 0) return
    const tmpC = document.createElement('canvas')
    tmpC.width = sw; tmpC.height = sh
    tmpC.getContext('2d')!.drawImage(img, sx, sy, sw, sh, 0, 0, sw, sh)
    ctx.filter = `blur(${r}px)`
    ctx.drawImage(tmpC, sx, sy)
    ctx.filter = 'none'
  }

  const applyPixelateAt = (ctx: CanvasRenderingContext2D, src: HTMLImageElement, x: number, y: number, block: number) => {
    const b = Math.max(4, Math.round(block))
    const bx = Math.floor(x / b) * b
    const by = Math.floor(y / b) * b
    const tmpC = document.createElement('canvas')
    tmpC.width = b; tmpC.height = b
    const t = tmpC.getContext('2d')!
    t.drawImage(src, bx, by, b, b, 0, 0, 1, 1)
    t.imageSmoothingEnabled = false
    t.drawImage(tmpC, 0, 0, 1, 1, 0, 0, b, b)
    ctx.drawImage(tmpC, bx, by)
  }

  const getPos = (e: RMouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current!.getBoundingClientRect()
    const scaleX = canvasRef.current!.width / rect.width
    const scaleY = canvasRef.current!.height / rect.height
    return { x: (e.clientX - rect.left) * scaleX, y: (e.clientY - rect.top) * scaleY }
  }

  const paint = (e: RMouseEvent<HTMLCanvasElement>) => {
    if (!painting || !img) return
    const { x, y } = getPos(e)
    const mCtx = maskRef.current.getContext('2d')!
    mCtx.fillStyle = 'rgba(255,0,0,1)'
    mCtx.beginPath()
    mCtx.arc(x, y, brushSize / 2, 0, Math.PI * 2)
    mCtx.fill()

    // Apply effect at this spot
    const ctx = canvasRef.current!.getContext('2d')!
    ctx.save()
    if (mode === 'blur') {
      const r = brushSize
      const sx = Math.max(0, x - r), sy = Math.max(0, y - r)
      const sw = Math.min(r * 2, canvasRef.current!.width - sx)
      const sh = Math.min(r * 2, canvasRef.current!.height - sy)
      if (sw > 0 && sh > 0) {
        // putImageData ignores ctx.filter, so we must use drawImage on a temp canvas
        const tmpC = document.createElement('canvas')
        tmpC.width = sw; tmpC.height = sh
        tmpC.getContext('2d')!.drawImage(img, sx, sy, sw, sh, 0, 0, sw, sh)
        ctx.filter = `blur(${intensity}px)`
        ctx.drawImage(tmpC, sx, sy)
        ctx.filter = 'none'
      }
    } else {
      const b = Math.max(4, intensity)
      const bx = Math.floor(x / b) * b
      const by = Math.floor(y / b) * b
      const tmpC = document.createElement('canvas')
      tmpC.width = b; tmpC.height = b
      const t = tmpC.getContext('2d')!
      t.drawImage(img, bx, by, b, b, 0, 0, 1, 1)
      t.imageSmoothingEnabled = false
      t.drawImage(tmpC, 0, 0, 1, 1, 0, 0, b, b)
      ctx.drawImage(tmpC, bx, by)
    }
    ctx.restore()
  }

  const reset = () => {
    if (!img || !canvasRef.current) return
    const mCtx = maskRef.current.getContext('2d')!
    mCtx.clearRect(0, 0, maskRef.current.width, maskRef.current.height)
    const ctx = canvasRef.current.getContext('2d')!
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    ctx.drawImage(img, 0, 0)
  }

  const handleDownload = async () => {
    if (!canvasRef.current) return
    const blob = await canvasToBlob(canvasRef.current, 'image/png')
    downloadBlob(blob, 'blurred.png')
  }

  return (
    <ToolLayout
      title="Blur & Censor Sensitive Areas"
      subtitle="Paint over areas to blur or pixelate them"
      tip="Blur applies a smooth Gaussian effect. Pixelate creates a mosaic/block effect. Both effectively hide sensitive information."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          {!img ? (
            <ImageDropzone onFile={(f) => loadImage(f).then(i => setImg(i))} />
          ) : (
            <div className="overflow-hidden rounded-2xl border border-primary/10 bg-white">
              <canvas
                ref={canvasRef}
                className="w-full cursor-crosshair touch-none"
                style={{ maxHeight: '400px', objectFit: 'contain' }}
                onMouseDown={() => setPainting(true)}
                onMouseUp={() => setPainting(false)}
                onMouseLeave={() => setPainting(false)}
                onMouseMove={paint}
              />
            </div>
          )}
        </div>

        <div className="space-y-5">
          <div className="rounded-2xl border border-primary/10 bg-white p-6 space-y-5">
            <div>
              <p className="mb-2 text-sm font-semibold">Mode</p>
              <div className="grid grid-cols-2 gap-2">
                {(['blur', 'pixelate'] as Mode[]).map(m => (
                  <button key={m} onClick={() => setMode(m)}
                    className={`rounded-xl border py-2.5 text-sm font-medium capitalize transition-all ${mode === m ? 'border-primary bg-primary/10 text-primary' : 'border-border hover:border-primary/30'}`}>
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-1 flex justify-between text-sm">
                <span>Intensity</span><span className="font-medium text-primary">{intensity}px</span>
              </div>
              <input type="range" min={2} max={40} value={intensity}
                onChange={e => setIntensity(Number(e.target.value))}
                className="w-full accent-primary" />
            </div>

            <div>
              <div className="mb-1 flex justify-between text-sm">
                <span>Brush Size</span><span className="font-medium text-primary">{brushSize}px</span>
              </div>
              <input type="range" min={10} max={150} value={brushSize}
                onChange={e => setBrushSize(Number(e.target.value))}
                className="w-full accent-primary" />
            </div>

            <button onClick={reset} disabled={!img}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-border py-2.5 text-sm font-medium transition-colors hover:border-primary/30 hover:bg-primary/5 disabled:opacity-50">
              <RotateCcw className="h-4 w-4" /> Reset Selection
            </button>
          </div>

          <button onClick={handleDownload} disabled={!img}
            className="btn-primary w-full justify-center py-3 disabled:opacity-50">
            <Download className="h-4 w-4" /> Download
          </button>
        </div>
      </div>
    </ToolLayout>
  )
}
