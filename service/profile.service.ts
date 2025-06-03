import { ProfileAccount } from "@/lib/types/comon";
import {http} from "@/utils/http";
const ServiceId = {
    PROFILE: '/api/wb/v1/users'
}

const getProfile = async () => {
    return http.get(ServiceId.PROFILE).then(res => res?.data?.data).catch(error => error);
}

//update profile
const updateProfile = async (profile: any) => {
    return http.put(ServiceId.PROFILE, profile).then(res => res?.data?.data).catch(error => error);
}


export const profileService = {
    getProfile,
    updateProfile
}