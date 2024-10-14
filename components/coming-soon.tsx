'use client'

import { motion } from 'framer-motion'
import { Construction, RefreshCw } from 'lucide-react'
import { useState } from 'react'

import Intro from './intro'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'

export default function ComingSoon() {
  const [rotationAngle, setRotationAngle] = useState(0)

  const handleRotation = () => setRotationAngle(rotationAngle + 360)
  return (
    <>
      <Intro
        description="We're working hard to bring you something amazing. This page will be updated soon with exciting new content!"
        title="Coming Soon"
      />
      <section className="mb-20">
        <Card className="mx-auto max-w-2xl">
          <CardContent className="p-8">
            <div className="flex flex-col items-center space-y-6">
              <motion.div animate={{ rotate: rotationAngle }} transition={{ duration: 1, ease: 'easeInOut' }}>
                <Construction className="size-24 text-indigo-600 dark:text-indigo-400" />
              </motion.div>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Under Construction</h2>
              <p className="text-center text-gray-600 dark:text-gray-400">
                Our team is hard at work creating this page. Check back soon for updates!
              </p>
              <Button
                className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700"
                onClick={handleRotation}
              >
                Rotate Icon <RefreshCw className="ml-2 size-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </>
  )
}
