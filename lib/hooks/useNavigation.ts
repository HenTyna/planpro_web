import { useState, useCallback } from 'react'
import { useRouter } from 'next/router'

export const useNavigation = () => {
  const [isNavigating, setIsNavigating] = useState(false)
  const router = useRouter()

  const navigate = useCallback(async (href: string) => {
    if (href === router.pathname) return
    
    setIsNavigating(true)
    try {
      await router.push(href)
    } catch (error) {
      console.error('Navigation error:', error)
    } finally {
      // Add a small delay to ensure smooth transition
      setTimeout(() => setIsNavigating(false), 100)
    }
  }, [router])

  const navigateWithLoading = useCallback(async (href: string, loadingCallback?: (loading: boolean) => void) => {
    if (href === router.pathname) return
    
    setIsNavigating(true)
    loadingCallback?.(true)
    
    try {
      await router.push(href)
    } catch (error) {
      console.error('Navigation error:', error)
    } finally {
      setTimeout(() => {
        setIsNavigating(false)
        loadingCallback?.(false)
      }, 100)
    }
  }, [router])

  return {
    isNavigating,
    navigate,
    navigateWithLoading,
  }
}
