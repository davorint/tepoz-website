import { auth, signOut } from '@/auth'
import Link from 'next/link'
import Image from 'next/image'

export async function UserMenu() {
  const session = await auth()

  if (!session?.user) {
    return (
      <Link
        href="/auth/signin"
        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
      >
        Sign In
      </Link>
    )
  }

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        {session.user.image && (
          <Image
            src={session.user.image}
            alt={session.user.name || 'User'}
            width={32}
            height={32}
            className="rounded-full"
          />
        )}
        <span className="text-sm font-medium text-gray-700">
          {session.user.name}
        </span>
      </div>
      <form
        action={async () => {
          'use server'
          await signOut({ redirectTo: '/' })
        }}
      >
        <button
          type="submit"
          className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Sign Out
        </button>
      </form>
    </div>
  )
}
