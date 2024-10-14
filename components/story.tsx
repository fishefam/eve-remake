import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'
import Image from 'next/image'

import { ConditionalRender } from './utils'

type Props = {
  additionalImageContent?: ReactNode
  additionalTextContent?: ReactNode
  classNames?: { image?: string }
  image: string
  imagePriority?: boolean
  quality?: number
  reversedContents?: boolean
  texts: string[]
  title: string
}

export default function Story({ reversedContents, ...props }: Props) {
  return (
    <section className="mb-20 grid gap-12 md:grid-cols-2">
      <ConditionalRender show={!reversedContents}>
        <LeftContent {...props} />
        <RightContent {...props} />
      </ConditionalRender>
      <ConditionalRender show={!!reversedContents}>
        <RightContent {...props} />
        <LeftContent {...props} />
      </ConditionalRender>
    </section>
  )
}

function LeftContent({ classNames, image, imagePriority, quality }: Props) {
  return (
    <div className="h-96 w-full overflow-hidden rounded-xl bg-white shadow-lg md:h-[700px] lg:h-96">
      <Image
        alt="Evenica"
        className={cn('h-full bg-[#EAEAEA] object-cover', classNames?.image)}
        height={1080}
        priority={imagePriority}
        quality={quality}
        src={image}
        width={1920}
      />
    </div>
  )
}

function RightContent({ additionalTextContent, texts, title }: Props) {
  return (
    <div>
      <h2 className="mb-4 text-3xl font-bold text-gray-800 dark:text-white">{title}</h2>
      {texts.map((text) => (
        <p className="mb-6 text-gray-700 dark:text-gray-300" key={text}>
          {text}
        </p>
      ))}
      {additionalTextContent}
    </div>
  )
}
