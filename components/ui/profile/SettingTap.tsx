import { Button } from '@/components/shared/ui/Button'
import { Shield } from 'lucide-react'
import React from 'react'

const SettingTap = () => {
    return (
        <div>
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
                            // disabled={!isEditing}
                            >
                                Change Password
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full justify-start border-red-200 hover:bg-red-50"
                            // disabled={!isEditing}
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
                                {/* <Switch
                                checked={isEditing ? editData.profileVisibility : profileData.profileVisibility}
                                onCheckedChange={(checked) => isEditing && updateEditData("profileVisibility", checked)}
                                disabled={!isEditing}
                            /> */}
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm">Show online status</span>
                                {/* <Switch
                                checked={isEditing ? editData.showOnlineStatus : profileData.showOnlineStatus}
                                onCheckedChange={(checked) => isEditing && updateEditData("showOnlineStatus", checked)}
                                disabled={!isEditing}
                            /> */}
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm">Allow messages from strangers</span>
                                {/* <Switch
                                checked={isEditing ? editData.allowMessages : profileData.allowMessages}
                                onCheckedChange={(checked) => isEditing && updateEditData("allowMessages", checked)}
                                disabled={!isEditing}
                            /> */}
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
                                <Button variant="outline" size="sm" >
                                    Connected
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SettingTap