'use client'
import type { SetState } from '@/lib/types'
import type { ChangeEvent, InputHTMLAttributes, MouseEvent } from 'react'

import { createElement, select } from '@/lib/dom'
import { validate } from 'email-validator'
import { PlusSquare } from 'lucide-react'
import hashObject from 'object-hash'
import { useState } from 'react'
import { groupBy } from 'underscore'

import { RequiredIcon } from './icons'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'

type InputFile = { file: File | null; hash: string }

export default function CareerForm() {
  const [isMissingName, setIsMissingName] = useState(false)
  const [isMissingEmail, setIsMissingEmail] = useState(false)
  const [isMissingFiles, setIsMissingFiles] = useState(false)
  const [isInvalidEmail, setIsInvalidEmail] = useState(false)
  const [isUnsupportedFiles, setIsUnsupportedFiles] = useState(false)
  const [isDuplicatingFiles, setIsDuplicatingFiles] = useState(false)
  const [isExceededSize, setIsExceededSize] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [files, setFiles] = useState<InputFile[]>([{ file: null, hash: hashObject(null) }])

  const props = {
    email,
    files,
    isDuplicatingFiles,
    isExceededSize,
    isInvalidEmail,
    isMissingEmail,
    isMissingFiles,
    isMissingName,
    isUnsupportedFiles,
    message,
    name,
    setEmail,
    setFiles,
    setIsDuplicatingFiles,
    setIsExceededSize,
    setIsInvalidEmail,
    setIsMissingEmail,
    setIsMissingFiles,
    setIsMissingName,
    setIsUnsupportedFiles,
    setMessage,
    setName,
  }
  const handleNameInput = (event: ChangeEvent<HTMLInputElement>) => setName(event.target.value)
  const handleEmailInput = (event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)
  return (
    <Card>
      <CardHeader>
        <CardTitle>Think you fit the bill? Let&#39;s get in touch.</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label className="flex items-center gap-2" htmlFor="name">
                Your Name <RequiredIcon />
              </Label>
              <Input
                autoComplete="off"
                className="hover:ring-1 hover:ring-gray-200 dark:hover:ring-gray-800"
                id="name"
                onChange={handleNameInput}
                placeholder="John Doe"
                value={name}
              />
              <p className="text-sm text-red-500">{isMissingName ? 'Required' : ''}</p>
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2" htmlFor="email">
                Email Address <RequiredIcon />
              </Label>
              <Input
                autoComplete="off"
                className="hover:ring-1 hover:ring-gray-200 dark:hover:ring-gray-800"
                id="email"
                onChange={handleEmailInput}
                placeholder="john@example.com"
                type="email"
                value={email}
              />
              <p className="text-sm text-red-500">
                {isMissingEmail ? 'Required' : isInvalidEmail ? 'Invalid email' : ''}
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              className="transition-colors hover:ring-1 hover:ring-gray-200 dark:hover:ring-gray-800"
              id="message"
              placeholder="Tell us about yourself and why you're interested in joining Evenica"
              rows={10}
            />
          </div>
          <div className="space-y-2">
            <Label className="flex items-center gap-2" onClick={(event) => event.preventDefault()}>
              Upload Resume (.pdf, .doc, .docx / 10MB Max Total) <RequiredIcon />
            </Label>
            <div className="file-input-container space-y-2">
              <div className="relative" data-file-input-container="0">
                <input
                  accept=".pdf,.doc,.docx"
                  className="flex h-9 w-full cursor-pointer items-center rounded-md border border-input bg-transparent px-3 py-1 pl-7 pt-[6px] text-sm shadow-sm ring-gray-100 transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground hover:ring-1 hover:ring-gray-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 dark:hover:ring-gray-800"
                  data-file-input="0"
                  onChange={(event) => handleFileChange(event, setFiles)}
                  title=""
                  type="file"
                />
              </div>
            </div>
            <Button
              className="flex -translate-x-4 items-center gap-3 border-none bg-transparent shadow-none"
              disabled={files.length > 9}
              onClick={(event) => setInputs(event, props)}
              variant="outline"
            >
              <PlusSquare className="size-5" /> Add another file {files.length > 9 ? '(10 Max)' : ''}
            </Button>
            <p className="text-sm text-red-500">
              {isUnsupportedFiles
                ? 'Unsupported file types. Only .pdf, .doc, or .docx is allowed.'
                : isDuplicatingFiles
                  ? 'Files Duplicated.'
                  : isExceededSize
                    ? 'Total size exceeded 10MB'
                    : isMissingFiles
                      ? 'Must submit at least 1 file.'
                      : ''}
            </p>
          </div>
          <Button className="w-full" onClick={(event) => handleSubmit(event, props)} type="submit">
            Submit Application
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

function handleSubmit(
  event: MouseEvent<HTMLButtonElement>,
  {
    email,
    files,
    message,
    name,
    ...rest
  }: { files: InputFile[] } & Record<'email' | 'message' | 'name', string> &
    Record<`setIs${string}`, SetState<boolean>>,
) {
  event.preventDefault()
  const cannotSubmit = validateData({
    email,
    errorSetters: Object.entries(rest)
      .filter(([key]) => key.startsWith('setIs'))
      .map(([_, value]) => value),
    errorSettersObject: rest,
    files,
    name,
  })
  if (cannotSubmit) return

  const formData = new FormData()
  const fileSubmission = files.map<[string, File]>(({ file }, i) => [`document-${i + 1}`, file!])
  const data = {
    '_wpcf7': '3025',
    '_wpcf7_container_post': '2403',
    '_wpcf7_locale': 'en_US',
    '_wpcf7_posted_data_hash': '',
    '_wpcf7_unit_tag': 'wpcf7-f3025-p2403-o1',
    '_wpcf7_version': '5.9.8',
    'your-email': email,
    'your-message': message,
    'your-name': name,
    ...Object.fromEntries(fileSubmission),
  }
  for (const [key, value] of Object.entries(data)) formData.append(key, value as never)
  fetch(
    process.env.CAREER_FORM_ENDPOINT ?? 'https://evenica.com/wp-json/contact-form-7/v1/contact-forms/3025/feedback',
    { body: formData, method: 'POST' },
  )
}

function handleFileChange(event: ChangeEvent<HTMLInputElement>, setFiles: SetState<InputFile[]>) {
  const { dataset, files } = event.target
  const { fileInput } = dataset as { fileInput: string }
  const file = files?.item(0) ?? null
  setFiles((state) => {
    const _state = [...state]
    _state[parseInt(fileInput)] = { file, hash: hashObject(file) }
    return _state
  })
}

function setInputs(
  event: MouseEvent,
  { increment = true, setFiles, ...props }: { increment?: boolean; setFiles: SetState<InputFile[]> } & object,
) {
  event.preventDefault()
  event.stopPropagation()
  const inputContainer = select('.file-input-container')
  const inputCount = inputContainer?.children.length
  if (increment && inputContainer) {
    const container = createElement('div', {
      attributes: { 'data-file-input-container': inputCount },
      className: 'relative',
      parent: inputContainer,
    })
    createElement('button', {
      attributes: {
        'data-file-input': inputCount,
        'onClick': (event) => setInputs(event, { ...props, increment: false, setFiles }),
      },
      className:
        'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 py-2 absolute left-0 top-0 rounded-r-none border-none bg-transparent px-2 text-gray-900 shadow-none dark:hover:bg-gray-800 hover:bg-gray-200 transition-colors',
      innerHTML:
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x size-4 dark:stroke-white"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>',
      parent: container,
    })
    createElement<'input', InputHTMLAttributes<HTMLInputElement>>('input', {
      attributes: {
        'accept': '.pdf,.doc,.docx',
        'data-file-input': inputCount,
        'onChange': (event) => handleFileChange(event, setFiles),
        'title': '',
        'type': 'file',
      },
      className:
        'transition-colors pt-[6px] flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer items-center pl-7 hover:ring-1 hover:ring-gray-200 dark:hover:ring-gray-800',
      parent: container,
    })
    setFiles((state) => [...state, { file: null, hash: hashObject(null) }])
  }
  if (!increment && inputContainer) {
    const target = event.currentTarget as HTMLButtonElement
    const { fileInput } = target.dataset as { fileInput: string }
    const inputContainer = select(`[data-file-input-container="${fileInput}"]`)!
    setFiles((state) => [...state.slice(0, parseInt(fileInput)), ...state.slice(parseInt(fileInput) + 1)])
    inputContainer.remove()
  }
}

function validateData({
  email,
  errorSetters,
  errorSettersObject: pack,
  files,
  name,
}: {
  errorSetters: SetState<boolean>[]
  errorSettersObject: Record<`setIs${string}`, SetState<boolean>>
  files: InputFile[]
} & Record<'email' | 'name', string>) {
  const _files = files.filter(({ hash }) => hash !== hashObject(null))
  const groupedFiles = groupBy(_files, 'hash')
  const groupedCount = Object.values(groupedFiles).map((group) => group.length)
  const groupsWithDuplication = groupedCount.filter((count) => count > 1)
  const totalSizeInMB = _files.reduce((a, b) => a + (b?.file?.size ?? 0), 0) / 1_000_000
  const flags = [
    false, // Unsupported Files Check
    groupsWithDuplication.length > 0, // File duplication check
    totalSizeInMB > 10, // Total file size check
    !validate(email), // Email validation check
    !email.length, // Missing email check
    !_files.length, // Missing files check
    !name.length, // Missing name check
  ]
  for (const setter of errorSetters) setter(false)
  for (const { file } of _files)
    if (!/\.(pdf|docx?)$/i.test(file?.name ?? '')) {
      pack.setIsUnsupportedFiles(true)
      flags[0] = true
      break
    }
  pack.setIsDuplicatingFiles(flags[1])
  pack.setIsExceededSize(flags[2])
  pack.setIsInvalidEmail(flags[3])
  pack.setIsMissingEmail(flags[4])
  pack.setIsMissingFiles(flags[5])
  pack.setIsMissingName(flags[6])
  return flags.some((value) => value)
}
