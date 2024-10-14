'use client'

import { useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import 'react-pdf/dist/esm/Page/TextLayer.css'

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

const options = {
  cMapUrl: '/cmaps/',
  standardFontDataUrl: '/standard_fonts/',
}

export default function PDFViewer({ file }: { file: string }) {
  const [numPages, setNumPages] = useState<number>()
  return (
    <Document
      className="mx-auto mt-10 w-fit space-y-10 [&>div]:!bg-[rgb(238,242,255)] [&>div]:dark:!bg-gray-800"
      file={file}
      onLoadSuccess={({ numPages }) => setNumPages(numPages)}
      options={options}
    >
      {new Array(numPages).fill(0).map((_, index) => (
        <Page key={index} pageNumber={index + 1} />
      ))}
    </Document>
  )
}
