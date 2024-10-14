/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-namespace */
import type { Dispatch, SetStateAction } from 'react'

declare global {
  namespace NodeJS {
    interface ProcessEnv extends Partial<CustomNodeEnv> {}
  }
  type SolutionPath = 'd365-commerce' | 'e4-dynamics' | 'e4-platform'
  var articleContent: string
}

interface CustomNodeEnv {
  CASE_STUDIES_URL: string
  CONTACT_FORM_ENDPOINT: string
  RESOURCES_URL: string
}

export type SetState<T> = Dispatch<SetStateAction<T>>
export type UseStateReturn<T> = [T, SetState<T>]
