import { useState, useRef, useEffect } from 'react'
import { Download, RotateCcw } from 'lucide-react'
import { ToolLayout } from '@/components/layout/ToolLayout'
import { ImageDropzone } from '@/components/shared/ImageDropzone'
import { loadImage, imageToCanvas, canvasToBlob, downloadBlob, buildFilterString, DEFAULT_FILTERS, type FilterValues } from '@/lib/canvas'

const CONTROLS: { key: keyof FilterValues; label: string; min: number; max: number; unit: string }[] = [
  { key: 'brightness', label: 'Brightness', min: 0, max: 200, unit: '%' },
  { key: 'contrast', label: 'Contrast', min: 0, max: 200, unit: '%' },
  { key: 'saturate', label: 'Saturation', min: 0, max: 200, unit: '%' },
  { key: 'grayscale', label: 'Grayscale', min: 0, max: 100, unit: '%' },
  { key: 'sepia', label: 'Sepia', min: 0, max: 100, unit: '%' },
  { key: 'blur', label: 'Blur', min: 0, max: 20, unit: 'px' },
  { key: 'hueRotate', label: 'Hue Rotate', min: 0, max: 360, unit: '°' },
]

const PRESETS: { name: string; values: Partial<FilterValues> }[] = [
  { name: 'Original', values: DEFAULT_FILTERS },
  { name: 'Grayscale', values: { ...DEFAULT_FILTERS, grayscale: 100 } },
  { name: 'Sepia', values: { ...DEFAULT_FILTERS, sepia: 80 } },
  { name: 'Vintage', values: { ...DEFAULT_FILTERS, sepia: 30, contrast: 110, brightness: 95, saturate: 80 } },
  { name: 'Vivid', values: { ...DEFAULT_FILTERS, saturate: 180, contrast: 115, brightness: 105 } },
  { name: 'Moody', values: { ...DEFAULT_FILTERS, brightness: 88, contrast: 115, saturate: 85, hueRotate: 5 } },
]

export function FiltersTool() {
  const [img, setImg] = useState<HTMLImageElement | null>(null)
  const [filters, setFilters] = useState<FilterValues>({ ...DEFAULT_FILTERS })
  const [processing, setProcessing] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (img && canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')!
      canvas.width = img.naturalWidth
      canvas.height = img.naturalHeight
      ctx.filter = buildFilterString(filters)
      ctx.drawImage(img, 0, 0)
    }
  }, [img, filters])

  const handleFile = async (file: File) => {
    const image = await loadImage(file)
    setImg(image)
    setFilters({ ...DEFAULT_FILTERS })
  }

  const set = (key: keyof FilterValues, value: number) =>
    setFilters(f => ({ ...f, [key]: value }))

  const handleDownload = async () => {
    if (!img) return
    setProcessing(true)
    const canvas = imageToCanvas(img)
    const ctx = canvas.getContext('2d')!
    ctx.filter = buildFilterString(filters)
    ctx.drawImage(img, 0, 0)
    const blob = await canvasToBlob(canvas, 'image/png')
    downloadBlob(blob, 'filtered.png')
    setProcessing(false)
  }

  return (
    <ToolLayout
      title="Filters & Effects"
      subtitle="Adjust brightness, contrast, saturation, and more with live preview"
      tip="Filters are applied precisely and exported as lossless PNG, so there's no compression-related quality loss. The output maintains your image's full resolution."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          {!img ? (
            <ImageDropzone onFile={handleFile} />
          ) : (
            <div className="overflow-hidden rounded-2xl border border-primary/10 bg-white">
              <canvas ref={canvasRef} className="w-full object-contain max-h-72" style={{ imageRendering: 'pixelated' }} />
            </div>
          )}

          {/* Presets */}
          {img && (
            <div className="mt-4">
              <p className="mb-2 text-sm font-semibold">Presets</p>
              <div className="flex flex-wrap gap-2">
                {PRESETS.map(p => (
                  <button key={p.name} onClick={() => setFilters({ ...DEFAULT_FILTERS, ...p.values })}
                    className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium transition-colors hover:border-primary/30 hover:bg-primary/5">
                    {p.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-primary/10 bg-white p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-semibold">Adjustments</h3>
              <button onClick={() => setFilters({ ...DEFAULT_FILTERS })}
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
                <RotateCcw className="h-3 w-3" /> Reset
              </button>
            </div>
            {CONTROLS.map(c => (
              <div key={c.key}>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="text-muted-foreground">{c.label}</span>
                  <span className="font-medium text-foreground">{filters[c.key]}{c.unit}</span>
                </div>
                <input type="range" min={c.min} max={c.max} value={filters[c.key]}
                  onChange={e => set(c.key, Number(e.target.value))}
                  className="w-full accent-primary" />
              </div>
            ))}
          </div>

          <button onClick={handleDownload} disabled={!img || processing}
            className="btn-primary w-full justify-center py-3 disabled:opacity-50">
            <Download className="h-4 w-4" />
            {processing ? 'Exporting…' : 'Download Filtered Image'}
          </button>
        </div>
      </div>
    </ToolLayout>
  )
}
