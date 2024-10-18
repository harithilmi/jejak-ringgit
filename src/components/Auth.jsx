import { useState } from 'react'
import { supabase } from '../supabase'

export function Auth() {
  const [loading, setLoading] = useState(false)

  async function signInWithGoogle() {
    try {
      setLoading(true)
      const redirectTo = import.meta.env.DEV 
        ? 'http://localhost:5173'  // Hardcoded local URL
        : import.meta.env.VITE_PUBLIC_SITE_URL
      console.log('Redirecting to:', redirectTo) // For debugging
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectTo
        }
      })
      if (error) throw error
    } catch (error) {
      console.error('Sign-in error:', error)
      alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <button
        onClick={signInWithGoogle}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Sign In with Google'}
      </button>
    </div>
  )
}
