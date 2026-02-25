import { useRef, useState } from 'react'
import { unzipSync } from 'fflate'
import { UploadSimple, FileZip, X, CheckCircle } from '@phosphor-icons/react'
import { toast } from 'sonner'

export interface ExtractedImage {
  src: string
  caption: string
}

interface ZipImageUploaderProps {
  onImagesExtracted: (images: ExtractedImage[]) => void
}

const IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'svg']

function isImageFile(name: string): boolean {
  const ext = name.split('.').pop()?.toLowerCase() ?? ''
  return IMAGE_EXTENSIONS.includes(ext)
}

function fileNameToCaption(name: string): string {
  return name
    .replace(/\.[^/.]+$/, '')
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

export function ZipImageUploader({ onImagesExtracted }: ZipImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [lastResult, setLastResult] = useState<{ count: number; name: string } | null>(null)

  const processZipFile = async (file: File) => {
    if (!file.name.toLowerCase().endsWith('.zip')) {
      toast.error('Please upload a .zip file')
      return
    }

    setIsProcessing(true)
    try {
      const buffer = await file.arrayBuffer()
      const uint8 = new Uint8Array(buffer)
      const unzipped = unzipSync(uint8)

      const extracted: ExtractedImage[] = []

      for (const [path, data] of Object.entries(unzipped)) {
        // Skip directories and macOS metadata files
        if (path.endsWith('/') || path.includes('__MACOSX') || path.startsWith('.')) {
          continue
        }
        const fileName = path.split('/').pop() ?? path
        if (!isImageFile(fileName)) continue

        const ext = fileName.split('.').pop()?.toLowerCase() ?? 'jpeg'
        const mimeType = ext === 'svg' ? 'image/svg+xml' : `image/${ext === 'jpg' ? 'jpeg' : ext}`
        const blob = new Blob([data], { type: mimeType })
        const src = URL.createObjectURL(blob)
        extracted.push({ src, caption: fileNameToCaption(fileName) })
      }

      if (extracted.length === 0) {
        toast.warning('No images found in the ZIP file')
        setIsProcessing(false)
        return
      }

      onImagesExtracted(extracted)
      setLastResult({ count: extracted.length, name: file.name })
      toast.success(`Extracted ${extracted.length} image${extracted.length !== 1 ? 's' : ''} from ${file.name}`)
    } catch {
      toast.error('Failed to read ZIP file. Please ensure it is a valid .zip archive.')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) processZipFile(file)
    // reset input so same file can be re-uploaded
    e.target.value = ''
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const file = e.dataTransfer.files?.[0]
    if (file) processZipFile(file)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = () => setIsDragOver(false)

  return (
    <div className="mt-4">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`border-2 border-dashed rounded-lg p-5 flex flex-col items-center gap-3 transition-colors cursor-pointer select-none
          ${isDragOver ? 'border-primary bg-primary/10' : 'border-muted-foreground/30 hover:border-primary/60 hover:bg-muted/40'}`}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        aria-label="Upload ZIP file containing images"
        onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".zip,application/zip,application/x-zip-compressed"
          className="hidden"
          onChange={handleFileChange}
        />
        {isProcessing ? (
          <>
            <FileZip size={32} className="text-primary animate-pulse" weight="duotone" />
            <p className="text-sm text-muted-foreground font-medium">Extracting images…</p>
          </>
        ) : (
          <>
            <UploadSimple size={32} className={isDragOver ? 'text-primary' : 'text-muted-foreground'} weight="duotone" />
            <div className="text-center">
              <p className="text-sm font-medium">
                {isDragOver ? 'Drop ZIP here' : 'Upload a ZIP of images'}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Drag &amp; drop or click to browse — extracts JPG, PNG, WebP and more
              </p>
            </div>
          </>
        )}
      </div>

      {lastResult && (
        <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
          <CheckCircle size={14} className="text-success" weight="fill" />
          <span>
            {lastResult.count} image{lastResult.count !== 1 ? 's' : ''} added from <span className="font-medium">{lastResult.name}</span>
          </span>
          <button
            className="ml-auto text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setLastResult(null)}
            aria-label="Dismiss"
          >
            <X size={12} weight="bold" />
          </button>
        </div>
      )}
    </div>
  )
}
