'use client'
import type { SetState } from '@/lib/types'
import type { ChangeEvent, MouseEvent } from 'react'

import { capFirstChar, cn } from '@/lib/utils'
import { validate } from 'email-validator'
import { ArrowRight, LoaderCircle } from 'lucide-react'
import { useState } from 'react'

import { RequiredIcon } from '../icons'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { ConditionalRender } from '../utils'
import { submitContactInfo } from './actions'

type FlatInput = {
  checkValidEmail?: boolean
  errorName?: string
  label: string
  name: string
  placeholder: string
  required?: boolean
  setState: SetState<string>
  state: string
}

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isMissingFirstName, setIsMissingFirstName] = useState(false)
  const [isMissingLastName, setIsMissingLastName] = useState(false)
  const [isMissingEmail, setIsMissingEmail] = useState(false)
  const [isInvalidEmail, setIsInvalidEmail] = useState(false)
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
          errorName: 'isMissingFirstName',
          label: 'First Name',
          name: 'firstName',
          placeholder: 'John',
          required: true,
          setState: setFirstName,
          state: firstName,
        },
        {
          errorName: 'isMissingLastName',
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
    { label: 'Company', name: 'company', placeholder: 'KASCO', setState: setCompany, state: company },
    {
      label: 'Solution Interest',
      name: 'solutionInterest',
      placeholder: 'E-commerce Platform',
      setState: setSolutionInterest,
      state: solutionInterest,
    },
    {
      checkValidEmail: true,
      errorName: 'isMissingEmail',
      label: 'Email',
      name: 'email',
      placeholder: 'john@example.com',
      required: true,
      setState: setEmail,
      state: email,
    },
  ]
  const handleSubmit = async (event: MouseEvent) => {
    setIsSubmitting(true)
    event.preventDefault()
    let flag = false
    const checks = [
      [firstName, setIsMissingFirstName],
      [lastName, setIsMissingLastName],
      [email, setIsMissingEmail],
    ] as const
    for (const [value, setIsMissingValue] of checks)
      if (!value) {
        setIsMissingValue(true)
        flag = true
      }
    if (!email) {
      setIsSubmitting(false)
      return
    }
    if (!validate(email)) {
      setIsInvalidEmail(true)
      flag = true
    }
    if (!flag) await submitContactInfo({ company, email, firstName, lastName, solutionInterest, title })
    setIsSubmitting(false)
  }
  const SubmitIcon = isSubmitting ? LoaderCircle : ArrowRight
  const errors = { isMissingEmail, isMissingFirstName, isMissingLastName } as Record<string, boolean>
  const setErrors = { setIsMissingEmail, setIsMissingFirstName, setIsMissingLastName } as Record<
    string,
    SetState<boolean>
  >
  return (
    <form className="space-y-6 rounded-2xl border bg-white p-7 shadow dark:bg-black">
      {inputs.map(({ checkValidEmail, errorName, grouped, ...props }, i) =>
        grouped ? (
          <div className="grid gap-4 sm:grid-cols-2" key={`grouped-${i}`}>
            {grouped.map(({ checkValidEmail: _checkValidEmail, errorName: _errorName, ..._props }) => (
              <FormInput
                {..._props}
                checkValidEmail={_checkValidEmail}
                isInvalidEmail={_checkValidEmail ? isInvalidEmail : undefined}
                isMissingValue={_errorName ? errors[_errorName] : false}
                key={_props.label}
                setIsInvalidEmail={_checkValidEmail ? setIsInvalidEmail : undefined}
                setIsMissingValue={_errorName ? setErrors[`set${capFirstChar(_errorName ?? '')}`] : undefined}
              />
            ))}
          </div>
        ) : (
          <FormInput
            {...props}
            checkValidEmail={checkValidEmail}
            isInvalidEmail={checkValidEmail ? isInvalidEmail : undefined}
            isMissingValue={errorName ? errors[errorName] : false}
            key={props.label}
            setIsInvalidEmail={checkValidEmail ? setIsInvalidEmail : undefined}
            setIsMissingValue={errorName ? setErrors[`set${capFirstChar(errorName)}`] : undefined}
          />
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

function FormInput({
  checkValidEmail,
  isInvalidEmail,
  isMissingValue,
  label,
  name,
  placeholder,
  required,
  setIsInvalidEmail,
  setIsMissingValue,
  setState,
  state,
}: {
  isInvalidEmail?: boolean
  isMissingValue?: boolean
  setIsInvalidEmail?: SetState<boolean>
  setIsMissingValue?: SetState<boolean>
} & Omit<FlatInput, 'errorName'>) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setState(event.target.value)
    setIsMissingValue?.(false)
    setIsInvalidEmail?.(false)
  }
  return (
    <div key={label}>
      <Label className="flex items-center gap-2" htmlFor={`contact-input--${name}`}>
        {label}{' '}
        <ConditionalRender show={!!required}>
          <RequiredIcon />
        </ConditionalRender>
      </Label>
      <Input
        autoComplete="off"
        className="mt-2 inline-block h-12 transition-colors hover:ring-1 hover:ring-gray-200 dark:border-none dark:bg-gray-900 dark:shadow dark:hover:ring-gray-800"
        id={`contact-input--${name}`}
        name={name}
        onChange={(event) => handleChange(event)}
        placeholder={placeholder}
        required={required}
        value={state}
      />
      <ConditionalRender show={!!checkValidEmail && !!isInvalidEmail}>
        <p className="mt-2 text-xs text-red-500">Invalid email</p>
      </ConditionalRender>
      <ConditionalRender show={!!required && !!isMissingValue}>
        <p className="mt-2 text-xs text-red-500">This field is required</p>
      </ConditionalRender>
    </div>
  )
}
