import { useState, useRef, useEffect } from 'react'
import { Link2, Link2Off, Download, Crop, Maximize2 } from 'lucide-react'
import { ToolLayout } from '@/components/layout/ToolLayout'
import { ImageDropzone } from '@/components/shared/ImageDropzone'
import { loadImage, imageToCanvas, canvasToBlob, downloadBlob } from '@/lib/canvas'
import { SOCIAL_PRESETS } from '@/data/tools'
import { cn } from '@/lib/cn'

type Mode = 'resize' | 'crop'

export function ResizeTool() {
  const [img, setImg] = useState<HTMLImageElement | null>(null)
  const [preview, setPreview] = useState('')
  const [mode, setMode] = useState<Mode>('resize')
  const [processing, setProcessing] = useState(false)
  const originalSize = useRef({ w: 0, h: 0 })

  // Resize state
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const [locked, setLocked] = useState(true)

  // Crop state
  const [cropX, setCropX] = useState(0)
  const [cropY, setCropY] = useState(0)
  const [cropW, setCropW] = useState(0)
  const [cropH, setCropH] = useState(0)
  const cropCanvasRef = useRef<HTMLCanvasElement>(null)

  const handleFile = async (file: File) => {
    const image = await loadImage(file)
    const w = image.naturalWidth
    const h = image.naturalHeight
    setImg(image)
    setWidth(w); setHeight(h)
    setCropX(0); setCropY(0); setCropW(w); setCropH(h)
    originalSize.current = { w, h }
    setPreview(URL.createObjectURL(file))
  }

  // Resize handlers
  const handleWidth = (v: number) => {
    setWidth(v)
    if (locked && originalSize.current.w)
      setHeight(Math.round(v * originalSize.current.h / originalSize.current.w))
  }
  const handleHeight = (v: number) => {
    setHeight(v)
    if (locked && originalSize.current.h)
      setWidth(Math.round(v * originalSize.current.w / originalSize.current.h))
  }
  const applyPreset = (w: number, h: number) => { setWidth(w); setHeight(h); setLocked(false) }

  // Crop handlers — keep values in bounds
  const handleCropX = (v: number) => {
    const x = Math.max(0, Math.min(v, originalSize.current.w - 1))
    setCropX(x)
    setCropW(w => Math.min(w, originalSize.current.w - x))
  }
  const handleCropY = (v: number) => {
    const y = Math.max(0, Math.min(v, originalSize.current.h - 1))
    setCropY(y)
    setCropH(h => Math.min(h, originalSize.current.h - y))
  }
  const handleCropW = (v: number) => setCropW(Math.max(1, Math.min(v, originalSize.current.w - cropX)))
  const handleCropH = (v: number) => setCropH(Math.max(1, Math.min(v, originalSize.current.h - cropY)))

  // Draw crop preview overlay whenever crop state changes
  useEffect(() => {
    if (!img || !cropCanvasRef.current || mode !== 'crop') return
    const c = cropCanvasRef.current
    const ctx = c.getContext('2d')!
    c.width = img.naturalWidth
    c.height = img.naturalHeight

    // Full image dimmed
    ctx.drawImage(img, 0, 0)
    ctx.fillStyle = 'rgba(0,0,0,0.55)'
    ctx.fillRect(0, 0, c.width, c.height)

    // Bright crop region on top
    if (cropW > 0 && cropH > 0)
      ctx.drawImage(img, cropX, cropY, cropW, cropH, cropX, cropY, cropW, cropH)

    // Crop border + corner handles
    const lw = Math.max(2, Math.round(c.width / 400))
    ctx.strokeStyle = '#7c3aed'
    ctx.lineWidth = lw
    ctx.strokeRect(cropX + lw / 2, cropY + lw / 2, cropW - lw, cropH - lw)
    const hs = Math.max(8, lw * 5)
    ctx.fillStyle = '#7c3aed'
    ;[[cropX, cropY], [cropX + cropW, cropY], [cropX, cropY + cropH], [cropX + cropW, cropY + cropH]].forEach(([x, y]) => {
      ctx.fillRect(x - hs / 2, y - hs / 2, hs, hs)
    })
  }, [img, mode, cropX, cropY, cropW, cropH])

  // Downloads
  const handleDownloadResize = async () => {
    if (!img) return
    setProcessing(true)
    const canvas = imageToCanvas(img, width, height)
    const blob = await canvasToBlob(canvas, 'image/png')
    downloadBlob(blob, 'resized.png')
    setProcessing(false)
  }

  const handleDownloadCrop = async () => {
    if (!img) return
    setProcessing(true)
    const canvas = document.createElement('canvas')
    canvas.width = cropW; canvas.height = cropH
    canvas.getContext('2d')!.drawImage(img, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH)
    const blob = await canvasToBlob(canvas, 'image/png')
    downloadBlob(blob, 'cropped.png')
    setProcessing(false)
  }

  return (
    <ToolLayout
      title="Resize & Crop Images Instantly"
      subtitle="Resize to exact dimensions or crop to any region with a live preview"
      tip="Resize scales the entire image to new dimensions. Crop trims a region out of the image. Both export as PNG to preserve quality and transparency."
    >
      {/* Mode tabs */}
      <div className="mb-6 flex gap-2">
        {([['resize', Maximize2, 'Resize'], ['crop', Crop, 'Crop']] as const).map(([m, Icon, label]) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={cn(
              'flex items-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-semibold transition-all',
              mode === m
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-border text-muted-foreground hover:border-primary/30 hover:bg-primary/5',
            )}
          >
            <Icon className="h-4 w-4" /> {label}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left — preview */}
        <div className="space-y-5">
          {!img ? (
            <ImageDropzone onFile={handleFile} />
          ) : mode === 'resize' ? (
            <div className="overflow-hidden rounded-2xl border border-primary/10 bg-white">
              <img src={preview} alt="Preview" className="w-full object-contain max-h-72" />
            </div>
          ) : (
            <div className="overflow-hidden rounded-2xl border border-primary/10 bg-white">
              <canvas ref={cropCanvasRef} className="w-full object-contain max-h-72" />
            </div>
          )}

          {/* Social presets — resize mode only */}
          {mode === 'resize' && (
            <div>
              <p className="mb-2.5 text-sm font-semibold text-foreground">Social Media Presets</p>
              <div className="grid grid-cols-2 gap-2">
                {SOCIAL_PRESETS.map(p => (
                  <button
                    key={p.name}
                    onClick={() => applyPreset(p.width, p.height)}
                    className="rounded-xl border border-border px-3 py-2 text-left text-xs transition-colors hover:border-primary/30 hover:bg-primary/5"
                  >
                    <div className="font-medium text-foreground">{p.name}</div>
                    <div className="text-muted-foreground">{p.width} × {p.height}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Crop hint */}
          {mode === 'crop' && img && (
            <p className="text-xs text-center text-muted-foreground">
              Bright area = kept region · Adjust X, Y, Width, Height on the right
            </p>
          )}
        </div>

        {/* Right — controls */}
        <div className="space-y-5">
          {mode === 'resize' ? (
            <>
              <div className="rounded-2xl border border-primary/10 bg-white p-6 space-y-5">
                <h3 className="font-display font-semibold">Dimensions</h3>
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <label className="mb-1 block text-xs font-medium text-muted-foreground">Width (px)</label>
                    <input type="number" value={width} min={1} max={10000}
                      onChange={e => handleWidth(Number(e.target.value))}
                      className="input-field" />
                  </div>
                  <button
                    onClick={() => setLocked(!locked)}
                    className="mt-5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border transition-colors hover:border-primary/30 hover:bg-primary/5"
                    title={locked ? 'Unlock aspect ratio' : 'Lock aspect ratio'}
                  >
                    {locked ? <Link2 className="h-4 w-4 text-primary" /> : <Link2Off className="h-4 w-4 text-muted-foreground" />}
                  </button>
                  <div className="flex-1">
                    <label className="mb-1 block text-xs font-medium text-muted-foreground">Height (px)</label>
                    <input type="number" value={height} min={1} max={10000}
                      onChange={e => handleHeight(Number(e.target.value))}
                      className="input-field" />
                  </div>
                </div>
                {img && (
                  <p className="text-xs text-muted-foreground">
                    Original: {originalSize.current.w} × {originalSize.current.h}px
                  </p>
                )}
              </div>
              <button
                onClick={handleDownloadResize}
                disabled={!img || processing}
                className="btn-primary w-full justify-center py-3 disabled:opacity-50"
              >
                <Download className="h-4 w-4" />
                {processing ? 'Processing…' : 'Download Resized Image'}
              </button>
            </>
          ) : (
            <>
              <div className="rounded-2xl border border-primary/10 bg-white p-6 space-y-4">
                <h3 className="font-display font-semibold">Crop Region</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-muted-foreground">X offset (px)</label>
                    <input type="number" value={cropX} min={0} max={Math.max(0, originalSize.current.w - 1)}
                      onChange={e => handleCropX(Number(e.target.value))}
                      className="input-field" />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-muted-foreground">Y offset (px)</label>
                    <input type="number" value={cropY} min={0} max={Math.max(0, originalSize.current.h - 1)}
                      onChange={e => handleCropY(Number(e.target.value))}
                      className="input-field" />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-muted-foreground">Width (px)</label>
                    <input type="number" value={cropW} min={1} max={originalSize.current.w - cropX}
                      onChange={e => handleCropW(Number(e.target.value))}
                      className="input-field" />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-muted-foreground">Height (px)</label>
                    <input type="number" value={cropH} min={1} max={originalSize.current.h - cropY}
                      onChange={e => handleCropH(Number(e.target.value))}
                      className="input-field" />
                  </div>
                </div>
                {img && (
                  <div className="flex items-center justify-between rounded-xl bg-primary/5 px-4 py-2.5">
                    <span className="text-xs text-muted-foreground">Output size</span>
                    <span className="text-xs font-semibold text-primary">{cropW} × {cropH}px</span>
                  </div>
                )}
              </div>
              <button
                onClick={handleDownloadCrop}
                disabled={!img || processing || cropW <= 0 || cropH <= 0}
                className="btn-primary w-full justify-center py-3 disabled:opacity-50"
              >
                <Download className="h-4 w-4" />
                {processing ? 'Processing…' : 'Download Cropped Image'}
              </button>
            </>
          )}
        </div>
      </div>
    </ToolLayout>
  )
}
