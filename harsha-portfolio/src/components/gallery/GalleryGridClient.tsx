"use client"

import Image from 'next/image'
import { useState, useCallback, useEffect } from 'react'
import { Dialog } from '@base-ui/react/dialog'
import type { GalleryAsset } from '@/types'
import { getThumb } from '@/data/galleryThumbs.generated'

interface GalleryGridClientProps {
  assets: GalleryAsset[]
  aspectRatio: string
}

export default function GalleryGridClient({ assets, aspectRatio }: GalleryGridClientProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const isOpen = openIndex !== null
  const asset = openIndex !== null ? assets[openIndex] : null

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (openIndex === null) return
      if (e.key === 'ArrowRight') {
        setOpenIndex((openIndex + 1) % assets.length)
      } else if (e.key === 'ArrowLeft') {
        setOpenIndex((openIndex - 1 + assets.length) % assets.length)
      }
    },
    [openIndex, assets.length]
  )

  useEffect(() => {
    if (!isOpen) return
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, handleKeyDown])

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) setOpenIndex(null)
  }

  return (
    <>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {assets.map((item, index) => {
          const thumb = getThumb(item.src)
          return (
          <li key={item.slug} className="group">
            <button
              type="button"
              onClick={() => setOpenIndex(index)}
              className="block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-md overflow-hidden"
              aria-label={`View ${item.title}`}
            >
              <div
                className="relative bg-[oklch(0.95_0_0)] rounded-md overflow-hidden"
                style={{ aspectRatio }}
              >
                <Image
                  src={thumb?.thumbSrc ?? item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  placeholder={thumb ? "blur" : "empty"}
                  blurDataURL={thumb?.blurDataURL}
                  loading="eager"
                  unoptimized={!!thumb}
                  className="object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                />
                {item.isPdf && (
                  <span
                    className="absolute top-2 right-2 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-sm"
                    style={{ backgroundColor: 'var(--color-brand-orange)', color: 'var(--color-brand-black)' }}
                  >
                    PDF
                  </span>
                )}
              </div>
              <div className="mt-3 px-1">
                <p className="text-sm font-semibold text-foreground leading-snug">{item.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{item.client}</p>
              </div>
            </button>
          </li>
          )
        })}
      </ul>

      <Dialog.Root open={isOpen} onOpenChange={handleOpenChange}>
        <Dialog.Portal>
          <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm" />
          <Dialog.Popup className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 focus:outline-none">
            {asset && (
              <div className="relative max-w-6xl w-full max-h-full flex flex-col items-center gap-4">
                <div className="relative w-full max-h-[85vh] flex items-center justify-center">
                  <Image
                    src={asset.src}
                    alt={asset.alt}
                    width={asset.width}
                    height={asset.height}
                    sizes="(max-width: 640px) 100vw, (max-width: 1200px) 90vw, 1200px"
                    className="max-h-[85vh] w-auto h-auto object-contain"
                    priority
                  />
                </div>
                <div className="flex items-center justify-between w-full text-white text-sm gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate">{asset.title}</p>
                    <p className="text-white/70 text-xs">{asset.client}</p>
                  </div>
                  {asset.isPdf && asset.pdfHref && (
                    <a
                      href={asset.pdfHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-md text-sm font-semibold shrink-0"
                      style={{ backgroundColor: 'var(--color-brand-orange)', color: 'var(--color-brand-black)' }}
                    >
                      Open PDF
                    </a>
                  )}
                </div>
                <Dialog.Close
                  className="absolute -top-2 right-0 sm:top-0 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-2xl leading-none w-10 h-10 flex items-center justify-center"
                  aria-label="Close lightbox"
                >
                  &times;
                </Dialog.Close>
              </div>
            )}
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  )
}
