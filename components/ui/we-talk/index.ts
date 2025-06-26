// Main components
export { default as WeTalkContainer } from './WeTalkContainer'
export { default as WeTalkDemo } from './WeTalkDemo'

// Sub-components
export { default as WeTalkBackground } from './WeTalkBackground'
export { default as WeTalkSidebar } from './WeTalkSidebar'
export { default as WeTalkHeader } from './WeTalkHeader'
export { default as WeTalkMessages } from './WeTalkMessages'
export { default as WeTalkInput } from './WeTalkInput'

// Popup components
export { default as UserSelectionPopup } from './UserSelectionPopup'
export { default as GroupChatCreator } from './GroupChatCreator'

// Types re-export for convenience
export type { Contact, Message, WeTalkState, Conversation } from '@/lib/types/weTalk.types'

// React Query hook
export { default as useFetchWeTalksWithQuery } from '@/lib/hooks/useFetchWeTalksWithQuery' 