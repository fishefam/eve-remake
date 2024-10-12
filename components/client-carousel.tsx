'use client'

import carouselAutoScroll from 'embla-carousel-auto-scroll'
import Image from 'next/image'

import { Carousel, CarouselContent, CarouselItem } from './ui/carousel'

const logos = [
  'Alcanna.png',
  'Andrew-Peller-Limited.png',
  'Bedrock-Manufacturing.png',
  'Filson.png',
  'Fire-Flower.png',
  'Henrys.png',
  'Horizon-Beverage-Group.png',
  'Kai-USA-Ltd.png',
  'Nova-Cannabis.png',
  'PRS-Guitars.png',
  'Paul-Mitchell.png',
  'Shinola.png',
  'Steiner.png',
  'Youngs.png',
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
                src={`/clients/${file}`}
                width={110}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  )
}
