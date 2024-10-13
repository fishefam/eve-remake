/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-namespace */
import type { Dispatch, SetStateAction } from 'react'

declare global {
  namespace NodeJS {
    interface ProcessEnv extends Partial<CustomNodeEnv> {}
  }
}

interface CustomNodeEnv {
  CASE_STUDIES_URL: string
  CONTACT_FORM_ENDPOINT: string
}

export type SetState<T> = Dispatch<SetStateAction<T>>
export type UseStateReturn<T> = [T, SetState<T>]
