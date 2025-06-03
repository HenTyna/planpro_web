
import { useState } from "react"
import { Button } from "@/components/shared/ui/Button"
import { Input } from "@/components/shared/ui/Input"
import { User, Mail, Phone, MapPin, Calendar, Camera, Bell, Shield, Palette, Star, Edit, Save, X } from "lucide-react"
import Image from "next/image"
import { Label } from "@/components/shared/ui/label"
import { Switch } from "@/components/shared/ui/swtich"
import profile from "@/public/asset/profile.jpg";
type Props = {
    profile_data: any
    onClose: () => void
}

const ProfileContrainer = ({ profile_data, onClose }: Props) => {
    const [activeTab, setActiveTab] = useState("personal")
    const [isEditing, setIsEditing] = useState(false)

    // Initialize profile data from props or defaults
    const [profileData, setProfileData] = useState({
        username: profile_data?.username || "JohnDoe",
        firstName: profile_data?.firstName || "John",
        lastName: profile_data?.lastName || "Doe",
        email: profile_data?.email || "john.doe@example.com",
        phone: profile_data?.phone || "+1 (555) 123-4567",
        location: profile_data?.location || "San Francisco, CA",
        birthday: profile_data?.birthday || "1990-01-15",
        notifications: profile_data?.notifications ?? true,
        pushNotifications: profile_data?.pushNotifications ?? true,
        smsNotifications: profile_data?.smsNotifications ?? false,
        darkMode: profile_data?.darkMode ?? false,
        language: profile_data?.language || "English (US)",
        timezone: profile_data?.timezone || "Pacific Time (PT)",
        profileVisibility: profile_data?.profileVisibility ?? true,
        showOnlineStatus: profile_data?.showOnlineStatus ?? true,
        allowMessages: profile_data?.allowMessages ?? false,
    })

    const [editData, setEditData] = useState(profileData)

    const tabs = [
        { id: "personal", label: "Personal", icon: User },
        { id: "preferences", label: "Preferences", icon: Palette },
        { id: "security", label: "Security", icon: Shield },
    ]

    const handleEdit = () => {
        setEditData(profileData)
        setIsEditing(true)
    }

    const handleSave = () => {
        setProfileData(editData)
        setIsEditing(false)
        // You can add callback here to save to backend
        // onSave?.(editData)
    }

    const handleCancel = () => {
        setEditData(profileData)
        setIsEditing(false)
    }

    const updateEditData = (field: string, value: any) => {
        setEditData((prev) => ({ ...prev, [field]: value }))
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fadeIn">
            <div
                className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden animate-scaleIn"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="relative bg-gradient-to-br from-violet-600 via-purple-600 to-blue-600 p-6 text-white overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-yellow-500/20"></div>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>

                    <div className="relative flex items-center justify-between">
                        <div className="flex items-center gap-6">
                            <div className="relative group">
                                <div className="w-24 h-24 border-4 border-white/20 shadow-xl rounded-full overflow-hidden">
                                    <Image 
                                        src={profile_data?.profile_image_url || profile}
                                        width={96}
                                        height={96}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                    {/* <div className="bg-gradient-to-br from-purple-400 to-pink-400 text-white text-2xl font-bold">
                                        {profileData.firstName[0]}
                                        {profileData.lastName[0]}
                                    </div> */}
                                </div>
                                {isEditing && (
                                    <button className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <Camera className="w-6 h-6 text-white" />
                                    </button>
                                )}
                            </div>

                            <div className="flex-1">
                                <h2 className="text-3xl font-bold mb-2">
                                    {profileData.firstName} {profileData.lastName}
                                </h2>
                                <p className="text-white/80 mb-3">{profile_data?.username}</p>
                                <div className="flex gap-2">
                                    {/* <Badge variant="secondary" className="bg-white/20 text-white border-0">
                                        {profile_data?.membershipType || "Pro Member"}
                                    </Badge>
                                    <Badge variant="secondary" className="bg-white/20 text-white border-0">
                                        <Star className="w-3 h-3 mr-1" />
                                        {profile_data?.rating || "4.9"} Rating
                                    </Badge> */}
                                </div>
                            </div>
                        </div>

                        {/* Edit/Save/Cancel buttons */}
                        <div className="flex gap-2">
                            {!isEditing ? (
                                <Button
                                    onClick={handleEdit}
                                    variant="secondary"
                                    className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                                >
                                    <Edit className="w-4 h-4 mr-2" />
                                    Edit Profile
                                </Button>
                            ) : (
                                <>
                                    <Button
                                        onClick={handleCancel}
                                        variant="secondary"
                                        className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                                    >
                                        <X className="w-4 h-4 mr-2" />
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={handleSave}
                                        variant="secondary"
                                        className="bg-white/90 hover:bg-white text-purple-600 border-0"
                                    >
                                        <Save className="w-4 h-4 mr-2" />
                                        Save Changes
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="border-b border-gray-200">
                    <nav className="flex">
                        {tabs.map((tab) => {
                            const Icon = tab.icon
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors relative ${activeTab === tab.id ? "text-purple-600" : "text-gray-500 hover:text-gray-700"
                                        }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    {tab.label}
                                    {activeTab === tab.id && (
                                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-blue-600"></div>
                                    )}
                                </button>
                            )
                        })}
                    </nav>
                </div>

                <div className="p-6 max-h-[calc(90vh-280px)] overflow-y-auto custom-scrollbar">
                    {activeTab === "personal" && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* First Name */}
                                <div className="space-y-2">
                                    <Label className="flex items-center gap-2">
                                        <User className="w-4 h-4 text-purple-500" />
                                        First Name
                                    </Label>
                                    {isEditing ? (
                                        <Input
                                            value={editData.firstName}
                                            onChange={(e) => updateEditData("firstName", e.target.value)}
                                            className="border-purple-200 focus:border-purple-500"
                                        />
                                    ) : (
                                        <div className="p-3 bg-gray-50 rounded-md border">{profileData.firstName}</div>
                                    )}
                                </div>

                                {/* Last Name */}
                                <div className="space-y-2">
                                    <Label className="flex items-center gap-2">
                                        <User className="w-4 h-4 text-purple-500" />
                                        Last Name
                                    </Label>
                                    {isEditing ? (
                                        <Input
                                            value={editData.lastName}
                                            onChange={(e) => updateEditData("lastName", e.target.value)}
                                            className="border-purple-200 focus:border-purple-500"
                                        />
                                    ) : (
                                        <div className="p-3 bg-gray-50 rounded-md border">{profileData.lastName}</div>
                                    )}
                                </div>

                                {/* Email */}
                                <div className="space-y-2">
                                    <Label className="flex items-center gap-2">
                                        <Mail className="w-4 h-4 text-blue-500" />
                                        Email
                                    </Label>
                                    {isEditing ? (
                                        <Input
                                            type="email"
                                            value={editData.email}
                                            onChange={(e) => updateEditData("email", e.target.value)}
                                            className="border-blue-200 focus:border-blue-500"
                                        />
                                    ) : (
                                        <div className="p-3 bg-gray-50 rounded-md border">{profileData.email}</div>
                                    )}
                                </div>

                                {/* Phone */}
                                <div className="space-y-2">
                                    <Label className="flex items-center gap-2">
                                        <Phone className="w-4 h-4 text-green-500" />
                                        Phone
                                    </Label>
                                    {isEditing ? (
                                        <Input
                                            value={editData.phone}
                                            onChange={(e) => updateEditData("phone", e.target.value)}
                                            className="border-green-200 focus:border-green-500"
                                        />
                                    ) : (
                                        <div className="p-3 bg-gray-50 rounded-md border">{profileData.phone}</div>
                                    )}
                                </div>

                                {/* Location */}
                                <div className="space-y-2">
                                    <Label className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-red-500" />
                                        Location
                                    </Label>
                                    {isEditing ? (
                                        <Input
                                            value={editData.location}
                                            onChange={(e) => updateEditData("location", e.target.value)}
                                            className="border-red-200 focus:border-red-500"
                                        />
                                    ) : (
                                        <div className="p-3 bg-gray-50 rounded-md border">{profileData.location}</div>
                                    )}
                                </div>

                                {/* Birthday */}
                                <div className="space-y-2">
                                    <Label className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-orange-500" />
                                        Birthday
                                    </Label>
                                    {isEditing ? (
                                        <Input
                                            type="date"
                                            value={editData.birthday}
                                            onChange={(e) => updateEditData("birthday", e.target.value)}
                                            className="border-orange-200 focus:border-orange-500"
                                        />
                                    ) : (
                                        <div className="p-3 bg-gray-50 rounded-md border">
                                            {new Date(profileData.birthday).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            })}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "preferences" && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4 p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                                    <h3 className="font-semibold text-purple-900 flex items-center gap-2">
                                        <Bell className="w-5 h-5" />
                                        Notifications
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm">Email notifications</span>
                                            <Switch
                                                checked={isEditing ? editData.notifications : profileData.notifications}
                                                onCheckedChange={(checked) => isEditing && updateEditData("notifications", checked)}
                                                disabled={!isEditing}
                                            />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm">Push notifications</span>
                                            <Switch
                                                checked={isEditing ? editData.pushNotifications : profileData.pushNotifications}
                                                onCheckedChange={(checked) => isEditing && updateEditData("pushNotifications", checked)}
                                                disabled={!isEditing}
                                            />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm">SMS notifications</span>
                                            <Switch
                                                checked={isEditing ? editData.smsNotifications : profileData.smsNotifications}
                                                onCheckedChange={(checked) => isEditing && updateEditData("smsNotifications", checked)}
                                                disabled={!isEditing}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4 p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                                    <h3 className="font-semibold text-blue-900 flex items-center gap-2">
                                        <Palette className="w-5 h-5" />
                                        Appearance
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm">Dark mode</span>
                                            <Switch
                                                checked={isEditing ? editData.darkMode : profileData.darkMode}
                                                onCheckedChange={(checked) => isEditing && updateEditData("darkMode", checked)}
                                                disabled={!isEditing}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-sm">Theme color</Label>
                                            <div className="flex gap-2">
                                                {["bg-purple-500", "bg-blue-500", "bg-green-500", "bg-pink-500", "bg-orange-500"].map(
                                                    (color) => (
                                                        <button
                                                            key={color}
                                                            className={`w-8 h-8 rounded-full ${color} border-2 border-white shadow-md hover:scale-110 transition-transform ${!isEditing ? "cursor-not-allowed opacity-50" : ""}`}
                                                            disabled={!isEditing}
                                                        />
                                                    ),
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "security" && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4 p-4 bg-gradient-to-br from-red-50 to-orange-50 rounded-xl border border-red-200">
                                    <h3 className="font-semibold text-red-900 flex items-center gap-2">
                                        <Shield className="w-5 h-5" />
                                        Password & Security
                                    </h3>
                                    <div className="space-y-3">
                                        <Button
                                            variant="outline"
                                            className="w-full justify-start border-red-200 hover:bg-red-50"
                                            disabled={!isEditing}
                                        >
                                            Change Password
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="w-full justify-start border-red-200 hover:bg-red-50"
                                            disabled={!isEditing}
                                        >
                                            Enable Two-Factor Auth
                                        </Button>
                                        <Button variant="outline" className="w-full justify-start border-red-200 hover:bg-red-50">
                                            View Login History
                                        </Button>
                                    </div>
                                </div>

                                <div className="space-y-4 p-4 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl border border-amber-200">
                                    <h3 className="font-semibold text-amber-900">Privacy Settings</h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm">Profile visibility</span>
                                            <Switch
                                                checked={isEditing ? editData.profileVisibility : profileData.profileVisibility}
                                                onCheckedChange={(checked) => isEditing && updateEditData("profileVisibility", checked)}
                                                disabled={!isEditing}
                                            />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm">Show online status</span>
                                            <Switch
                                                checked={isEditing ? editData.showOnlineStatus : profileData.showOnlineStatus}
                                                onCheckedChange={(checked) => isEditing && updateEditData("showOnlineStatus", checked)}
                                                disabled={!isEditing}
                                            />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm">Allow messages from strangers</span>
                                            <Switch
                                                checked={isEditing ? editData.allowMessages : profileData.allowMessages}
                                                onCheckedChange={(checked) => isEditing && updateEditData("allowMessages", checked)}
                                                disabled={!isEditing}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl border border-gray-200">
                                <h3 className="font-semibold text-gray-900 mb-3">Connected Accounts</h3>
                                <div className="space-y-2">
                                    {["Google", "GitHub", "LinkedIn", "Twitter"].map((service) => (
                                        <div key={service} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                                            <span className="font-medium">{service}</span>
                                            <Button variant="outline" size="sm" disabled={!isEditing}>
                                                Connected
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="mt-8 flex justify-end gap-3">
                        <Button variant="outline" onClick={onClose}>
                            Close
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileContrainer
