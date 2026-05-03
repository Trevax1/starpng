import { useState } from 'react'
import { Download } from 'lucide-react'
import { ToolLayout } from '@/components/layout/ToolLayout'
import { ImageDropzone } from '@/components/shared/ImageDropzone'
import { loadImage, imageToCanvas, canvasToBlob, downloadBlob } from '@/lib/canvas'

function formatBytes(b: number) {
  if (b < 1024) return `${b} B`
  if (b < 1024 * 1024) return `${(b / 1024).toFixed(1)} KB`
  return `${(b / 1024 / 1024).toFixed(2)} MB`
}

export function CompressTool() {
  const [img, setImg] = useState<HTMLImageElement | null>(null)
  const [preview, setPreview] = useState('')
  const [originalSize, setOriginalSize] = useState(0)
  const [compressedBlob, setCompressedBlob] = useState<Blob | null>(null)
  const [quality, setQuality] = useState(82)
  const [processing, setProcessing] = useState(false)

  const handleFile = async (file: File) => {
    setOriginalSize(file.size)
    const image = await loadImage(file)
    setImg(image)
    setPreview(URL.createObjectURL(file))
    await compress(image, quality)
  }

  const compress = async (image: HTMLImageElement, q: number) => {
    setProcessing(true)
    const canvas = imageToCanvas(image)
    const blob = await canvasToBlob(canvas, 'image/jpeg', q / 100)
    setCompressedBlob(blob)
    setProcessing(false)
  }

  const handleQualityChange = async (q: number) => {
    setQuality(q)
    if (img) await compress(img, q)
  }

  const savings = originalSize && compressedBlob
    ? Math.round((1 - compressedBlob.size / originalSize) * 100)
    : 0

  const handleDownload = () => {
    if (compressedBlob) downloadBlob(compressedBlob, 'compressed.jpg')
  }

  return (
    <ToolLayout
      title="Compress Images Without Losing Quality"
      subtitle="Reduce file size by up to 80% with adjustable quality control"
      tip="Compressed images are output as JPEG, which provides the best compression ratios for photographs. If you need a different format, use our Format Converter tool after compressing."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          {!img ? (
            <ImageDropzone onFile={handleFile} />
          ) : (
            <div className="overflow-hidden rounded-2xl border border-primary/10 bg-white">
              <img src={preview} alt="Preview" className="w-full object-contain max-h-72" />
            </div>
          )}

          {/* Size comparison */}
          {img && compressedBlob && (
            <div className="mt-4 grid grid-cols-3 gap-3 text-center">
              <div className="rounded-xl border border-border bg-white p-3">
                <div className="text-xs text-muted-foreground">Original</div>
                <div className="font-display font-semibold text-foreground">{formatBytes(originalSize)}</div>
              </div>
              <div className="rounded-xl border border-green-200 bg-green-50 p-3">
                <div className="text-xs text-green-600">Saved</div>
                <div className="font-display font-semibold text-green-600">{savings}%</div>
              </div>
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-3">
                <div className="text-xs text-primary">Compressed</div>
                <div className="font-display font-semibold text-primary">{formatBytes(compressedBlob.size)}</div>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-5">
          <div className="rounded-2xl border border-primary/10 bg-white p-6">
            <div className="mb-2 flex justify-between text-sm">
              <span className="font-semibold">Quality</span>
              <span className="font-bold text-primary">{quality}%</span>
            </div>
            <input type="range" min={5} max={100} value={quality}
              onChange={e => handleQualityChange(Number(e.target.value))}
              className="w-full accent-primary" disabled={!img} />
            <div className="mt-1 flex justify-between text-xs text-muted-foreground">
              <span>Maximum compression</span><span>Maximum quality</span>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Recommended: 80–90% for the best balance of size and visual quality.
            </p>
          </div>

          <button
            onClick={handleDownload}
            disabled={!compressedBlob || processing}
            className="btn-primary w-full justify-center py-3 disabled:opacity-50"
          >
            <Download className="h-4 w-4" />
            {processing ? 'Compressing…' : 'Download Compressed Image'}
          </button>
        </div>
      </div>
    </ToolLayout>
  )
}
