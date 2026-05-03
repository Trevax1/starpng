import { useState } from 'react'
import { RotateCcw, RotateCw, FlipHorizontal, FlipVertical, Download } from 'lucide-react'
import { ToolLayout } from '@/components/layout/ToolLayout'
import { ImageDropzone } from '@/components/shared/ImageDropzone'
import { loadImage, imageToCanvas, rotateCanvas, canvasToBlob, downloadBlob } from '@/lib/canvas'

export function RotateTool() {
  const [img, setImg] = useState<HTMLImageElement | null>(null)
  const [preview, setPreview] = useState('')
  const [degrees, setDegrees] = useState(0)
  const [flipH, setFlipH] = useState(false)
  const [flipV, setFlipV] = useState(false)
  const [processing, setProcessing] = useState(false)

  const handleFile = async (file: File) => {
    const image = await loadImage(file)
    setImg(image)
    setPreview(URL.createObjectURL(file))
    setDegrees(0); setFlipH(false); setFlipV(false)
  }

  const handleDownload = async () => {
    if (!img) return
    setProcessing(true)
    const src = imageToCanvas(img)
    const out = rotateCanvas(src, degrees, flipH, flipV)
    const blob = await canvasToBlob(out, 'image/png')
    downloadBlob(blob, 'rotated.png')
    setProcessing(false)
  }

  const transform = `rotate(${degrees}deg) scaleX(${flipH ? -1 : 1}) scaleY(${flipV ? -1 : 1})`

  return (
    <ToolLayout
      title="Rotate & Flip Images with Precision"
      subtitle="Rotate images to any angle from -180° to 180°"
      tip="Rotation is applied losslessly and exported as PNG. No quality degradation occurs regardless of the angle."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          {!img ? (
            <ImageDropzone onFile={handleFile} />
          ) : (
            <div className="flex items-center justify-center overflow-hidden rounded-2xl border border-primary/10 bg-white p-4 min-h-60">
              <img src={preview} alt="Preview" style={{ transform, maxHeight: '240px', maxWidth: '100%' }}
                className="object-contain transition-transform duration-200" />
            </div>
          )}
        </div>

        <div className="space-y-5">
          <div className="rounded-2xl border border-primary/10 bg-white p-6 space-y-5">
            {/* Angle slider */}
            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span className="font-semibold">Rotation Angle</span>
                <span className="font-bold text-primary">{degrees}°</span>
              </div>
              <input type="range" min={-180} max={180} value={degrees}
                onChange={e => setDegrees(Number(e.target.value))}
                className="w-full accent-primary" />
              <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                <span>-180°</span><span>0°</span><span>180°</span>
              </div>
            </div>

            {/* Quick rotate buttons */}
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => setDegrees(d => Math.max(d - 90, -180))}
                className="flex items-center justify-center gap-2 rounded-xl border border-border py-2.5 text-sm font-medium transition-colors hover:border-primary/30 hover:bg-primary/5">
                <RotateCcw className="h-4 w-4" /> 90° CCW
              </button>
              <button onClick={() => setDegrees(d => Math.min(d + 90, 180))}
                className="flex items-center justify-center gap-2 rounded-xl border border-border py-2.5 text-sm font-medium transition-colors hover:border-primary/30 hover:bg-primary/5">
                <RotateCw className="h-4 w-4" /> 90° CW
              </button>
            </div>

            {/* Flip buttons */}
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => setFlipH(h => !h)}
                className={`flex items-center justify-center gap-2 rounded-xl border py-2.5 text-sm font-medium transition-colors ${flipH ? 'border-primary bg-primary/10 text-primary' : 'border-border hover:border-primary/30 hover:bg-primary/5'}`}>
                <FlipHorizontal className="h-4 w-4" /> Flip H
              </button>
              <button onClick={() => setFlipV(v => !v)}
                className={`flex items-center justify-center gap-2 rounded-xl border py-2.5 text-sm font-medium transition-colors ${flipV ? 'border-primary bg-primary/10 text-primary' : 'border-border hover:border-primary/30 hover:bg-primary/5'}`}>
                <FlipVertical className="h-4 w-4" /> Flip V
              </button>
            </div>

            <button onClick={() => { setDegrees(0); setFlipH(false); setFlipV(false) }}
              className="w-full text-center text-xs text-muted-foreground hover:text-foreground transition-colors">
              Reset to original
            </button>
          </div>

          <button onClick={handleDownload} disabled={!img || processing}
            className="btn-primary w-full justify-center py-3 disabled:opacity-50">
            <Download className="h-4 w-4" />
            {processing ? 'Processing…' : 'Download Rotated Image'}
          </button>
        </div>
      </div>
    </ToolLayout>
  )
}
