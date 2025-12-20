'use client'

import { LOCAL_USER } from './localUser'
import type { User } from '@/entities/user/model/types'

export function useCurrentUser(): User {
  return LOCAL_USER
}
