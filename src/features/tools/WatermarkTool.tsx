import { useState, useRef, useEffect } from 'react'
import { Download } from 'lucide-react'
import { ToolLayout } from '@/components/layout/ToolLayout'
import { ImageDropzone } from '@/components/shared/ImageDropzone'
import { loadImage, canvasToBlob, downloadBlob } from '@/lib/canvas'

type Position = 'center' | 'bottom-right' | 'bottom-left' | 'tiled'

const POSITIONS: { label: string; value: Position }[] = [
  { label: 'Center', value: 'center' },
  { label: 'Bottom Right', value: 'bottom-right' },
  { label: 'Bottom Left', value: 'bottom-left' },
  { label: 'Tiled', value: 'tiled' },
]

export function WatermarkTool() {
  const [img, setImg] = useState<HTMLImageElement | null>(null)
  const [text, setText] = useState('© StarPNG')
  const [position, setPosition] = useState<Position>('bottom-right')
  const [fontSize, setFontSize] = useState(36)
  const [opacity, setOpacity] = useState(60)
  const [color, setColor] = useState('#ffffff')
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!img || !canvasRef.current) return
    const c = canvasRef.current
    const ctx = c.getContext('2d')!
    c.width = img.naturalWidth; c.height = img.naturalHeight
    ctx.drawImage(img, 0, 0)

    ctx.globalAlpha = opacity / 100
    ctx.fillStyle = color
    ctx.font = `bold ${fontSize}px Inter, sans-serif`
    ctx.textBaseline = 'middle'

    const pad = 20
    const measure = ctx.measureText(text)
    const tw = measure.width

    if (position === 'tiled') {
      const gap = Math.max(tw, fontSize) * 2.5
      ctx.save()
      ctx.translate(c.width / 2, c.height / 2)
      ctx.rotate(-Math.PI / 6)
      for (let y = -c.height; y < c.height * 2; y += gap) {
        for (let x = -c.width; x < c.width * 2; x += gap) {
          ctx.fillText(text, x, y)
        }
      }
      ctx.restore()
    } else {
      let x = 0, y = 0
      if (position === 'center') { x = c.width / 2 - tw / 2; y = c.height / 2 }
      if (position === 'bottom-right') { x = c.width - tw - pad; y = c.height - fontSize / 2 - pad }
      if (position === 'bottom-left') { x = pad; y = c.height - fontSize / 2 - pad }
      ctx.fillText(text, x, y)
    }
    ctx.globalAlpha = 1
  }, [img, text, position, fontSize, opacity, color])

  const handleDownload = async () => {
    if (!canvasRef.current) return
    const blob = await canvasToBlob(canvasRef.current, 'image/png')
    downloadBlob(blob, 'watermarked.png')
  }

  return (
    <ToolLayout
      title="Watermark Maker"
      subtitle="Add custom text watermarks with position, size, and opacity controls"
      tip="Watermarked images are exported as PNG to preserve quality. Use the opacity slider to make the watermark subtle or prominent."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          {!img ? (
            <ImageDropzone onFile={(f) => loadImage(f).then(i => setImg(i))} />
          ) : (
            <div className="overflow-hidden rounded-2xl border border-primary/10 bg-white">
              <canvas ref={canvasRef} className="w-full object-contain max-h-72" />
            </div>
          )}
        </div>

        <div className="space-y-5">
          <div className="rounded-2xl border border-primary/10 bg-white p-6 space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-semibold">Watermark Text</label>
              <input type="text" value={text} onChange={e => setText(e.target.value)}
                placeholder="Enter watermark text…"
                className="input-field" />
            </div>

            <div>
              <p className="mb-2 text-sm font-semibold">Position</p>
              <div className="grid grid-cols-2 gap-2">
                {POSITIONS.map(p => (
                  <button key={p.value} onClick={() => setPosition(p.value)}
                    className={`rounded-xl border py-2 text-sm font-medium transition-all ${position === p.value ? 'border-primary bg-primary/10 text-primary' : 'border-border hover:border-primary/30'}`}>
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-1 flex justify-between text-sm">
                <span>Font Size</span><span className="font-medium text-primary">{fontSize}px</span>
              </div>
              <input type="range" min={12} max={120} value={fontSize}
                onChange={e => setFontSize(Number(e.target.value))}
                className="w-full accent-primary" />
            </div>

            <div>
              <div className="mb-1 flex justify-between text-sm">
                <span>Opacity</span><span className="font-medium text-primary">{opacity}%</span>
              </div>
              <input type="range" min={5} max={100} value={opacity}
                onChange={e => setOpacity(Number(e.target.value))}
                className="w-full accent-primary" />
            </div>

            <div className="flex items-center gap-3">
              <label className="text-sm font-semibold">Color</label>
              <input type="color" value={color} onChange={e => setColor(e.target.value)}
                className="h-9 w-16 cursor-pointer rounded-lg border border-border" />
              <span className="text-sm text-muted-foreground">{color.toUpperCase()}</span>
            </div>
          </div>

          <button onClick={handleDownload} disabled={!img}
            className="btn-primary w-full justify-center py-3 disabled:opacity-50">
            <Download className="h-4 w-4" /> Download Watermarked Image
          </button>
        </div>
      </div>
    </ToolLayout>
  )
}
