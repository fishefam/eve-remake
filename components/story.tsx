import { cn } from '@/lib/utils'
import Image from 'next/image'

export default function Story({
  classNames,
  image,
  texts,
  title,
}: {
  classNames?: { image?: string }
  image: string
  texts: string[]
  title: string
}) {
  return (
    <section className="mb-20 grid gap-12 md:grid-cols-2">
      <div className="h-96 w-full overflow-hidden rounded-xl bg-white md:h-[700px] lg:h-96">
        <Image
          alt="Evenica"
          className={cn('h-full bg-transparent object-cover', classNames?.image)}
          height={1080}
          src={image}
          width={1920}
        />
      </div>
      <div>
        <h2 className="mb-4 text-3xl font-bold text-gray-800 dark:text-white">{title}</h2>
        {texts.map((text) => (
          <p className="mb-6 text-gray-700 dark:text-gray-300" key={text}>
            {text}
          </p>
        ))}
      </div>
    </section>
  )
}
