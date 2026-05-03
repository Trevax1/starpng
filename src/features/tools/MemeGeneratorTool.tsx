import { useState, useRef, useEffect } from 'react'
import { Download } from 'lucide-react'
import { ToolLayout } from '@/components/layout/ToolLayout'
import { ImageDropzone } from '@/components/shared/ImageDropzone'
import { loadImage, canvasToBlob, downloadBlob } from '@/lib/canvas'

const TEXT_COLORS = ['#ffffff', '#000000', '#ffcc00', '#ff4444', '#44ff44', '#4444ff']

export function MemeGeneratorTool() {
  const [img, setImg] = useState<HTMLImageElement | null>(null)
  const [topText, setTopText] = useState('')
  const [bottomText, setBottomText] = useState('')
  const [fontSize, setFontSize] = useState(48)
  const [textColor, setTextColor] = useState('#ffffff')
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!img || !canvasRef.current) return
    const c = canvasRef.current
    const ctx = c.getContext('2d')!
    c.width = img.naturalWidth; c.height = img.naturalHeight
    ctx.drawImage(img, 0, 0)

    const draw = (text: string, y: number) => {
      if (!text) return
      ctx.font = `bold ${fontSize}px Impact, Arial Black, sans-serif`
      ctx.textAlign = 'center'
      ctx.lineWidth = fontSize / 8
      ctx.strokeStyle = textColor === '#ffffff' ? '#000000' : '#ffffff'
      ctx.strokeText(text.toUpperCase(), c.width / 2, y)
      ctx.fillStyle = textColor
      ctx.fillText(text.toUpperCase(), c.width / 2, y)
    }

    draw(topText, fontSize * 1.1)
    draw(bottomText, c.height - fontSize * 0.3)
  }, [img, topText, bottomText, fontSize, textColor])

  const handleDownload = async () => {
    if (!canvasRef.current) return
    const blob = await canvasToBlob(canvasRef.current, 'image/png')
    downloadBlob(blob, 'meme.png')
  }

  return (
    <ToolLayout
      title="Meme Generator"
      subtitle="Add top and bottom text with classic Impact font — no watermarks"
      tip="Text is exported in uppercase Impact font with a contrasting outline, just like classic memes. Download as PNG with no watermarks added."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          {!img ? (
            <ImageDropzone onFile={(f) => loadImage(f).then(i => setImg(i))} />
          ) : (
            <div className="overflow-hidden rounded-2xl border border-primary/10 bg-white">
              <canvas ref={canvasRef} className="w-full object-contain max-h-80" />
            </div>
          )}
        </div>

        <div className="space-y-5">
          <div className="rounded-2xl border border-primary/10 bg-white p-6 space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-semibold">Top Text</label>
              <input type="text" value={topText} onChange={e => setTopText(e.target.value)}
                placeholder="TOP TEXT" className="input-field" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold">Bottom Text</label>
              <input type="text" value={bottomText} onChange={e => setBottomText(e.target.value)}
                placeholder="BOTTOM TEXT" className="input-field" />
            </div>

            <div>
              <div className="mb-1 flex justify-between text-sm">
                <span className="font-semibold">Font Size</span>
                <span className="font-medium text-primary">{fontSize}px</span>
              </div>
              <input type="range" min={16} max={120} value={fontSize}
                onChange={e => setFontSize(Number(e.target.value))}
                className="w-full accent-primary" />
            </div>

            <div>
              <p className="mb-2 text-sm font-semibold">Text Color</p>
              <div className="flex gap-2">
                {TEXT_COLORS.map(c => (
                  <button key={c} onClick={() => setTextColor(c)}
                    className={`h-8 w-8 rounded-lg border-2 transition-all ${textColor === c ? 'border-primary scale-110' : 'border-border'}`}
                    style={{ background: c }} />
                ))}
                <input type="color" value={textColor} onChange={e => setTextColor(e.target.value)}
                  className="h-8 w-8 cursor-pointer rounded-lg border border-border" title="Custom color" />
              </div>
            </div>
          </div>

          <button onClick={handleDownload} disabled={!img}
            className="btn-primary w-full justify-center py-3 disabled:opacity-50">
            <Download className="h-4 w-4" /> Download Meme
          </button>
        </div>
      </div>
    </ToolLayout>
  )
}
