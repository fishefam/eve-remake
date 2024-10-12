'use client'

import { DoubleArrowUpIcon } from '@radix-ui/react-icons'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

import { Button } from './ui/button'

export default function ScrollToTop() {
  const showScrollTop = useScrollToTop()
  return (
    <AnimatePresence>
      {showScrollTop && (
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="group fixed bottom-8 right-8 z-50"
          exit={{ opacity: 0, y: 20 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <Button
            className="group rounded border-none bg-indigo-600 p-3 text-white shadow-lg transition-all duration-300 hover:bg-indigo-700 hover:text-white hover:shadow-xl dark:bg-indigo-500 dark:hover:bg-indigo-600"
            onClick={scrollToTop}
            size="icon"
            variant="outline"
          >
            <DoubleArrowUpIcon className="size-6" />
            <span className="sr-only">Scroll to top</span>
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function useScrollToTop() {
  const [showScrollTop, setShowScrollTop] = useState(false)
  useEffect(() => {
    const handleScrollToTop = () => setShowScrollTop(scrollY > 1000)
    addEventListener('scroll', handleScrollToTop)
    return () => removeEventListener('scroll', handleScrollToTop)
  }, [])
  return showScrollTop
}

function scrollToTop() {
  window.scrollTo({ behavior: 'smooth', top: 0 })
}
