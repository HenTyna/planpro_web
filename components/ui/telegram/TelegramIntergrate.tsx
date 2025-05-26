"use client"

import { useState } from "react"
import {
  MessageCircle,
  Bell,
  Check,
  X,
  Copy,
  ExternalLink,
  Smartphone,
  Shield,
  Zap,
  CheckCircle,
  AlertCircle,
  Info,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/ui/card"
import { Badge } from "@/components/shared/ui/badge"
import { Label } from "@/components/shared/ui/label"
import { Button } from "@/components/shared/ui/Button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/shared/ui/dialog"
import { Switch } from "@/components/shared/ui/swtich"
import { Input } from "@/components/shared/ui/Input"
import { cn } from "@/utils/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/shared/ui/tabs"



// Types
interface TelegramAccount {
  id: string
  username: string
  firstName: string
  lastName?: string
  isConnected: boolean
  chatId: string
  connectedAt: string
}

interface NotificationSettings {
  reminders: boolean
  taskUpdates: boolean
  planDeadlines: boolean
  calendarEvents: boolean
  dailySummary: boolean
  weeklyReport: boolean
  urgentOnly: boolean
  quietHours: {
    enabled: boolean
    start: string
    end: string
  }
  reminderTiming: {
    immediate: boolean
    fifteenMinutes: boolean
    oneHour: boolean
    oneDay: boolean
  }
}

interface BotCommand {
  id: string
  command: string
  description: string
  isActive: boolean
  usage: string
}

// Sample data
const sampleAccount: TelegramAccount = {
  id: "123456789",
  username: "john_doe",
  firstName: "John",
  lastName: "Doe",
  isConnected: true,
  chatId: "987654321",
  connectedAt: "2024-01-15T10:30:00Z",
}

const defaultNotificationSettings: NotificationSettings = {
  reminders: true,
  taskUpdates: true,
  planDeadlines: true,
  calendarEvents: true,
  dailySummary: true,
  weeklyReport: false,
  urgentOnly: false,
  quietHours: {
    enabled: true,
    start: "22:00",
    end: "08:00",
  },
  reminderTiming: {
    immediate: true,
    fifteenMinutes: true,
    oneHour: false,
    oneDay: false,
  },
}

const botCommands: BotCommand[] = [
  {
    id: "1",
    command: "/today",
    description: "Get today's tasks and reminders",
    isActive: true,
    usage: "Send /today to get your daily agenda",
  },
  {
    id: "2",
    command: "/add",
    description: "Add a new task or reminder",
    isActive: true,
    usage: "/add Buy groceries at 6 PM",
  },
  {
    id: "3",
    command: "/complete",
    description: "Mark a task as completed",
    isActive: true,
    usage: "/complete 1 (where 1 is task ID)",
  },
  {
    id: "4",
    command: "/upcoming",
    description: "View upcoming events and deadlines",
    isActive: true,
    usage: "Send /upcoming to see what's coming up",
  },
  {
    id: "5",
    command: "/stats",
    description: "Get productivity statistics",
    isActive: false,
    usage: "Send /stats for your productivity overview",
  },
]

// Components
const ConnectionStatus = ({
  account,
  onConnect,
  onDisconnect,
}: {
  account: TelegramAccount | null
  onConnect: () => void
  onDisconnect: () => void
}) => {
  const [showDisconnectDialog, setShowDisconnectDialog] = useState(false)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <MessageCircle className="h-5 w-5 mr-2 text-blue-500" />
          Connection Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {account?.isConnected ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium text-green-900">Connected</h3>
                  <p className="text-sm text-green-700">
                    @{account.username} ({account.firstName} {account.lastName})
                  </p>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800">Active</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <Label className="text-gray-500">User ID</Label>
                <p className="font-mono">{account.id}</p>
              </div>
              <div>
                <Label className="text-gray-500">Chat ID</Label>
                <p className="font-mono">{account.chatId}</p>
              </div>
              <div>
                <Label className="text-gray-500">Connected Since</Label>
                <p>{new Date(account.connectedAt).toLocaleDateString()}</p>
              </div>
              <div>
                <Label className="text-gray-500">Status</Label>
                <p className="text-green-600 font-medium">Online</p>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={() => setShowDisconnectDialog(true)}>
                <X className="h-4 w-4 mr-2" />
                Disconnect
              </Button>
              <Button variant="outline" size="sm">
                <ExternalLink className="h-4 w-4 mr-2" />
                Open Telegram
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Not Connected</h3>
                  <p className="text-sm text-gray-600">Connect your Telegram account to get started</p>
                </div>
              </div>
              <Badge variant="outline" className="bg-gray-100 text-gray-600">
                Inactive
              </Badge>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">How to connect:</h4>
              <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
                <li>Click the "Connect Telegram" button below</li>
                <li>You'll be redirected to Telegram</li>
                <li>Start a chat with @PlanProBot</li>
                <li>Send the verification code</li>
                <li>Return here to complete setup</li>
              </ol>
            </div>

            <Button onClick={onConnect} className="w-full">
              <MessageCircle className="h-4 w-4 mr-2" />
              Connect Telegram Account
            </Button>
          </div>
        )}

        {/* Disconnect Confirmation Dialog */}
        <Dialog open={showDisconnectDialog} onOpenChange={setShowDisconnectDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Disconnect Telegram Account</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p className="text-gray-700">
                Are you sure you want to disconnect your Telegram account? You will no longer receive notifications and
                won't be able to use bot commands.
              </p>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDisconnectDialog(false)}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  onDisconnect()
                  setShowDisconnectDialog(false)
                }}
              >
                Disconnect
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}

