import { galleryData } from '@/data/gallery'
import GalleryGridClient from '@/components/gallery/GalleryGridClient'

export default function GallerySection() {
  return (
    <section
      id="gallery"
      aria-label="Creative Work"
      className="py-24 bg-background border-t border-border"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-2 leading-tight">
          Creative Work
        </h2>
        <div className="w-16 h-1 bg-accent mb-8 rounded-full" />

        <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-16 max-w-3xl">
          {galleryData.intro}
        </p>

        <div className="space-y-20">
          {galleryData.categories.map((category) => (
            <div key={category.slug} id={`gallery-${category.slug}`}>
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-8 flex items-baseline gap-4">
                <span>{category.label}</span>
                <span className="text-sm font-normal text-muted-foreground">
                  {category.assets.length} {category.assets.length === 1 ? 'piece' : 'pieces'}
                </span>
              </h3>
              <GalleryGridClient assets={category.assets} aspectRatio={category.aspectRatio} />
            </div>
          ))}
        </div>

        <p className="mt-20 pt-10 border-t border-border text-base sm:text-lg text-muted-foreground italic max-w-3xl">
          {galleryData.closing}
        </p>

      </div>
    </section>
  )
}
