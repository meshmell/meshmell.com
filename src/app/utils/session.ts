import { Session } from 'next-auth'

/**
 * Check if user is authenticated
 */
export async function checkSession(auth: Session | null) {
  if (!auth || !auth.user) {
    throw new Error('Not authenticated', {
      cause: 401,
    })
  }

  return auth
} 