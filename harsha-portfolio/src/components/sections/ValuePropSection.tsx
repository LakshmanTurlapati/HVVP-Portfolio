import { valuePropData } from '@/data/valueProp'

export default function ValuePropSection() {
  return (
    <section
      id="value-prop"
      aria-label="What I Bring to the Table"
      className="py-24 bg-foreground text-background"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        <h2 className="text-3xl sm:text-4xl font-bold mb-2 text-accent dark:text-brand-black">
          {valuePropData.heading}
        </h2>
        <div className="w-16 h-1 mb-10 rounded-full bg-accent" />

        <p className="text-lg sm:text-xl leading-relaxed mb-10 max-w-3xl">
          {valuePropData.opener}
        </p>

        <ul className="space-y-4 max-w-3xl">
          {valuePropData.items.map((item) => (
            <li key={item.text} className="flex gap-4 items-start text-base sm:text-lg leading-relaxed">
              <span
                className="mt-2 w-1.5 h-1.5 rounded-full shrink-0 bg-accent"
                aria-hidden="true"
              />
              <span>{item.text}</span>
            </li>
          ))}
        </ul>

      </div>
    </section>
  )
}
