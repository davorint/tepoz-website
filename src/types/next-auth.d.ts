import { DefaultSession } from 'next-auth'
import { userRoleEnum } from '@/lib/db/schema'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      role: (typeof userRoleEnum.enumValues)[number]
    } & DefaultSession['user']
  }

  interface User {
    role: (typeof userRoleEnum.enumValues)[number]
  }
}
