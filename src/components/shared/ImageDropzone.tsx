import { useRef, useState, type DragEvent, type ChangeEvent } from 'react'
import { Upload, Image as ImageIcon } from 'lucide-react'
import { cn } from '@/lib/cn'

interface Props {
  onFile: (file: File) => void
  accept?: string
  label?: string
  className?: string
}

export function ImageDropzone({ onFile, accept = 'image/*', label = 'Drop your image here', className }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)

  const handleDrop = (e: DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) onFile(file)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) onFile(file)
  }

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDragOver={e => { e.preventDefault(); setDragging(true) }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      className={cn(
        'flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-200 p-10 text-center',
        dragging
          ? 'border-primary bg-primary/5 scale-[1.01]'
          : 'border-border hover:border-primary/40 hover:bg-primary/[0.02]',
        className,
      )}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
        {dragging ? (
          <ImageIcon className="h-7 w-7 text-primary" />
        ) : (
          <Upload className="h-7 w-7 text-primary" />
        )}
      </div>
      <div>
        <p className="font-display font-semibold text-foreground">{label}</p>
        <p className="mt-1 text-sm text-muted-foreground">or click to browse — PNG, JPG, WebP, BMP</p>
      </div>
      <input ref={inputRef} type="file" accept={accept} onChange={handleChange} className="hidden" />
    </div>
  )
}
