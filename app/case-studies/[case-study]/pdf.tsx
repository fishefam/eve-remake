'use client'

import { useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import 'react-pdf/dist/esm/Page/TextLayer.css'

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

export default function PDFViewer({ file }: { file: string }) {
  const [numPages, setNumPages] = useState<number>()
  return (
    <Document
      className="mx-auto w-fit space-y-10 rounded-lg [&>div]:!bg-gray-800 [&_canvas]:rounded-3xl"
      file={file}
      onLoadSuccess={({ numPages }) => setNumPages(numPages)}
    >
      {new Array(numPages).fill(0).map((_, index) => (
        <Page key={index} pageNumber={index + 1} />
      ))}
    </Document>
  )
}
