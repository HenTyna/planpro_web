// Main container component
export { default as WeTalkContainer } from './WeTalkContainer'

// Individual components
export { default as WeTalkBackground } from './WeTalkBackground'
export { default as WeTalkSidebar } from './WeTalkSidebar'
export { default as WeTalkHeader } from './WeTalkHeader'
export { default as WeTalkMessages } from './WeTalkMessages'
export { default as WeTalkInput } from './WeTalkInput'

// Types from the hook
export type { Message, Contact, Conversation } from '@/lib/hooks/useFetchWeTalks'

// Hook
export { default as useFetchWeTalks } from '@/lib/hooks/useFetchWeTalks' 