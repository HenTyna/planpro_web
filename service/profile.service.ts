import { ProfileAccount } from "@/lib/types/comon";
import {http} from "@/utils/http";
const ServiceId = {
    PROFILE: '/api/wb/v1/users'
}

// async function getProfile(): Promise<ProfileAccount>  {
//     return http.get(ServiceId.PROFILE).then(res => res?.data?.data).catch(error => error);
// }
const getProfile = async () => {
    return http.get(ServiceId.PROFILE).then(res => res?.data?.data).catch(error => error);
}



export const profileService = {
    getProfile
}