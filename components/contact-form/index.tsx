'use client'

import type { SetState } from '@/lib/types'
import type { MouseEvent } from 'react'

import { cn } from '@/lib/utils'
import { ArrowRight, LoaderCircle } from 'lucide-react'
import { useState } from 'react'

import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { submitContactInfo } from './actions'

type FlatInput = {
  label: string
  name: string
  placeholder: string
  setState: SetState<string>
  state: string
}

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [title, setTitle] = useState('')
  const [company, setCompany] = useState('')
  const [solutionInterest, setSolutionInterest] = useState('')
  const [email, setEmail] = useState('')
  const inputs: ({ grouped?: FlatInput[] } & FlatInput)[] = [
    {
      grouped: [
        {
          label: 'First Name',
          name: 'firstName',
          placeholder: 'John',
          required: true,
          setState: setFirstName,
          state: firstName,
        },
        {
          label: 'Last Name',
          name: 'lastName',
          placeholder: 'Doe',
          required: true,
          setState: setLastName,
          state: lastName,
        },
      ],
      label: '',
      name: '',
      placeholder: '',
      setState: () => {},
      state: '',
    },
    { label: 'Title', name: 'title', placeholder: 'CEO', setState: setTitle, state: title },
    { label: 'Company', name: 'company', placeholder: 'Acme Inc.', setState: setCompany, state: company },
    {
      label: 'Solution Interest',
      name: 'solutionInterest',
      placeholder: 'E-commerce Platform',
      setState: setSolutionInterest,
      state: solutionInterest,
    },
    {
      label: 'Email',
      name: 'email',
      placeholder: 'john@example.com',
      required: true,
      setState: setEmail,
      state: email,
    },
  ]
  const handleSubmit = async (event: MouseEvent) => {
    event.preventDefault()
    setIsSubmitting(true)
    await submitContactInfo({ company, email, firstName, lastName, solutionInterest, title })
    setIsSubmitting(false)
  }
  const SubmitIcon = isSubmitting ? LoaderCircle : ArrowRight
  return (
    <form className="space-y-6 rounded-2xl border bg-white p-7 shadow dark:bg-black">
      {inputs.map(({ grouped, ...props }, i) =>
        grouped ? (
          <div className="grid gap-4 sm:grid-cols-2" key={`grouped-${i}`}>
            {grouped.map((_props) => (
              <FormInput {..._props} key={_props.label} />
            ))}
          </div>
        ) : (
          <FormInput {...props} key={props.label} />
        ),
      )}
      <Button
        className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700"
        onClick={handleSubmit}
        type="button"
      >
        Submit <SubmitIcon className={cn('ml-2 size-4', isSubmitting && 'animate-spin')} />
      </Button>
    </form>
  )
}

function FormInput({ label, name, placeholder, setState, state }: FlatInput) {
  return (
    <div key={label}>
      <Label htmlFor={`contact-input--${name}`}>{label}</Label>
      <Input
        autoComplete="off"
        className="mt-2 h-12 dark:border-none dark:bg-gray-900 dark:shadow"
        id={`contact-input--${name}`}
        name={name}
        onChange={(event) => setState(event.target.value)}
        placeholder={placeholder}
        value={state}
      />
    </div>
  )
}
