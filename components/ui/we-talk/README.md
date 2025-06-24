# WeTalk Chat Components

A beautiful, creative, and colorful chat interface built with React, TypeScript, and Tailwind CSS.

## 🏗️ Component Structure

### Main Components

- **`WeTalkContainer`** - Main container that orchestrates all components and manages state
- **`WeTalkSidebar`** - Left sidebar with contacts list, search, and header
- **`WeTalkHeader`** - Top header of chat area with contact info and action buttons
- **`WeTalkMessages`** - Messages display area with typing indicators
- **`WeTalkInput`** - Message input area with quick actions
- **`WeTalkBackground`** - Animated background elements

### Hook

- **`useFetchWeTalks`** - Custom hook for API integration and state management

## 🚀 Usage

### Basic Usage

```tsx
import { WeTalkContainer } from '@/components/ui/we-talk'

function ChatPage() {
  return <WeTalkContainer />
}
```

### Using Individual Components

```tsx
import {
  WeTalkSidebar,
  WeTalkHeader,
  WeTalkMessages,
  WeTalkInput,
  WeTalkBackground,
  useFetchWeTalks
} from '@/components/ui/we-talk'

function CustomChatLayout() {
  const chatData = useFetchWeTalks()
  
  return (
    <div className="flex h-screen">
      <WeTalkBackground />
      <WeTalkSidebar {...chatData} />
      <div className="flex-1 flex flex-col">
        <WeTalkHeader {...chatData} />
        <WeTalkMessages {...chatData} />
        <WeTalkInput {...chatData} />
      </div>
    </div>
  )
}
```

## 🔌 API Integration

### Backend Requirements

The components expect the following API endpoints:

```typescript
// Service file: service/weTalk.service.ts
const weTalkService = {
  WE_TALK: '/api/wb/v1/chat'
}

// Endpoints:
GET    /api/wb/v1/chat/users                    // Get all users
GET    /api/wb/v1/chat/conversations/:userId    // Get user conversations
GET    /api/wb/v1/chat/messages/:conversationId // Get messages
POST   /api/wb/v1/chat                         // Create conversation
POST   /api/wb/v1/chat/messages                // Send message
POST   /api/wb/v1/chat/messages/reactions      // Add reaction
```

### API Response Formats

#### Users/Contacts Response
```typescript
{
  users: [
    {
      id: number,
      name: string,
      username?: string,
      avatar?: string,
      isOnline: boolean,
      lastMessage?: string,
      unreadCount?: number
    }
  ]
}
```

#### Messages Response
```typescript
{
  messages: [
    {
      id: number,
      content: string,
      createdAt: string,
      type: 'text' | 'image' | 'voice',
      status: 'sent' | 'delivered' | 'read',
      isFromCurrentUser: boolean,
      senderId: number,
      sender: {
        name: string,
        avatar?: string
      }
    }
  ]
}
```

## 🎨 Customization

### Colors and Gradients

The components use a vibrant color scheme with gradients:

- **Primary**: Purple to Pink gradients
- **Secondary**: Blue to Cyan gradients
- **Accent**: Various rainbow gradients for avatars
- **Status**: Green (online), Yellow (away), Gray (offline)

### Animations

- **Background**: Floating gradient orbs with pulse and spin
- **Messages**: Fade-in animations
- **Typing**: Bouncing dots
- **Buttons**: Scale and shadow effects

### Responsive Design

- Sidebar collapses on mobile
- Message bubbles adapt to screen size
- Touch-friendly button sizes

## 🔧 Configuration

### Environment Variables

```env
# API Base URL
NEXT_PUBLIC_API_URL=http://localhost:3001

# WebSocket URL (for real-time features)
NEXT_PUBLIC_WS_URL=ws://localhost:3001
```

### Hook Options

```typescript
const {
  contacts,
  messages,
  activeContact,
  isLoading,
  isTyping,
  error,
  sendMessage,
  switchContact,
  createConversation,
  addReaction
} = useFetchWeTalks({
  autoRefresh: true,        // Auto-refresh messages
  refreshInterval: 5000,    // Refresh interval in ms
  enableTyping: true,       // Enable typing indicators
  enableReactions: true     // Enable message reactions
})
```

## 🎯 Features

### ✨ Visual Features
- Gradient backgrounds and animations
- Colorful avatar system
- Real-time typing indicators
- Message status indicators
- Smooth transitions and hover effects

### 🚀 Functional Features
- Real-time messaging
- Contact management
- Message reactions
- File attachments (UI ready)
- Voice/video call buttons (UI ready)
- Quick message actions
- Search functionality (UI ready)

### 📱 Mobile Features
- Touch-friendly interface
- Swipe gestures (ready for implementation)
- Responsive sidebar
- Optimized for mobile keyboards

## 🛠️ Development

### Adding New Message Types

```typescript
// Extend the Message type
interface CustomMessage extends Message {
  attachments?: Attachment[]
  reactions?: Reaction[]
  isEdited?: boolean
}

// Update the hook to handle new types
const sendMessage = async (text: string, type: 'text' | 'image' | 'voice' = 'text') => {
  // Implementation
}
```

### Custom Styling

```css
/* Add to globals.css */
.wetalk-custom-theme {
  --wetalk-primary: #your-color;
  --wetalk-secondary: #your-color;
  --wetalk-accent: #your-color;
}
```

## 🐛 Troubleshooting

### Common Issues

1. **API Connection Errors**
   - Check backend service is running
   - Verify API endpoints match service configuration
   - Check CORS settings

2. **Messages Not Updating**
   - Ensure WebSocket connection is established
   - Check network connectivity
   - Verify user authentication

3. **Styling Issues**
   - Ensure Tailwind CSS is properly configured
   - Check for CSS conflicts
   - Verify animation classes are available

### Debug Mode

```typescript
// Enable debug logging
const chatData = useFetchWeTalks({ debug: true })
```

## 📄 License

This component library is part of the Smarter PMS project. 