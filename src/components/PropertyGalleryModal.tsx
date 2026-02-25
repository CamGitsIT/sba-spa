import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CaretLeft, CaretRight } from '@phosphor-icons/react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import buildingPhoto from '@/assets/images/455-glen-iris-dr-ne-unit-p-atlanta-ga-building-photo.jpg'
import exteriorPhoto1 from '@/assets/images/935478657142e45c960f3b1db567b694-cc_ft_1536.jpg'
import exteriorPhoto2 from '@/assets/images/b3556a907589f6fbfb44bfdf5f65d5bc-cc_ft_960.jpg'
import interiorPhoto1 from '@/assets/images/IMG_2145.JPG'
import interiorPhoto2 from '@/assets/images/IMG_2146.JPG'
import interiorPhoto3 from '@/assets/images/IMG_2157.JPG'

interface PropertyGalleryModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialIndex?: number
}

const images = [
  { src: buildingPhoto, caption: '455 Glen Iris Drive NE - Main Building' },
  { src: exteriorPhoto1, caption: 'Property Exterior View' },
  { src: exteriorPhoto2, caption: 'Building Entrance' },
  { src: interiorPhoto1, caption: 'Interior Space - Training Area' },
  { src: interiorPhoto2, caption: 'Interior Space - Retail Floor' },
  { src: interiorPhoto3, caption: 'Interior Space - Workshop Area' }
]

export function PropertyGalleryModal({ open, onOpenChange, initialIndex = 0 }: PropertyGalleryModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  useEffect(() => {
    if (open) {
      setCurrentIndex(initialIndex)
    }
  }, [open, initialIndex])

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') handlePrevious()
    if (e.key === 'ArrowRight') handleNext()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="max-w-[95vw] w-full h-[95vh] p-0 bg-background/95 backdrop-blur-xl border-0"
        onKeyDown={handleKeyDown}
      >
        <div className="relative w-full h-full flex flex-col">
          <div className="absolute top-4 right-4 z-50 flex items-center gap-2">
            <div className="bg-background/90 backdrop-blur px-3 py-2 rounded-lg text-sm font-medium">
              {currentIndex + 1} / {images.length}
            </div>
            <Button
              size="icon"
              variant="ghost"
              className="bg-background/90 backdrop-blur hover:bg-background"
              onClick={() => onOpenChange(false)}
            >
              <X size={24} weight="bold" />
            </Button>
          </div>

          <div className="flex-1 flex items-center justify-center p-4 md:p-8">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="relative w-full h-full flex items-center justify-center"
              >
                <img
                  src={images[currentIndex].src}
                  alt={images[currentIndex].caption}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="absolute inset-y-0 left-4 flex items-center">
            <Button
              size="icon"
              variant="ghost"
              className="h-12 w-12 bg-background/90 backdrop-blur hover:bg-background hover:scale-110 transition-transform"
              onClick={handlePrevious}
            >
              <CaretLeft size={28} weight="bold" />
            </Button>
          </div>

          <div className="absolute inset-y-0 right-4 flex items-center">
            <Button
              size="icon"
              variant="ghost"
              className="h-12 w-12 bg-background/90 backdrop-blur hover:bg-background hover:scale-110 transition-transform"
              onClick={handleNext}
            >
              <CaretRight size={28} weight="bold" />
            </Button>
          </div>

          <div className="p-4 md:p-6 bg-background/90 backdrop-blur border-t">
            <motion.p
              key={currentIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-center text-lg font-medium"
            >
              {images[currentIndex].caption}
            </motion.p>
          </div>

          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'w-8 bg-primary' 
                    : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
