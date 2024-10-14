import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

export default function CaseStudy({
  alt,
  description,
  href,
  image,
  title,
}: { [key in 'alt' | 'description' | 'image' | 'title']: string } & { href: `case-studies/${CaseStudyPath}` }) {
  return (
    <section className="mb-20">
      <Card className="overflow-hidden dark:bg-gray-800">
        <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white dark:from-indigo-600 dark:to-purple-700">
          <CardTitle className="text-2xl font-bold">Featured Case Study</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-6 p-6 md:flex-row">
          <Image
            alt={alt}
            className="size-32 rounded-full border-4 border-indigo-500 object-contain p-2 dark:border-indigo-400 dark:invert"
            height={180}
            src={image}
            width={180}
          />
          <div>
            <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-white">{title}</h3>
            <p className="mb-4 text-gray-700 dark:text-gray-300">{description}</p>
            <Button
              asChild
              className="border-none bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 hover:text-white"
              variant="outline"
            >
              <Link href={href}>
                Read More <ChevronRight className="ml-2 size-4" />
                <p className="sr-only">{title}</p>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
