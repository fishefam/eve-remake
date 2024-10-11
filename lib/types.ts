import type { Dispatch, SetStateAction } from 'react'

export type SetState<T> = Dispatch<SetStateAction<T>>
export type UseStateReturn<T> = [T, SetState<T>]