const NotificationSettingsCard = ({
  settings,
  onUpdate,
}: {
  settings: NotificationSettings
  onUpdate: (settings: NotificationSettings) => void
}) => {
  const handleToggle = (key: keyof NotificationSettings, value: boolean) => {
    onUpdate({ ...settings, [key]: value })
  }

  const handleQuietHoursToggle = (enabled: boolean) => {
    onUpdate({
      ...settings,
      quietHours: { ...settings.quietHours, enabled },
    })
  }

  const handleQuietHoursTime = (type: "start" | "end", time: string) => {
    onUpdate({
      ...settings,
      quietHours: { ...settings.quietHours, [type]: time },
    })
  }

  const handleReminderTimingToggle = (key: keyof NotificationSettings["reminderTiming"], value: boolean) => {
    onUpdate({
      ...settings,
      reminderTiming: { ...settings.reminderTiming, [key]: value },
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Bell className="h-5 w-5 mr-2 text-orange-500" />
          Notification Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Notification Types */}
        <div className="space-y-4">
          <h4 className="font-medium">Notification Types</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <Label>Task Reminders</Label>
                <p className="text-sm text-gray-500">Get notified about upcoming tasks</p>
              </div>
              <Switch checked={settings.reminders} onCheckedChange={(checked) => handleToggle("reminders", checked)} />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Task Updates</Label>
                <p className="text-sm text-gray-500">Notifications when tasks are completed or updated</p>
              </div>
              <Switch
                checked={settings.taskUpdates}
                onCheckedChange={(checked) => handleToggle("taskUpdates", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Plan Deadlines</Label>
                <p className="text-sm text-gray-500">Alerts for approaching project deadlines</p>
              </div>
              <Switch
                checked={settings.planDeadlines}
                onCheckedChange={(checked) => handleToggle("planDeadlines", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Calendar Events</Label>
                <p className="text-sm text-gray-500">Notifications for upcoming calendar events</p>
              </div>
              <Switch
                checked={settings.calendarEvents}
                onCheckedChange={(checked) => handleToggle("calendarEvents", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Daily Summary</Label>
                <p className="text-sm text-gray-500">Morning summary of your day's agenda</p>
              </div>
              <Switch
                checked={settings.dailySummary}
                onCheckedChange={(checked) => handleToggle("dailySummary", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Weekly Report</Label>
                <p className="text-sm text-gray-500">Weekly productivity and completion report</p>
              </div>
              <Switch
                checked={settings.weeklyReport}
                onCheckedChange={(checked) => handleToggle("weeklyReport", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Urgent Only</Label>
                <p className="text-sm text-gray-500">Only receive notifications for urgent items</p>
              </div>
              <Switch
                checked={settings.urgentOnly}
                onCheckedChange={(checked) => handleToggle("urgentOnly", checked)}
              />
            </div>
          </div>
        </div>

        {/* Quiet Hours */}
        <div className="space-y-4">
          <h4 className="font-medium">Quiet Hours</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <Label>Enable Quiet Hours</Label>
                <p className="text-sm text-gray-500">Pause notifications during specified hours</p>
              </div>
              <Switch checked={settings.quietHours.enabled} onCheckedChange={handleQuietHoursToggle} />
            </div>

            {settings.quietHours.enabled && (
              <div className="grid grid-cols-2 gap-4 pl-4">
                <div>
                  <Label>Start Time</Label>
                  <Input
                    type="time"
                    value={settings.quietHours.start}
                    onChange={(e) => handleQuietHoursTime("start", e.target.value)}
                  />
                </div>
                <div>
                  <Label>End Time</Label>
                  <Input
                    type="time"
                    value={settings.quietHours.end}
                    onChange={(e) => handleQuietHoursTime("end", e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Reminder Timing */}
        <div className="space-y-4">
          <h4 className="font-medium">Reminder Timing</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Immediate</Label>
              <Switch
                checked={settings.reminderTiming.immediate}
                onCheckedChange={(checked) => handleReminderTimingToggle("immediate", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label>15 minutes before</Label>
              <Switch
                checked={settings.reminderTiming.fifteenMinutes}
                onCheckedChange={(checked) => handleReminderTimingToggle("fifteenMinutes", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label>1 hour before</Label>
              <Switch
                checked={settings.reminderTiming.oneHour}
                onCheckedChange={(checked) => handleReminderTimingToggle("oneHour", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label>1 day before</Label>
              <Switch
                checked={settings.reminderTiming.oneDay}
                onCheckedChange={(checked) => handleReminderTimingToggle("oneDay", checked)}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

const BotCommandsCard = ({
  commands,
  onToggleCommand,
}: {
  commands: BotCommand[]
  onToggleCommand: (commandId: string, isActive: boolean) => void
}) => {
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedCommand(text)
    setTimeout(() => setCopiedCommand(null), 2000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Zap className="h-5 w-5 mr-2 text-purple-500" />
          Bot Commands
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600">Available commands you can use in your Telegram chat with @PlanProBot</p>

        <div className="space-y-3">
          {commands.map((command) => (
            <div
              key={command.id}
              className={cn(
                "p-4 rounded-lg border transition-colors",
                command.isActive ? "bg-blue-50 border-blue-200" : "bg-gray-50 border-gray-200",
              )}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <code className="px-2 py-1 bg-gray-100 rounded text-sm font-mono">{command.command}</code>
                    <Badge variant={command.isActive ? "default" : "secondary"}>
                      {command.isActive ? "Active" : "Disabled"}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{command.description}</p>
                  <p className="text-xs text-gray-500">{command.usage}</p>
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(command.command)}
                    className="h-8 w-8 p-0"
                  >
                    {copiedCommand === command.command ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                  <Switch
                    checked={command.isActive}
                    onCheckedChange={(checked) => onToggleCommand(command.id, checked)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-start space-x-3">
            <Info className="h-5 w-5 text-blue-500 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900">Getting Started</h4>
              <p className="text-sm text-blue-700 mt-1">
                Open Telegram and search for @PlanProBot. Start a conversation and try sending /today to see your daily
                agenda.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

const SecurityCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Shield className="h-5 w-5 mr-2 text-green-500" />
          Security & Privacy
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
            <div>
              <h4 className="font-medium">End-to-End Encryption</h4>
              <p className="text-sm text-gray-600">All messages are encrypted using Telegram's security protocols</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
            <div>
              <h4 className="font-medium">No Data Storage</h4>
              <p className="text-sm text-gray-600">We don't store your Telegram messages or personal conversations</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
            <div>
              <h4 className="font-medium">Secure Authentication</h4>
              <p className="text-sm text-gray-600">OAuth 2.0 authentication with Telegram's secure API</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
            <div>
              <h4 className="font-medium">Revoke Access Anytime</h4>
              <p className="text-sm text-gray-600">You can disconnect and revoke access at any time</p>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
            <div>
              <h4 className="font-medium text-yellow-900">Privacy Notice</h4>
              <p className="text-sm text-yellow-700 mt-1">
                Only basic profile information (username, name) is accessed. We never read your private messages or
                access your contacts.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Main component
export default function TelegramIntegration() {
  const [account, setAccount] = useState<TelegramAccount | null>(sampleAccount)
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>(defaultNotificationSettings)
  const [commands, setCommands] = useState<BotCommand[]>(botCommands)
  const [activeTab, setActiveTab] = useState("overview")

  const handleConnect = () => {
    // In a real app, this would redirect to Telegram OAuth
    console.log("Connecting to Telegram...")
    // Simulate connection
    setTimeout(() => {
      setAccount(sampleAccount)
    }, 1000)
  }

  const handleDisconnect = () => {
    setAccount(null)
  }

  const handleToggleCommand = (commandId: string, isActive: boolean) => {
    setCommands((prev) => prev.map((cmd) => (cmd.id === commandId ? { ...cmd, isActive } : cmd)))
  }

  const stats = {
    messagesReceived: 1247,
    commandsUsed: 89,
    notificationsSent: 156,
    uptime: "99.9%",
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="relative">
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-70"></div>

          <div className="relative container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="mb-4 md:mb-0">
                <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                  <MessageCircle className="h-6 w-6 mr-2 text-blue-500" />
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Telegram Integration
                  </span>
                </h1>
                <p className="text-gray-600 mt-1">
                  Connect your Telegram account for instant notifications and bot commands
                </p>
              </div>

              <div className="flex items-center space-x-3">
                {account?.isConnected && (
                  <Badge className="bg-green-100 text-green-800">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Connected
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        {account?.isConnected && (
          <div className="container mx-auto px-4 py-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="bg-white">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Messages</p>
                      <h3 className="text-2xl font-bold text-gray-900">{stats.messagesReceived}</h3>
                    </div>
                    <div className="rounded-full bg-blue-100 p-2">
                      <MessageCircle className="h-5 w-5 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Commands</p>
                      <h3 className="text-2xl font-bold text-gray-900">{stats.commandsUsed}</h3>
                    </div>
                    <div className="rounded-full bg-purple-100 p-2">
                      <Zap className="h-5 w-5 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Notifications</p>
                      <h3 className="text-2xl font-bold text-gray-900">{stats.notificationsSent}</h3>
                    </div>
                    <div className="rounded-full bg-orange-100 p-2">
                      <Bell className="h-5 w-5 text-orange-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Uptime</p>
                      <h3 className="text-2xl font-bold text-gray-900">{stats.uptime}</h3>
                    </div>
                    <div className="rounded-full bg-green-100 p-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="commands">Commands</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ConnectionStatus account={account} onConnect={handleConnect} onDisconnect={handleDisconnect} />

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Smartphone className="h-5 w-5 mr-2 text-green-500" />
                    Quick Setup Guide
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-medium text-blue-600">
                        1
                      </div>
                      <div>
                        <h4 className="font-medium">Connect Account</h4>
                        <p className="text-sm text-gray-600">Link your Telegram account securely</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-medium text-blue-600">
                        2
                      </div>
                      <div>
                        <h4 className="font-medium">Configure Notifications</h4>
                        <p className="text-sm text-gray-600">Choose what notifications you want to receive</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-medium text-blue-600">
                        3
                      </div>
                      <div>
                        <h4 className="font-medium">Start Using Commands</h4>
                        <p className="text-sm text-gray-600">Try sending /today to get your daily agenda</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Bot Username</h4>
                    <div className="flex items-center space-x-2">
                      <code className="px-2 py-1 bg-white rounded text-sm font-mono">@PlanProBot</code>
                      <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText("@PlanProBot")}>
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6 mt-6">
            <NotificationSettingsCard settings={notificationSettings} onUpdate={setNotificationSettings} />
          </TabsContent>

          <TabsContent value="commands" className="space-y-6 mt-6">
            <BotCommandsCard commands={commands} onToggleCommand={handleToggleCommand} />
          </TabsContent>

          <TabsContent value="security" className="space-y-6 mt-6">
            <SecurityCard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
