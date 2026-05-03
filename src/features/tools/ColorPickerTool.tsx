import { useState, useRef, useEffect, type MouseEvent as RMouseEvent } from 'react'
import { Copy, Check } from 'lucide-react'
import { ToolLayout } from '@/components/layout/ToolLayout'
import { ImageDropzone } from '@/components/shared/ImageDropzone'
import { loadImage, imageToCanvas, extractDominantColors, hexToRgb, rgbToHsl } from '@/lib/canvas'

export function ColorPickerTool() {
  const [img, setImg] = useState<HTMLImageElement | null>(null)
  const [palette, setPalette] = useState<string[]>([])
  const [picked, setPicked] = useState<string | null>(null)
  const [copied, setCopied] = useState('')
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Draw image to canvas after img state update so canvasRef points to the visible canvas
  useEffect(() => {
    if (!img || !canvasRef.current) return
    canvasRef.current.width = img.naturalWidth
    canvasRef.current.height = img.naturalHeight
    canvasRef.current.getContext('2d')!.drawImage(img, 0, 0)
  }, [img])

  const handleFile = async (file: File) => {
    const image = await loadImage(file)
    const canvas = imageToCanvas(image)
    setPalette(extractDominantColors(canvas))
    setImg(image)
  }

  const pick = (e: RMouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return
    const rect = canvasRef.current.getBoundingClientRect()
    const x = Math.floor((e.clientX - rect.left) * (canvasRef.current.width / rect.width))
    const y = Math.floor((e.clientY - rect.top) * (canvasRef.current.height / rect.height))
    const ctx = canvasRef.current.getContext('2d')!
    const [r, g, b] = ctx.getImageData(x, y, 1, 1).data
    const hex = `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`
    setPicked(hex)
  }

  const copy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(text)
    setTimeout(() => setCopied(''), 2000)
  }

  const rgb = picked ? hexToRgb(picked) : null
  const hsl = rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : null

  return (
    <ToolLayout
      title="Image Color Picker"
      subtitle="Click any pixel to pick its color. Extract a full palette from any image."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          {!img ? (
            <ImageDropzone onFile={handleFile} />
          ) : (
            <div className="overflow-hidden rounded-2xl border border-primary/10 bg-white">
              <canvas ref={canvasRef} className="w-full cursor-crosshair object-contain max-h-72"
                onClick={pick} />
            </div>
          )}
          <p className="mt-2 text-center text-xs text-muted-foreground">Click on the image to pick a color</p>
        </div>

        <div className="space-y-5">
          {/* Picked color */}
          {picked && rgb && hsl && (
            <div className="rounded-2xl border border-primary/10 bg-white p-5">
              <div className="mb-4 h-16 w-full rounded-xl border border-border" style={{ background: picked }} />
              {[
                { label: 'HEX', value: picked.toUpperCase() },
                { label: 'RGB', value: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` },
                { label: 'HSL', value: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` },
              ].map(item => (
                <div key={item.label} className="mb-2 flex items-center justify-between rounded-lg bg-muted px-3 py-2">
                  <div>
                    <span className="text-xs font-bold text-muted-foreground">{item.label} </span>
                    <span className="text-sm font-mono text-foreground">{item.value}</span>
                  </div>
                  <button onClick={() => copy(item.value)}
                    className="flex h-7 w-7 items-center justify-center rounded-md transition-colors hover:bg-primary/10">
                    {copied === item.value ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5 text-muted-foreground" />}
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Palette */}
          {palette.length > 0 && (
            <div className="rounded-2xl border border-primary/10 bg-white p-5">
              <p className="mb-3 text-sm font-semibold">Dominant Colors</p>
              <div className="grid grid-cols-6 gap-2">
                {palette.map(hex => (
                  <button key={hex} onClick={() => setPicked(hex)} title={hex}
                    className={`aspect-square rounded-xl border-2 transition-all hover:scale-110 ${picked === hex ? 'border-primary' : 'border-transparent'}`}
                    style={{ background: hex }} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </ToolLayout>
  )
}
