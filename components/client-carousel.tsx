'use client'

import carouselAutoScroll from 'embla-carousel-auto-scroll'
import Image from 'next/image'

import { Carousel, CarouselContent, CarouselItem } from './ui/carousel'

const logos = [
  'alcanna.png',
  'andrew-peller-limited.png',
  'bedrock-manufacturing.png',
  'filson.png',
  'fire-flower.png',
  'henrys.png',
  'horizon-beverage-group.png',
  'kai-usa-ltd.png',
  'nova-cannabis.png',
  'prs-guitars.png',
  'paul-mitchell.png',
  'shinola.png',
  'steiner.png',
  'youngs.png',
]

export default function ClientCarousel() {
  return (
    <section className="ignore-eve-container">
      <h2 className="mb-8 text-center text-2xl font-semibold text-gray-800 dark:text-white">Our Esteemed Clients</h2>
      <Carousel
        opts={{
          align: 'start',
          dragFree: true,
          loop: true,
        }}
        plugins={[
          carouselAutoScroll({
            speed: 0.5,
            startDelay: 0,
            stopOnFocusIn: false,
            stopOnInteraction: false,
            stopOnMouseEnter: false,
          }),
        ]}
      >
        <CarouselContent>
          {logos.map((file, index) => (
            <CarouselItem className="min-w-[110px] basis-1/6 lg:basis-[10%]" key={index}>
              <Image
                alt={file.replace(/-/g, ' ').replace(/\.\w+$/, '')}
                className="select-none dark:invert"
                height={110}
                src={`/images/clients/${file}`}
                width={110}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  )
}
